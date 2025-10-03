import { Router } from 'express';
import { listBlogs, createBlog, updateBlog } from './blogs.controller';
import { authenticate } from '../auth/auth.middleware';
import { validateBlogDto } from "./validators/blogs.validator";

const router = Router();

router.get('/blogs', authenticate, listBlogs);
router.post('/blogs', authenticate, validateBlogDto, createBlog);
router.put('/blogs/:id', authenticate, validateBlogDto, updateBlog);

export default router;
