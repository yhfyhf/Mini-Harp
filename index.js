var connect = require('connect');
var serveStatic = require('serve-static');
var makeJade = require('./lib/processor/jade');

module.exports = function(root) {
    return connect()
        // here add a log lib
        .use(makeJade(root))
        .use(serveStatic(root));
};
