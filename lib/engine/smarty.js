/**
 * Created by harx on 2015/9/16.
 */
var
    fs = require('fs'),
    tools = require('../utilities/tools'),
    path = require('path'),
    config = require('../../../zdt-config'),
    util = require('util')

/**
 * jSmart 配置
 */
require('jsmart');
jSmart.prototype.getTemplate = function (name) {
    return fs.readFileSync(config.smarty.templateRoot + name, 'utf8');
};
jSmart.prototype.left_delimiter = '<{';
jSmart.prototype.right_delimiter = '}>';

exports.render = function (templatePathName, pageDate) {
    var tpl = fs.readFileSync(templatePathName, {encoding: 'utf-8'});
    var compiledTpl = new jSmart(tpl);

    var commonData = require(path.relative(__dirname, config.smarty.commonMock));
    var data = tools.extend(commonData, pageDate);
    console.log('mockData:' + util.inspect(data))

    return compiledTpl.fetch(data);
};