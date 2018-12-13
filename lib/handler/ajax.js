/**
 * Created by harx on 2015/10/23.
 */
var tools = require('../utilities/tools');
var path = require('path');
var urlTool = require('url');
var config = require('../../config');
var fs = require('fs');

module.exports = function (req, res, next) {
    if (!tools.isAjax(req)) {
        next();
        return;
    }
    var ajaxPath = path.join(config.rootPath, config.mockRoot, "ajax", urlTool.parse(req.url).pathname);
    var result;
    if (tools.checkUrlExtname(req.url, ".json")) {
        ajaxPath += ".js";
        tools.checkAndCreateFile(ajaxPath, "module.exports={}");

        delete require.cache[require.resolve(ajaxPath)];
        result = JSON.stringify(require(ajaxPath));
        res.writeHead(200, {'Content-Type': 'application/json'});
        res.end(result);
    } else {
        tools.checkAndCreateFile(ajaxPath, "<xml></xml>");
        fs.readFile(ajaxPath, function (err, data) {
            if (err) {
                res.end(err);
            }
            res.end(data)
        })
    }
};