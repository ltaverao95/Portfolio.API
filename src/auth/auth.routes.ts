import { Router } from "express";
import { AuthController } from "./auth.controller";
import { authenticate } from "./auth.middleware";

const router = Router();

router.get("/auth/google", AuthController.authenticate);
router.get("/auth/google/callback", AuthController.oAuthCallback);
router.post("/auth/google/signout", authenticate, AuthController.signOut);

export default router;
