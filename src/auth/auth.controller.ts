import { Request, Response } from "express";
import passport from "passport";

import { AuthService } from "./auth.service";

export namespace AuthController {
  export const authenticate = async (req: Request, res: Response) => {
    try {
      passport.authenticate("google", { scope: ["profile", "email"] });
    } catch (error) {
      console.error("Error during authentication:", error);
      res.status(500).send("Error logging in");
    }
  };

  export const oAuthCallback = async (req: Request, res: Response) => {
    try {
      passport.authenticate("google", {
        failureRedirect: `${process.env.FRONTEND_URL}/login`,
        successRedirect: `${process.env.FRONTEND_URL}/admin`,
      });
    } catch (error) {
      console.error("Error during OAuth callback:", error);
      res.status(500).send("Error during OAuth callback");
    }
  };

  export const verifyToken = async (req: Request, res: Response) => {
    try {
      const idToken = req.headers.authorization?.split("Bearer ")[1];
      if (!idToken) {
        return res.status(400).send("Token is required");
      }
      const isValidToken = await AuthService.validateToken(idToken);
      if (!isValidToken) {
        return res.status(401).send("Invalid token or user not allowed");
      }

      res.status(200).send();
    } catch (error) {
      console.error("Error verifying token:", error);
      res.status(500).send("Error verifying token");
    }
  };
}
