var fs = require('fs');
var path = require('path');
var less = require('less');

var makeLess = function (root) {
    return function (req, res, next) {
        if (path.extname(req.url) == '.css') {
            // request a CSS file
            var url = root + req.url;
            fs.readFile(url, {encoding: "utf-8"}, function (err, data) {
                if (!err) {
                    res.end(data);
                } else {
                    var lessUrl = url.substring(0, url.length - 3) + 'less';
                    fs.readFile(lessUrl, {encoding: "utf-8"}, function (err, data) {
                        if (err) {
                            // less file open error
                            res.statusCode = 404;
                            res.end();
                        } else {
                            // render less template as CSS
                            less.render(data, function (err, output) {
                                res.setHeader("Content-Length", output.length);
                                res.setHeader("Content-Type", "text/css; charset=UTF-8");
                                res.end(output);
                            });
                        }
                    });
                }
            });
        } else if (path.extname(req.url) == '.less') {
            // does not allow to request less files
            res.statusCode = 404;
            res.end();
        } else {
            // pass the request down the middleware stack
            next();
        }
    };
};

module.exports = makeLess;
