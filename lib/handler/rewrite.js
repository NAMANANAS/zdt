/**
 * Created by harx on 2015/12/28.
 */
var
    url = require('url'),
    path = require('path'),
    config = require('../../config'),
    helper = require('../utilities/helper');

module.exports = function (req, res, next) {
    var rules = config.rewrite || [];
    //循环数组，逐一替换。
    //一个url，可受多条规则影响。
    for (var i = 0, l = rules.length; i < l; i++) {
        if (rules[i].from.test(req.url)) {
            console.log("[Rewrite Rule]".green + "<--:".gray + req.url);
            req.url = req.url.replace(rules[i].from, rules[i].to);
            console.log("[Rewrite Rule]".green + "-->:".gray + req.url)
        }
    }
    next();
};
