(function () {
    'use strict';

    var path = require('path');
    var loader = require('gulp-task-loader');

    loader(path.join('src', 'tasks'));

}());
