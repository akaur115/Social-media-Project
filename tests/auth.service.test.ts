/**
 * @file auth.service.test.ts
 * @description Unit tests for authentication service functionality.
 * This file validates JWT creation, password comparison, and
 * handling of invalid login credentials.
 */

import * as authService from "../src/api/v1/services/auth.service";
import * as userRepository from "../src/api/v1/repositories/user.repository";
import bcrypt from "bcryptjs";

// Mock repository
jest.mock("../src/api/v1/repositories/user.repository");

describe("Auth Service", () => {
  it("should return a JWT token for valid login credentials", async (): Promise<void> => {
    (userRepository.getUserByEmail as jest.Mock).mockResolvedValue({
      id: "user123",
      email: "test@example.com",
      password: await bcrypt.hash("password123", 10),
      role: "user",
    });

    const result: string | null = await authService.login({
      email: "test@example.com",
      password: "password123",
    });

    expect(typeof result).toBe("string");
  });

  it("should return null when user is not found", async (): Promise<void> => {
    (userRepository.getUserByEmail as jest.Mock).mockResolvedValue(null);

    const result = await authService.login({
      email: "missing@example.com",
      password: "password",
    });

    expect(result).toBeNull();
  });
});
