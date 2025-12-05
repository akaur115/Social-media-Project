/**
 * @file posts.repository.ts
 */

import { db } from "../../../config/firebase";

const postsCollection = db.collection("posts");

export class PostsRepository {
  static async getAll(filters?: any) {
    const snapshot = await postsCollection.get();
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  }

  static async create(data: Record<string, unknown>) {
    const ref = await postsCollection.add(data);
    return { id: ref.id, ...data };
  }

  static async update(id: string, data: Record<string, unknown>) {
    await postsCollection.doc(id).update(data);
    const updated = await postsCollection.doc(id).get();
    return { id, ...updated.data() };
  }

  static async delete(id: string) {
    await postsCollection.doc(id).delete();
    return { message: "Post deleted successfully" };
  }
}

export const getPostById = async (postId: string) => {
  const postSnap = await postsCollection.doc(postId).get();
  return postSnap.exists ? { id: postSnap.id, ...postSnap.data() } : null;
};
