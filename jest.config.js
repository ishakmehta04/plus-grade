module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    // testTimeout: 30000,
    testMatch: [
      '**/e2e/**/*.e2e.test.ts', // This should match your E2E test files
    ],
  };
  