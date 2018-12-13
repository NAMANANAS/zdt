/**
 * Created by harx on 2015/10/10.
 */

var
    gulp = require('gulp')


gulp.task('js', function () {
    console.log("gulp js task");
})
gulp.task('css', function () {
    console.log("gulp css task")
})


gulp.task('develop', ['css'])
gulp.task('release', ["js"])
