import { Request, Response } from "express";
import url from "url";
import { google, Auth } from "googleapis";

import { AuthService } from "./auth.service";

export const authDictionary = {
  oauth2Client: null as Auth.OAuth2Client,
};

export namespace AuthController {
  export const authenticate = async (req: Request, res: Response) => {
    try {
      const oauth2Client = new google.auth.OAuth2(
        process.env.GOOGLE_CLIENT_ID,
        process.env.GOOGLE_CLIENT_SECRET,
        process.env.GOOGLE_SIGN_IN_URL_CALLBACK
      );

      google.options({ auth: oauth2Client });

      const scopes = [
        "https://www.googleapis.com/auth/userinfo.email",
        "https://www.googleapis.com/auth/userinfo.profile",
      ];

      const url = oauth2Client.generateAuthUrl({
        scope: scopes,
        access_type: "offline",
      });

      authDictionary["oauth2Client"] = oauth2Client;

      res.redirect(url);
    } catch (error) {
      console.error("Error during authentication:", error);
      res.status(500).send("Error logging in");
    }
  };

  export const oAuthCallback = async (req: Request, res: Response) => {
    try {
      const { code } = req.query;

      if (!code) {
        return res.status(400).send("Missing query parameters");
      }

      const { tokens } = await authDictionary["oauth2Client"].getToken(code.toString());

      const tokenInfo = await authDictionary["oauth2Client"].getTokenInfo(
        tokens.access_token
      );

      if (!AuthService.isUserAllowed(tokenInfo.email)) {
        authDictionary["oauth2Client"].revokeCredentials();
        return res.status(403).redirect(`${process.env.FRONTEND_URL}/login`);
      }

      authDictionary["oauth2Client"].setCredentials(tokens);

      res
        .status(200)
        .redirect(`${process.env.FRONTEND_URL}/login?token=${tokens.id_token}`);
    } catch (error) {
      console.error("Error during OAuth callback:", error);
      res.status(500).send("Error during OAuth callback");
    }
  };

  export const signOut = async (req: Request, res: Response) => {
    try {
      const idToken = req.headers.authorization?.split("Bearer ")[1];
      await authDictionary["oauth2Client"].revokeToken(idToken);

      res.status(200).send();
    } catch (error) {
      console.error("Error during OAuth callback:", error);
      res.status(500).send("Error during OAuth callback");
    }
  };
}
