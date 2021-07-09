import type { AuthorizationCode } from "simple-oauth2";
import type { Express } from "express";
import { NIL as NIL_UUID } from "uuid";

export default (app: Express, oauth2: AuthorizationCode) => {
  const authorizationUri = oauth2.authorizeURL({
    redirect_uri: process.env.REDIRECT_URI!,
    scope: "all-ro",
    state: NIL_UUID
  });

  // Login
  app.get("/auth/login", (_, res) => {
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
      req.session.token = await oauth2.getToken({
        code: code!.toString(),
        redirect_uri: process.env.REDIRECT_URI!,
      });
      res.redirect("/");
    } catch {
      return res.status(500).json({ error: "The SBHS server fucked up" });
    }
  });

  // Check if user is authorized or not
  app.get("/auth/status", (req, res) => {
    if (req.session.token) return res.status(200).json({ authorized: true });
    res.status(200).json({ authorized: false });
  });

  // Getting token from session, refreshing if not found
  app.get("/auth/getToken", async (req, res) => {
    if (!req.session.token)
      return res.status(403).json({ error: "Invalid Authorization" });

    let tokenObj = oauth2.createToken(req.session.token);

    if (!tokenObj.expired())
      return res.status(200).json({
        token: tokenObj.token,
      });

    // Refresh the token
    try {
      tokenObj = await tokenObj.refresh();

      res.status(200).json({
        token: tokenObj.token,
      });
    } catch {
      return res.status(500).json({ error: "The SBHS server fucked up" });
    }
  });
};
