module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: [
    'plugin:vue/vue3-essential',
    'eslint:recommended',
    '@vue/typescript/recommended'
  ],
  parserOptions: {
    ecmaVersion: 2020
  },
  rules: {
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off'
  },
  overrides: [
    {
      files: ['*.ts', '*.tsx'],
      rules: {
        // 'no-unused-vars': ["erro",{ "argsIgnorePattern": "^_" }],
        'no-unused-vars': ["off"],
        '@typescript-eslint/no-unused-vars': ["error",{ "argsIgnorePattern": "^_" }],
        '@typescript-eslint/explicit-module-boundary-types': ['off'],
        '@typescript-eslint/no-explicit-any': 0,
        '@typescript-eslint/no-unused-vars':["off"],
      }
    }
  ]
}
