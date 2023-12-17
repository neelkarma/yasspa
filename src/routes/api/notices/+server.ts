import { error, json } from "@sveltejs/kit";
import { handleAPIError } from "../common";
import type { RequestHandler } from "./$types";

export const GET = (async ({ locals }) => {
  try {
    const notices = await locals.sbhs.getDailyNotices();
    return json(notices);
  } catch (err) {
    handleAPIError(err);
    error(500, { message: "Unreachable" });
  }
}) satisfies RequestHandler;
