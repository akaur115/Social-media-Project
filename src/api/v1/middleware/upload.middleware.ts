/**
 * @file upload.middleware.ts
 * @description Multer middleware for handling image uploads.
 */

import multer from "multer";

/**
 * Storage engine for uploaded files
 */
const storage = multer.diskStorage({
  destination: "uploads/",
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

/**
 * Multer configuration with:
 * - 5MB limit
 * - Image-only validation
 */
export const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    if (!file.mimetype.startsWith("image/")) {
      return cb(new Error("Only image files are allowed"));
    }
    cb(null, true);
  },
});
