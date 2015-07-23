var connect = require('connect');
var serveStatic = require('serve-static');

module.exports = function(root) {
    return connect()
        .use(serveStatic(root));
};
