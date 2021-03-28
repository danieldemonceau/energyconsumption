module.exports = {
  env: {
    browser: true,
    commonjs: true,
    es2021: true
  },
  extends: ['airbnb-base', 'prettier'],
  parserOptions: {
    ecmaVersion: 12
  },
  rules: {
    // 'jsx-quotes': 'single',
    'no-console': 0,
    'no-empty': 0,
    'no-irregular-whitespace': 0,
    quotes: ['error', 'single', { avoidEscape: true, allowTemplateLiterals: true }],
    'max-len': [
      'error',
      {
        code: 120,
        tabWidth: 4,
        ignoreComments: true,
        ignoreTrailingComments: true,
        ignoreUrls: true,
        ignoreStrings: true,
        ignoreTemplateLiterals: true,
        ignoreRegExpLiterals: true
      }
    ],
    'global-require': 0,
    'comma-dangle': ['error', 'never'],
    'linebreak-style': ['error', 'unix'],
    'operator-linebreak': ['error', 'after']
  }
};
