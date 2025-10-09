import { Request, Response, NextFunction } from "express";

import { AuthService } from "./auth.service";

export const authenticate = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const idToken = req.headers.authorization?.split("Bearer ")[1];

    if (!idToken) {
      return res.status(401).send("Unauthorized");
    }

    const decodedToken = await AuthService.validateToken(idToken);
    if (!decodedToken) {
      return res.status(403).send("Forbidden");
    }

    (req as any).user = decodedToken;
    next();
  } catch (error) {
    console.error("Error verifying ID token:", error);
    return res.status(401).send("Unauthorized");
  }
};