#!/usr/bin/env bash
DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" >/dev/null 2>&1 && pwd )"
mkdir $1
pushd $1
mkdir -p src/node src/browser
cp ${DIR}/.editorconfig
cp -R ${DIR}/static/ ./
yarn install
popd
