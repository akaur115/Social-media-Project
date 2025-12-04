import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import { Application } from "express";

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Social Media API",
      version: "1.0.0",
      description: "API documentation for Social Media project"
    }
  },
  apis: ["./src/api/v1/routes/*.ts"]
};

export const swaggerSpec = swaggerJsdoc(options);

export function swaggerDocs(app: Application) {
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
}
