import { IronSession } from "iron-session";
import type { NextApiRequest, NextApiResponse } from "next";
import { getToken, refreshAccessToken } from "./auth";
import { API_BASE } from "./constants";

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
  req: NextApiRequest & { session: IronSession },
  res: NextApiResponse,
  apiOpts?: sbhsAPIOpts
) => {
  try {
    const token = await getToken(req);

    const apiRes = await fetch(
      `${API_BASE}/${resourcePath}${
        apiOpts ? `?${new URLSearchParams(apiOpts)}` : ""
      }`,
      {
        headers: new Headers({
          Authorization: "Bearer " + token.access_token,
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
