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
        "API documentation for the Connectify Social Media Platform, including CRUD operations and image upload support.",
    },
    servers: [
      {
        url: "http://localhost:4000",
        description: "Development Server",
      },
    ],

    /**
     * Add paths manually to support file uploads for POST /api/posts
     */
    paths: {
      "/api/posts": {
        post: {
          tags: ["Posts"],
          summary: "Create a post (with optional image upload)",
          requestBody: {
            required: false,
            content: {
              "multipart/form-data": {
                schema: {
                  type: "object",
                  properties: {
                    image: {
                      type: "string",
                      format: "binary",
                    },
                  },
                },
              },
            },
          },
          responses: {
            201: {
              description: "Post created successfully",
            },
            400: {
              description: "Invalid data or image upload failed",
            },
          },
        },

        get: {
          tags: ["Posts"],
          summary: "Get all posts",
          responses: {
            200: {
              description: "List of posts",
            },
          },
        },
      },

      "/api/posts/{id}": {
        put: {
          tags: ["Posts"],
          summary: "Update a post by ID",
          parameters: [
            {
              name: "id",
              in: "path",
              required: true,
              schema: { type: "string" },
              description: "Post ID",
            },
          ],
          responses: {
            200: { description: "Post updated successfully" },
            404: { description: "Post not found" },
          },
        },

        delete: {
          tags: ["Posts"],
          summary: "Delete a post by ID",
          parameters: [
            {
              name: "id",
              in: "path",
              required: true,
              schema: { type: "string" },
              description: "Post ID",
            },
          ],
          responses: {
            200: { description: "Post deleted successfully" },
            404: { description: "Post not found" },
          },
        },
      },
    },
  },

  apis: ["./src/api/v1/routes/*.ts"], // scan for JSDoc annotations in routes
};

const swaggerSpec = swaggerJsdoc(swaggerOptions);

/**
 * Sets up Swagger UI route at /api-docs
 * @param app Express app instance
 */
export function setupSwagger(app: Application): void {
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
}
