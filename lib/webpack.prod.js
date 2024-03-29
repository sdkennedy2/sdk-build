// webpack.prod.js - production builds
/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
const LEGACY_CONFIG = 'legacy';
const MODERN_CONFIG = 'modern';

// node modules
const git = require('git-rev-sync');
const merge = require('webpack-merge');
const moment = require('moment');
const path = require('path');
const webpack = require('webpack');

// webpack plugins
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer')
  .BundleAnalyzerPlugin;
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const CompressionPlugin = require('compression-webpack-plugin');
const ImageminWebpWebpackPlugin = require('imagemin-webp-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
// const WorkboxPlugin = require('workbox-webpack-plugin');
const zopfli = require('@gfx/zopfli');

// config files
const common = require('./webpack.common.js');
const settings = require('./webpack.settings.js');

// Configure file banner
const configureBanner = () => {
  return {
    banner: [
      '/*!',
      ' * @project        ' + settings.name,
      ' * @name           ' + '[filebase]',
      ' * @author         ' + settings.settings.pkg.author.name,
      ' * @build          ' + new Date().toLocaleString(),
      ' * @release        ' + git.long() + ' [' + git.branch() + ']',
      ' * @copyright      Copyright (c) ' +
        moment().format('YYYY') +
        ' ' +
        ' *',
      ' */',
      '',
    ].join('\n'),
    raw: true,
  };
};

// Configure Bundle Analyzer
const configureBundleAnalyzer = (buildType) => {
  if (buildType === LEGACY_CONFIG) {
    return {
      analyzerMode: 'static',
      reportFilename: 'report-legacy.html',
    };
  }
  if (buildType === MODERN_CONFIG) {
    return {
      analyzerMode: 'static',
      reportFilename: 'report-modern.html',
    };
  }
};

// Configure Compression webpack plugin
const configureCompression = () => {
  return {
    filename: '[path].gz[query]',
    test: /\.(js|css|html|svg)$/,
    threshold: 10240,
    minRatio: 0.8,
    deleteOriginalAssets: false,
    compressionOptions: {
      numiterations: 15,
      level: 9,
    },
    algorithm(input, compressionOptions, callback) {
      return zopfli.gzip(input, compressionOptions, callback);
    },
  };
};

// Configure Clean webpack
const configureCleanWebpack = () => {
  return {
    cleanOnceBeforeBuildPatterns: settings.paths.dist.clean,
    verbose: true,
    dry: false,
  };
};

// Configure Html webpack
// const configureHtml = () => {
//   return {
//     templateContent: '',
//     filename: 'webapp.html',
//     inject: false,
//   };
// };

// Configure Webapp webpack
const configureWebapp = () => {
  return {
    logo: settings.webappConfig.logo,
    prefix: settings.webappConfig.prefix,
    cache: false,
    inject: 'force',
    favicons: {
      appName: settings.pkg.name,
      appDescription: settings.pkg.description,
      developerName: settings.pkg.author.name,
      developerURL: settings.pkg.author.url,
      path: settings.paths.dist.base,
    },
  };
};

// Configure Image loader
const configureImageLoader = (buildType) => {
  if (buildType === LEGACY_CONFIG) {
    return {
      test: /\.(png|jpe?g|gif|svg|webp)$/i,
      use: [
        {
          loader: 'file-loader',
          options: {
            name: 'img/[name].[contenthash].[ext]',
          },
        },
      ],
    };
  }
  if (buildType === MODERN_CONFIG) {
    return {
      test: /\.(png|jpe?g|gif|svg|webp)$/i,
      use: [
        {
          loader: 'file-loader',
          options: {
            name: 'img/[name].[contenthash].[ext]',
          },
        },
        {
          loader: 'img-loader',
          options: {
            plugins: [
              require('imagemin-gifsicle')({
                interlaced: true,
              }),
              require('imagemin-mozjpeg')({
                progressive: true,
                arithmetic: false,
              }),
              require('imagemin-optipng')({
                optimizationLevel: 5,
              }),
              require('imagemin-svgo')({
                plugins: [{convertPathData: false}],
              }),
            ],
          },
        },
      ],
    };
  }
};

// Configure terser
const configureTerser = () => {
  return {
    cache: true,
    parallel: true,
    sourceMap: true,
  };
};

// Configure optimization
const configureOptimization = () => {
  return {
    minimizer: [new TerserPlugin(configureTerser())],
  };
};

// Configure Workbox service worker
const configureWorkbox = () => {
  const config = settings.workboxConfig;

  return config;
};

// Production module exports
module.exports = [
  merge(common.legacyConfig, {
    output: {
      filename: path.join('./js', '[name]-legacy.[chunkhash].js'),
    },
    mode: 'production',
    devtool: 'source-map',
    optimization: configureOptimization(LEGACY_CONFIG),
    module: {
      rules: [configureImageLoader(LEGACY_CONFIG)],
    },
    plugins: [
      new webpack.BannerPlugin(configureBanner()),
      new CompressionPlugin(configureCompression()),
      new BundleAnalyzerPlugin(configureBundleAnalyzer(LEGACY_CONFIG)),
    ],
  }),
  merge(common.modernConfig, {
    output: {
      filename: path.join('./js', '[name].[chunkhash].js'),
    },
    mode: 'production',
    devtool: 'source-map',
    optimization: configureOptimization(MODERN_CONFIG),
    module: {
      rules: [configureImageLoader(MODERN_CONFIG)],
    },
    plugins: [
      new CleanWebpackPlugin(configureCleanWebpack()),
      new webpack.BannerPlugin(configureBanner()),
      new ImageminWebpWebpackPlugin(),
      // new WorkboxPlugin.GenerateSW(configureWorkbox()),
      new CompressionPlugin(configureCompression()),
      new BundleAnalyzerPlugin(configureBundleAnalyzer(MODERN_CONFIG)),
    ],
  }),
];
