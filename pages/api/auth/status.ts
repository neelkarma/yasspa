import { getToken } from "lib/auth";
import { withSession } from "lib/session";

export default withSession(async (req, res) => {
  try {
    const token = await getToken(req);
    res.status(200).json({ authorized: true });
  } catch {
    res.status(200).json({ authorized: false });
  }
});
