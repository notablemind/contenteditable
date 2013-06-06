
build: components index.js
	@component build --dev

components: component.json
	@component install --dev

clean:
	rm -fr build components template.js

.PHONY: clean

testem: build
	@testem -f test/testem.json -l Chrome

# open browser correctly in mac or linux
UNAME_S := $(shell uname -s)
ifeq ($(UNAME_S),Linux)
		open := google-chrome
endif
ifeq ($(UNAME_S),Darwin)
		open := open
endif

test: build
	@${open} test/index.html

testci: build
	@testem ci -f test/testem.json -l PhantomJS

testci-e2e: build
	@mocha-phantomjs test/index.html

.PHONY: clean testem test testci
