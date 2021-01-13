const path = require('path');
const CopyPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: process.env.NODE_ENV === 'production' ? 'production' : 'development',
  entry: {
    'facebook-desktop/facebook-desktop': './src/facebook-desktop/facebook-desktop.js',
    'facebook-mobile/facebook-mobile': './src/facebook-mobile/facebook-mobile.js',
    'linkedin/linkedin': './src/linkedin/linkedin.js',
    'opensearch/opensearch': './src/opensearch/opensearch.js',
    'slack/slack': './src/slack/slack.js',
    'twitter/twitter': './src/twitter/twitter.js',
    'whatsapp/whatsapp': './src/whatsapp/whatsapp.js',
  },
  output: {
    path: path.join(__dirname, 'dist'),
    filename: '[name].js',
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: 'facebook-desktop/facebook-desktop.html',
      template: 'src/facebook-desktop/facebook-desktop.html',
      chunks: [ 'facebook-desktop/facebook-desktop' ],
    }),
    new HtmlWebpackPlugin({
      filename: 'facebook-mobile/facebook-mobile.html',
      template: 'src/facebook-mobile/facebook-mobile.html',
      chunks: [ 'facebook-mobile/facebook-mobile' ],
    }),
    new HtmlWebpackPlugin({
      filename: 'linkedin/linkedin.html',
      template: 'src/linkedin/linkedin.html',
      chunks: [ 'linkedin/linkedin' ],
    }),
    new HtmlWebpackPlugin({
      filename: 'opensearch/opensearch.html',
      template: 'src/opensearch/opensearch.html',
      chunks: [ 'opensearch/opensearch' ],
    }),
    new HtmlWebpackPlugin({
      filename: 'slack/slack.html',
      template: 'src/slack/slack.html',
      chunks: [ 'slack/slack' ],
    }),
    new HtmlWebpackPlugin({
      filename: 'twitter/twitter.html',
      template: 'src/twitter/twitter.html',
      chunks: [ 'twitter/twitter' ],
    }),
    new HtmlWebpackPlugin({
      filename: 'whatsapp/whatsapp.html',
      template: 'src/whatsapp/whatsapp.html',
      chunks: [ 'whatsapp/whatsapp' ],
    }),
    new CopyPlugin({
      patterns: [
        {
          from: 'src/**/assets/*',
          to: `${ path.join(__dirname, 'dist') }/[path]/[name].[ext]`,
          transformPath(targetPath) {
            return targetPath.replace('src/', '');
          },
        },
      ],
    }),
  ],
  stats: { colors: true },
};
