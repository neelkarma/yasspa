import { getStudentID } from "$lib/server/sbhs";
import { error, json } from "@sveltejs/kit";
import { handleAPIError } from "../common";
import type { RequestHandler } from "./$types";

export const GET = (async ({ cookies }) => {
  try {
    const id = await getStudentID(cookies);
    return json(
      { id },
      {
        headers: {
          "Cache-Control": "public, max-age=3600",
        },
      }
    );
  } catch (err) {
    handleAPIError(err);
    throw error(500, { message: "Unreachable" });
  }
}) satisfies RequestHandler;
