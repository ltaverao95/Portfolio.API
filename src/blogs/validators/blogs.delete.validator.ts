import { Request, Response, NextFunction } from "express";

/**
 * Validates the request body for batch deleting blog posts.
 * @param req The request object.
 * @param res The response object.
 * @param next The next middleware function.
 */
export const deleteBlogsValidator = (
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