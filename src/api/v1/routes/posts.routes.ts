/**
 * @file posts.routes.ts
 * @description Defines the routes for CRUD operations on posts.
 */

import express, { Router } from "express";
import {
  createPost,
  getAllPosts,
  updatePost,
  deletePost,
} from "../controllers/posts.controller";

/** Express Router for post routes */
const router: Router = express.Router();

/** @route POST /api/posts - Create a new post */
router.post("/", createPost);

/** @route GET /api/posts - Get all posts */
router.get("/", getAllPosts);

/** @route PUT /api/posts/:id - Update post by ID */
router.put("/:id", updatePost);

/** @route DELETE /api/posts/:id - Delete post by ID */
router.delete("/:id", deletePost);

export default router;
