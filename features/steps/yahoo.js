module.exports = function () {
    this.Given(/^I open Yahoo's search page$/, function (callback) {
        this.browser
            .url('http://yahoo.com')
            .waitForElementVisible('body', 1000, function () {
                callback();
            });
    });

    this.Then(/^the Yahoo search form exists$/, function () {
        this.browser.assert.visible('input[name="p"]');
    });
};