module.exports = {
    root: true,
    //  parser: '@typescript-eslint/parser',
    extends: [
        'airbnb',
        //'@react-native-community',
        'plugin:@typescript-eslint/recommended',
        'prettier',
        'prettier/react',
        'prettier/@typescript-eslint',
        'plugin:prettier/recommended',
    ],

    parserOptions: {
        ecmaVersion: 2018, // Allows for the parsing of modern ECMAScript features
        sourceType: 'module', // Allows for the use of imports
        ecmaFeatures: {
            jsx: true, // Allows for the parsing of JSX
        },
    },
    settings: {
        react: {
            version: 'detect', // Tells eslint-plugin-react to automatically detect the version of React to use
        },
        'import/resolver': {
            node: {
                paths: ['src'],
                extensions: ['.js', '.jsx', '.ts', '.tsx'],
            },
        },
    },

    rules: {
        'react/jsx-filename-extension': ['error', {extensions: ['.jsx', '.tsx']}],
        'no-console': ['error', {allow: ['warn', 'error', 'debug', 'log']}],
        'import/extensions': 'never',
    },

    globals: {
        fetch: false,
    },
};
