import { Request, Response } from "express";

import { AuthService } from "./auth.service";

export namespace AuthController {
  /**
   * Initiates the authentication process.
   * @param req The request object.
   * @param res The response object.
   */
  export const authenticate = async (req: Request, res: Response) => {
    try {
      const url = AuthService.initiateAuthentication();
      res.redirect(url);
    } catch (error) {
      console.error("Error during authentication:", error);
      res.status(500).send("Error logging in");
    }
  };

  /**
   * Handles the OAuth callback after user authentication.
   * @param req The request object.
   * @param res The response object.
   */
  export const oAuthCallback = async (req: Request, res: Response) => {
    try {
      const { code } = req.query;
      const result = await AuthService.handleOAuthCallback(code.toString());
      res.status(result.status).redirect(result.redirectUrl);
    } catch (error) {
      console.error("Error during OAuth callback:", error);
      res.status(500).send("Error during OAuth callback");
    }
  };

  /**
   * Signs out the user by revoking their credentials.
   * @param req The request object.
   * @param res The response object.
   */
  export const signOut = async (req: Request, res: Response) => {
    try {
      await AuthService.signOut();
      res.status(200).send();
    } catch (error) {
      console.error("Error during sign out:", error);
      res.status(500).send("Error during sign out");
    }
  };
}
