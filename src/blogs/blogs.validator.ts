import { Request, Response, NextFunction } from "express";
import { BlogDto } from "./models/blog-dto.model";

export const validateCreateBlog = (
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
      return res
        .status(400)
        .json({
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
