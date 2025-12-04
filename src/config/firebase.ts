import admin from "firebase-admin";
import path from "path";

const serviceAccountPath = path.join(__dirname, "../../serviceAccountKey.json");

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccountPath),
    storageBucket: "social-media-api.appspot.com"
  });
}

export const db = admin.firestore();
export const bucket = admin.storage().bucket();
