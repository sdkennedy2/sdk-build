// webpack.settings.js - webpack settings config
/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable @typescript-eslint/explicit-function-return-type */

// node modules
require('dotenv').config();
const pkg = require(`${process.env.PWD}/package.json`);

// Webpack settings exports
// noinspection WebpackConfigHighlighting
module.exports = {
  name: 'SDK Build',
  target: process.env.WEBPACK_TARGET || 'web',
  pkg,
  paths: {
    src: {
      base: './src/browser/',
      js: './src/browser/js/',
    },
    dist: {
      base: './dist/browser',
      clean: ['**/*'],
    },
    templates: './src/browser/public/',
  },
  urls: {
    live: 'https://dropplayer.com/',
    local: 'http://localhost/',
    critical: 'http://localhost/',
    publicPath: () => process.env.PUBLIC_PATH || '/dist/browser/',
  },
  entries: {
    index: 'index.tsx',
    worker: 'worker/index.ts',
  },
  babelLoaderConfig: {
    exclude: [/node_modules/],
  },
  devServerConfig: {
    public: () => process.env.DEVSERVER_PUBLIC || 'http://localhost:8080',
    host: () => process.env.DEVSERVER_HOST || 'localhost',
    poll: () => process.env.DEVSERVER_POLL || false,
    port: () => process.env.DEVSERVER_PORT || 8080,
    https: () => process.env.DEVSERVER_HTTPS || false,
  },
  manifestConfig: {
    basePath: '',
  },
  webappConfig: {
    logo: './src/browser/favicon-src.png',
    prefix: 'img/favicons/',
  },
};
