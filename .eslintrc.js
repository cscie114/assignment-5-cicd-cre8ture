// .eslintrc.js
module.exports = {
    parser: 'babel-eslint', // or '@babel/eslint-parser'
    parserOptions: {
      sourceType: 'module',
      ecmaVersion: 2020,
      ecmaFeatures: {
        jsx: true,
      },
    },
  
      rules: {  'no-unused-vars': 'error',
    },
  };