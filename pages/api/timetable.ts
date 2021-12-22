import { fetchResource } from "lib/serverFetchResources";
import { withSession } from "lib/session";

export default withSession((req, res) => {
  fetchResource("timetable/timetable.json", req, res);
});
