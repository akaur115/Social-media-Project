/**
 * @file upload.middleware.ts
 * @description Multer middleware for handling image uploads.

 * @description Multer middleware used to handle image uploads for Connectify posts.
 */

import multer from "multer";

/**
 * Storage engine for uploaded files

 * Storage configuration for Multer.
 * Files are stored inside the "uploads" folder and renamed with a timestamp.
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
  
    cb(null, Date.now() + "-" + file.originalname);
  }
});

/**
 * Multer upload instance with:
 * - 5 MB size limit
 * - Image-only file validation
 */
export const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5 MB limit

  fileFilter: (req, file, cb) => {
    if (!file.mimetype.startsWith("image/")) {
      return cb(new Error("Only image files are allowed"));
    }
    cb(null, true);
  },

  }
});
