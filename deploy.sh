#!/bin/sh

rm -rf build
mkdir build && cd build
git init
git remote add origin https://github.com/chin-hidden/priceboard
git fetch && git checkout gh-pages

cd .. && make

git add *
git commit -m "Deploying $(cd ..; git describe --long --tags --dirty --alway)"
git push origin gh-pages
