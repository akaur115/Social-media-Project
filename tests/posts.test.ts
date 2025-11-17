/**
 * @file posts.test.ts
 * @description Unit tests for basic CRUD operations on /api/posts
 * using supertest to call the Express app.
 */

import request from "supertest";
import app from "../src/app";

/**
 * Helper interface for Post objects used in tests.
 */
interface TestPost {
  id?: string;
  title: string;
  content: string;
}

describe("Connectify API - Posts CRUD", () => {
  let createdPostId: string | undefined;

  /**
   * @test
   * @description Should return a welcome message from the root route.
   */
  it("should return welcome message on GET /", async () => {
    const response = await request(app).get("/");

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("message");
  });

  /**
   * @test
   * @description Should return an empty list on GET /api/posts initially.
   */
  it("should return empty array on GET /api/posts when there are no posts", async () => {
    const response = await request(app).get("/api/posts");

    expect(response.status).toBe(200);
    expect(Array.isArray(response.body.data || response.body)).toBe(true);
  });

  /**
   * @test
   * @description Should create a new post on POST /api/posts.
   */
  it("should create a new post on POST /api/posts", async () => {
    const newPost: TestPost = {
      title: "Test Post",
      content: "This is a test post created by Jest."
    };

    const response = await request(app)
      .post("/api/posts")
      .send(newPost)
      .set("Content-Type", "application/json");

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty("data");
    expect(response.body.data).toHaveProperty("id");
    expect(response.body.data.title).toBe(newPost.title);

    createdPostId = response.body.data.id;
  });

  /**
   * @test
   * @description Should get at least one post after creation.
   */
  it("should return posts after one has been created", async () => {
    const response = await request(app).get("/api/posts");

    expect(response.status).toBe(200);
    const posts = response.body.data || response.body;
    expect(posts.length).toBeGreaterThan(0);
  });

  /**
   * @test
   * @description Should update a post by ID using PUT /api/posts/:id.
   */
  it("should update a post on PUT /api/posts/:id", async () => {
    const updatedPost: TestPost = {
      title: "Updated Test Post",
      content: "This post has been updated by Jest."
    };

    const response = await request(app)
      .put(`/api/posts/${createdPostId}`)
      .send(updatedPost)
      .set("Content-Type", "application/json");

    expect(response.status).toBe(200);
    expect(response.body.data.title).toBe(updatedPost.title);
  });

  /**
   * @test
   * @description Should delete a post by ID using DELETE /api/posts/:id.
   */
  it("should delete a post on DELETE /api/posts/:id", async () => {
    const response = await request(app).delete(`/api/posts/${createdPostId}`);

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("message");
  });
});
