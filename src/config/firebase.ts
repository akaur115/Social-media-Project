/**
 * @file firebase.ts
 * @description Firebase Admin SDK configuration + mock mode for Jest tests
 */

import admin from "firebase-admin";
import dotenv from "dotenv";

dotenv.config();

if (process.env.NODE_ENV === "test") {
  console.log("Firebase running in MOCK mode");

  // Mock Firestore
  const mockDB = {
    collection: () => ({
      doc: () => ({
        id: "mock-id",
        set: jest.fn(),
        update: jest.fn(),
        delete: jest.fn(),
        get: jest.fn().mockResolvedValue({
          exists: true,
          data: () => ({})
        })
      }),
      add: jest.fn().mockResolvedValue({ id: "mock-id" }),
      where: () => ({
        get: jest.fn().mockResolvedValue({ docs: [] })
      }),
      get: jest.fn().mockResolvedValue({ docs: [] })
    })
  };

  // Mock admin.auth()
  (admin as any).auth = () => ({
    createUser: jest.fn().mockResolvedValue({ uid: "mock-user" }),
    verifyIdToken: jest.fn().mockResolvedValue({ uid: "mock-user" }),
    deleteUser: jest.fn().mockResolvedValue({})
  });

}


const serviceAccount = {
  project_id: process.env.FIREBASE_PROJECT_ID,
  client_email: process.env.FIREBASE_CLIENT_EMAIL,
  private_key: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, "\n")
};

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount as admin.ServiceAccount),
    storageBucket: `${process.env.FIREBASE_PROJECT_ID}.appspot.com`
  });
}

export const db = admin.firestore();
export const bucket = admin.storage().bucket();
export default admin;
