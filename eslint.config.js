import antfu from '@antfu/eslint-config'

export default antfu({
  stylistic: true,

  // TypeScript and Vue are autodetected, you can also explicitly enable them:
  typescript: true,
  vue: false,
  react: true,

  // Disable jsonc and yaml support
  jsonc: false,
  yaml: false,
  ignores: [
    '**/fixtures',
    '**/dist',
    '**/node_modules',
    '**/coverage',
    '**/build',
    '**/public',
  ],
  rules: {
    'react-refresh/only-export-components': 'off',
    'style/jsx-one-expression-per-line': 'off',
    'style/jsx-curly-spacing': 'off',
    'style/jsx-child-element-spacing': 'off',
    'brace-style': ['error', '1tbs'],
    'no-console': 'warn',
    'no-nested-ternary': 'error',
    'antfu/if-newline': 'off',
  },
})
  .overrides({
    'antfu/imports/rules': {
      rules: {
        'import/order': [
          'error',
          {
            'groups': ['builtin', 'external', 'internal'],
            'pathGroups': [
              {
                pattern: 'react',
                group: 'external',
                position: 'before',
              },
            ],
            'pathGroupsExcludedImportTypes': ['react'],
            'newlines-between': 'always',
            'alphabetize': {
              order: 'asc',
              caseInsensitive: true,
            },
          },
        ],
      },
    },
    'antfu/perfectionist/setup': {
      rules: {
        'perfectionist/sort-imports': 'off',
      },
    },
  })
