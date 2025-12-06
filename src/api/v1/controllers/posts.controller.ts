/**
 * @file posts.controller.ts
 * @description Controller for Post CRUD + filtering/sorting + comments
 */

import { Request, Response } from "express";
import { PostsService } from "../services/posts.service";
import { CommentsService } from "../services/comments.service"; 

/**
 * Get all posts with optional filtering & sorting
 */
export const getAllPostsController = async (req: Request, res: Response) => {
  try {
    const { userId, search, sort } = req.query;

    const posts = await PostsService.getAllPosts({
      userId: userId as string,
      search: search as string,
      sort: sort as string,
    });

    return res.status(200).json(posts);
  } catch (error) {
    console.error("Error fetching posts:", error);
    return res.status(500).json({ message: "Failed to get posts" });
  }
};

/**
 * Create a new post
 */
export const createPostController = async (req: Request, res: Response) => {
  try {
    const userId = req.user?.uid;

    const postData = {
      title: req.body.title,
      content: req.body.content,
      userId,
      imageUrl: req.file ? req.file.path : null,
      createdAt: Date.now(),
    };

    const newPost = await PostsService.createPost(postData);

    return res.status(201).json(newPost);
  } catch (error) {
    console.error("Create Post Error:", error);
    return res.status(500).json({ message: "Failed to create post" });
  }
};

/**
 * Update an existing post
 */
export const updatePostController = async (req: Request, res: Response) => {
  try {
    const postId = req.params.id;

    const updatedData = {
      title: req.body.title,
      content: req.body.content,
      imageUrl: req.file ? req.file.path : undefined,
    };

    const updated = await PostsService.updatePost(postId, updatedData);

    return res.status(200).json(updated);
  } catch (error) {
    console.error("Update Post Error:", error);
    return res.status(500).json({ message: "Failed to update post" });
  }
};

/**
 * Delete a post
 */
export const deletePostController = async (req: Request, res: Response) => {
  try {
    const postId = req.params.id;

    await PostsService.deletePost(postId);

    return res.status(204).send();
  } catch (error) {
    console.error("Delete Post Error:", error);
    return res.status(500).json({ message: "Failed to delete post" });
  }
};

/**
 * @description Add a comment to a post
 */
export const addCommentController = async (req: Request, res: Response) => {
  try {
    const postId = req.params.id;
    const userId = req.user?.uid;
    const { text } = req.body;

    if (!text) {
      return res.status(400).json({ message: "Comment text is required" });
    }

    const comment = await CommentsService.addComment(
      postId,
      userId!,
      text
    );

    return res.status(201).json({
      message: "Comment added",
      data: comment,
    });
  } catch (error) {
    console.error("Add Comment Error:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
