const path = require('path');
const createConfig = require('./config/create');
const CopyPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const resolve = dir => path.join(__dirname, dir);

module.exports = createConfig({
  entry: {
    'index': './src/heads-up/index.js',
    '../devtools/devtools': './src/devtools/devtools.js',
    '../devtools/background': './src/devtools/background.js',
    '../devtools/content': './src/devtools/content.js',
  },
  output: {
    path: resolve('dist/heads-up'),
    filename: '[name].js',
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'src/heads-up/index.html',
      chunks: [ 'index' ],
    }),
    new HtmlWebpackPlugin({
      filename: '../devtools/devtools.html',
      template: 'src/devtools/devtools.html',
      chunks: [],
    }),
    new CopyPlugin([
      { from: 'src/devtools/assets/', to: '../devtools/assets' },
      { from: 'src/manifest.json', to: '../manifest.json' },
    ]),
  ],
  devtool: process.env.NODE_ENV !== 'production'
    ? '#inline-source-map'
    : false,
  resolve: {
    alias: {
      '@shared': resolve('../@shared'),
      '@': resolve('src/heads-up'),
    },
  },
});
