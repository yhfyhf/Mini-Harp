var connect = require('connect');
var log = require('./lib/processor/log');
var serveStatic = require('serve-static');
var makeJade = require('./lib/processor/jade');
var makeLess = require('./lib/processor/less');
var serveIndex = require('./lib/processor/serveIndex');

module.exports = function(root) {
    return connect()
        .use(log(root))
        .use(serveIndex(root))
        .use(makeJade(root))
        .use(makeLess(root))
        .use(serveStatic(root));
};
