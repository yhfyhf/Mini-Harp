var connect = require('connect');
var serveStatic = require('serve-static');
var makeJade = require('./lib/processor/jade');
var makeLess = require('./lib/processor/less');

module.exports = function(root) {
    return connect()
        // here add a log lib
        .use(makeJade(root))
        .use(makeLess(root))
        .use(serveStatic(root));
};
