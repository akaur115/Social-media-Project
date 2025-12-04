import { Express } from "express";
import swaggerUi from "swagger-ui-express";
<<<<<<< HEAD
import swaggerJsdoc from "swagger-jsdoc";
=======
import swaggerJSDoc from "swagger-jsdoc";
>>>>>>> dfc3e8372875be2b3d57df70b7e8dc3fa2e22988

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Connectify Social Media API",
      version: "1.0.0",
<<<<<<< HEAD
      description: "API documentation for Connectify, including CRUD operations, authentication, and image upload.",
    },
    servers: [
      {
        url: "http://localhost:4000",
      },
    ],
=======
      description: "API documentation for Posts, Users, and Comments"
    }
>>>>>>> dfc3e8372875be2b3d57df70b7e8dc3fa2e22988
  },

  // Scan all route files for documentation
  apis: ["./src/api/v1/routes/*.ts"],
};

<<<<<<< HEAD
const swaggerSpec = swaggerJsdoc(options);

=======
const swaggerSpec = swaggerJSDoc(options);


>>>>>>> dfc3e8372875be2b3d57df70b7e8dc3fa2e22988
export function setupSwagger(app: Express): void {
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
}
