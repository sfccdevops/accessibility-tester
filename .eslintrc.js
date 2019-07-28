module.exports = {
    root: true,
    parserOptions: {
        parser: 'babel-eslint',
        ecmaVersion: 8
    },
    env: {
        es6: true,
        node: true,
        browser: true
    },
    extends: [
        'eslint:recommended',
        'plugin:import/errors',
        'plugin:import/warnings'
    ],
    rules: {
        'no-empty': [
            'error',
            {
                'allowEmptyCatch': true
            }
        ],
        'no-console': 0
    },
    globals: {
        'io': true
    }
}