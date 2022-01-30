import type { NextApiRequest, NextApiResponse } from "next";
import { getLoginURI } from "lib/auth";

const login = (_: NextApiRequest, res: NextApiResponse) => {
  res.redirect(getLoginURI());
};

export default login;
