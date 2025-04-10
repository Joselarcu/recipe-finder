/** @type {import('jest').Config} */
module.exports = {
  preset: "jest-preset-angular",
  setupFilesAfterEnv: ["<rootDir>/setup-jest.ts"],
  collectCoverage: true,
  coverageDirectory: '<rootDir>/coverage/',
  collectCoverageFrom: [
    'src/**/*.ts',
    '!src/**/*.spec.ts',
    '!src/main.ts',
    '!src/environments/**'
  ],
  coverageThreshold: {
    global: {
      branches: 70,
      functions: 95,
      lines: 95,
      statements: 95
    }
  },
  coverageReporters: ['html', 'text', 'lcov', 'text-summary'],
  coveragePathIgnorePatterns: ['/node_modules/', 'src/main.ts', 'src/environments/', 'src/app/app.routes.server.ts', 'src/app/app.config.ts', 'src/server.ts', 'src/app/app.routes.ts', 'src/main.ts']
};