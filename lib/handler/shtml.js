/**
 * Created by harx on 2015/10/15.
 */
var
    path = require('path'),
    url = require('url'),
    config = require('../../config'),
    SSI = require('node-ssi');

module.exports = function (opt) {
    opt = opt || {};
    var ssi = new SSI({
        baseDir: config.rootPath,
        encoding: 'utf-8',
        payload: {
            v: 5
        }
    });
    return function (req, res, next) {
        var reqPathname = url.parse(req.url).pathname;
        if (".shtml" !== path.extname(reqPathname).toLowerCase()) {
            next();
            return false;
        }

        var tplFile = path.join(config.rootPath + reqPathname);

        ssi.compileFile(tplFile, {}, function (err, content) {
            if (err) {
                console.log('SSI ERROR:' + err)
                throw err;
            } else {
                res.setHeader('Content-Type', "text/html; charset=UTF-8");
                res.end(content)
            }
        })
    }
};