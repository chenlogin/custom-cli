module.exports = {
  root: true,
  env: {
    node: true,
    browser: true,
    'vue/setup-compiler-macros': true,
  },
  extends: ['eslint:recommended', 'plugin:@typescript-eslint/recommended', 'plugin:vue/vue3-recommended', 'prettier'],
  plugins: ['@typescript-eslint', 'prettier', 'import'],
  parserOptions: {
    parser: '@typescript-eslint/parser',
    sourceType: 'module',
  },
  rules: {
    'prettier/prettier': 'warn',
    'no-console': process.env.NODE_ENV === 'prod' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'prod' ? 'warn' : 'off',
    'vue/multi-word-component-names': 0,
  },
}
