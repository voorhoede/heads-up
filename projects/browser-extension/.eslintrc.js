module.exports = {
  env: {
    browser: true,
  },

  globals: {
    chrome: true,
    process: true,
  },

  extends: [
    'plugin:vue/recommended',
  ],

  rules: {
    'vue/no-v-html': 'off',
  },
};
