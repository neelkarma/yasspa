import { LocalAPIClient } from "$lib/server/sbhs";
import type { Handle } from "@sveltejs/kit";

export const handle = (async ({ event, resolve }) => {
  event.locals.sbhs = new LocalAPIClient(event.cookies);
  return await resolve(event);
}) satisfies Handle;
