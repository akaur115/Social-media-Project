import { db } from "../../../config/firebase";

const COMMENTS_COLLECTION = "comments";

export const commentsRepository = {
  async addComment(data: any) {
    const ref = await db.collection(COMMENTS_COLLECTION).add(data);
    return { id: ref.id, ...data };
  },

  async getCommentsByPost(postId: string) {
    const snapshot = await db.collection(COMMENTS_COLLECTION)
      .where("postId", "==", postId)
      .get();

    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  },

  async updateComment(id: string, data: any) {
    await db.collection(COMMENTS_COLLECTION).doc(id).update(data);
    return { id, ...data };
  },

  async deleteComment(id: string) {
    await db.collection(COMMENTS_COLLECTION).doc(id).delete();
    return true;
  }
};
