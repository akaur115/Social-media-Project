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
 *   description: Advanced Post Operations (CRUD + filtering + sorting)
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
 *         description: Filter posts by userId
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *         description: Search keyword in title or content
 *       - in: query
 *         name: sort
 *         schema:
 *           type: string
 *           enum: [asc, desc]
 *         description: Sort posts by created date
 *     responses:
 *       200:
 *         description: List of filtered/sorted posts
 */
router.get("/", authRequired, getAllPostsController);

/**
 * @swagger
 * /api/v1/posts:
 *   post:
 *     summary: Create new post
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
 *     summary: Update your post
 *     tags: [Posts]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *     responses:
 *       200:
 *         description: Updated successfully
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
 *     summary: Delete your post
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

export default router;
