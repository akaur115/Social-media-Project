/**
 *Firebase admin setup for Firestore and Auth.
 */

import admin from "firebase-admin";
import dotenv from "dotenv";

dotenv.config();

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.applicationDefault(),
    projectId: process.env.FIREBASE_PROJECT_ID,
  });
}

export const db = admin.firestore();
export const auth = admin.auth();
