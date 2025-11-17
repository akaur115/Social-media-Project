/**
 * @file app.ts
 * @description Initializes the Connectify API backend with Express and TypeScript.
 */

import express, { Application, Request, Response } from "express";
import cors from "cors";
import helmet from "helmet";

import postsRoutes from "./api/v1/routes/posts.routes";
import { setupSwagger } from "./config/swagger";

const app: Application = express();

// Middleware
app.use(express.json());
app.use(cors());
app.use(helmet());

// Routes
app.use("/api/posts", postsRoutes);

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
