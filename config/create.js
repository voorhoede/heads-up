const webpack = require('webpack')
const { merge } = require('webpack-merge')
const { VueLoaderPlugin } = require('vue-loader')
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')
const path = require('path');

module.exports = (config, target = { chrome: 63, firefox: 48 }) => {
  const bubleOptions = {
    target,
    objectAssign: 'Object.assign',
    transforms: {
      forOf: false,
      modules: false
    }
  }

  const baseConfig = {
    mode: process.env.NODE_ENV === 'production' ? 'production' : 'development',
    module: {
      rules: [
        {
          test: /\.js$/,
          loader: 'buble-loader',
          exclude: /node_modules|vue\/dist|vuex\/dist/,
          options: bubleOptions
        },
        {
          test: /\.vue$/,
          loader: 'vue-loader',
          options: {
            compilerOptions: {
              preserveWhitespace: false
            },
            transpileOptions: bubleOptions
          }
        },
        {
          test: /\.css$/,
          use: [
            'vue-style-loader',
            'css-loader',
          ]
        },
        {
          test: /\.svg$/,
          loader: 'vue-svg-loader',
        },

        // enable loading fonts and images in social media previews
        {
          test: /\.(png|woff2|gif)$/,
          loader: 'url-loader',
          options: {
            publicPath: '/',
            name(file) {
              const srcFolder = path.join(process.cwd(), './src');
              const dir = path.dirname(file).substr(srcFolder.length);
              // the dots are required to load the file
              return `..${dir}/[name].[ext]`;
            },
            limit: 0,
          }
        },

        {
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /node_modules/
        },
      ]
    },
    performance: {
      hints: false
    },
    plugins: [
      new VueLoaderPlugin(),
      new FriendlyErrorsPlugin(),
      new webpack.DefinePlugin({
        'process.env': {
          NODE_ENV: process.env.NODE_ENV ? `"${process.env.NODE_ENV}"` : '"development"'
        }
      }),
    ],
    stats: {
      colors: true
    }
  }

  if (process.env.NODE_ENV === 'production') {
    const UglifyPlugin = require('uglifyjs-webpack-plugin')
    baseConfig.optimization = {
      minimizer: [
        new UglifyPlugin({
          exclude: /backend/,
          uglifyOptions: {
            compress: {
              // turn off flags with small gains to speed up minification
              arrows: false,
              collapse_vars: false, // 0.3kb
              comparisons: false,
              computed_props: false,
              hoist_funs: false,
              hoist_props: false,
              hoist_vars: false,
              inline: false,
              loops: false,
              negate_iife: false,
              properties: false,
              reduce_funcs: false,
              reduce_vars: false,
              switches: false,
              toplevel: false,
              typeofs: false,

              // a few flags with noticable gains/speed ratio
              // numbers based on out of the box vendor bundle
              booleans: true, // 0.7kb
              if_return: true, // 0.4kb
              sequences: true, // 0.7kb
              unused: true, // 2.3kb

              // required features to drop conditional branches
              conditionals: true,
              dead_code: true,
              evaluate: true
            },
            mangle: {
              safari10: true
            }
          },
          sourceMap: false,
          cache: true,
          parallel: true
        })
      ]
    }
  }

  return merge(baseConfig, config)
}
