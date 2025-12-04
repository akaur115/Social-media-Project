import { Express } from "express";
import swaggerUi from "swagger-ui-express";
import swaggerJSDoc from "swagger-jsdoc";

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Social Media API",
      version: "1.0.0",
      description: "API documentation for Posts, Users, and Comments"
    }
  },
  apis: ["./src/api/v1/routes/*.ts"]
};

const swaggerSpec = swaggerJSDoc(options);


export function setupSwagger(app: Express): void {
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
}
