const { until } = require('selenium-webdriver');
const CommonPage = require('./PageObjects/CommonPage.js');

class Helpers extends CommonPage {

    constructor(driver) {
        super(driver);
        this.driver = driver;
    }

    async waitForElementToBeClickable(element, timeout) {
        await this.driver.wait(until.elementToBeClickable(element), timeout);
    }

    async waitForElementToDisappear(element, timeout) {
        await this.driver.wait(until.stalenessOf(element), timeout);
    }
  
    async waitForElementVisible(element, timeout) {
        await this.driver.wait(until.elementIsVisible(element), timeout);
    }
}

module.exports = Helpers;