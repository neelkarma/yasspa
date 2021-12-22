import { fetchResource } from "lib/serverFetchResources";
import { withSession } from "lib/session";

export default withSession((req, res) => {
  fetchResource("calendar/terms.json", req, res);
});
