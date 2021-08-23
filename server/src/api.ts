import type {
  Express,
  Request as ExpressReq,
  Response as ExpressRes,
} from "express";
import type { AuthorizationCode } from "simple-oauth2";
import axios, { AxiosError } from "axios";
import fetch, { Headers } from "node-fetch";

/*

VALID SBHS API ENDPOINTS
------------------------
 - "barcodenews/list.json" - Returns the news as displayed on the attendance computers ("Barcode Stations") for a student's year group.
 - "calendar/days.json" - Returns information about the school days in the given date range - what term, week, week type etc the days are
 - "calendar/terms.json" - Returns information about the school year - when each term starts and ends. Also returns information about public holidays and staff development days.
 - "dailynews/list.json" - Returns the daily notices for a given date. Results are not filtered for the user's user group. If you wish to do this, obtain the user's year group from details/userinfo.json and filter the results yourself.
 - "diarycalendar/events.json" - Returns calendar event information for the authorising student for a given date range. The information returned is sourced from: school calendar, Moodle course events ("coursework"), school assessments, school homework (not currently operating) and personal My Diary entries.
 - "timetable/bells.json" - Returns information about the bell times for a given date. Information includes information about the day in the timetable cycle, the progression of periods, the time of each bell and the reason for bell changes.
 - "timetable/daytimetable.json" - Returns the timetable for a student for a given date. This is what displays a student's timetable on the front page of the Student Portal.
 - "timetable/timetable.json" - Returns the complete timetable for a student.
 - "details/participation.json" - Returns a student's Award Scheme participation information
 - "details/userinfo.json" - Returns information about the user the supplied Access Token is valid for

*/

type sbhsApiEndpoint =
  | "barcodenews/list.json"
  | "calendar/days.json"
  | "calendar/terms.json" // Used
  | "dailynews/list.json" // Used
  | "diarycalendar/events.json" // Used
  | "timetable/bells.json"
  | "timetable/daytimetable.json" // Used
  | "timetable/timetable.json" // Used
  | "details/participation.json" // Used
  | "details/userinfo.json"; //Used

// Don't change this to an interface, it breaks if it's an interface
type sbhsApiOpts = {
  date?: string;
  from?: string;
  to?: string;
  year?: string;
};

export default (app: Express, oauth2: AuthorizationCode, apiPath: string) => {
  const getResource = async (
    resourcePath: sbhsApiEndpoint,
    req: ExpressReq,
    res: ExpressRes,
    apiOpts?: sbhsApiOpts
  ) => {
    if (!req.session.token)
      return res.status(403).json({ error: "Unauthorized" });

    const tokenObj = oauth2.createToken(req.session.token);

    try {
      if (tokenObj.expired())
        req.session.token = await tokenObj
          .refresh()
          .then((tokenObj) => tokenObj.token);
    } catch {
      return res.status(500).json({ error: "The SBHS server fucked up" });
    }

    if (!req.session.token)
      return res.status(500).json({ error: "Internal Error" });

    try {
      const apiRes = await fetch(
        apiPath +
          resourcePath +
          (apiOpts ? "?" + new URLSearchParams(apiOpts) : ""),
        {
          headers: new Headers({
            Authorization: "Bearer " + req.session.token.access_token,
          }),
        }
      );
      if (!apiRes.ok) {
        if (apiRes.status >= 500)
          return res.status(500).json({ error: "The SBHS server fucked up" });
        if (apiRes.status >= 400)
          return res.status(500).json({ error: "Internal Error" });
      }
      return res.status(200).json({ data: await apiRes.json() });
    } catch (e) {
      console.log(e);
      return res.status(500).json({ error: "Internal Error" });
    }
  };

  app.get("/api/terms", async (req, res) => {
    await getResource("calendar/terms.json", req, res);
  });

  app.get("/api/dailynotices", async (req, res) => {
    await getResource("dailynews/list.json", req, res);
  });

  app.get("/api/calendar", async (req, res) => {
    await getResource("diarycalendar/events.json", req, res, {
      from: req.query.from ? <string>req.query.from : undefined,
      to: req.query.to ? <string>req.query.to : undefined,
    });
  });

  app.get("/api/today", async (req, res) => {
    await getResource("timetable/daytimetable.json", req, res);
  });

  app.get("/api/timetable", async (req, res) => {
    await getResource("timetable/timetable.json", req, res);
  });

  app.get("/api/awardscheme", async (req, res) => {
    await getResource("details/participation.json", req, res);
  });

  app.get("/api/userinfo", async (req, res) => {
    await getResource("details/userinfo.json", req, res);
  });
};
