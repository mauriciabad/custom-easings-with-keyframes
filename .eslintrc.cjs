/* eslint-env node */
require('@rushstack/eslint-patch/modern-module-resolution')

/** @type {import("eslint").Linter.Config} */
module.exports = {
  root: true,
  extends: [
    'plugin:vue/vue3-recommended',
    'eslint:recommended',
    '@vue/eslint-config-typescript',
    '@vue/eslint-config-prettier',
    'plugin:vuejs-accessibility/recommended',
  ],
  plugins: ['vuejs-accessibility'],
  rules: {
    'no-console': 'warn',
    'no-debugger': 'warn',
    'vue/component-tags-order': [
      'error',
      { order: ['script', 'template', 'style'] },
    ],
    'vue/block-lang': ['error', { script: { lang: 'ts' } }],
    'prefer-template': 'warn',
    'no-undef': 'off',
    'vue/component-api-style': ['error', ['script-setup']],
    'vuejs-accessibility/label-has-for': [
      'error',
      {
        controlComponents: ['CelebrationCheckbox'],
        allowChildren: true,
      },
    ],
  },
  overrides: [
    {
      files: ['cypress/e2e/**/*.{cy,spec}.{js,ts,jsx,tsx}'],
      extends: ['plugin:cypress/recommended'],
    },
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    warnOnUnsupportedTypeScriptVersion: false,
  },
}
