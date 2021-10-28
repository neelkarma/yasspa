import { fetchResource } from "lib/serverFetchResources";
import { withSession } from "lib/session";

const handler = withSession((req, res) => {
  fetchResource("timetable/timetable.json", req, res);
});

export default handler;
