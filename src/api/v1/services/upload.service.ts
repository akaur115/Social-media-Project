/**
 * Upload Service - Firebase Storage
 */

import { bucket } from "../../../config/firebase";
import { v4 as uuidv4 } from "uuid";
import { Express } from "express";
import multer from "multer";
/**
 * Uploads buffer to Firebase Storage and returns a public URL.
 */
export async function uploadToStorage(
  file: Express.Multer.File,
  folder: string
): Promise<string> {
  const filename = `${folder}/${uuidv4()}-${file.originalname}`;
  const fileUpload = bucket.file(filename);

  await fileUpload.save(file.buffer, {
    metadata: { contentType: file.mimetype },
  });

  return `https://storage.googleapis.com/${bucket.name}/${filename}`;
}
