module.exports = {
  root: true,
  parserOptions: { project: './tsconfig.json' },
  extends: ['plugin:nka/recommended'],
  rules: {
    'nka/no-selective-import-of-libraries': ['error', ['shared']],
  },
};
