# Cucumber and NightwatchJS in harmony

This is a demonstration on how to easily connect NightwatchJS and CucumberJS properly, so that you can use Nightwatch
assertions and API while using the Cucumber test runner and reporter. This example can also be used as an example
of decoupling the Nightwatch Client from the Nightwatch Test Runner, so that you can use it in other environments, or
even if you wanted to DI the Nightwatch Client in to Page Objects or tests directly

## Requirements
 * CucumberJS
 * NightwatchJS
 * Selenium Stand-Alone
 
## Steps

 * Create your nightwatch.json file to hold your configuration.
 * Set up your features and steps like you normally would in Cucumber
 * Initiate your Nightwatch client stand alone like so
  
  ```js
  var nightwatch = require('nightwatch');
  var config = require('../../nightwatch.json');
  
  var client = nightwatch.initClient(config.test_settings.default)['@client'];
  ```
  
 * Create some hooks for `BeforeFeatures`, `AfterFeatures`, `Before` and `After`. This will handle the connection to
 selenium for you
 * Make your `BeforeFeatures` hook start up selenium like so
 
 ```js
 var Selenium = require('nightwatch/lib/runner/selenium.js');
 
 this.registerHandler('BeforeFeatures', function (event, callback) {
     Selenium.startServer(config, function () {
         callback();
     });
 });
 ```
 
 * Make your `AfterFeatures` hook shutdown your selenium server after you're done, as such
 ```js
 Selenium.stopServer(function () {
     callback();
 });
 ```
 
 * Make your `Before` and `After` hooks start and stop sessions between each Feature
 ```js
 this.Before(function (scenario, callback) {
     this.client.start();
     this.client.api.pause(3000, callback);
 });

 this.After(function (scenario, callback) {
     this.client.api.end(function () {
         callback();
     });
 });
 ```
 
Congratulations, you've successfully decoupled the NightwachtJS Client from the Test Runner, and it's now ready to
use inside the CucumberJS client!

## Notes
As of writing this, there doesn't appear to be a good and reliable way to hook in to `client.start()`, which means that
before each feature, when we initiate the session we need to put a pause of roughly 3 seconds to give selenium time to
start up and the session ready for use. If you skip that, you run in to issues where the feature will start issuing
commands before selenium has a browser open to execute them.

Likewise, `pause()`, `waitForElement()` and so on don't halt the cucumber tests to wait. To compensate for that, you need
to make use of the callbacks that cucumber passes you. Examples can be found in the features/steps folder