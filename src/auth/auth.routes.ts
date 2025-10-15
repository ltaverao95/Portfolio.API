import { Router } from 'express';
import { AuthController } from './auth.controller';

const router = Router();
    
router.get('/auth/google', AuthController.authenticate);
router.get('/auth/google/callback', AuthController.oAuthCallback);

export default router;
