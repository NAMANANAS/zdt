/**
 * Created by harx on 2015/10/27.
 * 模板文件过滤。
 * 若访问不存在文件，则返回404.
 * 否则，正常解析。
 */
var
    path = require('path'),
    urlTool = require('url'),
    config = require('../../config'),
    tools = require('../utilities/tools'),
    helper = require('../utilities/helper'),
    fs = require('fs');

module.exports = function (tplExtToMock) {

    return function (req, res, next) {
        var pathname = urlTool.parse(req.url).pathname;
        var file = path.join(config.rootPath, pathname);
        try {
            var stat = fs.statSync(file)
            //if (stat.isDirectory()) {
                next()
            //    return
            //} else if (stat.isFile()) {
            //
            //}

        } catch (e) {
            res.writeHeader(404, "NOT FOUND", {
                "content-type": 'text/plain'
            })
            res.end()
        }

    }
};