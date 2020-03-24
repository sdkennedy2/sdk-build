// webpack.common.js - common webpack config
/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
// node modules
const fs = require('fs');
const path = require('path');
const merge = require('webpack-merge');

// webpack plugins
const ManifestPlugin = require('webpack-manifest-plugin');
const WebpackNotifierPlugin = require('webpack-notifier');

// config files
const pkg = require('./package.json');
const babelConfig = JSON.parse(fs.readFileSync('./.babelrc'));
const settings = require('./webpack.settings.js');

// Configure Babel loader
const configureBabelLoader = options => {
  return {
    test: /\.js$/,
    exclude: settings.babelLoaderConfig.exclude,
    use: {
      loader: 'babel-loader',
      options: {
        cacheDirectory: true,
        sourceType: 'unambiguous',
        ...options,
      },
    },
  };
};

// Configure Entries
const configureEntries = () => {
  const entries = {};
  for (const [key, value] of Object.entries(settings.entries)) {
    entries[key] = path.resolve(__dirname, settings.paths.src.js + value);
  }

  return entries;
};

// Configure Manifest
const configureManifest = fileName => {
  return {
    fileName: fileName,
    basePath: settings.manifestConfig.basePath,
    map: file => {
      file.name = file.name.replace(/(\.[a-f0-9]{32})(\..*)$/, '$2');
      return file;
    },
  };
};

// The base webpack config
const baseConfig = {
  name: pkg.name,
  entry: configureEntries(),
  output: {
    path: path.resolve(__dirname, settings.paths.dist.base),
    publicPath: settings.urls.publicPath(),
  },
  module: {
    rules: [],
  },
  plugins: [
    new WebpackNotifierPlugin({
      title: 'Webpack',
      excludeWarnings: true,
      alwaysNotify: true,
    }),
  ],
};

// Legacy webpack config
const legacyConfig = {
  module: {
    rules: [configureBabelLoader(babelConfig.env.browserLegacy)],
  },
  plugins: [new ManifestPlugin(configureManifest('manifest-legacy.json'))],
};

// Modern webpack config
const modernConfig = {
  module: {
    rules: [configureBabelLoader(babelConfig.env.browserModern)],
  },
  plugins: [new ManifestPlugin(configureManifest('manifest.json'))],
};

// Common module exports
// noinspection WebpackConfigHighlighting
module.exports = {
  legacyConfig: merge.strategy({
    module: 'prepend',
    plugins: 'prepend',
  })(baseConfig, legacyConfig),
  modernConfig: merge.strategy({
    module: 'prepend',
    plugins: 'prepend',
  })(baseConfig, modernConfig),
};
