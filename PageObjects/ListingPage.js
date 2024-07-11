const { By, until } = require('selenium-webdriver');
const CommonPage = require('./CommonPage.js');
const Helpers = require('../helpers.js');
const assert = require('assert');

class ListingPage extends CommonPage {
    constructor(driver) {
        super(driver);
        this.helpers = new Helpers(driver);
        this.vestawhiteRoyalBlueColor = By.css('.ProductCard:nth-child(1) .ProductAttributeValue:nth-child(1)');
        this.addToBasketBtn = By.css('.ProductCard_layout_list:nth-of-type(1) .ProductCard-AddToCart');
        this.loader = By.className('Loader');
        this.orderTypePopup = By.className('Popup-Content');
        this.replenishmentOrderBtn = By.css('.OrderTypeSelector > button:nth-of-type(2)');
        this.basketBtn = By.css('.Header-Button.Header-Button_type_minicart');
    }

    async addingToCartVestaWhiteRoyalBlueProduct() {

        // picked a color
        await this.driver.wait(until.elementLocated(this.vestawhiteRoyalBlueColor), 5000, 'Page not loaded properly');
        assert.equal(await this.isVestawhiteRoyalBlueColorDisplayed(), true, 'Vesta white royal blue color is not present');
        const vestawhiteRoyalBlueColor = await this.driver.findElement(this.vestawhiteRoyalBlueColor);
        await vestawhiteRoyalBlueColor.click();

        // added to cart
        assert.equal(await this.isAddToCartButtonDisplayed(), true, 'Add to cart button is not present');
        const addToCartButtonEnabled = await this.driver.findElement(this.addToBasketBtn);
        const loader = await this.driver.findElement(this.loader);
        await this.helpers.waitForElementToDisappear(this.driver, loader, 5000);
        await this.driver.wait(until.elementIsEnabled(addToCartButtonEnabled), 5000, 'Add to basket button is not active');
        await addToCartButtonEnabled.click();

        // choose the order type pop-up
        await this.driver.wait(until.elementLocated(this.orderTypePopup), 10000, 'Popup is not loaded properly');
        assert.equal(await this.isOrderTypePopupDisplayed(), true, 'Order type pop-up is not present');
        assert.equal(await this.isReplenishmentOrderBtnDisplayed(), true, 'Replenishment order button is not present');
        const replenishmentOrderBtnClick = await this.driver.findElement(this.replenishmentOrderBtn);
        await replenishmentOrderBtnClick.click();
        // await this.helpers.waitForElementToDisappear(this.driver, loader, 5000);
        const loaderElement = await this.driver.findElement(this.loader);
        await this.driver.wait(until.elementIsNotVisible(loaderElement), 5000);
        await this.driver.sleep(10000);

        // click on basket button
        assert.equal(await this.isbasketBtnDisplayed(), true, 'Basket button is not present');
        const basketBtn = await this.driver.findElement(this.basketBtn);
        await basketBtn.click();
    }

    async isbasketBtnDisplayed() {
        const basketBtn = await this.driver.findElement(this.basketBtn);
        await this.helpers.waitForElementVisible(this.driver, basketBtn, 5000);
        return await basketBtn.isDisplayed();
    }

    async isReplenishmentOrderBtnDisplayed() {
        const replenishmentOrderBtn = await this.driver.findElement(this.replenishmentOrderBtn);
        await this.helpers.waitForElementVisible(this.driver, replenishmentOrderBtn, 5000);
        return await replenishmentOrderBtn.isDisplayed();
    }

    async isOrderTypePopupDisplayed() {
        const orderTypePopup = await this.driver.findElement(this.orderTypePopup);
        await this.helpers.waitForElementVisible(this.driver, orderTypePopup, 5000);
        return await orderTypePopup.isDisplayed();
    }

    async isAddToCartButtonDisplayed() {
        const addToCartButton = await this.driver.findElement(this.addToBasketBtn);
        await this.helpers.waitForElementVisible(this.driver, addToCartButton, 5000);
        return await addToCartButton.isDisplayed();
    }

    async isVestawhiteRoyalBlueColorDisplayed() {
        const vestawhiteRoyalBlueColor = await this.driver.findElement(this.vestawhiteRoyalBlueColor);
        await this.helpers.waitForElementVisible(this.driver, vestawhiteRoyalBlueColor, 5000);
        return await vestawhiteRoyalBlueColor.isDisplayed();
    }
}

module.exports = ListingPage;