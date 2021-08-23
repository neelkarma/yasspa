import express from "express";
import compression from "compression";
import session from "express-session";
import auth from "./auth";
import api from "./api";
import { AuthorizationCode } from "simple-oauth2";

const PORT = parseInt(process.env.PORT ?? "8000");
const IP = process.env.IP ?? "localhost";

const app = express();

const oauth2Config = {
  client: {
    id: process.env.CLIENT_ID!,
    secret: process.env.CLIENT_SECRET!,
  },
  auth: {
    tokenHost: "https://student.sbhs.net.au/api/",
    tokenPath: "/api/token",
    authorizePath: "/api/authorize",
  },
};

const oauth2 = new AuthorizationCode(oauth2Config);

app.use(compression());
app.use(
  session({
    secret: process.env.CLIENT_SECRET!,
    saveUninitialized: false,
    resave: false,
    cookie: {
      maxAge: 90 * 24 * 60 * 60 * 1000, // 90 Days
    },
  })
);

if (process.env.NODE_ENV == "production")
  app.use(express.static("../../app/build/"));

auth(app, oauth2);
api(app, oauth2, oauth2Config.auth.tokenHost);

app.get("/secret", (_, res) => res.status(418).send("418 I'm a teapot"));

app.listen(PORT, IP, () => console.log(`Server up on ${IP}:${PORT}`));
