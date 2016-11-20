# citeproc-js

Fork of *citeproc-js* which cleans up the build process, removes a few unwanted things, precompiles
all XML to JSON, and adds some Inkwell-specific rich-formatting output. 

## Build

    ./tools/populate.sh

This will produce the top-level `citeproc.js` file.

    uglifyjs citeproc.js --compress --mangle --comments -o citeproc.min.js

This will produce the top-level `citeproc.min.js` file.


## Documentation

See `/manual/index.html` for comprehensive documentation.

## License

Common Public Attribution License (CPAL)
