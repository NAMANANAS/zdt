/**
 * Created by harx on 2015/9/14.
 *
 * 若目录下有该项目的zdt-config.js，则以该设置覆盖默认的设置。
 */

var
    fs = require('fs'),
    path = require('path'),
    tools = require('./lib/utilities/tools'),
    colors = require('colors'),
    util = require('util')

var host = require('ip').address() || "localhost";
var cwd = process.cwd();

//默认设置
//todo 主要是一些非用户自定义的设置
var defaultCfg = {
    templateEngine: "velocity",//"smarty"
    templateExtName: [".html", ".vm", '.jsp'],
    server: {
        host: "",
        port: ""
    },
    liveReload: false,
    rootPath: "/",//服务器根目录
    templateRoot: "/",//模板根目录。"example/tpl/
    mockRoot: "/mock",
    smarty: {
        templateRoot: "/src/www/protected/views/",
        commonMock: "/mock/smarty/common.js"
    },
    velocity: {},
    sass: {
        includePaths: []
    },
    rewrite: []
};

//创建或读取工作目录下的自定义设置文件
var cwdCfgFile = path.join(process.cwd(), "zdt-config.js");
tools.checkAndCreateFile(cwdCfgFile, fs.readFileSync(path.join(__dirname, 'lib/template/zdt-config.js')));
var cwdCfg = require(cwdCfgFile);

//合并设置文件
tools.extend(defaultCfg, cwdCfg, true);

//设置处理和纠错
defaultCfg.server.host = defaultCfg.server.host || host;
defaultCfg.server.port = defaultCfg.server.port || 8001;
defaultCfg.rootPath = path.join(cwd + defaultCfg.rootPath);
defaultCfg.templateRoot = path.join(defaultCfg.rootPath + defaultCfg.templateRoot);
defaultCfg.smarty.templateRoot = path.join(cwd + defaultCfg.smarty.templateRoot);
defaultCfg.smarty.commonMock = path.join(cwd + defaultCfg.smarty.commonMock);

//console.log('configFile:'.bgCyan + util.inspect(defaultCfg).green);

module.exports = defaultCfg;