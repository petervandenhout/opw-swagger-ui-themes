'use strict';

//gulp plugins
var gulp = require('gulp');
var sass = require('gulp-sass');
var notify = require('gulp-notify');
var rename = require('gulp-rename');
var cssnano = require('gulp-cssnano');
var config = require('./gulp.config')();
require('es6-promise').polyfill();

gulp.task('sass', function () {
    gulp.src(config.src + 'rtd/theme-rtd.scss')
        .pipe(sass().on('error', handleErrors))
        .pipe(gulp.dest(config.build));
});

gulp.task('cssnano', function () {
    return gulp.src(config.build + 'theme-rtd.css')
        .pipe(cssnano().on('error', handleErrors))
        .pipe(rename('theme-rtd.min.css'))
        .pipe(gulp.dest(config.build));
});

gulp.task('default', ['sass', 'cssnano']);

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
