/**
 * @file swagger.ts
 * @description Swagger / OpenAPI configuration for Connectify API
 */

import { Express } from "express";
import swaggerUi from "swagger-ui-express";
import swaggerJsdoc from "swagger-jsdoc";

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Connectify Social Media API",
      version: "1.0.0",
      description:
        "API documentation for Connectify — including authentication, posts, comments, admin routes, filtering, sorting, and file uploads.",
    },

    servers: [
      {
        url: "http://localhost:4000",
      },
    ],

    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },

      schemas: {
        Post: {
          type: "object",
          properties: {
            id: { type: "string" },
            title: { type: "string" },
            content: { type: "string" },
            userId: { type: "string" },
            imageUrl: { type: "string" },
          },
        },

        Comment: {
          type: "object",
          properties: {
            id: { type: "string" },
            postId: { type: "string" },
            userId: { type: "string" },
            text: { type: "string" }
          }
        },

        User: {
          type: "object",
          properties: {
            id: { type: "string" },
            email: { type: "string" },
            role: { type: "string", enum: ["admin", "user"] }
          }
        }
      }
    },

    // Require JWT on routes unless explicitly disabled
    security: [
      {
        bearerAuth: [],
      },
    ],
  },

  // Scan ALL route files for Swagger JSDoc
  apis: ["./src/api/v1/routes/*.ts", "./src/api/v1/controllers/*.ts"],
};

const swaggerSpec = swaggerJsdoc(options);

export function setupSwagger(app: Express): void {
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
}
