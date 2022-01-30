import { Token } from "types/auth";
import { NIL } from "uuid";
import {
  CLIENT_ID,
  CLIENT_SECRET,
  LOGIN_ENDPOINT,
  TOKEN_ENDPOINT,
} from "./constants";

export const getLoginURI = () => {
  const queryParams = new URLSearchParams({
    client_id: CLIENT_ID,
    response_type: "code",
    state: NIL,
  });
  return `${LOGIN_ENDPOINT}?${queryParams}`;
};

export const refreshAccessToken = async (refreshToken: string) => {
  const body = new URLSearchParams({
    grant_type: "authorization_code",
    client_id: CLIENT_ID,
    client_secret: CLIENT_SECRET,
    code: refreshToken,
  });
  const token: Token = await fetch(TOKEN_ENDPOINT, {
    method: "POST",
    body,
  }).then((res) => res.json());
  token.expiry = Date.now() + token.expires_in * 1000;

  return token;
};
