#!/usr/bin/env bash
DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" >/dev/null 2>&1 && pwd )"
MODULE="${DIR}/../lib/node_modules/sdk-build"
mkdir $1
pushd $1
cp -R ${MODULE}/static/ ./
cp -R ${MODULE}/.gitignore ./
yarn install
popd
