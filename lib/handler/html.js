/**
 * Created by harx on 2015/9/14.
 *
 * 处理.html扩展名的请求
 */
var
    url = require('url'),
    path = require('path'),
    config = require('../../config'),
    helper = require('../utilities/helper'),
    MockJs = require('mockjs')

module.exports = (function () {
    //若templateEngine未设置或错误
    try {
        var engine = require('../engine/' + config.templateEngine);
    } catch (e) {
        return function (req, res, next) {
            next();
        }
    }

    return function (req, res, next) {
        var urlPathname = url.parse(req.url).pathname;
        //若非指定后缀
        if (config.templateExtName.indexOf(path.extname(urlPathname)) === -1) {
            next();
            return;
        }
        //去缓存
        delete require.cache[require.resolve(helper.getTplMockPath(urlPathname))];
        //mockJs生成数据
        var mockData = MockJs.mock(require(helper.getTplMockPath(urlPathname)));

        var result = engine.render(path.join(config.rootPath, urlPathname), JSON.stringify(mockData));

        console.log("[Template Path] ".green + path.join(config.rootPath + urlPathname));
        console.log("[MockFile Path] ".green + helper.getTplMockPath(urlPathname));

        //res.setHeader('Content-Type', 'text/html');
        res.writeHead(200, {'Content-Type': 'text/html'});
        res.end(result);
    };
})();