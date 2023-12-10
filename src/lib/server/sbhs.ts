import { CLIENT_ID, CLIENT_SECRET } from "$env/static/private";
import { API_BASE, WEBSITE_URL } from "$lib/server/consts";
import { Issuer, type TokenSet } from "openid-client";

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

export const makeRequest = async <T>(
  path: string,
  tokenSet: TokenSet
): Promise<T> => {
  const res = await client.requestResource(`${API_BASE}${path}`, tokenSet);
  return JSON.parse(res.body?.toString() ?? "{}");
};

export const getTodayData = async (
  tokenSet: TokenSet
): Promise<{
  day: string;
  periods: (
    | {
        type: "class";
        period: number;
        subject: string;
        teacher: string;
        room: string;
        isCancelled: boolean;
        isSubstitute: boolean;
        isRoomChange: boolean;
        time: string;
      }
    | {
        type: "free";
        period: number;
        time: string;
      }
    | {
        type: "break";
        break: string;
        time: string;
      }
    | {
        type: "rollcall";
        time: string;
      }
    | {
        type: "dayend";
        time: string;
      }
    | {
        type: "transition";
        time: string;
      }
  )[];
}> => {
  const dayTimetable = await makeRequest<any>(
    "/timetable/daytimetable.json",
    tokenSet
  );
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
      case "MTL1":
        transformed.push({
          type: "break",
          break: "Lunch 1",
          time: bell.time,
        });
        continue;
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
    periods: transformed as any[],
  };
};

export const getTimetableData = async (
  tokenSet: TokenSet
): Promise<
  {
    day: string;
    periods: (
      | {
          type: "free";
          period: number;
        }
      | {
          type: "class";
          period: number;
          subject: string;
          room: string;
        }
    )[];
  }[][]
> => {
  const timetable = await makeRequest<any>(
    "/timetable/timetable.json",
    tokenSet
  );

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
        subject: period.title,
        room: period.room,
      });
    }

    days[Math.floor(i / 5)].push({
      day: day.dayname,
      periods: periods as any,
    });
  }

  return days;
};

export const getDailyNotices = async (
  tokenSet: TokenSet
): Promise<
  {
    title: string;
    content: string;
    years: string[];
    displayYears: string;
    author: string;
  }[]
> => {
  const notices = await makeRequest<any>("/dailynews/list.json", tokenSet);

  return notices.notices.map((notice: any) => ({
    title: notice.title,
    content: notice.content,
    years: notice.years,
    displayYears: notice.displayYears,
    author: notice.authorName,
  }));
};

export const getStudentID = async (tokenSet: TokenSet): Promise<string> => {
  const userinfo = await makeRequest<any>("/details/userinfo.json", tokenSet);
  return userinfo.studentId;
};
