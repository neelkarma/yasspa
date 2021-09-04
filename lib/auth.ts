import { AuthorizationCode } from "simple-oauth2";

export const auth = new AuthorizationCode({
  client: {
    id: process.env.CLIENT_ID!,
    secret: process.env.CLIENT_SECRET!,
  },
  auth: {
    tokenHost: "https://student.sbhs.net.au/api/",
    tokenPath: "/api/token",
    authorizePath: "/api/authorize",
  },
});
