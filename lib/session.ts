import type { NextApiRequest, NextApiResponse } from "next";
import { withIronSessionApiRoute } from "iron-session/next";

export const withSession = (
  handler: (req: NextApiRequest, res: NextApiResponse) => any
) =>
  withIronSessionApiRoute(handler, {
    cookieName: "yasspa-session",
    password: process.env.SESSION_SECRET!,
    cookieOptions: {
      maxAge: 90 * 24 * 60 * 60 * 1000, // 90 Days
    },
  });
