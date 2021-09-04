import { withSession } from "../../../lib/session";

const handler = withSession((req, res) => {
  req.session.destroy();
  res.setHeader("cache-control", "no-store,max-age=0").redirect("/");
});

export default handler;
