import { withSession } from "lib/session";
import { auth } from "lib/auth";

const handler = withSession(async (req, res) => {
  try {
    const token = await auth.getToken({
      code: req.query.code as string,
      redirect_uri: "",
    });
    req.session.set("token", token);
    await req.session.save();
    res.redirect("/");
  } catch (e) {
    console.log(e);
    res.status(500).json({ error: "The SBHS server fucked up" });
  }
});

export default handler;
