#!/usr/bin/env bash
DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" >/dev/null 2>&1 && pwd )"
MODULE="${DIR}/../lib/node_modules/sdk-build"
pushd $1
cp ${MODULE}/.editorconfig ./
cp -R ${MODULE}/static ./
yarn install
popd
