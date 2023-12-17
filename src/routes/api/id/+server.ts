import { error, json } from "@sveltejs/kit";
import { handleAPIError } from "../common";
import type { RequestHandler } from "./$types";

export const GET = (async ({ locals }) => {
  try {
    const id = await locals.sbhs.getStudentId();
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
    error(500, { message: "Unreachable" });
  }
}) satisfies RequestHandler;
