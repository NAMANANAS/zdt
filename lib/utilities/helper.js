/**
 * Created by harx on 2015/10/8.
 * 组件方法
 * 依赖于该项目。
 * 根据项目设置，完成一些基础工作。
 */
var
    urlTool = require('url'),
    path = require('path'),
    mkdirp = require('mkdir-p'),
    fs = require('fs'),
    config = require('../../config')


module.exports = {
    /**
     * 根据url路径，返回mock文件的相对路径
     * @param tplPathname url的pathname
     * @return string 模板的渲染数据地址
     */
    getTplMockPath: function (tplPathname) {
        return path.join(config.rootPath, config.mockRoot, tplPathname) + ".js";
    }
}