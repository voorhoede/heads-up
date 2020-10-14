const path = require('path')
const createConfig = require('./config/create')
const CopyPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = createConfig({
  entry: {
    'index': './src/heads-up/index.js',
    '../devtools/devtools': './src/devtools/devtools.js',
    '../devtools/background': './src/devtools/background.js',
    '../devtools/content': './src/devtools/content.js',
    '../previews/facebook-desktop/facebook-desktop': './src/previews/facebook-desktop/facebook-desktop.js',
    '../previews/facebook-mobile/facebook-mobile': './src/previews/facebook-mobile/facebook-mobile.js',
    '../previews/linkedin/linkedin': './src/previews/linkedin/linkedin.js',
    '../previews/opensearch/opensearch': './src/previews/opensearch/opensearch.js',
    '../previews/slack/slack': './src/previews/slack/slack.js',
    '../previews/twitter/twitter': './src/previews/twitter/twitter.js',
    '../previews/whatsapp/whatsapp': './src/previews/whatsapp/whatsapp.js',
  },
  output: {
    path: path.join(__dirname, 'dist/heads-up'),
    filename: '[name].js'
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'src/heads-up/index.html',
      chunks: ['index'],
    }),
    new HtmlWebpackPlugin({
      filename: '../devtools/devtools.html',
      template: 'src/devtools/devtools.html',
      chunks: []
    }),
    new HtmlWebpackPlugin({
      filename: '../previews/facebook-desktop/facebook-desktop.html',
      template: 'src/previews/facebook-desktop/facebook-desktop.ejs',
      chunks: ['../previews/facebook-desktop/facebook-desktop'],
    }),
    new HtmlWebpackPlugin({
      filename: '../previews/facebook-mobile/facebook-mobile.html',
      template: 'src/previews/facebook-mobile/facebook-mobile.ejs',
      chunks: ['../previews/facebook-mobile/facebook-mobile'],
    }),
    new HtmlWebpackPlugin({
      filename: '../previews/linkedin/linkedin.html',
      template: 'src/previews/linkedin/linkedin.html',
      chunks: ['../previews/linkedin/linkedin'],
    }),
    new HtmlWebpackPlugin({
      filename: '../previews/opensearch/opensearch.html',
      template: 'src/previews/opensearch/opensearch.html',
      chunks: ['../previews/opensearch/opensearch'],
    }),
    new HtmlWebpackPlugin({
      filename: '../previews/slack/slack.html',
      template: 'src/previews/slack/slack.html',
      chunks: ['../previews/slack/slack'],
    }),
    new HtmlWebpackPlugin({
      filename: '../previews/twitter/twitter.html',
      template: 'src/previews/twitter/twitter.html',
      chunks: ['../previews/twitter/twitter'],
    }),
    new HtmlWebpackPlugin({
      filename: '../previews/whatsapp/whatsapp.html',
      template: 'src/previews/whatsapp/whatsapp.html',
      chunks: ['../previews/whatsapp/whatsapp'],
    }),
    new CopyPlugin([
      { from: 'src/devtools/assets/', to: '../devtools/assets' },
      { from: 'src/manifest.json', to: '../manifest.json' },
    ]),
  ],
  devtool: process.env.NODE_ENV !== 'production'
    ? '#inline-source-map'
    : false
})
