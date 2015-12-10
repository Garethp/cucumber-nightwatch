module.exports = function () {
    //Before each feature, start our client. We add a 3 second pause here because otherwise features start before the
    //client is ready, causing commands to not run against a browser
    this.Before(function (scenario, callback) {
        this.client.start();
        this.client.api.pause(3000, callback);
    });

    //After every feature, end the client session
    this.After(function (scenario, callback) {
        this.client.api.end(function () {
            callback();
        });
    });
};
