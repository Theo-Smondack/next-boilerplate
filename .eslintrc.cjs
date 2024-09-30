// eslint-disable-next-line no-undef
module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  plugins: [
    '@typescript-eslint',
    'eslint-plugin-tsdoc',
    'import',
    'import-no-duplicates-prefix-resolved-path',
  ],
  extends: [
    'next',
    'eslint:recommended',
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:import/recommended',
    'plugin:import/typescript',
    'prettier',
  ],
  rules: {
    'no-console': [ 'warn' ],
    quotes: [
      'error',
      'single',
      {
        avoidEscape: true,
        allowTemplateLiterals: true,
      },
    ],
    'react/jsx-max-props-per-line': [
      1,
      {
        'maximum': 3,
        'when': 'multiline',
      },
    ],
    'comma-dangle': [ 'error', 'always-multiline' ],
    'no-trailing-spaces': [ 'warn' ],
    'prefer-object-spread': [ 'error' ],
    'space-in-parens': [ 'error', 'never' ],
    'object-curly-spacing': ['error', 'always'],
    'object-curly-newline': [
      'error',
      {
        ObjectExpression: {
          multiline: true,
          minProperties: 5,
          consistent: true,
        },
      },
    ],
    'array-bracket-newline': [ 'error', 'consistent' ],
    'import/extensions': 'off',
    'import/first': [ 'error' ],
    'import/newline-after-import': [
      'error',
      {
        count: 1,
      },
    ],
    'import/no-absolute-path': [ 'error' ],
    'import/no-duplicates': 'off',
    'import/no-extraneous-dependencies': 'off',
    'import/no-mutable-exports': 'off',
    'import/no-relative-packages': [ 'error' ],
    'import/no-unresolved': 'off',
    'import/no-useless-path-segments': [
      'error',
      {
        noUselessIndex: true,
      },
    ],
    'import/order': [
      'error',
      {
        alphabetize: {
          caseInsensitive: false,
          order: 'asc',
        },
        groups: [ 'external', 'builtin', 'internal', 'sibling', 'parent', 'index', 'object', 'type' ],
        'newlines-between': 'always',
        pathGroups: [
          {
            group: 'internal',
            pattern: '@(lib|components|config|app|helpers|types)?/*',
          },
        ],
      },
    ],
    'import/prefer-default-export': 'off',

    // TS specific rules
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/no-inferrable-types': 'off',
    '@typescript-eslint/no-unused-vars': [
      'warn',
      {
        ignoreRestSiblings: true,
        argsIgnorePattern: '^_',
        varsIgnorePattern: '^_',
      },
    ],

    // TSDoc
    'tsdoc/syntax': 'off',

    // Disables ESLint rules in order to user TS specific rules
    'no-unused-vars': 'off',
  },
}
