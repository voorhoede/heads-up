const path = require('path');
const webpack = require('webpack');
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const resolve = dir => path.join(__dirname, dir);

const config = {
  mode: process.env.NODE_ENV === 'production' ? 'production' : 'development',
  entry: {
    'devtools/devtools': './wrapper/devtools/devtools.js',
    'devtools/background': './wrapper/devtools/background.js',
    'devtools/content': './wrapper/devtools/content.js',
  },
  output: { path: resolve('dist') },
  plugins: [
    new FriendlyErrorsPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: process.env.NODE_ENV ? `"${ process.env.NODE_ENV }"` : '"development"',
      },
    }),
    new HtmlWebpackPlugin({
      filename: 'devtools/devtools.html',
      template: './wrapper/devtools/devtools.html',
      chunks: [],
    }),
    new CopyPlugin({
      patterns: [
        { from: 'wrapper/devtools/assets/', to: 'devtools/assets' },
        { from: 'wrapper/manifest.json', to: 'manifest.json' },
        { from: 'wrapper/vue.global.prod.js', to: 'vue.global.prod.js' },
      ],
    }),
  ],
  devtool: process.env.NODE_ENV !== 'production'
    ? 'inline-source-map'
    : false,
  stats: {
    colors: true,
  },
};

module.exports = config;
