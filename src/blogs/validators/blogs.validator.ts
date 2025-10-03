import { Request, Response, NextFunction } from "express";
import { BlogDto } from "../models/blog-dto.model";

/**
 * Validates the data for creating or updating a blog post.
 * @param req The request object.
 * @param res The response object.
 * @param next The next middleware function.
 */
export const validateBlogData = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { translations, imageUrl, url, tags }: BlogDto = req.body;

  if (
    !translations ||
    !Array.isArray(translations) ||
    translations.length === 0
  ) {
    return res
      .status(400)
      .json({ message: "Request must include at least one translation." });
  }

  for (const translation of translations) {
    if (!translation.lang || !translation.title || !translation.content) {
      return res.status(400).json({
        message: "Each translation must include lang, title, and content.",
      });
    }
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

  if (!tags || typeof tags !== "string") {
    return res
      .status(400)
      .json({ message: "tags are required and must be a string." });
  }

  next();
};

/**
 * Validates the request body for batch deleting blog posts.
 * @param req The request object.
 * @param res The response object.
 * @param next The next middleware function.
 */
export const validateDeleteBlogs = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { blogIds } = req.body;

  if (!blogIds || !Array.isArray(blogIds) || blogIds.length === 0) {
    return res.status(400).json({
      message: "Request must include a non-empty array of blogIds.",
    });
  }

  next();
};
