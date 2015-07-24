var log = function (root) {
    return function (req, res, next) {
        console.log("[%s]  %s  %s  \"%s\"",
            (new Date()).toISOString(),
            req.method,
            req.url,
            req.headers['user-agent']
        );
        next();
    };
};

module.exports = log;
