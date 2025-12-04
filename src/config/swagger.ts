import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import { Application } from "express";

const options: swaggerJsdoc.Options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Connectify Social Media API",
      version: "1.0.0",
      description:
        "Backend API for Connectify. Includes posts, users, comments and file uploads.",
    },
    servers: [
      {
        url: "http://localhost:4000",
        description: "Local dev server",
      },
    ],
  },
  // all route files:
  apis: ["./src/api/v1/routes/*.ts"],
};

const swaggerSpec = swaggerJsdoc(options);

export function setupSwagger(app: Application): void {
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
}
