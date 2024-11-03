module.exports = {
	preset: 'ts-jest',
	testEnvironment: 'node',
	testMatch: [
		'**/e2e/**/*.e2e.test.ts', // This should match your E2E test files
	],
};
