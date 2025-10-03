import { Router } from 'express';
import { listBlogs } from './blogs.controller';

const router = Router();

router.get('/blogs', listBlogs);

export default router;
