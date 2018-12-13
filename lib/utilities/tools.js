/**
 * Created by harx on 2015/9/15.
 * 工具方法
 * 不依赖于项目的设置。
 * 独立于项目的工具。
 */
var
    urlTool = require('url'),
    path = require('path'),
    mkdirp = require('mkdir-p'),
    fs = require('fs')

module.exports = {
    /**
     * 判断一个url是否为指定的扩展名。
     * @param url
     * @param extname 需要判断的扩展名，以“.”开头。
     * @returns {boolean}
     */
    checkUrlExtname: function (url, extname) {
        return path.extname(urlTool.parse(url).pathname).toLowerCase() === extname.toLowerCase();
    },
    /**
     * 判断是否为ajax请求
     * @param req
     * @returns {*|boolean}
     */
    isAjax: function (req) {
        return req.headers["x-requested-with"] && req.headers["x-requested-with"] == 'XMLHttpRequest' && !this.checkUrlExtname(req.url, ".js")
            || this.checkUrlExtname(req.url, ".json");
    },
    /**
     * 把一个对象的属性复制到另一个对象。
     * @param to 集大成者
     * @param from 贡献属性者
     * @param override 遇到相同属性是否覆盖
     * @returns {*}
     */
    extend: function (to, from, override) {
        override = override || true;
        for (var prop in from) {
            if (from.hasOwnProperty(prop) && (!to.hasOwnProperty(prop) || override)) {
                to[prop] = from[prop];
            }
        }
        return to;
    }
    ,
    isFileExistSync: function (fileAbsPath) {
        try {
            return !!fs.statSync(fileAbsPath).isFile();
        } catch (e) {
            return false;
        }
    },
    /**
     * 检测一个文件是否存在，若不存在则创建。
     * @param filePath 文件路径
     * @param fileData 文件数据
     * @returns {boolean}
     */
    checkAndCreateFile: function (filePath, fileData) {
        try {
            var stats = fs.statSync(filePath);
            if (stats.isFile()) {
                //console.log('File Exists:'.bgCyan + filePath);
                return true;
            }
        }
        catch (e) {
            mkdirp.sync(path.dirname(filePath));
            try {
                fs.writeFileSync(filePath, fileData);
                console.log("[File created]".green + filePath);
            }
            catch (err) {
                if (err) throw err;
            }
        }
    }
};