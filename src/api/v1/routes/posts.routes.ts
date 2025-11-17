/**
 * @file posts.routes.ts
 * @description Routes for CRUD operations on posts, including image upload using Multer.
 */

import express, { Router } from "express";
import {
  createPost,
  getAllPosts,
  updatePost,
  deletePost,
} from "../controllers/posts.controller";
import { upload } from "../middleware/upload.middleware";

/** Express Router for post routes */
const router: Router = express.Router();

/**
 * @route POST /api/posts
 * @description Create a new post with an optional image upload
 * @access Public
 */
router.post("/", upload.single("image"), createPost);

/**
 * @route GET /api/posts
 * @description Get all posts
 * @access Public
 */
router.get("/", getAllPosts);

/**
 * @route PUT /api/posts/:id
 * @description Update a post by ID
 * @access Public
 */
router.put("/:id", updatePost);

/**
 * @route DELETE /api/posts/:id
 * @description Delete a post by ID
 * @access Public
 */
router.delete("/:id", deletePost);

export default router;
