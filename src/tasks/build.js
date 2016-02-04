(function () {
    'use strict';

    var gulp = require('gulp'),
        uglify = require('gulp-uglify'),
        concat = require('gulp-concat'),
        rename = require('gulp-rename');

    module.exports = function () {
        return gulp.src([].concat(
                'src/assets/js/app.js',
                'src/assets/js/directives/drag.js',
                'src/assets/js/directives/drop.js'
            ))
            .pipe(concat('ng-html5dragdrop.js'))
            .pipe(gulp.dest('./dist/'))
            .pipe(uglify())
            .pipe(rename('ng-html5dragdrop.min.js'))
            .pipe(gulp.dest('./dist/'));
    };

    //module.exports.dependencies = ['lint'];

}());
