#!/usr/bin/env bash

concurrently \
  "scripts/babel.sh --watch" \
  "scripts/run-server.sh $*"