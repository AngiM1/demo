const { By, until } = require('selenium-webdriver');
const CommonPage = require('./CommonPage.js');
const ListingPage = require('./ListingPage.js');
const assert = require('assert');
const Helpers = require('../helpers.js');

class CheckoutPage extends CommonPage {
    constructor(driver) {
        super(driver);
        this.helpers = new Helpers();
        this.listingPage = new ListingPage(driver);
        this.linkToCheckout = 'https://example.com/checkout';
        this.nextStepBtnChkt = By.css('.Button.CheckoutShipping-NextStepButton');
        this.placeOrderBtn = By.css('.CheckoutBilling-Actions .CheckoutBilling-Button:nth-of-type(1)');
    }

    async placeOrder() {
        await this.driver.wait(until.elementLocated(this.placeOrderBtn), 10000);
        const placeOrderBtnVisible = await this.isPlaceOrderBtnDisplayed();
        assert.equal(placeOrderBtnVisible, true, 'Place order button is not present');
        await this.driver.wait(until.elementLocated(this.placeOrderBtn), 10000);
        const placeOrderBtnFound = await this.driver.findElement(this.placeOrderBtn);
        await placeOrderBtnFound.click();
        await this.helpers.waitForElementToDisappear(this.driver, placeOrderBtnFound, 10000);
    }

    async nextStepBtnShippment() {
        await this.driver.wait(until.elementLocated(this.nextStepBtnChkt), 10000);
        const nextStepBtnChktVisible = await this.isNextStepBtnChktDisplayed();
        assert.equal(nextStepBtnChktVisible, true, 'Next step button is not present');
        await this.driver.wait(until.elementLocated(this.nextStepBtnChkt), 10000);
        const nextStepBtnChktFound = await this.driver.findElement(this.nextStepBtnChkt);
        // scroll down to avoid overlapping with the footer
        await this.driver.executeScript('arguments[0].scrollIntoView(true);', nextStepBtnChktFound);
        await nextStepBtnChktFound.click();
    }

    async isPlaceOrderBtnDisplayed() {
        const placeOrderBtn = await this.driver.findElement(this.placeOrderBtn);
        return await placeOrderBtn.isDisplayed();
    }

    async isNextStepBtnChktDisplayed() {
        const nextStepBtnChkt = await this.driver.findElement(this.nextStepBtnChkt);
        return await nextStepBtnChkt.isDisplayed();
    }

}

module.exports = CheckoutPage;