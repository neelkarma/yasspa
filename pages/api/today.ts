import { fetchResource } from "../../lib/serverFetchResources";
import { withSession } from "../../lib/session";

const handler = withSession((req, res) => {
  fetchResource("timetable/daytimetable.json", req, res);
});

export default handler;
