(function () {
    'use strict';

    var gulp = require('gulp'),
        lint = require('gulp-eslint');

    module.exports = function() {
        return gulp.src([
            './gulpfile.js',
            './karma.conf.js',
            './src/assets/js/**/*.js',
            './src/tasks/**/*.js',
            './tests/**/*.js'
        ])
        .pipe(lint())
        .pipe(lint.format())
        .pipe(lint.failAfterError());
    };

}());
