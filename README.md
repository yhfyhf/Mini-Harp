# Mini-Harp
A web server that serves static files with built-in preprocessing writtern in node. It is inspired by [`Harp`](http://harpjs.com/), and uses [`connect`](https://github.com/senchalabs/connect) to add middlewares.

## Features
* print web-server logs
* serve static files from a given root and listen on a specfied port
* render `.jade` templates to HTML
* render `.less` to CSS
* reject stupid requests (does not respond to .jade or .less')

## Usage
```bash
$ mini-harp root --port=5000
```

## Dependencies
* "connect": "^3.0.1",
* "jade": "^1.3.0",
* "less": "^1.7.0",
* "minimist": "^1.1.2",
* "serve-static": "^1.0.3"

## Test
To run the test cases, first install dev dependencies, then run `mocha verify`:
```
$ npm install mocha chai supertest --save-dev
$ mocha verify
```

## License
IDC (I Don't Care)
