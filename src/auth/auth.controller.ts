import { Request, Response } from "express";

import { AuthService } from "./auth.service";

export namespace AuthController {
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
      res.status(500).send("Error verifying token");
    }
  };
}
