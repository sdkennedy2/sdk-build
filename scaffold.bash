#!/usr/bin/env bash
DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" >/dev/null 2>&1 && pwd )"
echo "DIR: $DIR"
echo "ls ."
ls .
echo "ls .."
ls ..
mkdir $1
pushd $1
cp ${DIR}/.editorconfig ./
cp -R ${DIR}/static/ ./
yarn install
popd
