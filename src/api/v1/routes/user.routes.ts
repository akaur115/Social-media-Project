import { Router } from "express";
import { userController } from "../controllers/user.controller";
import { upload } from "../middleware/multerUpload";

const router = Router();

router.post("/", userController.createUser);
router.get("/:id", userController.getUser);

// Upload profile photo
router.post("/:id/photo", upload.single("image"), userController.uploadPhoto);

export default router;
