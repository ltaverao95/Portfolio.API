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

    const userId = await AuthService.validateToken(idToken);
    if (!userId) {
      return res.status(401).send("Unauthorized");
    }

    (req as any).user = { id: userId };
    next();
  } catch (error) {
    console.error("Error verifying ID token:", error);
    return res.status(401).send("Unauthorized");
  }
};

export const optionalAuthenticate = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const idToken = req.headers.authorization?.split("Bearer ")[1];
    if (!idToken) {
      return next();
    }

    const userId = await AuthService.validateToken(idToken);
    if (!userId) {
      return res.status(401).send("Unauthorized");
    }

    (req as any).user = { id: userId };
    next();
  } catch (error) {
    console.error("Error verifying ID token:", error);
    return res.status(401).send("Unauthorized");
  }
};