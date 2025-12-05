import { Request, Response } from "express";
import {
  addComment,
  getPostComments,
  editComment,
  removeComment
} from "../repositories/comments.repository";

export const createComment = async (req: Request, res: Response) => {
  try {
    const postId = req.params.postId;
    const { text } = req.body;
    const userId = req.user?.uid;

    const comment = await addComment(postId, userId!, text);

    res.status(201).json({ message: "Comment created", comment });
  } catch (error) {
    res.status(500).json({ error: "Failed to create comment" });
  }
};

export const getCommentsByPost = async (req: Request, res: Response) => {
  try {
    const postId = req.params.postId;
    const comments = await getPostComments(postId);

    res.status(200).json(comments);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch comments" });
  }
};

export const updateComment = async (req: Request, res: Response) => {
  try {
    const commentId = req.params.commentId;
    const { text } = req.body;

    const updated = await editComment(commentId, text);

    res.status(200).json(updated);
  } catch (error) {
    res.status(500).json({ error: "Failed to update comment" });
  }
};

export const deleteComment = async (req: Request, res: Response) => {
  try {
    const commentId = req.params.commentId;

    await removeComment(commentId);

    res.status(200).json({ message: "Comment deleted" });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete comment" });
  }
};
