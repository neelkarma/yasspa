import type { Token } from "simple-oauth2";

declare module "express-session" {
  interface SessionData {
    token: Token;
  }
}
