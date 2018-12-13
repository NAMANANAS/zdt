/**
 * Created by harx on 2015/9/11.
 */
var
    gulp = require('gulp'),
    connect = require('gulp-connect'),
    watch = require('gulp-watch')
    ;
var config = require('./config')

gulp.task('server', function () {
    connect.server({
        host: config.server.host,
        port: config.server.port,
        livereload: true,
        middleware: function (connect, options) {
            var middleware = [];

            middleware.push(require('./utilities/handleMock'));
            middleware.push(require('./utilities/handle/html'));

            return middleware;
        }
    })
})

gulp.task('reload', function () {
    return gulp.src(['src/**', 'mock/**'])
        //.pipe(watch(['src/**', 'mock/**'], function (vinyl) {
        //    console.log("watch changed file:"+vinyl.path)
        //}))//无效，
        .pipe(connect.reload())
})

gulp.task('watch',function(){
    gulp.watch(['src/**', 'mock/**'],['reload'])
})

gulp.task('open', function () {
    require('opn')("http://" + config.server.host + ":" + config.server.port)
})

gulp.task('open', ['server', 'open'])
gulp.task('default', ['server'])
//gulp.task('default', ['server'])
