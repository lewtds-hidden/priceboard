BROWSERIFY = ./node_modules/.bin/browserify
CHOKIDAR = ./node_modules/.bin/chokidar
BABEL = ./node_modules/.bin/babel
BROWSER_SYNC = ./node_modules/.bin/browser-sync


all: scripts

scripts:
	$(BABEL) scripts --out-dir .tmp/scripts
	$(BROWSERIFY) .tmp/scripts/main.js --outfile bundle.js

watch:
	$(CHOKIDAR) -p scripts -c "make && make sync"

serve:
	$(BROWSER_SYNC) start --server

sync:
	$(BROWSER_SYNC) reload

.PHONY: all scripts
