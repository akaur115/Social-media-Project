import admin from "firebase-admin";

const serviceAccount = require("../../serviceAccountKey.json");

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    storageBucket: "social-media-api.appspot.com", 
  });
}

export const db = admin.firestore();
export const bucket = admin.storage().bucket();
