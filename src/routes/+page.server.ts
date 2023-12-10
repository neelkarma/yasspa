import { getTodayData } from "$lib/server/sbhs";
import { getTokenSet } from "$lib/server/session";
import type { PageServerLoad } from "./$types";

export const load = (async ({
  cookies,
}): Promise<
  | { authorized: false }
  | { authorized: true; today: Awaited<ReturnType<typeof getTodayData>> }
> => {
  const tokenSet = getTokenSet(cookies);
  if (!tokenSet) {
    return {
      authorized: false,
    };
  }

  const today = await getTodayData(tokenSet);

  return {
    authorized: true,
    today,
  };
}) satisfies PageServerLoad;
