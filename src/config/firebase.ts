import admin from "firebase-admin";
import dotenv from "dotenv";

dotenv.config();

let db: any;
let bucket: any;

if (process.env.NODE_ENV === "test") {
  console.log("Firebase running in MOCK mode");

  const mockDB = {
    collection: jest.fn(() => ({
      doc: jest.fn(() => ({
        get: jest.fn(async () => ({ exists: true, data: () => ({}) })),
        set: jest.fn(async () => true),
        update: jest.fn(async () => true),
        delete: jest.fn(async () => true),
      })),
      get: jest.fn(async () => ({ docs: [] })),
      where: jest.fn(() => ({
        get: jest.fn(async () => ({ docs: [] }))
      }))
    }))
  };

  db = mockDB;
  bucket = {};
} else {
  
  const serviceAccount = {
    project_id: process.env.FIREBASE_PROJECT_ID,
    private_key: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, "\n"),
    client_email: process.env.FIREBASE_CLIENT_EMAIL,
  };

  if (!admin.apps.length) {
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount as admin.ServiceAccount),
      storageBucket: `${process.env.FIREBASE_PROJECT_ID}.appspot.com`,
    });
  }

  db = admin.firestore();
  bucket = admin.storage().bucket();
}

export { db, bucket };
export default admin;
