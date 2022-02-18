/* eslint-disable @typescript-eslint/no-var-requires */
const jestConfig = require('./jest.config.json');

module.exports = Object.assign(jestConfig, {
    preset: 'ts-jest',
    testMatch: ['**/*.steps.ts']
});
