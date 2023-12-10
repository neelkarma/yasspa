import { getTimetableData } from "$lib/server/sbhs";
import { error, json } from "@sveltejs/kit";
import { handleAPIError } from "../common";
import type { RequestHandler } from "./$types";

export const GET = (async ({ cookies }) => {
  try {
    const timetable = await getTimetableData(cookies);
    return json(timetable, {
      headers: {
        "Cache-Control": "public, max-age=3600",
      },
    });
  } catch (err) {
    handleAPIError(err);
    throw error(500, { message: "Unreachable" });
  }
}) satisfies RequestHandler;
