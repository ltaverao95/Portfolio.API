import { Router } from 'express';
import { listBlogs } from './blogs.controller';
import { authenticate } from '../auth/auth.middleware';

const router = Router();

router.get('/blogs', authenticate, listBlogs);

export default router;
