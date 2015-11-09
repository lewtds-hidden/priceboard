#!/bin/sh

rm -rf build

git clone . build
cd build
git checkout gh-pages

cd .. && make

cd build
git add *
git commit -m "Deploying $(cd ..; git describe --long --tags --dirty --alway)"
git push origin gh-pages
