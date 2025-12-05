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
import { getAllUsers } from "../controllers/user.controller";


const router = Router();

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: Authentication, profiles & admin operations
 */

/**
 * @swagger
 * /api/v1/users/register:
 *   post:
 *     summary: Register a new user
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       201:
 *         description: User registered
 */
router.post("/register", registerUser);

/**
 * @swagger
 * /api/v1/users/login:
 *   post:
 *     summary: Login
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: Login successful
 */
router.post("/login", loginUser);

router.get("/", authRequired, getAllUsers); 
/**
 * @swagger
 * /api/v1/users/{id}:
 *   get:
 *     summary: Get user profile
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *     responses:
 *       200:
 *         description: User profile returned
 */
router.get("/:id", authRequired, getUserProfile);

/**
 * @swagger
 * /api/v1/users/{id}/photo:
 *   post:
 *     summary: Upload profile photo
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               image:
 *                 type: string
 *                 format: binary
 *     responses:
 *       200:
 *         description: Photo uploaded
 */
router.post("/:id/photo", authRequired, upload.single("image"), uploadPhoto);

/**
 * @swagger
 * /api/v1/users/{id}:
 *   delete:
 *     summary: Delete user (Admin only)
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *     responses:
 *       200:
 *         description: User deleted
 */
router.delete("/:id", authRequired, adminOnly, deleteUser);


export default router;
