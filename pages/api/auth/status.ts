import { auth } from "lib/auth";
import { withSession } from "lib/session";

export default withSession((req, res) => {
  const sessionToken = req.session.token;
  if (!sessionToken)
    return res.status(200).json({ authorized: false, reason: "No Token" });
  const token = auth.createToken(sessionToken);
  if (token.expired())
    return res.status(200).json({ authorized: false, reason: "Expired" });
  res.status(200).json({ authorized: true });
});
