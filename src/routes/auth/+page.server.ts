import { client } from "$lib/server/sbhs.js";
import { redirect } from "@sveltejs/kit";
import { STATE_COOKIE } from "./consts.js";

export const actions = {
  login: async ({ cookies }) => {
    const state = crypto.randomUUID();
    cookies.set(STATE_COOKIE, state, {
      path: "/",
      httpOnly: true,
      maxAge: 60 * 60,
    });

    redirect(
      302,
      client.authorizationUrl({
        scope: "all-ro",
        state,
      })
    );
  },

  logout: async ({ locals }) => {
    locals.sbhs.logout();
    redirect(302, "/");
  },
};
