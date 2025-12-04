/**
 * Multer Middleware
 * Stores uploaded images in memory for Firebase upload.
 */

import multer, { FileFilterCallback } from "multer";
import { Request } from "express";

const storage = multer.memoryStorage();

/**
 * Only allow image files.
 */
const fileFilter = (
  req: Request,
  file: Express.Multer.File,
  cb: FileFilterCallback
): void => {
  if (!file.mimetype.startsWith("image/")) {
    cb(new Error("Only image files allowed"));
  } else {
    cb(null, true);
  }
};

export const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB max
});
