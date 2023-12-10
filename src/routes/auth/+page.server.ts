import { client } from "$lib/server/sbhs.js";
import { redirect } from "@sveltejs/kit";
import { STATE_COOKIE } from "./consts.js";

export const actions = {
  login: async ({ cookies }) => {
    const state = crypto.randomUUID();
    cookies.set(STATE_COOKIE, state);

    throw redirect(
      302,
      client.authorizationUrl({
        scope: "all-ro",
        state,
      })
    );
  },

  logout: async ({ cookies }) => {
    cookies.delete("Authorization", {
      path: "/",
      httpOnly: true,
    });
    throw redirect(302, "/");
  },
};
