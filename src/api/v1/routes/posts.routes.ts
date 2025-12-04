/**
 * @file posts.routes.ts
 * @description Routes for all Post CRUD operations + image upload support.
 */

import { Router } from "express";
import { postsController } from "../controllers/posts.controller";
import { upload } from "../middleware/upload.middleware";

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Posts
 *   description: CRUD operations for social media posts
 */

/**
 * @swagger
 * /api/posts:
 *   get:
 *     summary: Get all posts
 *     tags: [Posts]
 *     responses:
 *       200:
 *         description: List of all posts.
 */
router.get("/", (req, res) => postsController.getAllPosts(req, res));

/**
 * @swagger
 * /api/posts:
 *   post:
 *     summary: Create a new post (supports image upload)
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
 *         description: Post created successfully.
 */
router.post("/", upload.single("image"), (req, res) =>
  postsController.createPost(req, res)
);

/**
 * @swagger
 * /api/posts/{id}:
 *   put:
 *     summary: Update a post by ID
 *     tags: [Posts]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The post ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *     responses:
 *       200:
 *         description: Post updated successfully.
 */
router.put("/:id", (req, res) => postsController.updatePost(req, res));

/**
 * @swagger
 * /api/posts/{id}:
 *   delete:
 *     summary: Delete a post by ID
 *     tags: [Posts]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The post ID
 *     responses:
 *       204:
 *         description: Post deleted successfully.
 */
router.delete("/:id", (req, res) => postsController.deletePost(req, res));

export default router;
