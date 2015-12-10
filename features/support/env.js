//Set the timeout to 10 seconds instead of 5 seconds, so that we can take in to account waiting for sessions to start,
//elements to appear, pauses and so on
module.exports = function () {
    this.setDefaultTimeout(10000);
};
