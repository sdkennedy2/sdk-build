#!/usr/bin/env bash

# Wait 5 seconds for compiling to finish
sleep 5
node_modules/.bin/webpack-dev-server --config node_modules/sdk-build/lib/webpack.dev.js