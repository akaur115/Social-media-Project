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
 * CREATE POST
 */
router.post("/", authRequired, upload.single("image"), (req: Request, res: Response) => {
  createPost(req, res);
});

/**
 * GET ALL POSTS
 */
router.get("/", authRequired, (req: Request, res: Response) => {
  getAllPosts(req, res);
});

/**
 * UPDATE POST
 */
router.put("/:id", authRequired, upload.single("image"), (req: Request, res: Response) => {
  updatePost(req, res);
});

/**
 * DELETE POST
 */
router.delete("/:id", authRequired, (req: Request, res: Response) => {
  deletePost(req, res);
});

export default router;
