import { refreshAccessToken } from "lib/auth";
import { withSession } from "lib/session";
import { Token } from "types/auth";

export default withSession(async (req, res) => {
  let { token } = req.session;
  if (!token)
    return res.status(200).json({ authorized: false, reason: "No Token" });
  if (Date.now() > token.expiry) {
    token = await refreshAccessToken(token.refresh_token);
    req.session.token = token;
    await req.session.save();
    if (Date.now() > token.expiry)
      return res
        .status(200)
        .json({ authorized: false, reason: "Refresh Token Expired" });
  }
  res.status(200).json({ authorized: true, reason: null });
});
