var gulp = require("gulp");
var browserify = require("browserify");
var source = require('vinyl-source-stream');
var tsify = require("tsify");
var imagemin = require('gulp-imagemin');

var paths = {
    pages: ['src/*.html']
};

gulp.task("copy-html", function () {
    return gulp.src(paths.pages)
        .pipe(gulp.dest("dist"));
});

gulp.task('images', function() {
    gulp.src('src/assets/**/*')
        .pipe(imagemin())
        .pipe(gulp.dest('dist/images/'));

});
gulp.task('sounds', function() {
    gulp.src('src/assets/*.mp3')
        .pipe(gulp.dest('dist/images/')); // результат пишем по указанному адресу

});


gulp.task("default", ["copy-html","sounds","images"], function () {
    return browserify({
        basedir: '.',
        debug: true,
        entries: ['src/main.ts'],
        cache: {},
        packageCache: {}
    })
        .plugin(tsify)
        .bundle()
        .pipe(source('bundle.js'))
        .pipe(gulp.dest("dist"));
});