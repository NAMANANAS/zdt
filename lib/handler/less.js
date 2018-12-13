/**
 * Created by harx on 2015/11/24.
 */
var
    less = require('less'),
    path = require('path'),
    url = require('url'),
    config = require("../../config"),
    colorsSafe = require('colors/safe'),
    fs = require('fs')
    ;

function renderLess(str, opt, callback) {
    less.render(str, opt, function (error, result) {
        if (error) {
            console.log(
                "["
                + colorsSafe.red("LESS Error")
                + "]"
                + colorsSafe.green("(" + error.line + ":" + error.column + ") ")
                + colorsSafe.cyan(error.message))
        } else {
            callback && callback(result.css);
        }
    })
}

module.exports = function (opt) {
    opt = opt || {};

    return function (req, res, next) {

        if (".less" !== path.extname(url.parse(req.url).pathname).toLowerCase()) {
            next();
            return;
        }

        var filePath = path.join(config.rootPath + url.parse(req.url).pathname);
        fs.readFile(filePath, 'utf8', function (err, data) {
            if (err) {
                throw err;
            } else {
                renderLess(data, opt, function (result) {
                    res.setHeader("Content-Type", "text/css");
                    res.end(result);
                });
            }
        })
    }
}