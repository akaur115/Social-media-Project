/**
 * @file user.routes.ts
 * @description User routes with authentication + admin restriction
 */

import { Router } from "express";
import { authRequired } from "../middleware/auth.middleware";
import { adminOnly } from "../middleware/admin.middleware";
import { upload } from "../middleware/multerUpload";

import {
  registerUser,
  loginUser,
  getUserProfile,
  uploadPhoto,
  deleteUser
} from "../controllers/user.controller";

const router = Router();

/**
 * Register User
 */
router.post("/register", registerUser);

/**
 * Login User
 */
router.post("/login", loginUser);

/**
 * Get user profile
 */
router.get("/:id", authRequired, getUserProfile);

/**
 * Upload profile photo
 */
router.post("/:id/photo", authRequired, upload.single("image"), uploadPhoto);

/**
 * Delete user (ADMIN ONLY)
 */
router.delete("/:id", authRequired, adminOnly, deleteUser);

export default router;
