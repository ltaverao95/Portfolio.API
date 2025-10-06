import { Router } from 'express';
import { authenticate } from '../auth/auth.middleware';
import { createBlog, deleteBlog, deleteBlogs, listBlogs, updateBlog } from './blogs.controller';
import { validateBlogData, validateDeleteBlogs } from './validators/blogs.validator';

const router = Router();

router.get('/blogs', listBlogs);
router.post('/blogs', authenticate, validateBlogData, createBlog);
router.put('/blogs/:id', authenticate, validateBlogData, updateBlog);
router.delete('/blogs/:id', authenticate, deleteBlog);
router.post('/blogs/batch-delete', authenticate, validateDeleteBlogs, deleteBlogs);

export default router;
