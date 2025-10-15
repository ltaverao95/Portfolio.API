import { Request, Response } from "express";
import { BlogService } from "./blogs.service";

export const listBlogs = async (req: Request, res: Response) => {
  try {
    const blogs = await BlogService.getBlogs();
    res.status(200).send(blogs);
  } catch (error) {
    res.status(500).send("Error fetching blogs");
  }
};

export const createBlog = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user.id;
    const newBlog = await BlogService.createBlog(userId, req.body);
    res.status(201).json(newBlog);
  } catch (error) {
    res.status(500).send("Error creating blog");
  }
};

/**
 * Updates an existing blog post.
 * @param req The request object.
 * @param res The response object.
 */
export const updateBlog = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const userId = (req as any).user.id;
    const updatedBlog = await BlogService.updateBlog(id, req.body, userId);
    res.json(updatedBlog);
  } catch (error: any) {
    if (error.message === "Blog not found") {
      return res.status(404).send(error.message);
    }
    if (error.message === "User is not the author of this blog") {
      return res.status(403).send(error.message);
    }
    res.status(500).send("Error updating blog");
  }
};

/**
 * Deletes a blog post.
 * @param req The request object.
 * @param res The response object.
 */
export const deleteBlog = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const userId = (req as any).user.id;
    await BlogService.deleteBlogById(id, userId);
    res.status(204).send();
  } catch (error: any) {
    if (error.message === "Blog not found") {
      return res.status(404).send(error.message);
    }
    if (error.message === "User is not the author of this blog") {
      return res.status(403).send(error.message);
    }
    res.status(500).send("Error deleting blog");
  }
};

/**
 * Deletes multiple blog posts in a batch.
 * @param req The request object.
 * @param res The response object.
 */
export const deleteBlogs = async (req: Request, res: Response) => {
  try {
    const { blogIds } = req.body;
    const userId = (req as any).user.id;
    await BlogService.deleteBlogs(blogIds, userId);
    res.status(204).send();
  } catch (error: any) {
    if (error.message.includes("not found")) {
      return res.status(404).send(error.message);
    }
    if (error.message.includes("not the author")) {
      return res.status(403).send(error.message);
    }
    res.status(500).send("Error deleting blogs");
  }
};
