module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  modulePathIgnorePatterns: ["./dist"],
  testMatch: [
    "**/__tests__/*.[jt]s?(x)",
    "!**/__tests__/coverage/**",
    "!**/__tests__/utils/**",
    "!**/__tests__/images/**",
  ],
};
