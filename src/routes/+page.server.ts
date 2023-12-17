import type { TodayData } from "$lib/server/types";
import type { PageServerLoad } from "./$types";

export const load = (async ({
  locals,
}): Promise<{ authorized: false } | { authorized: true; today: TodayData }> => {
  try {
    const today = await locals.sbhs.getTodayData();
    return {
      authorized: true,
      today,
    };
  } catch (err) {
    console.error(err);
    return {
      authorized: false,
    };
  }
}) satisfies PageServerLoad;
