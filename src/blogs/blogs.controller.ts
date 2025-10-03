import { Request, Response } from 'express';
import { BlogService } from './blogs.service';

export const listBlogs = async (req: Request, res: Response) => {
  try {
    const blogs = await BlogService.getBlogs();
    res.json(blogs);
  } catch (error) {
    res.status(500).send('Error fetching blogs');
  }
};
