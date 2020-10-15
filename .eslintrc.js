module.exports = {
  root: true,

  env: {
    node: true,
  },

  parserOptions: {
    parser: 'babel-eslint',
  },

  plugins: [ 'sonarjs' ],

  extends: [
    'eslint:recommended',
    'plugin:sonarjs/recommended',
  ],

  rules: {
    'sonarjs/no-duplicate-string': 0,
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
