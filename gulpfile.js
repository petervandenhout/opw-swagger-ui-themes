'use strict';

//gulp plugins
var gulp = require('gulp');
var sass = require('gulp-sass');
var config = require('./gulp.config')();

gulp.task('sass', function () {
    gulp.src(config.src + 'styles/styles.scss')
    .pipe(sass().on('error', handleErrors))
    .pipe(gulp.dest(config.build + '/css'));
});

gulp.task('build-web-dev', ['sass']);

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
