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
    '../twitter-preview/twitter-preview': './src/twitter-preview/twitter-preview.js',
    '../whatsapp-preview/whatsapp-preview': './src/whatsapp-preview/whatsapp-preview.js',
    '../linkedin-preview/linkedin-preview': './src/linkedin-preview/linkedin-preview.js',
    '../facebook-desktop-preview/facebook-desktop-preview': './src/facebook-desktop-preview/facebook-desktop-preview.js',
    '../facebook-mobile-preview/facebook-mobile-preview': './src/facebook-mobile-preview/facebook-mobile-preview.js',
    '../slack-preview/slack-preview': './src/slack-preview/slack-preview.js',
    '../opensearch-preview/opensearch-preview': './src/opensearch-preview/opensearch-preview.js',
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
      filename: '../twitter-preview/twitter-preview.html',
      template: 'src/twitter-preview/twitter-preview.html',
      chunks: ['../twitter-preview/twitter-preview']
    }),
    new HtmlWebpackPlugin({
      filename: '../whatsapp-preview/whatsapp-preview.html',
      template: 'src/whatsapp-preview/whatsapp-preview.html',
      chunks: ['../whatsapp-preview/whatsapp-preview']
    }),
    new HtmlWebpackPlugin({
      filename: '../linkedin-preview/linkedin-preview.html',
      template: 'src/linkedin-preview/linkedin-preview.html',
      chunks: ['../linkedin-preview/linkedin-preview']
    }),
    new HtmlWebpackPlugin({
      filename: '../facebook-desktop-preview/facebook-desktop-preview.html',
      template: 'src/facebook-desktop-preview/facebook-desktop-preview.ejs',
      chunks: ['../facebook-desktop-preview/facebook-desktop-preview']
    }),
    new HtmlWebpackPlugin({
      filename: '../facebook-mobile-preview/facebook-mobile-preview.html',
      template: 'src/facebook-mobile-preview/facebook-mobile-preview.ejs',
      chunks: ['../facebook-mobile-preview/facebook-mobile-preview']
    }),
    new HtmlWebpackPlugin({
      filename: '../slack-preview/slack-preview.html',
      template: 'src/slack-preview/slack-preview.html',
      chunks: ['../slack-preview/slack-preview']
    }),
    new HtmlWebpackPlugin({
      filename: '../opensearch-preview/opensearch-preview.html',
      template: 'src/opensearch-preview/opensearch-preview.html',
      chunks: ['../opensearch-preview/opensearch-preview']
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