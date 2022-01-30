import { withSession } from "lib/session";
import { refreshAccessToken } from "lib/auth";

export default withSession(async (req, res) => {
  try {
    const token = await refreshAccessToken(req.query.code as string);
    req.session.token = token;
    await req.session.save();
    res.redirect("/");
  } catch (e) {
    console.log(e);
    res.status(500).json({ error: "The SBHS server fucked up" });
  }
});
