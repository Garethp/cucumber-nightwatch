var nightwatch = require('nightwatch');
var config = require('../../nightwatch.json');

//Expose Nightwatch to all cucumber features and hooks
function World() {
    //Initiate our client and get it back from the Manager
    var client = nightwatch.initClient(config.test_settings.default)['@client'];
    client.api.silent = true;

    //Set the client and api to a scope for all features and hooks
    this.client = client;
    this.browser = client.api;
}

module.exports = function() {
    this.World = World;
};
