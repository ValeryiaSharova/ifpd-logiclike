module.exports = {
  root: true,
  parserOptions: { project: './tsconfig.json' },
  extends: ['plugin:nka/recommended'],
  rules: {
    'nka/no-selective-import-of-libraries': ['error', ['shared']],
  },
  overrides: [
    {
      files: ['src/i18n/dictionaries/**/*.ts'],
      rules: {
        'nka/no-incorrect-paths-in-dictionary-keys': 'error',
        'nka/no-unused-dictionary-keys': 'error',
      },
    },
  ],
};
