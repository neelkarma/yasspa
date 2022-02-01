import { AuthorizationCode } from "simple-oauth2";
import { API_BASE, CLIENT_ID, CLIENT_SECRET } from "./constants";

export const auth = new AuthorizationCode({
  client: {
    id: CLIENT_ID,
    secret: CLIENT_SECRET,
  },
  auth: {
    tokenHost: API_BASE,
    tokenPath: "/api/token",
    authorizePath: "/api/authorize",
  },
});
