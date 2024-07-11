const { By, until } = require('selenium-webdriver');
const assert = require('assert');

class CommonPage {
    constructor(driver) {
        this.driver = driver;
        this.imageLogoLink = "https://example.com/media/logo/default/svg-example-logo.png";
        this.searchField = By.id('search-field');
        this.viewSwitch = By.className('Header-Switcher');
        this.accountIcon = By.className('Header-MyAccount');
        this.myAccountOverlay = By.css('.MyAccountOverlay-ProfileOverlay');
        this.logoutBtn = By.css('div.MyAccountOverlay-ProfileOverlay > span:last-child');
        this.quoteBtn = By.className('Header-QuoteLink');
        this.cartBtn = By.className('Header-Button Header-Button_type_minicart');
        this.storeSwitcher = By.className('StoreSwitcher-Title');
        this.activeCustomerElement = By.className('Header-ActiveCustomerSwitcher');
        this.newOrderBtn = By.className('Menu-NewOrder Button Button_isHollow');
        this.newOrderPopup = By.className('Popup-Content');
        this.productsMenuItem = By.css('figcaption[class*="Menu-ItemCaption_hasSubcategories"]');
        this.hoveredProductsCategory = By.css('div[class*="Menu-SubCategoriesWrapper_isVisible"]');
        this.teamwearMenuItem = By.css('div[class="Menu-Column Menu-Column_L1"] > div:nth-child(2)');
        this.footballMenuItem = By.css('div[class="Menu-Column Menu-Column_L2"] > div:first-child');
        this.matchDaySetMenuItem = By.css('div[class="Menu-Column Menu-Column_L3"] > div:first-child');
    }

    async logoutStep() {
        await this.driver.wait(until.elementLocated(this.accountIcon), 10000, 'Account icon not located');
        const accountIcon = await this.driver.findElement(this.accountIcon);
        assert.equal(await accountIcon.isDisplayed(), true, 'Account icon is not present');
        await this.driver.wait(until.elementIsEnabled(accountIcon), 10000, 'Account icon is not clickable');
        await accountIcon.click();
    
        await this.driver.wait(until.elementLocated(this.myAccountOverlay), 10000, 'My account overlay not located');
        const myAccountOverlay = await this.driver.findElement(this.myAccountOverlay);
        await this.helpers.waitForElementVisible(this.driver, myAccountOverlay, 10000);
        assert.equal(await myAccountOverlay.isDisplayed(), true, 'My account overlay is not present');
    
        await this.driver.wait(until.elementLocated(this.logoutBtn), 10000, 'Logout button not located');
        const logoutBtn = await this.driver.findElement(this.logoutBtn);
        await this.helpers.waitForElementVisible(this.driver, logoutBtn, 10000);
        assert.equal(await logoutBtn.isDisplayed(), true, 'Logout button is not present');
        await logoutBtn.click();
    }

    async navigateToMatchDaySet() {
        await this.driver.wait(until.elementLocated(this.productsMenuItem), 10000, 'Products menu item not located');
        const isProductsMenuItemVisible = await this.isProductsMenuItemDisplayed();
        assert.equal(isProductsMenuItemVisible, true, 'Products menu item is not present');
        await this.driver.wait(until.elementLocated(this.productsMenuItem), 10000, 'Products menu item not located');
        const productsMenuItem = await this.driver.findElement(this.productsMenuItem);
        await this.driver.actions().move({ origin: productsMenuItem }).perform();
    
        // waiting for the dropdown to appear
        const isHoveredProductsCategoryVisible = await this.isHoveredProductsCategoryDisplayed();
        assert.equal(isHoveredProductsCategoryVisible, true, 'Products menu item is not hovered');
    
        // hover on teamwear menu item
        assert.equal(await this.isTeamwearMenuItemDisplayed(), true, 'Teamwear menu item is not present');
        const teamwearMenuItem = await this.driver.findElement(this.teamwearMenuItem);
        await this.driver.actions().move({ origin: teamwearMenuItem }).perform();
    
        // waiting for the dropdown to appear
        assert.equal(await this.isFootballMenuItemDisplayed(), true, 'Teamwear menu item is not present');
        const footballMenuItem = await this.driver.findElement(this.footballMenuItem);
        await this.driver.actions().move({ origin: footballMenuItem }).perform();
    
        // find match day set menu item
        assert.equal(await this.isMatchDaySetMenuItemDisplayed(), true, 'Match day set menu item is not present');
        const matchDaySetMenuItem = await this.driver.findElement(this.matchDaySetMenuItem);
        await matchDaySetMenuItem.click();
    }

