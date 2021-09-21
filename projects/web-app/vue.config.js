const path = require('path');
const resolve = dir => path.join(__dirname, dir);

module.exports = {
  chainWebpack: config => {
    // change svg loader
    const svgRule = config.module.rule('svg');
    svgRule.uses.clear();
    svgRule
      .use('vue-html-loader')
      .loader('vue-html-loader');

    // Add alias for external folder
    config.resolve.alias
      .set('@shared', resolve('../@shared'));
  },
};
