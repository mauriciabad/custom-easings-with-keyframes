/** @type {import("eslint").Linter.Config} */
module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: [
    'plugin:vue/vue3-recommended',
    'eslint:recommended',
    '@vue/eslint-config-typescript',
    '@vue/eslint-config-prettier'
  ],
  parser: 'vue-eslint-parser',
  parserOptions: {
    ecmaVersion: 2021
  },
  rules: {
    'no-console': 'warn',
    'no-debugger': 'warn',
    'vue/component-tags-order': [
      'error',
      { order: ['script', 'template', 'style'] }
    ],
    'vue/block-lang': ['error', { script: { lang: 'ts' } }],
    'prefer-template': 'warn',
    'no-undef': 'off'
  },
  overrides: [
    {
      files: ['**/*.spec.{j,t}s'],
      env: { jest: true }
    }
  ]
}
