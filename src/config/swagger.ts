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

        "API documentation for the Connectify Social Media Platform, including CRUD operations and image upload support.",

    },
    servers: [
      {
        url: "http://localhost:4000",
        description: "Local dev server",
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

  // all route files:
  apis: ["./src/api/v1/routes/*.ts"],


  apis: ["./src/api/v1/routes/*.ts"], 

};

const swaggerSpec = swaggerJsdoc(options);

export function setupSwagger(app: Application): void {
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
}
