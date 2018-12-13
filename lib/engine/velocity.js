/**
 * Created by harx on 2015/9/14.
 */

var
    velocity = require('velocity'),
    config = require('../../config'),
    colorsSafe = require('colors/safe');

exports.render = function (templatePathname, mockPathname) {

    var Engine = velocity.Engine;

    var result = "";
    try {
        var engine = new Engine({
            root: config.templateRoot,
            template: templatePathname
        });
        result = engine.render(mockPathname);
    } catch (e) {
        console.log("[velocity error]".red + e);
        console.log(
            "["
            + colorsSafe.red("Velocity Error")
            + "]"
            + colorsSafe.green(e)
        );
    }
    return result;
};