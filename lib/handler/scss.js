/**
 * Created by harx on 2015/10/8.
 */

var
    sass = require('node-sass'),
    path = require('path'),
    url = require('url'),
    config = require("../../config"),
    tools = require("../utilities/tools"),
    colorsSafe = require('colors/safe');


module.exports = function (opt) {
    opt = opt || {};

    return function (req, res, next) {

        if (".scss" !== path.extname(url.parse(req.url).pathname).toLowerCase()) {
            next();
            return;
        }

        var options = {
            outputStyle: "compressed",
            file: path.join(config.rootPath + url.parse(req.url).pathname)
        };
        tools.extend(options, opt, true);

        sass.render(options, function (error, result) {
            if (error) {
                console.log(
                    "["
                    + colorsSafe.red("SCSS Error")
                    + "]"
                    + colorsSafe.green("(" + error.line + ":" + error.column + ") ")
                    + colorsSafe.cyan(error.message))
            } else {
                var text = result.css && result.css.toString() || "";
                res.setHeader("Content-Type", "text/css");
                res.end(text);
            }
        })
    }
};