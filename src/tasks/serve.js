(function () {
    'use strict';

    var serve = require('gulp-serve');

    module.exports = serve({
        root: ['.'],
        port: 8000
    });

}());
