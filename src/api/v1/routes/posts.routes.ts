/**
 * @file posts.routes.ts
 */

import { Router } from "express";
import {
  createPostController,
  getAllPostsController,
  updatePostController,
  deletePostController,
} from "../controllers/posts.controller";

import { authRequired } from "../middleware/auth.middleware";
import { upload } from "../middleware/upload.middleware";
import { verifyPostOwner } from "../middleware/ownership.middleware";

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Posts
 *   description: Post CRUD with filtering, search, sorting & ownership validation
 */

/**
 * @swagger
 * /api/v1/posts:
 *   get:
 *     summary: Get all posts with filtering, search, and sorting
 *     tags: [Posts]
 *     parameters:
 *       - in: query
 *         name: userId
 *         schema:
 *           type: string
 *         description: Filter posts by user ID
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *         description: Search in title & content
 *       - in: query
 *         name: sort
 *         schema:
 *           type: string
 *           enum: [newest, oldest]
 *         description: Sort posts by creation time
 *     responses:
 *       200:
 *         description: Posts retrieved
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
 *         description: Post created
 */
router.post("/", authRequired, upload.single("image"), createPostController);

/**
 * @swagger
 * /api/v1/posts/{id}:
 *   put:
 *     summary: Update an existing post (Only post owner can update)
 *     tags: [Posts]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *     responses:
 *       200:
 *         description: Post updated
 */
router.put(
  "/:id",
  authRequired,
  verifyPostOwner,
  upload.single("image"),
  updatePostController
);

/**
 * @swagger
 * /api/v1/posts/{id}:
 *   delete:
 *     summary: Delete a post (Only post owner can delete)
 *     tags: [Posts]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *     responses:
 *       204:
 *         description: Post deleted successfully
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
 *         schema:
 *           type: string
 *         description: ID of the post you want to comment on
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
router.post("/:id/comments", authRequired);

export default router;
