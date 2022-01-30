import type { NextApiHandler } from "next";
import { withIronSessionApiRoute } from "iron-session/next";

export const withSession = (handler: NextApiHandler) =>
  withIronSessionApiRoute(handler, {
    cookieName: "yasspa-session",
    password: process.env.SESSION_SECRET!,
    cookieOptions: {
      maxAge: 90 * 24 * 60 * 60 * 1000, // 90 Days
    },
  });
