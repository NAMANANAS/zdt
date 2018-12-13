/**
 * Created by harx on 2015/9/15.
 *
 * 若不存在mock文件，创建一个。
 */
var
    path = require('path'),
    urlTool = require('url'),
    config = require('../../config'),
    tools = require('../utilities/tools'),
    helper = require('../utilities/helper')


var defaultMockData = "module.exports={\n}";

module.exports = function (tplExtToMock) {

    //根据url后缀判断是否需要mock文件。
    var isNeedMockFile = (function (tplExt) {
        tplExt = typeof tplExt === "string" ? [tplExt] : tplExt;

        return function (pathname) {
            return tplExt.indexOf(path.extname(pathname)) !== -1;
        }
    })(tplExtToMock);

    //若不存在则创建一个mock文件。
    var testAndCreateMockFile = function (pathname, callback) {
        var result = defaultMockData;
        var mockFilePath = helper.getTplMockPath(pathname)

        //若为velocity。解析html结构，生成mock数据结构，并输出mock文件。
        if (config.templateEngine === 'velocity') {
            var Data = require('velocity').Data;
            var data = new Data({
                root: config.templateRoot,
                template: path.join(config.rootPath, pathname)
            });
            result = 'module.exports = ' + data.extract({}).str
        }

        tools.checkAndCreateFile(mockFilePath, result);
        callback && callback()
    }

    return function (req, res, next) {
        var pathname = urlTool.parse(req.url).pathname;

        //无需担心因tpl文件不存在而创建多余的mock文件。因为已被404过滤一遍
        if (!isNeedMockFile(pathname)) {
            next()
        } else {
            testAndCreateMockFile(pathname, function () {
                next()
            })
        }
    }
}