#!/usr/bin/env bash
cwd=$(pwd)
mkdir $1
pushd $1
cp ${cwd}/.editorconfig
cp ${cwd}/static .
yarn add -D sdk-build
popd
