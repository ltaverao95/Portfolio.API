import { Router } from 'express';
import { AuthController } from './auth.controller';

const router = Router();

router.get('/verify-token', AuthController.verifyToken);

export default router;
