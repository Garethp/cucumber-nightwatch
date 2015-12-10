var Selenium = require('nightwatch/lib/runner/selenium.js');

//After all features are done, shut down the server
module.exports = function () {
    this.registerHandler('AfterFeatures', function (event, callback) {
        Selenium.stopServer(function () {
            callback();
        });
    });
};
