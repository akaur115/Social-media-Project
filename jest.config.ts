import type { Config } from "jest";

const config: Config = {
  preset: "ts-jest",
  testEnvironment: "node",

  /**
   * Look for test files inside the "tests" folder
   * with a ".test.ts" extension.
   */
  testMatch: ["**/tests/**/*.test.ts"],

  /**
   * Enable coverage collection to meet the requirement
   * of at least 65% test coverage for CRUD operations.
   */
  collectCoverage: true,
  collectCoverageFrom: [
    "src/app.ts",
    "src/api/v1/controllers/**/*.ts",
    "src/api/v1/routes/**/*.ts"
  ],
  coverageDirectory: "coverage"
};

export default config;
