/**
 * @file posts.service.ts
 * @description Service layer that handles business logic for Post operations.
 */

import { PostsRepository } from "../repositories/posts.repository";

export class PostsService {
  static async getAllPosts() {
    return await PostsRepository.getAll();
  }

  static async createPost(data: Record<string, unknown>) {
    return await PostsRepository.create(data);
  }

  static async updatePost(id: string, data: Record<string, unknown>) {
    return await PostsRepository.update(id, data);
  }

  static async deletePost(id: string) {
    return await PostsRepository.delete(id);
  }
}
