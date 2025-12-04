/**
 * @file posts.routes.ts
 * @description Routes for Post CRUD operations + image upload + authentication middleware.
 */

import { Router } from "express";
import {
  createPost,
  getAllPosts,
  updatePost,
  deletePost,
} from "../controllers/posts.controller";
import { upload } from "../middleware/upload.middleware";
import { authRequired } from "../middleware/auth.middleware";

const router: Router = Router();

/**
 * @route POST /api/posts
 * @description Create a post (with optional image)
 */
router.post("/", authRequired, upload.single("image"), createPost);

/**
 * @route GET /api/posts
 * @description Retrieve all posts
 */
router.get("/", authRequired, getAllPosts);

/**
 * @route PUT /api/posts/:id
 * @description Update a specific post
 */
router.put("/:id", authRequired, updatePost);

/**
 * @route DELETE /api/posts/:id
 * @description Delete a specific post
 */
router.delete("/:id", authRequired, deletePost);

export default router;
