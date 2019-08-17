const path = require('path')
const createConfig = require('./createConfig')
const CopyPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = createConfig({
  entry: {
    devtools: './src/devtools.js',
    background: './src/background.js',
    content: './src/content.js',
    'heads-up': './src/heads-up/index.js',
    'twitter-preview': './src/twitter-preview.js',
  },
  output: {
    path: path.join(__dirname, 'dist'),
    filename: '[name].js'
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: 'heads-up.html',
      template: 'src/heads-up/index.html',
      chunks: ['heads-up'],
    }),
    new HtmlWebpackPlugin({
      filename: 'devtools.html',
      template: 'src/devtools.html',
      chunks: []
    }),
    new HtmlWebpackPlugin({
      filename: 'twitter-preview.html',
      template: 'src/twitter-preview.html',
      chunks: ['twitter-preview']
    }),
    new CopyPlugin([
      { from: 'src/assets/', to: 'assets' },
      { from: 'src/manifest.json', to: 'manifest.json' },
    ]),
  ],
  devtool: process.env.NODE_ENV !== 'production'
    ? '#inline-source-map'
    : false
})
