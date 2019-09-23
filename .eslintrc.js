module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
  },
  globals: {
    chrome: true,
    process: true,
  },
  parserOptions: {
    parser: 'babel-eslint',
  },
  extends: [
    'eslint:recommended',
    'plugin:vue/recommended',
  ],
  rules: {
    // override/add rules settings here, such as:
    // 'vue/no-unused-vars': 'error'
  }
}
