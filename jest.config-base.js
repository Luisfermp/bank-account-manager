/* eslint-disable @typescript-eslint/no-var-requires */
const { resolve } = require('path');

const { name } = require('./package.json');

module.exports = {
    cacheDirectory: '.tmp/jestCache',
    clearMocks: true,
    resetMocks: true,
    restoreMocks: true,
    collectCoverage: true,
    coveragePathIgnorePatterns: ['fixtures'],
    collectCoverageFrom: ['src/**/*.ts'],
    coverageReporters: ['cobertura', 'html', 'text', 'text-summary'],
    testMatch: ['**/*.test.(ts|tsx)'],
    displayName: name,
    globals: {
        'ts-jest': {
            tsconfig: 'tsconfig-test.json'
        }
    },
    moduleFileExtensions: ['js', 'ts'],
    name,
    preset: 'ts-jest',
    reporters: [
        'default',
        [
            'jest-junit',
            {
                outputDirectory: resolve(__dirname, 'build', 'reports'),
                outputName: 'jest-junit.xml',
                usePathForSuiteName: 'true'
            }
        ],
        'jest-summary-reporter'
    ],
    testEnvironment: 'node',
    verbose: true
};
