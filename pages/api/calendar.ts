import { fetchResource } from "lib/serverFetchResources";
import { withSession } from "lib/session";

export default withSession((req, res) => {
  fetchResource("diarycalendar/events.json", req, res, {
    from: req.query.from as string | undefined,
    to: req.query.to as string | undefined,
  });
});
