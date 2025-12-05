/**
 * @file app.ts
 * @description Initializes the Connectify API backend with Express and TypeScript.
 */

import express, { Express, Request, Response } from "express";
import cors from "cors";
import helmet from "helmet";

import postsRoutes from "./api/v1/routes/posts.routes";
import { setupSwagger } from "./config/swagger";
import userRoutes from "./api/v1/routes/user.routes";
import authRoutes from "./api/v1/routes/auth.routes";
import commentRoutes from "./api/v1/routes/comments.routes";

const app: Express = express();

// Middleware
app.use(express.json());
app.use(cors());
app.use(helmet());

// Routes
app.use("/api/posts", postsRoutes);
app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/v1/comments", commentRoutes);
app.use("/uploads", express.static("uploads"));

// Swagger
setupSwagger(app);

/**
 * @route GET /
 * @description Root route to confirm the API is working
 */
app.get("/", (req: Request, res: Response) => {
  res.status(200).json({ message: "Welcome to Connectify API!" });
});

export default app;
