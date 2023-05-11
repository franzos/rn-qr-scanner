#!/bin/bash

cd "$(dirname "$0")"
cd ..
echo "Running clean script in $PWD"

echo "rm -rf node_modules"
rm -rf node_modules
echo "rm -rf yarn.lock"
rm -rf yarn.lock
rm -rf package-lock.json

echo "yarn in $PWD"
yarn