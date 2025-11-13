/**
 * @file post.model.ts
 * @description Defines the structure and TypeScript interface for Post data in the Connectify API.
 */

/**
 * @interface Post
 * @description Represents a social media post entity.
 */
export interface Post {
  id?: string;         
  title: string;       
  content: string;     
  author: string;      
  createdAt: string;   
  updatedAt?: string;  
}
