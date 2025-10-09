import { Router } from 'express';
import { AuthController } from './auth.controller';

const router = Router();

router.get('/google', AuthController.authenticate);
router.get('/google/callback', AuthController.oauthCallback);
router.get('/verify-token', AuthController.verifyToken);

export default router;
