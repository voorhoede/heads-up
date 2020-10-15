module.exports = {
  env: {
    browser: true,
  },

  globals: {
    chrome: true,
  },

  extends: [
    'plugin:vue/recommended',
  ],

  rules: {
    'vue/no-v-html': 'off',
  },
};