    async isMatchDaySetMenuItemDisplayed() {
        const matchDaySetMenuItem = await this.driver.findElement(this.matchDaySetMenuItem);
        await this.helpers.waitForElementVisible(this.driver, matchDaySetMenuItem, 5000);
        return await matchDaySetMenuItem.isDisplayed();
    }

    async isFootballMenuItemDisplayed() {
        const footballMenuItem = await this.driver.findElement(this.footballMenuItem);
        await this.helpers.waitForElementVisible(this.driver, footballMenuItem, 5000);
        return await footballMenuItem.isDisplayed();
    }

    async isTeamwearMenuItemDisplayed() {
        const teamwearMenuItem = await this.driver.findElement(this.teamwearMenuItem);
        await this.helpers.waitForElementVisible(this.driver, teamwearMenuItem, 5000);
        return await teamwearMenuItem.isDisplayed();
    }

    async isHoveredProductsCategoryDisplayed() {
        await this.driver.wait(until.elementLocated(this.hoveredProductsCategory), 25000, 'Hovered products category not located');
        const hoveredProductsCategory = await this.driver.findElement(this.hoveredProductsCategory);
        await this.helpers.waitForElementVisible(this.driver, hoveredProductsCategory, 25000);
        return await hoveredProductsCategory.isDisplayed();
    }

    async isProductsMenuItemDisplayed() {
        await this.driver.wait(until.elementLocated(this.productsMenuItem), 5000, 'Products menu item not located');
        const productsMenuItem = await this.driver.findElement(this.productsMenuItem);
        await this.driver.wait(until.elementIsVisible(productsMenuItem), 5000);
        return await productsMenuItem.isDisplayed();
    }

    async isNewOrderPopupDisplayed() {
        const newOrderPopup = await this.driver.findElement(this.newOrderPopup);
        return await newOrderPopup.isDisplayed();
    }

    async isNewOrderBtnDisplayed() {
        const newOrderBtn = await this.driver.findElement(this.newOrderBtn);
        return await newOrderBtn.isDisplayed();
    }

    async isActiveCustomerElementDisplayed() {
        const activeCustomerElement = await this.driver.findElement(this.activeCustomerElement);
        return await activeCustomerElement.isDisplayed();
    }

    async isLogoutBtnDisplayed() {
        const logoutBtn = await this.driver.findElement(this.logoutBtn);
        return await logoutBtn.isDisplayed();
    }

    async isMyAccountOverlayDisplayed() {
        const myAccountOverlay = await this.driver.findElement(this.myAccountOverlay);
        return await myAccountOverlay.isDisplayed();
    }

    async isStoreSwitcherDisplayed() {
        const storeSwitcher = await this.driver.findElement(this.storeSwitcher);
        return await storeSwitcher.isDisplayed();
    }

    async isCartBtnDisplayed() {
        const cartBtn = await this.driver.findElement(this.cartBtn);
        return await cartBtn.isDisplayed();
    }

    async isQuoteBtnDisplayed() {
        const quoteBtn = await this.driver.findElement(this.quoteBtn);
        return await quoteBtn.isDisplayed();
    }

    async isMyAccountBtnDisplayed() {
        const accountIcon = await this.driver.findElement(this.accountIcon);
        return await accountIcon.isDisplayed();
    }

    async isViewSwitchDisplayed() {
        const viewSwitch = await this.driver.findElement(this.viewSwitch);
        return await viewSwitch.isDisplayed();
    }

    async isSearchFieldDisplayed() {
        const searchField = await this.driver.findElement(this.searchField);
        return await searchField.isDisplayed();
    }

    async isLogoDisplayed() {
        const logoImage = await this.driver.findElement(By.css(`img[src='${this.imageLogoLink}']`));
        return await logoImage.isDisplayed();
    }
}

module.exports = CommonPage;