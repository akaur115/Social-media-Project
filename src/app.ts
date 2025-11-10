/**
 * @file app.ts
 * @description Initializes the Connectify backend using Express and TypeScript.
 * This file sets up global middleware, a basic root route, and exports the configured app instance.
 */

import express, { Application, Request, Response } from "express";
import cors from "cors";
import helmet from "helmet";

/**
 * @constant {Application} app - Express application instance.
 */
const app: Application = express();

/** Apply global middleware */
app.use(express.json()); 
app.use(cors()); 
app.use(helmet()); 

/**
 * @route GET /
 * @description Basic route for testing the server connection
 * @returns {string} Welcome message
 */
app.get("/", (req: Request, res: Response): void => {
  res.status(200).send("Welcome to Connectify API!");
});

export default app;
