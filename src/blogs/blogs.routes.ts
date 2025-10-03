import { Router } from 'express';
import { listBlogs, createBlog, updateBlog, deleteBlog, deleteBlogs } from './blogs.controller';
import { authenticate } from '../auth/auth.middleware';
import { validateBlogData, validateDeleteBlogs } from "./validators/blogs.validator";

const router = Router();

router.get('/blogs', authenticate, listBlogs);
router.post('/blogs', authenticate, validateBlogData, createBlog);
router.put('/blogs/:id', authenticate, validateBlogData, updateBlog);
router.delete('/blogs/:id', authenticate, deleteBlog);
router.post('/blogs/batch-delete', authenticate, validateDeleteBlogs, deleteBlogs);

export default router;
