import { db } from "../../../config/firebase";
import { User } from "../models/user.model";

const usersRef = db.collection("users");

/**
 * Create a new user in Firestore
 */
export async function createUser(data: User): Promise<User> {
  const docRef = usersRef.doc(); 

  const userToSave = {
    id: docRef.id,
    username: data.username,
    email: data.email,
    password: data.password,   
    role: data.role || "user",
    createdAt: Date.now(),
  };

  await docRef.set(userToSave);

  return userToSave;
}

/**
 * Get user by email
 */
export async function getUserByEmail(email: string): Promise<User | null> {
  const snapshot = await usersRef.where("email", "==", email).limit(1).get();
  if (snapshot.empty) return null;

  const doc = snapshot.docs[0];
  return doc.data() as User;
}

/**
 * Get user by document ID
 */
export async function getUserById(id: string): Promise<User | null> {
  const doc = await usersRef.doc(id).get();
  if (!doc.exists) return null;

  return doc.data() as User;
}

/**
 * Update user photo URL
 */
export async function updateUserPhoto(id: string, url: string): Promise<void> {
  await usersRef.doc(id).update({ photoUrl: url });
}
