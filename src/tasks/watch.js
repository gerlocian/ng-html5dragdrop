(function () {
    'use strict';

    var gulp = require('gulp');

    module.exports = function () {
        gulp.watch('./**/*.js', ['lint']);
    };

}());
