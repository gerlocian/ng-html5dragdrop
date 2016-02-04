(function () {
    'use strict';

    var gulp = require('gulp'),
        serve = require('gulp-serve');

    module.exports = serve({
        root: ['.'],
        port: 8000
    });

}());
