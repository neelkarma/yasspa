import type { NextApiRequest, NextApiResponse } from "next";
import { auth } from "../../../lib/auth";
import { NIL } from "uuid";

const handler = (_: NextApiRequest, res: NextApiResponse) => {
  res.redirect(
    auth.authorizeURL({
      redirect_uri: process.env.REDIRECT_URI!,
      scope: "all-ro",
      state: NIL,
    })
  );
};

export default handler;
