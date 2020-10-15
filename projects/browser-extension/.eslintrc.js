module.exports = {
  env: {
    browser: true,
  },

  globals: {
    chrome: true,
    process: true,
  },

  plugins: [ 'sonarjs' ],

  extends: [
    'plugin:vue/recommended',
    'plugin:sonarjs/recommended',
  ],

  rules: {
    'sonarjs/no-duplicate-string': 0,
    'vue/no-v-html': 'off',
  },
};
