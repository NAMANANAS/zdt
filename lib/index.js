/**
 * Created by harx on 2015/9/17.
 */

var
    connect = require('connect'),
    serveStatic = require('serve-static'),
    serveIndex = require('serve-index'),
    morgan = require('morgan'),
    path = require('path'),
    url = require('url'),
    mime = require('mime'),
    colors = require('colors'),
    colorSafe = require('colors/safe'),
    livereload = require('livereload'),
    config = require('../config'),
    handler = require("./handler"),
    fs = require('fs')

var app = connect();

/**
 * 改写url
 */
app.use(handler.rewrite)
/**
 * 若目录下有index.html，则重定向为该文件。
 * 因为velocity解析依赖于文件后缀名。
 * 免于还得手动输入文件名。
 */
app.use('/', function (req, res, next) {
    if (req.url[req.url.length - 1] === "/") {
        try {
            fs.statSync(path.join(config.rootPath, req.url, 'index.html'))
            //req.url = "/index.html"
            res.writeHead(302, {
                'location': req.url + 'index.html'
            });
            res.end();
        } catch (e) {
        }
    }
    next()
})
/**
 * 输出请求链接
 */
app.use(morgan("dev"))
/**
 * 设置相应相关参数
 */
app.use(function (req, res, next) {

    req.url = decodeURIComponent(req.url)
    //todo .scss请求，返回的是text/scss之类的文档类型，浏览器不解析，直接下载。
    res.setHeader('Cache-Control', 'private, no-cache, no-store, must-revalidate')
    //res.setHeader("Content-Type", mime.lookup(url.parse(req.url).pathname));
    next();
});
/**
 * 处理ajax请求；
 */
app.use(handler.ajax);
/**
 * 创建 Mock数据文件
 */
app.use(handler.mockFile(config.templateExtName));
/**
 * 404拦截
 */
app.use(handler.tpl404(config.templateExtName))
/**
 * 处理SCSS请求
 */
//todo 选项全部可配置
app.use(handler.scss({
    outputStyle: "nested",
    includePaths: config.sass.includePaths,
    //omitSourceMapUrl: options.omitSourceMapUrl,
    //indentedSyntax: options.indentedSyntax,
    //outFile: options.dest,
    //precision: options.precision,
    //sourceComments: options.sourceComments,
    //sourceMapEmbed: options.sourceMapEmbed,
    //sourceMapContents: options.sourceMapContents,
    //sourceMap: options.sourceMap,
    //sourceMapRoot: options.sourceMapRoot,
    //importer: options.importer,
    //functions: options.functions,
    //indentWidth: options.indentWidth,
    //indentType: options.indentType,
    //linefeed: options.linefeed
}))
/**
 * 处理LESS请求
 */
app.use(handler.less({
    compress: false
}))
/**
 * 处理jsp
 */
app.use(handler.jsp())
/**
 * 处理shtml
 */
app.use(handler.shtml())
/**
 * 处理html请求
 */
app.use(handler.html)
//app.use(require('./utilities/handler/sass'));
/**
 * 响应返回静态资源
 */
app.use(serveStatic(config.rootPath), {
//dotfiles: "allow",
//fallthrough: false,
//redirect: false,
    index: false
});
/**
 * 响应返回目录列表
 */
app.use(serveIndex(config.rootPath));

var server = app.listen(config.server.port, config.server.host, function (err) {
    console.log(colorSafe.bgCyan("Server started at: http://" + config.server.host + ":" + config.server.port))
});

if (config.liveReload) {
    var liveServer = livereload.createServer();
    liveServer.watch(config.rootPath);
    console.log(colorSafe.bgCyan("LiveReload started at port: " + liveServer.config.port))
}

//require('opn')("http://" + config.server.host + ":" + config.server.port)

