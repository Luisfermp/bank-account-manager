// eslint-disable-next-line @typescript-eslint/no-var-requires
const globalJest = require('./jest.config.json');

delete globalJest.testPathIgnorePatterns;

module.exports = {
    preset: '@trendyol/jest-testcontainers',
    ...globalJest,
    testTimeout: 30000,
    testMatch: ['**/persistence/**/*.test.ts']
};
