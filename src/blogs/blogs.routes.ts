import { Router } from 'express';
import { authenticate, optionalAuthenticate } from '../auth/auth.middleware';
import { createBlog, deleteBlog, deleteBlogs, listBlogs, updateBlog } from './blogs.controller';
import { createBlogDtoValidator } from "./validators/blo.create.validator";
import { updateBlogDtoValidator } from "./validators/blog.update.validator";
import { deleteBlogsValidator } from './validators/blogs.delete.validator';

const router = Router();

router.get('/blogs', optionalAuthenticate, listBlogs);
router.post('/blog', authenticate, createBlogDtoValidator, createBlog);
router.put('/blog/:id', authenticate, updateBlogDtoValidator, updateBlog);
router.delete('/blog/:id', authenticate, deleteBlog);
router.post('/blog/batch-delete', authenticate, deleteBlogsValidator, deleteBlogs);

export default router;
