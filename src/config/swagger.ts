import { Express } from "express";
import swaggerUi from "swagger-ui-express";
import swaggerJsdoc from "swagger-jsdoc";

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Connectify Social Media API",
      version: "1.0.0",
      description: "API documentation for Connectify, including CRUD operations, authentication, and image upload.",
    },
    servers: [
      {
        url: "http://localhost:4000",
      },
    ],
  },

  // Scan all route files for documentation
  apis: ["./src/api/v1/routes/*.ts"],
};

const swaggerSpec = swaggerJsdoc(options);

export function setupSwagger(app: Express): void {
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
}
