#!/usr/bin/env node

var
    fs = require('fs'),
    path = require('path'),
    config = require('../config'),
    colors = require('colors'),
    tools = require('../lib/utilities/tools');

var cwd = process.cwd();
var args = process.argv.slice(2);
/**
 * zdt 所支持的命令参数
 */
var zdt = {
    ws: webServer,
    build: build
};
/**
 * zdt 基本功能。
 * 本地服务器。
 */
function webServer() {
    require("../lib/index")
}

/**
 * 构建功能。
 * 执行gulp任务。
 */
function build() {
    var opt = args[1];
    var gulp = require('gulp');

    //执行加载gulpfile
    var gulpFilePath = path.join(cwd, "gulpfile.js");
    //todo 性能优化。即使文件已经存在还是会读取template下文件。
    tools.checkAndCreateFile(gulpFilePath, fs.readFileSync(path.join(__dirname, "../lib/template/gulpfile.js")));
    require(gulpFilePath);

    //根据参数，执行不同的task
    if (!opt || opt === "develop") {
        gulp.start('develop')
    } else if (opt === "release") {
        gulp.start("release")
    } else {
        logError();
    }
}

//todo 扩展成个输出命令帮助的包
function logError() {
    console.log("[" +
        "ERROR".red +
        "] " +
        "\nWrong Arguments. Should Be:" +
        "\n\tzdt [ws]".green +
        "\nOR" +
        "\n\tzdt build [ [develop] || release ]".green
    )
}

/**
 * 入口
 */
var commond = args[0] ? args[0] : "ws";
zdt[commond] ? zdt[commond]() : logError();