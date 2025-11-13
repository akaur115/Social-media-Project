/**
 * @file posts.controller.ts
 * @description Controller logic for CRUD operations on social media posts.
 */

import { Request, Response } from "express";

/**
 * @typedef {Object} Post
 * @property {string} id - Unique post identifier.
 * @property {string} title - Title of the post.
 * @property {string} content - Post body content.
 */
interface Post {
  id: string;
  title: string;
  content: string;
}

/** In-memory array simulating database */
const posts: Post[] = [];

/**
 * @route POST /api/posts
 * @description Create a new post
 */
export const createPost = (req: Request, res: Response): void => {
  const { title, content } = req.body;

  if (!title || !content) {
    res.status(400).json({ message: "Title and content are required." });
    return;
  }

  const newPost: Post = {
    id: (posts.length + 1).toString(),
    title,
    content,
  };

  posts.push(newPost);
  res.status(201).json({
    message: "Post created successfully",
    data: newPost,
  });
};

/**
 * @route GET /api/posts
 * @description Fetch all posts
 */
export const getAllPosts = (req: Request, res: Response): void => {
  res.status(200).json({
    message: "Fetched all posts successfully",
    data: posts,
  });
};

/**
 * @route PUT /api/posts/:id
 * @description Update an existing post by ID
 */
export const updatePost = (req: Request, res: Response): void => {
  const { id } = req.params;
  const { title, content } = req.body;

  const index = posts.findIndex((p) => p.id === id);
  if (index === -1) {
    res.status(404).json({ message: "Post not found." });
    return;
  }

  posts[index] = { ...posts[index], title, content };
  res.status(200).json({
    message: "Post updated successfully",
    data: posts[index],
  });
};

/**
 * @route DELETE /api/posts/:id
 * @description Delete a post by ID
 */
export const deletePost = (req: Request, res: Response): void => {
  const { id } = req.params;
  const index = posts.findIndex((p) => p.id === id);

  if (index === -1) {
    res.status(404).json({ message: "Post not found." });
    return;
  }

  const deleted = posts.splice(index, 1);
  res.status(200).json({
    message: "Post deleted successfully",
    data: deleted,
  });
};
