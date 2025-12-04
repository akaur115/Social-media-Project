import { Router } from "express";
import { commentsController } from "../controllers/comments.controller";

const router = Router();

router.post("/", commentsController.create);
router.get("/:postId", commentsController.getByPost);
router.put("/:id", commentsController.update);
router.delete("/:id", commentsController.delete);

export default router;
