module.exports = {
  parser: '@typescript-eslint/parser',
  extends: [
    'plugin:react/recommended',
    'plugin:@typescript-eslint/recommended',
    'prettier'
  ],
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true
    }
  },
  plugins: ['eslint-plugin-import-helpers'],

  rules: {
    '@typescript-eslint/no-unused-vars': [
      'error',
      { argsIgnorePattern: '^_|^req|^next' }
    ],
    'import/prefer-default-export': 'off',
    'react/react-in-jsx-scope': 'off',
    '@typescript-eslint/no-explicit-any': 0,
    '@typescript-eslint/explicit-function-return-type': 0,
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    'react/prop-types': 0,
    'react/no-unescaped-entities': 'off',
    'no-empty-function': 'off',
    'react/no-children-prop': 'off',
    'import-helpers/order-imports': [
      'warn',
      {
        newlinesBetween: 'always',
        groups: ['module', '/^@shared/', ['parent', 'sibling', 'index']],
        alphabetize: { order: 'asc', ignoreCase: true }
      }
    ]
  },
  settings: {
    react: {
      version: 'detect'
    }
  }
}
