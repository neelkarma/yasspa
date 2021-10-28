import { fetchResource } from "lib/serverFetchResources";
import { withSession } from "lib/session";

const handler = withSession((req, res) => {
  fetchResource("calendar/terms.json", req, res);
});

export default handler;
