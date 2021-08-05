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
    'no-var': 2,
    'prefer-const': 2,
    eqeqeq: [2, 'smart'],
    'eol-last': 1,
    'vue/max-attributes-per-line': [1, { singleline: 100, multiline: { max: 1, allowFirstLine: false } }],
    '@typescript-eslint/no-explicit-any': 0,
    '@typescript-eslint/member-delimiter-style': [1, {
      multiline: {
        delimiter: 'comma',
        requireLast: false
      },
      singleline: {
        delimiter: 'comma',
        requireLast: false
      }
    }],
    '@typescript-eslint/no-empty-interface': 0
  }
}
