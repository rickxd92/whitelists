const dotenv = require('dotenv');
dotenv.config();
module.exports = {
	preset: 'ts-jest',
	clearMocks: true,
	coverageDirectory: 'coverage',
	collectCoverageFrom: ['**/*.ts'],
	testResultsProcessor: './node_modules/jest-bamboo-reporter',
	watchPathIgnorePatterns: ['<rootDir>/jest.json'],
	testEnvironment: 'node',
	collectCoverage: true,
	testTimeout: +process.env.TIMEOUT,
	testRegex: '\\.test\\.(ts)$',
	transformIgnorePatterns: ['/node_modules/.+\\.js$', '/src/routes/.+\\.js$'],
	coverageThreshold: {
		global: {
			branches: 80,
			functions: 80,
			lines: 80,
			statements: 80
		}
	}
};
