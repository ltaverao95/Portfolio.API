import { Request, Response, NextFunction } from "express";
import { CreateBlogDto } from "../models/create-blog-dto";

/**
 * Validates the data for creating or updating a blog post.
 * @param req The request object.
 * @param res The response object.
 * @param next The next middleware function.
 */

export const createBlogDtoValidator = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { title, content, imageUrl, url, tags }: CreateBlogDto = req.body;

  if (!title || typeof title !== "object" || Object.keys(title).length === 0) {
    return res.status(400).json({ message: "Title is required." });
  }

  if (
    !content ||
    typeof content !== "object" ||
    Object.keys(content).length === 0
  ) {
    return res.status(400).json({ message: "Content is required." });
  }

  if (!imageUrl || typeof imageUrl !== "string") {
    return res
      .status(400)
      .json({ message: "imageUrl is required and must be a string." });
  }

  if (!url || typeof url !== "string") {
    return res
      .status(400)
      .json({ message: "url is required and must be a string." });
  }

  if (!tags || !Array.isArray(tags) || tags.length === 0) {
    return res
      .status(400)
      .json({ message: "tags are required and must be an array." });
  }

  next();
};
