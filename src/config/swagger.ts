/**
 * @file swagger.ts
 * @description Configures Swagger (OpenAPI) documentation for the Connectify API.
 */

import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import { Express } from "express";

/**
 * Swagger definition object for Connectify API.
 */
const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Connectify API Documentation",
      version: "1.0.0",
      description:
        "API documentation for the Connectify Social Media Platform. Includes basic CRUD operations for posts and system overview.",
      contact: {
        name: "Arshpreet",
        email: "arshpreetb417@gmail.com",
      },
    },
    servers: [
      {
        url: "http://localhost:4000",
        description: "Development server",
      },
    ],
  },
  apis: ["./src/api/v1/routes/*.ts"],
};

export const swaggerSpec = swaggerJsdoc(swaggerOptions);

/**
 * Registers the Swagger UI route.
 * @param app Express application instance
 */
export const setupSwagger = (app: Express): void => {
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
};
