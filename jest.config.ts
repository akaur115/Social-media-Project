export default {
  preset: "ts-jest",
  testEnvironment: "node",
  roots: ["<rootDir>/tests"],
  moduleNameMapper: {
    "^src/(.*)$": "<rootDir>/src/$1",
    "^src/config/firebase$":
      "<rootDir>/tests/__mocks__/src/config/firebase.ts",
  },
};
