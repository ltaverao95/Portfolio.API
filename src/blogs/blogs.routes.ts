import { Router } from 'express';
import { listBlogs, createBlog } from './blogs.controller';
import { authenticate } from '../auth/auth.middleware';
import { validateCreateBlog } from "./blogs.validator";

const router = Router();

router.get('/blogs', authenticate, listBlogs);
router.post('/blogs', authenticate, validateCreateBlog, createBlog);

export default router;
