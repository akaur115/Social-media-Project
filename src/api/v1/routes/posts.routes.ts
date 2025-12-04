/**
 * @file posts.routes.ts
 * @description Routes for post CRUD + upload
 */

import { Router, Request, Response } from "express";
import { upload } from "../middleware/upload.middleware";
import { authRequired } from "../middleware/auth.middleware";
import {
  createPost,
  getAllPosts,
  updatePost,
  deletePost
} from "../controllers/posts.controller";

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Posts
 *   description: Post CRUD operations
 */

/**
 * @swagger
 * /api/v1/posts:
 *   post:
 *     summary: Create a new post (optional image upload)
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
router.post("/", authRequired, upload.single("image"), (req: Request, res: Response) => {
  createPost(req, res);
});

/**
 * @swagger
 * /api/v1/posts:
 *   get:
 *     summary: Get all posts
 *     tags: [Posts]
 *     responses:
 *       200:
 *         description: List of posts
 */
router.get("/", authRequired, (req: Request, res: Response) => {
  getAllPosts(req, res);
});

/**
 * @swagger
 * /api/v1/posts/{id}:
 *   put:
 *     summary: Update a post
 *     tags: [Posts]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: false
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
 *       200:
 *         description: Post updated successfully
 */
router.put("/:id", authRequired, upload.single("image"), (req: Request, res: Response) => {
  updatePost(req, res);
});

/**
 * @swagger
 * /api/v1/posts/{id}:
 *   delete:
 *     summary: Delete a post
 *     tags: [Posts]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: Post deleted
 */
router.delete("/:id", authRequired, (req: Request, res: Response) => {
  deletePost(req, res);
});

export default router;
