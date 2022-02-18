/* eslint-disable @typescript-eslint/no-var-requires */
const
// eslint-disable-next-line import/no-extraneous-dependencies
    jestTestContainersPreset = require('@trendyol/jest-testcontainers/jest-preset'),
    globalJest = require('./jest.config.json');

delete globalJest.testPathIgnorePatterns;

module.exports = {
    ...globalJest,
    testTimeout: 30000,
    testMatch: ['**/persistence/**/*.test.ts'],
    ...jestTestContainersPreset
};
