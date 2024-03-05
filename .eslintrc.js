module.exports = {
  root: true,
  extends: '@react-native',
  //rules criado para arrumar erro: Delete `␍` eslint
  rules: {
    'import/no-internal-modules': 'off',
    'prettier/prettier': [
      'error',
      {
        endOfLine: 'auto',
      },
    ],
  },
};
