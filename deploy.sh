#!/bin/sh

cd build
git add *
git commit -m "Deploying $(cd ..; git describe --long --tags --dirty --alway)"
git push origin gh-pages
