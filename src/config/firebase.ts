/**
 * @file firebase.ts
 * @description Firebase Admin SDK initialization for Firestore + Storage.
 */

import admin from "firebase-admin";
import path from "path";

// Load service account key
const serviceAccountPath = path.resolve(
  __dirname,
  "../../serviceAccountKey.json"
);

const serviceAccount = require(serviceAccountPath);

// Initialize Firebase Admin if not already initialized
if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    storageBucket: "social-media-api.appspot.com",
  });
}

// Firestore + Storage references
export const db = admin.firestore();
export const bucket = admin.storage().bucket();
