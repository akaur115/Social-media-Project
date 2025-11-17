/**
 * @file server.ts
 * @description Entry point of the Connectify API backend. Loads environment variables and starts the server.
 */

import dotenv from "dotenv";
import app from "./app";

dotenv.config();

const PORT: number = Number(process.env.PORT) || 4000;

/**
 * Start the Express server and log the running port.
 */
app.listen(PORT, (): void => {
  console.log(`Server running on port ${PORT}`);

});


