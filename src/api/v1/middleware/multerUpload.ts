/**
 * Multer Middleware
 * Stores uploaded images locally inside /uploads folder.
 */

import multer from "multer";
import path from "path";

// Storage settings for local uploads
const storage = multer.diskStorage({
  destination: "uploads/", 
  filename: (req, file, cb) => {
    const uniqueName = Date.now() + "-" + file.originalname;
    cb(null, uniqueName);
  },
});

// Allow only image files
const fileFilter = (req: any, file: Express.Multer.File, cb: any) => {
  if (!file.mimetype.startsWith("image/")) {
    return cb(new Error("Only image files allowed"));
  }
  cb(null, true);
};

// Export upload middleware
export const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 5 * 1024 * 1024 }, 
});
