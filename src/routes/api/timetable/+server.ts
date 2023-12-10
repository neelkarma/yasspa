import { getTimetableData, getTokenSet } from "$lib/server/sbhs";
import { error, json } from "@sveltejs/kit";
import type { RequestHandler } from "./$types";

export const GET = (async ({ cookies }) => {
  const tokenSet = getTokenSet(cookies);
  if (!tokenSet) throw error(401, { message: "Unauthorized" });

  const timetable = await getTimetableData(tokenSet);
  return json(timetable, {
    headers: {
      "Cache-Control": "public, max-age=3600",
    },
  });
}) satisfies RequestHandler;
