/** @type {import('jest').Config} */
module.exports = {
  preset: "jest-preset-angular",
  setupFilesAfterEnv: ["<rootDir>/setup-jest.ts"],
  collectCoverage: true,
  coverageDirectory: '<rootDir>/coverage/',
  coverageReporters: ['html', 'text', 'lcov', 'text-summary'],
};