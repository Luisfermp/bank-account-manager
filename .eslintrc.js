module.exports = {
    extends: [
        'airbnb-base',
        'plugin:jest/all',
        'plugin:import/errors',
        'plugin:import/warnings',
        'plugin:import/typescript',
        'plugin:@typescript-eslint/recommended'
    ],
    plugins: ['jest', '@typescript-eslint'],
    rules: {
        '@typescript-eslint/no-explicit-any': 'off',
        'jest/no-mocks-import': 'off',
        'jest/require-hook': 'off',
        strict: [2, 'global'],
        'no-var': 0,
        'one-var': [
            2,
            {
                initialized: 'always',
                uninitialized: 'never'
            }
        ],
        'comma-dangle': [2, 'never'],
        indent: [
            2,
            4,
            {
                CallExpression: {
                    arguments: 'first'
                },
                FunctionDeclaration: {
                    parameters: 'first'
                }
            }
        ],
        'max-len': [
            2,
            {
                code: 140
            }
        ],
        'import/no-extraneous-dependencies': [
            'error',
            {
                devDependencies: [
                    '**/*.test.ts',
                    '**/*.mock.ts',
                    '**/*.mother.ts',
                    '**/*.steps.ts',
                    '**/tests/**/*.ts'
                ]
            }
        ]
    },
    parser: '@typescript-eslint/parser',
    env: {},
    overrides: [],
    settings: {
        'import/core-modules': ['terser-webpack-plugin'],
        'import/resolver': {
            alias: {
                map: [
                    ['@shared', './server/contexts/shared'],
                    ['@common', './server/common'],
                    ['@backoffice', './server/contexts/backoffice']
                ],
                extensions: ['.ts', '.js']
            }
        }
    }
};
