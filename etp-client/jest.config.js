/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  testMatch: ["**/tests/**/*.test.ts"],
  testPathIgnorePatterns: ["/node_modules/", "/tests/integration/"],
  collectCoverageFrom: ["src/**/*.ts", "!src/index.ts"],
};
