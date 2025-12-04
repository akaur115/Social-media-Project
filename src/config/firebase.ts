/**
 * @file firebase.ts
 * @description Firebase Admin SDK initialization for Firestore usage.
 */

import admin from "firebase-admin";
import path from "path";

// Load Firebase service account key
const serviceAccountPath = path.resolve("serviceAccountKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccountPath),
});

export const db = admin.firestore();
