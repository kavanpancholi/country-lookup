module.exports = {
  'env': {
    'browser': true,
    'es6': true
  },
  'extends': 'airbnb-base',
  'globals': {
    'Atomics': 'readonly',
    'SharedArrayBuffer': 'readonly'
  },
  'parserOptions': {
    'ecmaVersion': 2018,
    'sourceType': 'module'
  },
  'rules': {
    'no-shadow': 'off',
    'no-param-reassign': 'off',
    'import/no-dynamic-require': 'off',
    'consistent-return': 'off',
    'import/prefer-default-export': 'off',
    'global-require': 'off',
    'no-useless-escape': 'off',
    'no-plusplus': 'off',
  }
};
