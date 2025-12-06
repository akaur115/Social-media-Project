/**
 * @file comments.routes.ts
 * @description Routes for Comment CRUD operations
 */

import { Router, Request, Response } from "express";
import { authRequired } from "../middleware/auth.middleware";
import {
  createComment,
  getCommentsByPost,
  updateComment,
  deleteComment
} from "../controllers/comments.controller";

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Comments
 *   description: Comment CRUD operations
 */

/**
 * @swagger
 * /api/v1/comments/{postId}:
 *   post:
 *     summary: Add a comment to a post
 *     tags: [Comments]
 *     parameters:
 *       - in: path
 *         name: postId
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               text:
 *                 type: string
 *     responses:
 *       201:
 *         description: Comment added successfully
 */
router.post("/:postId", authRequired, (req: Request, res: Response) => {
  createComment(req, res);
});

/**
 * @swagger
 * /api/v1/comments/{postId}:
 *   get:
 *     summary: Get all comments for a post
 *     tags: [Comments]
 *     parameters:
 *       - in: path
 *         name: postId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: List of comments
 */
router.get("/:postId", authRequired, (req: Request, res: Response) => {
  getCommentsByPost(req, res);
});

/**
 * @swagger
 * /api/v1/comments/{commentId}:
 *   put:
 *     summary: Update a comment
 *     tags: [Comments]
 *     parameters:
 *       - in: path
 *         name: commentId
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               text:
 *                 type: string
 *     responses:
 *       200:
 *         description: Comment updated
 */
router.put("/:commentId", authRequired, (req: Request, res: Response) => {
  updateComment(req, res);
});

/**
 * @swagger
 * /api/v1/comments/{commentId}:
 *   delete:
 *     summary: Delete a comment
 *     tags: [Comments]
 *     parameters:
 *       - in: path
 *         name: commentId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Comment deleted
 */
router.delete("/:commentId", authRequired, (req: Request, res: Response) => {
  deleteComment(req, res);
});

export default router;
