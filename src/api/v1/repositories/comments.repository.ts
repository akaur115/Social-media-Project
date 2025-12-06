import { db } from "../../../config/firebase";
import { QueryDocumentSnapshot } from "firebase-admin/firestore";

/**
 * Add a new comment
 */
export const addComment = async (postId: string, userId: string, text: string) => {
  const ref = db.collection("comments").doc();

  const comment = {
    id: ref.id,
    postId,
    userId,
    text,
    createdAt: new Date().toISOString(),
  };

  await ref.set(comment);
  return comment;
};

/**
 * Get comments for a post
 */
export const getPostComments = async (postId: string) => {
  const snapshot = await db
    .collection("comments")
    .where("postId", "==", postId)
    .get();

  return snapshot.docs.map((doc: QueryDocumentSnapshot) => ({
    id: doc.id,
    ...doc.data(),
  }));
};

/**
 * Edit comment
 */
export const editComment = async (commentId: string, text: string) => {
  const ref = db.collection("comments").doc(commentId);
  await ref.update({ text });
  return { id: commentId, text };
};

/**
 * Delete comment
 */
export const removeComment = async (commentId: string) => {
  await db.collection("comments").doc(commentId).delete();
};
