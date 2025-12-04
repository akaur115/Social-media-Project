import { db } from "../../../config/firebase";
import { User } from "../models/user.model";

const usersRef = db.collection("users");

/**
 * Creates a new user document in Firestore.
 */
export async function createUser(data: User): Promise<User> {
  const docRef = await usersRef.add({
    ...data,
    createdAt: Date.now(),
  });

  return { id: docRef.id, ...data };
}

/**
 * Retrieves a user by Firestore ID.
 */
export async function getUserById(id: string): Promise<User | null> {
  const doc = await usersRef.doc(id).get();
  if (!doc.exists) return null;

  return { id: doc.id, ...(doc.data() as User) };
}

/**
 * Updates a user's profile photo URL.
 */
export async function updateUserPhoto(id: string, url: string): Promise<void> {
  await usersRef.doc(id).update({ photoUrl: url });
}
