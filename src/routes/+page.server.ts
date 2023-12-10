import { getTodayData } from "$lib/server/sbhs";
import type { PageServerLoad } from "./$types";

export const load = (async ({
  cookies,
}): Promise<
  | { authorized: false }
  | { authorized: true; today: Awaited<ReturnType<typeof getTodayData>> }
> => {
  try {
    const today = await getTodayData(cookies);
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
