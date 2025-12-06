/**
 * @file ownership.middleware.ts
 * @description Middleware to ensure that the authenticated user owns the post.
 */

import { Request, Response, NextFunction } from "express";
import { getPostById } from "../repositories/posts.repository";

export const verifyPostOwner = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const postId = req.params.id;
    const userId = req.user?.uid;

    if (!userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const post = (await getPostById(postId)) as any;

    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    if (post.userId !== userId) {
      return res.status(403).json({ message: "You do not own this post" });
    }

    next();
  } catch (error) {
    console.error("Ownership check failed:", error);
    res.status(500).json({ message: "Server error verifying post ownership" });
  }
};
