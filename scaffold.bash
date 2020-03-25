#!/usr/bin/env bash
DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" >/dev/null 2>&1 && pwd )"
echo "DIR: $DIR"
echo "ls ${DIR}/."
ls ${DIR}/.
echo "ls ${DIR}/.."
ls ${DIR}/..
mkdir $1
pushd $1
cp ${DIR}/.editorconfig ./
cp -R ${DIR}/static/ ./
yarn install
popd
