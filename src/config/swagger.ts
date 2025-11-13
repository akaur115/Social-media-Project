/**
 * @file swagger.ts
 * @description Configures Swagger (OpenAPI) documentation for the Connectify API.
 */

import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import { Application } from "express";

/**
 * Swagger definition for the Connectify API.
 */
const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Connectify API Documentation",
      version: "1.0.0",
      description:
        "API documentation for Connectify Social Media Platform, including post CRUD operations.",
    },
    servers: [
      {
        url: "http://localhost:4000",
        description: "Development Server",
      },
    ],
  },
  apis: ["./src/api/v1/routes/*.ts"], // path to your route files
};

const swaggerSpec = swaggerJsdoc(swaggerOptions);

/**
 * Sets up Swagger UI route at /api-docs
 * @param app Express app instance
 */
export function setupSwagger(app: Application): void {
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
}
