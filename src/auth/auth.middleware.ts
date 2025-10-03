import { Request, Response, NextFunction } from "express";
import * as firebaseAdmin from "firebase-admin";

export const authenticate = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const idToken = req.headers.authorization?.split("Bearer ")[1];

  if (!idToken) {
    return res.status(401).send("Unauthorized");
  }

  try {
    const decodedToken = await firebaseAdmin.auth().verifyIdToken(idToken);

    (req as any).user = decodedToken;
    next();
  } catch (error) {
    console.error("Error verifying ID token:", error);
    return res.status(401).send("Unauthorized");
  }
};
