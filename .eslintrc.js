module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  rules: {
    '@typescript-eslint/no-non-null-assertion': 'off'
  },
  plugins: [
    '@typescript-eslint',
  ],
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
  ],
};
