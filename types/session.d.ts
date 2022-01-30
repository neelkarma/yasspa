import { Token } from "./auth";

declare module "iron-session" {
  interface IronSessionData {
    token?: Token;
  }
}
