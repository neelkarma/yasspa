import type { NextApiRequest, NextApiResponse } from "next";
import type { Session } from "next-iron-session";
import { auth } from "./auth";
import fetch from "node-fetch";

type sbhsAPIEndpoint =
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
type sbhsAPIOpts = {
  date?: string;
  from?: string;
  to?: string;
  year?: string;
};

export const fetchResource = async (
  resourcePath: sbhsAPIEndpoint,
  req: NextApiRequest & { session: Session },
  res: NextApiResponse,
  apiOpts?: sbhsAPIOpts
) => {
  const sessionToken = req.session.get("token");
  if (!sessionToken) return res.status(403).json({ error: "Unauthorized" });

  let token = auth.createToken(sessionToken);
  try {
    if (token.expired()) {
      token = await token.refresh();
      req.session.set("token", token.token);
      await req.session.save();
    }
  } catch {
    return res.status(500).json({ error: "The SBHS server fucked up" });
  }

  try {
    const apiRes = await fetch(
      "https://student.sbhs.net.au/api/" +
        resourcePath +
        (apiOpts ? "?" + new URLSearchParams(apiOpts) : ""),
      {
        headers: new Headers({
          Authorization: "Bearer " + token.token.access_token,
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
