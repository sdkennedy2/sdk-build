// webpack.dev.js - developmental builds
/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable @typescript-eslint/explicit-function-return-type */

// node modules
const merge = require('webpack-merge');
const path = require('path');
const webpack = require('webpack');

// webpack plugins
const HtmlWebpackPlugin = require('html-webpack-plugin');

// config files
const common = require('./webpack.common.js');
const settings = require('./webpack.settings.js');

// Development module exports
module.exports = merge(common.modernConfig, {
  output: {
    filename: path.join('./js', '[name].[contenthash].js'),
    publicPath: settings.devServerConfig.public() + '/',
  },
  mode: 'development',
  devtool: 'eval-source-map',
  devServer: {
    public: settings.devServerConfig.public(),
    contentBase: path.resolve(__dirname, settings.paths.templates),
    host: settings.devServerConfig.host(),
    port: settings.devServerConfig.port(),
    https: Boolean(parseInt(settings.devServerConfig.https())),
    open: true,
    disableHostCheck: true,
    hot: false,
    // hot: true,
    overlay: true,
    watchContentBase: true,
    watchOptions: {
      poll: !!parseInt(settings.devServerConfig.poll()),
      ignored: /node_modules/,
    },
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
    historyApiFallback: true,
  },
  module: {
    rules: [
      {
        test: /\.(png|jpe?g|gif|svg|webp)$/i,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: 'img/[name].[contenthash].[ext]',
            },
          },
        ],
      },
    ],
  },
  plugins: [
    // new webpack.HotModuleReplacementPlugin(),
    new HtmlWebpackPlugin({
      inject: false,
      template: path.resolve(__dirname, 'index-dev.html'),
    }),
  ],
});
