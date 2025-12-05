/**
 * @file comments.service.ts
 * @description Service layer for Comment operations on posts
 */

import admin from "firebase-admin";
import { db } from "../../../config/firebase";

const postsRef = db.collection("posts");

export class CommentsService {
  /**
   * Add a comment to a post
   */
  static async addComment(postId: string, userId: string, text: string) {
    try {
      const postDoc = postsRef.doc(postId);
      const postSnapshot = await postDoc.get();

      if (!postSnapshot.exists) {
        throw new Error("Post not found");
      }

      const newComment = {
        id: db.collection("_").doc().id,
        userId,
        text,
        createdAt: Date.now(),
      };

      await postDoc.update({
        comments: admin.firestore.FieldValue.arrayUnion(newComment),
      });

      return newComment;
    } catch (error) {
      console.error("Error adding comment:", error);
      throw error;
    }
  }

  /**
   * Get all comments for a post
   */
  static async getComments(postId: string) {
    const postSnapshot = await postsRef.doc(postId).get();

    if (!postSnapshot.exists) {
      throw new Error("Post not found");
    }

    return postSnapshot.data()?.comments || [];
  }
}
