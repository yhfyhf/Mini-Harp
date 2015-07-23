#!/usr/bin/env node
var argv = require('minimist')(process.argv.slice(2));
var port = argv.port || 4000;
var root = argv._[0] || process.cwd();

var createMiniHarp = require("mini-harp"),
    app = createMiniHarp(root);

console.log("Starting mini-harp on http://localhost:" + port);
app
    // .use(function(request, response, next) {
    //     console.log()
    //     console.log("[%s]  %s  %s  %d  \"%s\"",
    //         (new Date()).toISOString(),
    //         request.method,
    //         request.url,
    //         response.statusCode,
    //         request.headers['user-agent']
    //     );
    //     next();
    // })
    .listen(port);
