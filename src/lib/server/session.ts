import { SESSION_SECRET } from "$env/static/private";
import type { Cookies } from "@sveltejs/kit";
import jwt from "jsonwebtoken";
import { TokenSet } from "openid-client";

const signSessionToken = (tokenSet: TokenSet) =>
  jwt.sign(JSON.stringify(tokenSet), SESSION_SECRET);

const verifySessionToken = (token: string): TokenSet | null => {
  try {
    const payload = jwt.verify(token, SESSION_SECRET);
    return new TokenSet(payload as any);
  } catch (err) {
    console.error(err);
    return null;
  }
};

const getClientToken = (cookies: Cookies) =>
  cookies.get("Authorization")?.split(" ")[1];

export const getTokenSet = (cookies: Cookies) => {
  const clientToken = getClientToken(cookies);
  if (clientToken) return verifySessionToken(clientToken);
  return null;
};

export const storeTokenSet = (cookies: Cookies, tokenSet: TokenSet) => {
  const sessionToken = signSessionToken(tokenSet);
  cookies.set("Authorization", `Bearer ${sessionToken}`, {
    path: "/",
    httpOnly: true,
    maxAge: 90 * 24 * 60 * 60, // 90 days
  });
};