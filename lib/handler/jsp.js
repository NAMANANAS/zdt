/**
 * Created by harx on 2016/5/27.
 */
/**
 * Created by harx on 2015/10/15.
 */
var
    jspRender = require('../../node_modules/node-jsp/src/renderer'),
    path = require('path'),
    url = require('url'),
    colorsSafe = require('colors/safe'),
    config = require('../../config'),
    helper = require('../utilities/helper'),
    MockJs = require('mockjs')

module.exports = function (opt) {
    opt = opt || {};
    var renderer = jspRender(opt)

    return function (req, res, next) {
        var reqPathname = url.parse(req.url).pathname;
        if (".jsp" !== path.extname(reqPathname).toLowerCase()) {
            next();
            return false;
        }

        var mockData = MockJs.mock(require(helper.getTplMockPath(reqPathname)));
        try {
            renderer.renderFile(path.join(config.rootPath, reqPathname), mockData)
                .then(function (result) {
                    res.setHeader('Content-Type', "text/html; charset=UTF-8");
                    res.end(result)
                })
        } catch (e) {
            console.log("[jsp error]".red + e);
            console.log(
                "["
                + colorsSafe.red("jsp Error")
                + "]"
                + colorsSafe.green(e)
            );
            throw e
        }
    }
};