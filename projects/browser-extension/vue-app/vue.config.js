const path = require('path');
const resolve = dir => path.join(__dirname, dir);

module.exports = {
  publicPath: '/app/',

  configureWebpack: {
    devtool: process.env.NODE_ENV !== 'production'
      ? 'inline-source-map'
      : false,
  },

  chainWebpack: config => {
    // Add alias for external folder
    config.resolve.alias
      .set('@shared', resolve('../../@shared'));
  },
};
