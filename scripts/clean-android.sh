#!/bin/bash

export ANDROID_HOME=$HOME/Android/Sdk && \
export PATH=$PATH:$ANDROID_HOME/emulator && \
export PATH=$PATH:$ANDROID_HOME/platform-tools

cd "$(dirname "$0")" || exit
cd ..
echo "Running clean script in $PWD"

cd android || exit
echo "./gradlew clean"
./gradlew clean

cd ..

echo "rm -rf node_modules"
rm -rf node_modules
echo "rm -rf yarn.lock"
rm -rf yarn.lock
rm -rf package-lock.json

echo "rm -rf android/.cxx"
rm -rf android/.cxx
echo "rm -rf android/.gradle"
rm -rf android/.gradle
echo "rm -rf android/build"
rm -rf android/build

echo "yarn in $PWD"
yarn