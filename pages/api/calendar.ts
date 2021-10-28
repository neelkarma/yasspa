import { fetchResource } from "lib/serverFetchResources";
import { withSession } from "lib/session";

const handler = withSession((req, res) => {
  fetchResource("diarycalendar/events.json", req, res, {
    from: (req.query.from as string) ?? undefined,
    to: (req.query.to as string) ?? undefined,
  });
});

export default handler;
