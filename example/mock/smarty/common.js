/**
 * Created by harx on 2015/9/17.
 */
var
    config = require('../../../config')

module.exports = {
    pout: {
        static_domain: "http://" + config.server.host + ":" + config.server.port + "/src/www/static/",

    }
}