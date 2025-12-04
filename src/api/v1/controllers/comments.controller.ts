import { Request, Response } from "express";
import { commentsRepository } from "../repositories/comments.repository";

export const commentsController = {
  async create(req: Request, res: Response) {
    try {
      const comment = await commentsRepository.addComment(req.body);
      res.status(201).json(comment);
    } catch {
      res.status(500).json({ error: "Failed to add comment" });
    }
  },

  async getByPost(req: Request, res: Response) {
    try {
      const comments = await commentsRepository.getCommentsByPost(req.params.postId);
      res.json(comments);
    } catch {
      res.status(500).json({ error: "Failed to get comments" });
    }
  },

  async update(req: Request, res: Response) {
    try {
      const comment = await commentsRepository.updateComment(req.params.id, req.body);
      res.json(comment);
    } catch {
      res.status(500).json({ error: "Failed to update comment" });
    }
  },

  async delete(req: Request, res: Response) {
    try {
      await commentsRepository.deleteComment(req.params.id);
      res.status(204).send();
    } catch {
      res.status(500).json({ error: "Failed to delete comment" });
    }
  }
};
