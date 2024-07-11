const assert = require('assert');
const { Builder } = require('selenium-webdriver');
const { Given, When, Then, Before, After } = require('@cucumber/cucumber');
const CommonPage = require('../../PageObjects/CommonPage.js');
const LoginPage = require('../../PageObjects/LoginPage.js');
const CartPage = require('../../PageObjects/CartPage.js');
const ListingPage = require('../../PageObjects/ListingPage.js');
const Helpers = require('../../helpers');

let driver, commonPageObject, loginPageObject, cartPageObject, actions, listingPageObject, helpers;

Before('@header_active_customer_element or @header_basic_elements_presence', async function () {
    driver = await new Builder().forBrowser('chrome').build();
    await driver.manage().window().maximize();
    commonPageObject = new CommonPage(driver);
    loginPageObject = new LoginPage(driver);
    cartPageObject = new CartPage(driver);
    helpers = new Helpers();
    actions = driver.actions();
    listingPageObject = new ListingPage(driver);
});

Given('I am logged in to the website as a direct user with "9999999200" and "Example2k24!"', { timeout: 3 * 10000 }, async () => {
    await loginPageObject.fullLogin('9999999200', 'Example2k24!');
});

Then('Logo image is present', async () => {
    assert.equal(await commonPageObject.isLogoDisplayed(), true, 'Logo is not present or image path has changed');
});

Then('Search bar is present', async () => {
    assert.equal(await commonPageObject.isSearchFieldDisplayed(), true, 'Search bar is not present');
});

Then('View switch is present', async () => {
    assert.equal(await commonPageObject.isViewSwitchDisplayed(), true, 'View switch is not present');
});

Then('My account button is present', async () => {
    assert.equal(await commonPageObject.isMyAccountBtnDisplayed(), true, 'My account button is not present');
});

Then('Quote button is present', async () => {
    assert.equal(await commonPageObject.isQuoteBtnDisplayed(), true, 'Quote button is not present');
});

Then('Cart button is present', async () => {
    assert.equal(await commonPageObject.isCartBtnDisplayed(), true, 'Cart button is not present');
});

Then('Store switcher is present', async () => {
    assert.equal(await commonPageObject.isStoreSwitcherDisplayed(), true, 'Store switcher is not present');
});

Given('I am logged in to the website as {string} with {string} and {string}', {timeout: 2 * 5000}, async (user_type, user_name, password) => {
    await loginPageObject.fullLogin(user_name, password);
});

When('I place an {string} order as a {string} user and the active customer element {string}', {timeout: 20 * 5000}, async (order_type, user_type, expected_behavior) => {
    await cartPageObject.placeOrderWithExpectedBehavior(user_type, order_type, expected_behavior);
});

After('@header_active_customer_element or @header_basic_elements_presence', async function () {
    await driver.quit();
});