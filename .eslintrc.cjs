// @ts-check

module.exports = {
  parser: "@typescript-eslint/parser",
  parserOptions: {
    project: "./tsconfig.json"
  },
  rules: {
    "@typescript-eslint/dot-notation": "error"
  },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended-type-checked',
    'plugin:@typescript-eslint/stylistic-type-checked',
    'prettier',
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended',
    'plugin:@typescript-eslint/strict'
  ],
};
