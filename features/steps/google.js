module.exports = function () {
    this.Given(/^I open Google's search page$/, function () {
        this.browser
            .url('http://google.com')
            .waitForElementVisible('body', 1000);
    });

    this.Then(/^the title is "([^"]*)"$/, function (title) {
        this.browser.assert.title(title);
    });

    this.Then(/^the Google search form exists$/, function () {
        this.browser.assert.visible('input[name="q"]');
    });
};
