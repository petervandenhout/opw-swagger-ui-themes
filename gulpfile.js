'use strict';

//gulp plugins
var gulp = require('gulp');
var clean = require('gulp-clean');
var sass = require('gulp-sass');
var notify = require('gulp-notify');
var rename = require('gulp-rename');
var cssnano = require('gulp-cssnano');
var insertLines = require('gulp-insert-lines');
var runSequence = require('run-sequence');
require('es6-promise').polyfill();
var config = require('./gulp.config')();

gulp.task('clean', function () {
    return gulp.src([config.build, config.demo])
        .pipe(clean().on('error', handleErrors));
});

gulp.task('build-sass', ['clean'], function () {
    return gulp.src(config.src + 'rtd/theme-rtd.scss')
        .pipe(sass().on('error', handleErrors))
        .pipe(gulp.dest(config.build))
        .pipe(cssnano().on('error', handleErrors))
        .pipe(rename('theme-rtd.min.css'))
        .pipe(gulp.dest(config.build));
});

gulp.task('copy-demo', ['clean'], function () {
    return gulp.src('lib/swagger-ui/dist/**')
        .pipe(gulp.dest(config.demo).on('error', handleErrors));
});

gulp.task('copy-css', function () {
    return gulp.src(config.build + '*.css')
        .pipe(gulp.dest(config.demo + 'css/'));
});

gulp.task('insert-css', function () {
    return gulp.src(config.demo + 'index.html')
        .pipe(insertLines({
            'before': /<\/head>$/,
            'lineBefore': '<link href="https://fonts.googleapis.com/css?family=Lato:400,700|Roboto+Slab:400,700|Inconsolata:400,700" rel="stylesheet" type="text/css">'
        }).on('error', handleErrors))
        .pipe(insertLines({
            'before': /<\/head>$/,
            'lineBefore': '<link href="css/theme-rtd.min.css" media="screen" rel="stylesheet" type="text/css" />'
        }).on('error', handleErrors))
        .pipe(gulp.dest(config.demo));
});

gulp.task('build', function (callback) {
    runSequence(['build-sass', 'copy-demo'], 'copy-css', 'insert-css', callback);
});

//gulp.task('default', gulpSequence('sass', 'cssnano', 'copy', 'insert-css'));

//helper functions
function handleErrors() {
    /*jshint validthis:true */

    notify.onError({ title: "Build Error", message: "<%= error.message %>" }).apply(this, arguments);

    if (handleErrors.exitOnFailure) {
        process.exit(1);
    }

    // Keep gulp from hanging on this task
    this.emit('end');
}
