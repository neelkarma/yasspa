import { fetchResource } from "lib/serverFetchResources";
import { withSession } from "lib/session";

export default withSession((req, res) => {
  fetchResource("details/participation.json", req, res);
});
