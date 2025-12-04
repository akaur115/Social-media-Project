import multer from "multer";

/**
 * Storage engine for uploaded files
 */
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  }
});

/**
 * File filter → allow only images
 */
function imageFilter(req: Express.Request, file: Express.Multer.File, cb: multer.FileFilterCallback) {
  if (!file.mimetype.startsWith("image/")) {
    return cb(new Error("Only image files allowed"));
  }
  cb(null, true);
}

/**
 * Multer upload config
 */
export const upload = multer({
  storage,
  fileFilter: imageFilter,
  limits: { fileSize: 5 * 1024 * 1024 } // 5MB
});
