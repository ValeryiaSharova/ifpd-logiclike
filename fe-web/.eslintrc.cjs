module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  parserOptions: { project: './tsconfig.json' },
  extends: ['plugin:nka/recommended'],
  rules: {
    'nka/no-full-import-of-libraries': ['error', ['antd', 'antd/lib']],
    'nka/no-selective-import-of-libraries': ['error', ['shared']],
  },
  overrides: [
    {
      files: ['src/i18n/dictionaries/**/*.ts'],
      rules: {
        'nka/no-incorrect-paths-in-dictionary-keys': [
          'error',
          ['error.', 'success.'],
        ],
        'nka/no-unused-dictionary-keys': 'error',
      },
    },
  ],
};
