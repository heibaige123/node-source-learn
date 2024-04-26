/**
 * @file eslint config
 * @author
 */

const path = require('path');

module.exports = {
    overrides: [
        {
            files: ['**.js'],
            extends: ['@ecomfe/eslint-config'],
        },
        {
            files: ['src/**/*.ts'],
            extends: [
                '@ecomfe/eslint-config',
                '@ecomfe/eslint-config/typescript',
            ],
            parserOptions: {
                project: './tsconfig.csr.json',
            },
        },
        {
            files: ['server/**/*.ts'],
            extends: [
                '@ecomfe/eslint-config',
                '@ecomfe/eslint-config/typescript',
            ],
            parserOptions: {
                project: path.resolve(__dirname, './tsconfig.json'),
            },
        },
        {
            files: ['**.san'],
            extends: ['@ecomfe/eslint-config', '@ecomfe/eslint-config/san'],
            parserOptions: {
                project: path.resolve(__dirname, './tsconfig.csr.json'),
                extraFileExtension: ['.san'],
                ecmaFeatures: {
                    jsx: false,
                },
                createDefaultProgram: true,
            },
        },
    ],
};
