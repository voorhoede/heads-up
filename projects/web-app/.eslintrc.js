module.exports = {
  root: true,

  env: {
    node: true,
  },

  'extends': [
    'plugin:vue/vue3-essential',
    'eslint:recommended',
  ],

  parserOptions: {
    parser: 'babel-eslint',
  },

  rules: {
    'semi': [ 'warn', 'always' ],
    'no-unused-vars': [
      'warn',
      {
        'ignoreRestSiblings': true,
        'argsIgnorePattern': '^_',
      },
    ],
    'no-debugger': 'off',
    'indent': [ 'warn', 2 ],
    'quotes': [ 'warn', 'single' ],
    'comma-dangle': [
      'warn', {
        'arrays': 'always-multiline',
        'objects': 'always-multiline',
      },
    ],
    'array-bracket-spacing': [ 'warn', 'always' ],
    'object-curly-spacing': [ 'warn', 'always' ],
    'template-curly-spacing': [ 'warn', 'always' ],
    'arrow-parens': [ 'warn', 'as-needed' ],
  },
};
