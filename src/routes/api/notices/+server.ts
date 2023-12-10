import { getDailyNotices, getTokenSet } from "$lib/server/sbhs";
import { error, json } from "@sveltejs/kit";
import type { RequestHandler } from "./$types";

export const GET = (async ({ cookies }) => {
  const tokenSet = getTokenSet(cookies);
  if (!tokenSet) throw error(401, { message: "Unauthorized" });

  const notices = await getDailyNotices(tokenSet);
  return json(notices);
}) satisfies RequestHandler;
