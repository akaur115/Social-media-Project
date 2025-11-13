/**
 * @file CustomError.ts
 * @description Defines a reusable custom error class for standardized API error responses.
 */

export class CustomError extends Error {
  public statusCode: number;

  /**
   * Creates a new CustomError instance.
   * @param {string} message - The error message.
   * @param {number} [statusCode=500] - HTTP status code associated with the error.
   */
  constructor(message: string, statusCode = 500) {
    super(message);
    this.statusCode = statusCode;

    Object.setPrototypeOf(this, CustomError.prototype);
  }
}
