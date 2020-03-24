#!/usr/bin/env bash

concurrently \
  "scripts/babel.sh --watch" \
  "sleep 5 && nodemon --watch dist/node $*"