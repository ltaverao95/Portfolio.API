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

export const createBlog = async (req: Request, res: Response) => {
  try {
    const newBlog = await BlogService.createBlog(req.body);
    res.status(201).json(newBlog);
  } catch (error) {
    res.status(500).send('Error creating blog');
  }
};
