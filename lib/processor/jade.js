var fs = require('fs');
var path = require('path');
var jade = require('jade');

var makeJade = function(root) {
    return function(req, res, next) {
        if (path.extname(req.url) == '.html') {
            // request an HTML file
            var url = root + req.url;
            fs.readFile(url, {encoding: "utf-8"}, function(err, data) {
                if (!err) {
                    res.end(data);
                } else {
                    var jadeUrl = url.substring(0, url.length - 4) + 'jade';
                    fs.readFile(jadeUrl, {encoding: "utf-8"}, function(err, data) {
                        if (err) {
                            // jade file open error
                            res.statusCode = 404;
                            res.end();
                        } else {
                            // render jade template as html
                            var html = jade.render(data);
                            res.setHeader("Content-Length", html.length);
                            res.setHeader("Content-Type", "text/html; charset=UTF-8");
                            res.end(html);
                        }
                    });
                }
            });
        } else if (path.extname(req.url) == '.jade') {
            // does not allow to request jade files
            res.statusCode = 404;
            res.end();
        } else {
            // pass the request down the middleware stack
            next();
        }
    };
};

module.exports = makeJade;
