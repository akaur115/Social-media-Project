/**
 * @file posts.repository.ts
 * @description Repository layer for handling Firestore operations for Posts.
 */

import { db } from "../../../config/firebase";

const collection = db.collection("posts");

export class PostsRepository {
  static async getAll() {
    const snapshot = await collection.get();
    return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  }

  static async create(data: Record<string, unknown>) {
    const ref = await collection.add(data);
    return { id: ref.id, ...data };
  }

  static async update(id: string, data: Record<string, unknown>) {
    await collection.doc(id).update(data);
    const updated = await collection.doc(id).get();
    return { id, ...updated.data() };
  }

  static async delete(id: string) {
    await collection.doc(id).delete();
    return { message: "Post deleted successfully" };
  }
}
