module.exports = {
  root: true,

  env: {
    browser: true,
    node: true,
  },

  globals: {
    chrome: true,
    Vue: 'readable',
  },

  parserOptions: {
    parser: 'babel-eslint',
  },

  extends: [
    'eslint:recommended',
    'plugin:vue/vue3-essential',
    'plugin:sonarjs/recommended',
  ],

  rules: {
    'sonarjs/no-duplicate-string': 0,
    'sonarjs/cognitive-complexity': [ 'warn', 20 ],
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
    'vue/multi-word-component-names': 'off',
  },
};
