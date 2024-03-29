module.exports = {
  root: true,
  env: {
    browser: true,
    node: true
  },
  extends: [
    'plugin:vue/vue3-recommended',
    '@vue/typescript/recommended'
  ],
  parserOptions: { ecmaVersion: 2020 },
  rules: {
    'eqeqeq': [2, 'smart'],
    'eol-last': 1,
    'no-var': 2,
    'prefer-const': 2,
    'quotes': [1, 'single'],
    'vue/attribute-hyphenation': [1, 'never'],
    'vue/max-attributes-per-line': [1, { singleline: 100, multiline: 1 }],
    'vue/require-default-prop': 0,
    'vue/singleline-html-element-content-newline': 0,
    'vue/v-on-event-hyphenation': [1, 'never'],
    '@typescript-eslint/member-delimiter-style': [1, {
      multiline: { delimiter: 'comma', requireLast: false },
      singleline: { delimiter: 'comma', requireLast: false }
    }],
    '@typescript-eslint/no-empty-interface': 0,
    '@typescript-eslint/no-explicit-any': 1
  }
}
