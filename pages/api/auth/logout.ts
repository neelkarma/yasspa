import { withSession } from "lib/session";

export default withSession((req, res) => {
  req.session.destroy();
  res.setHeader("cache-control", "no-store,max-age=0").redirect("/");
});
