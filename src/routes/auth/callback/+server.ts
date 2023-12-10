import { WEBSITE_URL } from "$lib/server/consts";
import { client } from "$lib/server/sbhs";
import { storeTokenSet } from "$lib/server/session";
import { error, redirect } from "@sveltejs/kit";
import { STATE_COOKIE } from "../consts";
import type { RequestHandler } from "./$types";

export const GET = (async ({ url, cookies }) => {
  const state = url.searchParams.get("state");
  if (state !== cookies.get(STATE_COOKIE)) throw error(403);

  const params = client.callbackParams(url.toString());
  const tokenSet = await client.oauthCallback(
    `${WEBSITE_URL}/auth/callback`,
    params,
    { response_type: "code", state }
  );

  storeTokenSet(cookies, tokenSet);

  throw redirect(301, "/");
}) satisfies RequestHandler;
