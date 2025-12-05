/**
 * @file posts.routes.ts
 * @description Routes for creating, reading, updating, deleting posts + filtering, sorting & comments.
 */

import { Router } from "express";
import {
  createPostController,
  getAllPostsController,
  updatePostController,
  deletePostController,
  addCommentController
} from "../controllers/posts.controller";
import { authRequired } from "../middleware/auth.middleware";
import { upload } from "../middleware/upload.middleware";
import { verifyPostOwner } from "../middleware/ownership.middleware";

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Posts
 *   description: CRUD operations, filtering, sorting & ownership validation
 */

/**
 * @swagger
 * /api/v1/posts:
 *   get:
 *     summary: Get all posts (supports filtering, sorting & search)
 *     tags: [Posts]
 *     parameters:
 *       - in: query
 *         name: userId
 *         schema:
 *           type: string
 *         description: Filter by user ID
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *         description: Keyword search in title/content
 *       - in: query
 *         name: sort
 *         schema:
 *           type: string
 *           enum: [newest, oldest]
 *         description: Sort posts by date
 *     responses:
 *       200:
 *         description: List of posts
 */
router.get("/", authRequired, getAllPostsController);

/**
 * @swagger
 * /api/v1/posts:
 *   post:
 *     summary: Create a new post
 *     tags: [Posts]
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               content:
 *                 type: string
 *               image:
 *                 type: string
 *                 format: binary
 *     responses:
 *       201:
 *         description: Post created successfully
 */
router.post("/", authRequired, upload.single("image"), createPostController);

/**
 * @swagger
 * /api/v1/posts/{id}:
 *   put:
 *     summary: Update a post (owner only)
 *     tags: [Posts]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *     responses:
 *       200:
 *         description: Post updated
 */
router.put("/:id", authRequired, verifyPostOwner, upload.single("image"), updatePostController);

/**
 * @swagger
 * /api/v1/posts/{id}:
 *   delete:
 *     summary: Delete a post (owner only)
 *     tags: [Posts]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *     responses:
 *       204:
 *         description: Post deleted
 */
router.delete("/:id", authRequired, verifyPostOwner, deletePostController);

/**
 * @swagger
 * /api/v1/posts/{id}/comments:
 *   post:
 *     tags: [Comments]
 *     summary: Add a comment to a post
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             properties:
 *               text:
 *                 type: string
 *     responses:
 *       201:
 *         description: Comment added
 */
router.post("/:id/comments", authRequired, addCommentController);

export default router;
