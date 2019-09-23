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
  plugins: ['sonarjs'],
  extends: [
    'eslint:recommended',
    'plugin:vue/recommended',
    'plugin:sonarjs/recommended',
  ],
  rules: {
    // override/add rules settings here, such as:
    // 'vue/no-unused-vars': 'error'
    'vue/no-v-html': 0
  }
}
