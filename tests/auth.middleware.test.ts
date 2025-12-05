/**
 * @file auth.middleware.test.ts
 * @description Tests for JWT authentication middleware.
 */

import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { authRequired } from "../src/api/v1/middleware/auth.middleware";

jest.mock("jsonwebtoken");

describe("Auth Middleware - authRequired", () => {
  function createMock() {
    const req = { headers: {} } as Request;

    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as unknown as Response;

    const next = jest.fn() as NextFunction;

    return { req, res, next };
  }

  it("should return 401 if no Authorization header is provided", () => {
    const { req, res, next } = createMock();

    authRequired(req, res, next);

    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith({
      message: "Unauthorized",
    });
    expect(next).not.toHaveBeenCalled();
  });

  it("should return 401 if token is invalid", () => {
    const { req, res, next } = createMock();

    req.headers.authorization = "Bearer invalidToken";

    (jwt.verify as jest.Mock).mockImplementation(() => {
      throw new Error("Invalid token");
    });

    authRequired(req, res, next);

    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith({
      message: "Invalid token",
    });
  });

  it("should call next() when token is valid", () => {
    const { req, res, next } = createMock();

    req.headers.authorization = "Bearer validToken";
    (jwt.verify as jest.Mock).mockReturnValue({ id: "12345" });

    authRequired(req, res, next);

    expect(next).toHaveBeenCalledTimes(1);
  });
});
