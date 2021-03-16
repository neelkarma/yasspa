import { AuthorizationCode as OAuth2Client } from "simple-oauth2";
import type { Express } from "express";

export default (app: Express, host: string, clientId: string, clientSecret: string) => {
  const client = new OAuth2Client({
    client: {
      id: process.env.CLIENT_ID!,
      secret: process.env.CLIENT_SECRET!
    },
    auth: {
      tokenHost: "https://student.sbhs.net.au/api"
    }
  });

  const authorizationUri = client.authorizeURL({
    redirect_uri: process.env.REDIRECT_URI!,
    scope: "all-ro"
  });

  app.get("/auth/login", (req, res) => {
    res.redirect(authorizationUri);
  });

  app.get("/auth/logout", (req, res) => {
    req.session.destroy(() => {
      res.redirect("/");
    });
  });

  app.get("/auth/callback", async (req, res) => {
    const { code } = req.query;
    try {
      const tokenObject = await client.getToken({
        code: code!.toString(),
        redirect_uri: process.env.REDIRECT_URI!
      });
      req.session.token = tokenObject
      res.redirect("/")
    } catch (e) {
      return res.status(500).json({ error: "The SBHS server fucked up" });
    }
  });

  app.get("/auth/getToken", (req, res) => {
    if (!req.session.token) return res.status(403).json({ error: "Invalid Authorization" });
    if (Date.now() < req.session.token.expires) return res.json({
      accessToken: req.session.token.accessToken,
      expires: req.session.token.expires
    });

    client.createToken(req.session.token)
  })
}
