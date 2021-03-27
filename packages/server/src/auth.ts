import { AuthorizationCode as OAuth2Client } from "simple-oauth2";
import type { Express } from "express";

export default (app: Express) => {
  const client = new OAuth2Client({
    client: {
      id: process.env.CLIENT_ID!,
      secret: process.env.CLIENT_SECRET!,
    },
    auth: {
      tokenHost: "https://student.sbhs.net.au/api",
      tokenPath: "/token",
      authorizePath: "/authorize",
    },
  });

  const authorizationUri = client.authorizeURL({
    redirect_uri: process.env.REDIRECT_URI!,
    scope: "all-ro",
  });

  // Login
  app.get("/auth/login", (req, res) => {
    res.redirect(authorizationUri);
  });

  // Logout
  app.get("/auth/logout", async (req, res) => {
    req.session.destroy(() => {
      res.redirect("/");
    });
  });

  // Login Callback - Storing token in session
  app.get("/auth/callback", async (req, res) => {
    const { code } = req.query;
    try {
      req.session.token = await client.getToken({
        code: code!.toString(),
        redirect_uri: process.env.REDIRECT_URI!,
      });
      res.redirect("/");
    } catch {
      return res.status(500).json({ error: "The SBHS server fucked up" });
    }
  });

  // Getting token from session
  app.get("/auth/getToken", async (req, res) => {
    if (!req.session.token)
      return res.status(403).json({ error: "Invalid Authorization" });

    const accessToken = client.createToken(req.session.token);

    if (!accessToken.expired())
      return res.status(200).json({
        accessToken: req.session.token.access_token,
        expires: req.session.token.expires_in,
      });

    // Refresh the token
    try {
      req.session.token = await accessToken
        .refresh()
        .then((tokenObject) => tokenObject.token);

      res.status(200).json({
        accessToken: req.session.token!.access_token,
        expires: req.session.token!.expires_in,
      });
    } catch {
      return res.status(500).json({ error: "The SBHS server fucked up" });
    }
  });
};
