/**
 * User Model - Social Media API
 * Represents the structure of a user stored in Firestore.
 */
export interface User {
  id?: string;
  username: string;
  email: string;
  password: string;
  role: "user" | "admin";
  photoUrl?: string;
  createdAt: number;
}
