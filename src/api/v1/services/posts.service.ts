/**
 * @file posts.service.ts
 */

import { PostsRepository } from "../repositories/posts.repository";

export class PostsService {
  static async getAllPosts(filters: {
    userId?: string;
    search?: string;
    sort?: string;
  }) {
    return await PostsRepository.getAll(filters);
  }

  static async createPost(data: any) {
    return await PostsRepository.create(data);
  }

  static async updatePost(id: string, data: any) {
    return await PostsRepository.update(id, data);
  }

  static async deletePost(id: string) {
    return await PostsRepository.delete(id);
  }
}
