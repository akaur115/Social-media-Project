/**
 * @file posts.controller.ts
 * @description Controller for Post CRUD operations using Firestore.
 */

import { Request, Response } from "express";
import { PostsService } from "../services/posts.service";

export const getAllPosts = async (req: Request, res: Response) => {
  const posts = await PostsService.getAllPosts();
  return res.status(200).json(posts);
};

export const createPost = async (req: Request, res: Response) => {
  const { title, content, imageUrl } = req.body;

  const newPost = await PostsService.createPost({
    title,
    content,
    imageUrl: imageUrl || null,
    createdAt: new Date(),
  });

  return res.status(201).json(newPost);
};

export const updatePost = async (req: Request, res: Response) => {
  const { id } = req.params;
  const updatedPost = await PostsService.updatePost(id, req.body);
  return res.status(200).json(updatedPost);
};

export const deletePost = async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await PostsService.deletePost(id);
  return res.status(200).json(result);
};
