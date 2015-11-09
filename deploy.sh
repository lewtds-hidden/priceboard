#!/bin/sh

rm -rf build

git clone . build
cd build
git remote set-url origin https://github.com/chin-hidden/priceboard/
git checkout gh-pages

cd .. && make

cd build
git add *
git commit -m "Deploying $(cd ..; git describe --long --tags --dirty --alway)"
git push origin gh-pages
