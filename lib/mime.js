var path = require('path');

var types =  {
    "css": "text/css",
    "gif": "image/gif",
    "html": "text/html",
    "ico": "image/x-icon",
    "jpeg": "image/jpeg",
    "jpg": "image/jpeg",
    "js": "text/javascript",
    "json": "application/json",
    "pdf": "application/pdf",
    "png": "image/png",
    "svg": "image/svg+xml",
    "swf": "application/x-shockwave-flash",
    "tiff": "image/tiff",
    "txt": "text/plain",
    "wav": "audio/x-wav",
    "wma": "audio/x-ms-wma",
    "wmv": "video/x-ms-wmv",
    "xml": "text/xml"
};

var mime = function () {
    return function (req, res, next) {
        res.setHeader("Server", "Node/V5");
        res.setHeader('Accept-Ranges', 'bytes');
        
        var ext = path.extname(req.url);
        ext = ext ? ext.slice(1) : 'unknown';
        var contentType = types[ext] || "text/plain";
        res.setHeader("Content-Type", contentType);
        next();
    };
};

module.exports = mime;
