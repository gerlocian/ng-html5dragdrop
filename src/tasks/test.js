(function () {
    'use strict';

    var karma = require('karma').Server,
        path = require('path');

    function task(done) {
        var options = {};
        options.configFile = path.resolve('./karma.conf.js');
        options.browsers = ['PhantomJS'];
        options.singleRun = true;
        new karma(options, done).start();
    }

    module.exports = task;
    module.exports.dependencies = ['lint'];

}());
