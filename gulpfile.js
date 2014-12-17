var gulp       = require('gulp'),
    browserify = require('browserify'),
    transform  = require('vinyl-transform'),
    cssify     = require('cssify');

gulp.task('browserify', function () {
    var browserified = transform(function(filename) {
        var b = browserify(filename);
        return b.bundle();
    });

    return gulp.src(['./src/js/*.js'])
        .pipe(browserified)
        .pipe(cssify())
        .pipe(gulp.dest('./dist'));
});
