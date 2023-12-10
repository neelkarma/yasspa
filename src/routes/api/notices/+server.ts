import { getDailyNotices } from "$lib/server/sbhs";
import { error, json } from "@sveltejs/kit";
import { handleAPIError } from "../common";
import type { RequestHandler } from "./$types";

export const GET = (async ({ cookies }) => {
  try {
    const notices = await getDailyNotices(cookies);
    return json(notices);
  } catch (err) {
    handleAPIError(err);
    throw error(500, { message: "Unreachable" });
  }
}) satisfies RequestHandler;
