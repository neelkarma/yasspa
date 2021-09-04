import type { NextApiRequest, NextApiResponse } from "next";
import type { Session } from "next-iron-session";
import { withIronSession } from "next-iron-session";

export const withSession = (
  handler: (
    req: NextApiRequest & { session: Session },
    res: NextApiResponse
  ) => any
) =>
  withIronSession(handler, {
    cookieName: "yasspa-session",
    password: process.env.SESSION_SECRET!,
    cookieOptions: {
      secure: process.env.NODE_ENV === "production",
      maxAge: 90 * 24 * 60 * 60 * 1000, // 90 Days
    },
  });
