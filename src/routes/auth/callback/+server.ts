import { WEBSITE_URL } from "$lib/server/consts";
import { client } from "$lib/server/sbhs";
import { error, redirect } from "@sveltejs/kit";
import { STATE_COOKIE } from "../consts";
import type { RequestHandler } from "./$types";

export const GET = (async ({ url, cookies, locals }) => {
  const state = url.searchParams.get("state");
  if (state !== cookies.get(STATE_COOKIE)) error(403);

  const params = client.callbackParams(url.toString());
  const tokenSet = await client.oauthCallback(
    `${WEBSITE_URL}/auth/callback`,
    params,
    { response_type: "code", state }
  );

  locals.sbhs.setTokenSet(tokenSet);

  redirect(302, "/");
}) satisfies RequestHandler;
