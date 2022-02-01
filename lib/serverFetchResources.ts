import type { NextApiRequest, NextApiResponse } from "next";
import { auth } from "./auth";
import { API_BASE } from "./constants";

type SBHSAPIEndpoint =
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
type SBHSAPIOptions = {
  date?: string;
  from?: string;
  to?: string;
  year?: string;
};

export const fetchResource = async (
  endpoint: SBHSAPIEndpoint,
  req: NextApiRequest,
  res: NextApiResponse,
  options?: SBHSAPIOptions
) => {
  try {
    const sessionToken = req.session.token;
    if (!sessionToken) return res.status(403).json({ error: "Unauthorized" });

    let token = auth.createToken(sessionToken);
    try {
      if (token.expired()) {
        token = await token.refresh();
        req.session.token = token.token;
        await req.session.save();
      }
    } catch {
      return res.status(500).json({ error: "The SBHS server fucked up" });
    }

    const apiRes = await fetch(
      `${API_BASE}/${endpoint}${
        options ? "?" + new URLSearchParams(options) : ""
      }`,
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
