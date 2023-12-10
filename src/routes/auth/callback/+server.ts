import { WEBSITE_URL } from "$lib/server/consts";
import { client, tokenSets } from "$lib/server/sbhs";
import { error, redirect } from "@sveltejs/kit";
import { STATE_COOKIE } from "../consts";
import type { RequestHandler } from "./$types";

const TOKEN_EXPIRY = 90 * 24 * 60 * 60; // 90 days

export const GET = (async ({ url, cookies }) => {
  const state = url.searchParams.get("state");
  if (state !== cookies.get(STATE_COOKIE)) throw error(403);

  const params = client.callbackParams(url.toString());
  const tokenSet = await client.oauthCallback(
    `${WEBSITE_URL}/auth/callback`,
    params,
    { response_type: "code", state }
  );

  const clientToken = crypto.randomUUID();
  tokenSets.set(clientToken, tokenSet);

  cookies.set("Authorization", "Bearer " + clientToken, {
    maxAge: TOKEN_EXPIRY,
    path: "/",
    httpOnly: true,
  });

  throw redirect(301, "/");
}) satisfies RequestHandler;
