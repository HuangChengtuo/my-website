module.exports = {
  root: true,
  env: {
    browser: true,
    node: true
  },
  extends: [
    'plugin:vue/essential',
    'eslint:recommended',
    '@vue/typescript/recommended',
  ],
  parserOptions: { ecmaVersion: 2020 },
  rules: {
    semi: [1, 'never'],
    '@typescript-eslint/no-explicit-any': 0
  }
}