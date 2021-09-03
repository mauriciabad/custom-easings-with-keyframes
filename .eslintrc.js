/** @type {import("eslint").Linter.Config} */
module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: [
    'plugin:vue/vue3-recommended',
    'eslint:recommended',
    '@vue/typescript/recommended',
    '@vue/prettier',
    '@vue/prettier/@typescript-eslint'
  ],
  parser: 'vue-eslint-parser',
  parserOptions: {
    ecmaVersion: 2021
  },
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'vue/order-in-components': 'error',
    'vue/attributes-order': 'error',
    'vue/no-v-html': 'error',
    'vue/component-tags-order': [
      'error',
      { order: ['script', 'template', 'style'] }
    ],
    'vue/block-lang': ['error', { script: { lang: 'ts' } }],
    'prefer-template': 'warn'
  },
  overrides: [
    {
      files: [
        '**/__tests__/*.{j,t}s?(x)',
        '**/tests/unit/**/*.spec.{j,t}s?(x)'
      ],
      env: {
        jest: true
      }
    }
  ]
}
