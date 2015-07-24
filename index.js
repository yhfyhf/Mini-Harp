var connect = require('connect');
var serveStatic = require('serve-static');
var log = require('./lib/log');
var serveIndex = require('./lib/serveIndex');
var mime = require('./lib/mime');
var makeJade = require('./lib/processor/jade');
var makeLess = require('./lib/processor/less');

module.exports = function(root) {
    return connect()
        .use(log(root))
        .use(serveIndex(root))
        .use(makeJade(root))
        .use(makeLess(root))
        .use(serveStatic(root))
        .use(mime());
};
