import express, { Router } from "express";
import { getAllPosts, createPost, updatePost, deletePost } from "../controllers/posts.controller";

const router: Router = express.Router();

router.get("/", getAllPosts);
router.post("/", createPost);
router.put("/:id", updatePost);
router.delete("/:id", deletePost);

export default router;
