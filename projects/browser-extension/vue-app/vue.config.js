const path = require('path');
const resolve = dir => path.join(__dirname, dir);

module.exports = {
  chainWebpack: config => {
    // Use vue-svg-loaded
    const svgRule = config.module.rule('svg');
    svgRule.uses.clear();
    svgRule
      .use('vue-loader')
      .loader('vue-loader-v16')
      .end()
      .use('vue-svg-loader')
      .loader('vue-svg-loader');

    // Fix ESLint error when importing from external folder
    config.module
      .rule('eslint')
      .use('eslint-loader')
      .tap(options => {
        options.configFile = path.resolve(__dirname, '.eslintrc.js');
        return options;
      });

    // Add alias for external folder
    config.resolve.alias
      .set('@shared', resolve('../../@shared'));
  },
};
