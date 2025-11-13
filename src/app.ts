/**
 * @file app.ts
 * @description Initializes the Connectify API backend with Express and TypeScript.
 * This file configures global middleware, a sample root route, and exports the app instance.
 */

import express, { Application, Request, Response } from "express";
import cors from "cors";
import helmet from "helmet";

import postsRoutes from "./api/v1/routes/posts.routes"


/**
 * @constant {Application} app - Main Express application instance.
 */
const app: Application = express();

/** Apply security and parsing middleware */
app.use(express.json()); 
app.use(cors()); 
app.use(helmet()); 

app.use("/api/posts", postsRoutes);



/**
 * @route GET /
 * @description Root route to confirm the API is working
 * @returns {string} A welcome message
 */
app.get("/", (req: Request, res: Response): void => {
  res.status(200).send("Welcome to Connectify API!");
});

export default app;