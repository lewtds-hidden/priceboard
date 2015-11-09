BROWSERIFY = ./node_modules/.bin/browserify
CHOKIDAR = ./node_modules/.bin/chokidar
BABEL = ./node_modules/.bin/babel
BROWSER_SYNC = ./node_modules/.bin/browser-sync


all: scripts styles html

dirs:
	@mkdir -p build

scripts: dirs
	$(BABEL) scripts --out-dir .tmp/scripts
	$(BROWSERIFY) .tmp/scripts/main.js --outfile build/bundle.js

html: dirs
	cp index.html build

styles: dirs
	cp -rf styles build

watch:
	$(CHOKIDAR) -p scripts -c "make && make sync"

serve:
	$(BROWSER_SYNC) start --server

sync:
	$(BROWSER_SYNC) reload

clean:
	@rm -rf .tmp build

.PHONY: all scripts dirs html watch serve sync clean
