module.exports = {
  env: {
    commonjs: true,
    es2021: true,
    node: true,
  },
  extends: [
    'airbnb-base',
  ],
  parserOptions: {
    ecmaVersion: 12,
  },
  rules: {
    'no-constant-condition': "off",
    'no-await-in-loop': "off",
    'no-plusplus': "off",
    'no-restricted-syntax': "off",
    'consistent-return': "off",
    'no-return-await': "off",
    'no-param-reassign': "off",
    'import/no-extraneous-dependencies': "off"
  },
};
