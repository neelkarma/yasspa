import { CLIENT_ID, CLIENT_SECRET, SESSION_SECRET } from "$env/static/private";
import { API_BASE, WEBSITE_URL } from "$lib/server/consts";
import type { Cookies } from "@sveltejs/kit";
import jwt from "jsonwebtoken";
import { Issuer, TokenSet } from "openid-client";
import { InvalidRefreshTokenError, TokenSetNotPresentError } from "./errors";
import type { DailyNoticesData, TimetableData, TodayData } from "./types";

const issuer = new Issuer({
  issuer: API_BASE,
  authorization_endpoint: `${API_BASE}/authorize`,
  token_endpoint: `${API_BASE}/token`,
});

export const client = new issuer.Client({
  client_id: CLIENT_ID,
  client_secret: CLIENT_SECRET,
  redirect_uris: [`${WEBSITE_URL}/auth/callback`],
  response_types: ["code"],
});

const signSessionToken = (tokenSet: TokenSet) =>
  jwt.sign(JSON.stringify(tokenSet), SESSION_SECRET);

const verifySessionToken = (token: string): TokenSet | null => {
  try {
    const payload = jwt.verify(token, SESSION_SECRET);
    return new TokenSet(payload as any);
  } catch (err) {
    console.error(err);
    return null;
  }
};

export class LocalAPIClient {
  cookies: Cookies;
  tokenSet: TokenSet | null;

  constructor(cookies: Cookies) {
    this.cookies = cookies;
    const sessionToken = cookies.get("Authorization")?.split(" ")[1];
    if (sessionToken) this.tokenSet = verifySessionToken(sessionToken);
    else this.tokenSet = null;
  }

  private updateCookies() {
    if (!this.tokenSet) throw new TokenSetNotPresentError();
    const sessionToken = signSessionToken(this.tokenSet);
    this.cookies.set("Authorization", `Bearer ${sessionToken}`, {
      path: "/",
      httpOnly: true,
      maxAge: 90 * 24 * 60 * 60, // 90 days
    });
  }

  setTokenSet(tokenSet: TokenSet) {
    this.tokenSet = tokenSet;
    this.updateCookies();
  }

  logout() {
    this.tokenSet = null;
    this.cookies.delete("Authorization", { path: "/", httpOnly: true });
  }

  private async makeRequest<T>(path: string): Promise<T | null> {
    if (!this.tokenSet) throw new TokenSetNotPresentError();

    let res = await client.requestResource(`${API_BASE}${path}`, this.tokenSet);
    if (res.statusCode !== 200) {
      try {
        this.tokenSet = await client.refresh(this.tokenSet);
      } catch {
        throw new InvalidRefreshTokenError();
      }
      this.updateCookies();
      res = await client.requestResource(`${API_BASE}${path}`, this.tokenSet);
    }

    return JSON.parse(res.body?.toString() ?? "{}");
  }

  async getTodayData(): Promise<TodayData> {
    const dayTimetable = await this.makeRequest<any>(
      "/timetable/daytimetable.json"
    );

    if (!dayTimetable.timetable) return null;

    const bells = dayTimetable.bells;
    const periods = dayTimetable.timetable.timetable.periods;

    let transformed = [];

    for (const [i, bell] of bells.entries()) {
      // insert transition bells if necessary
      if (i > 0) {
        const prevBell = bells[i - 1];
        if (prevBell.endTime !== bell.startTime) {
          transformed.push({
            type: "transition",
            time: prevBell.endTime,
          });
        }
      }

      // handle all non-period bells
      switch (bell.period) {
        case "RC":
          transformed.push({
            type: "rollcall",
            time: bell.time,
          });
          continue;
        case "R":
          transformed.push({
            type: "break",
            break: "Recess",
            time: bell.time,
          });
          continue;
        case "L1":
        case "WFL1":
        case "MTL1":
          transformed.push({
            type: "break",
            break: "Lunch 1",
            time: bell.time,
          });
          continue;
        case "L2":
        case "WFL2":
        case "MTL2":
          transformed.push({
            type: "break",
            break: "Lunch 2",
            time: bell.time,
          });
          continue;
        case "EoD":
          transformed.push({
            type: "dayend",
            time: bell.time,
          });
          continue;
      }

      // handle free periods
      if (!periods.hasOwnProperty(bell.period)) {
        transformed.push({
          type: "free",
          period: Number(bell.period),
          time: bell.time,
        });
        continue;
      }

      // handle normal periods
      const period = periods[bell.period];
      const subject: any = Object.values(dayTimetable.timetable.subjects).find(
        (subject: any) => subject.shortTitle === period.title
      );

      const roomVariation = dayTimetable.classVariations[bell.period];
      const classVariation = dayTimetable.classVariations[bell.period];

      const isCancelled = classVariation?.type === "nocover";

      transformed.push({
        type: "class",
        period: Number(bell.period),
        subject: subject.title,
        subjectShort: period.title.split(" ")[0],
        teacher: classVariation?.casual || period.fullTeacher,
        room: classVariation?.roomTo || roomVariation?.roomTo || period.room,
        isCancelled,
        isSubstitute: !!classVariation?.casual, // TODO
        isRoomChange: !!classVariation?.roomTo || !!roomVariation?.roomTo, // TODO
        time: bell.time,
      });
    }

    return {
      day: dayTimetable.timetable.timetable.dayname,
      date: dayTimetable.date,
      periods: transformed as any[],
    };
  }
  async getTimetableData(): Promise<TimetableData> {
    const timetable = await this.makeRequest<any>("/timetable/timetable.json");

    const days: any[][] = [[], [], []];

    for (const [i, day] of Object.values<any>(timetable.days).entries()) {
      const periods = [];

      for (const periodNum of day.routine.split(",")) {
        // ignore rollcall, breaks, and end of day
        if (isNaN(Number(periodNum))) continue;

        // handle free periods
        if (!day.periods.hasOwnProperty(periodNum)) {
          periods.push({
            type: "free",
            period: Number(periodNum),
          });
          continue;
        }

        // handle regular periods
        const period = day.periods[periodNum];
        periods.push({
          type: "class",
          period: Number(periodNum),
          subject: period.title.split(" ")[0],
          room: period.room,
        });
      }

      days[Math.floor(i / 5)].push({
        day: day.dayname,
        periods: periods as any,
      });
    }

    return days;
  }
  async getDailyNotices(): Promise<DailyNoticesData> {
    const notices = await this.makeRequest<any>("/dailynews/list.json");

    return notices.notices.map((notice: any) => ({
      title: notice.title,
      content: notice.content,
      years: notice.years,
      displayYears: notice.displayYears,
      author: notice.authorName,
    }));
  }

  async getStudentId(): Promise<string> {
    const userinfo = await this.makeRequest<any>("/details/userinfo.json");
    return userinfo.studentId;
  }
}
