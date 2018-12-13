/**
 * Created by harx on 2015/9/30.
 */
module.exports = {
    templateEngine: "velocity",//"smarty"，"jsp","velocity"
    templateExtName: [".html", ".vm", '.jsp'],
    server: {
        //host: "localhost",
        port: 8001
    },
    liveReload: false,
    rootPath: "/",//服务器根目录
    templateRoot: "/",//模板根目录。'rootPath/templateRoot'
    mockRoot: "/mock",
    //smarty: {
    //    templateRoot: "./src/www/protected/views/",
    //    commonMock: "./mock/smarty/common.js"
    //},
    sass: {
        includePaths: []//同node-sass的设置。
    },
    rewrite: [
        //{
        //    from: /(\/style)\/style/,//正则表达式
        //    to: "/$1"//字符串
        //},
    ]
};
