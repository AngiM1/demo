const assert = require('assert');
const { Builder } = require('selenium-webdriver');
const { Given, When, Then, Before, After } = require('@cucumber/cucumber');
const CommonPage = require('../../PageObjects/CommonPage.js');
const LoginPage = require('../../PageObjects/LoginPage.js');
const Helpers = require('../../helpers.js');

let driver, commonPageObject, loginPageObject, helpersObjects;

Before('@basic_login', async function() {
    driver = await new Builder().forBrowser('chrome').build();
    await driver.manage().window().maximize();
    commonPageObject = new CommonPage(driver);
    loginPageObject = new LoginPage(driver);
    helpersObjects = new Helpers(driver);
});

  Given('I am on the login page of the FE application', {timeout: 2 * 5000}, async function () {
      // Login page should be the first page not logged-in users see when attempting to access any page on the website
      const firstPage = await loginPageObject.loginPageFirst();
      assert.strictEqual(firstPage, true, 'Login page is not the first page not logged-in users see');
  });
  Given('Store view switcher is available on the login page', {timeout: 2 * 5000}, async function () {
      // Store view switcher is available on the login page
      let storeSwitcherVar = await loginPageObject.storeSwitcherElement();
      await helpersObjects.waitForElementVisible(driver, storeSwitcherVar, 5000);
      let storeSwitcherIsDisplayed = await storeSwitcherVar.isDisplayed();
      assert.strictEqual(storeSwitcherIsDisplayed, true, 'Store view switcher is missing');
  });
  Given('Forgot password form is present', {timeout: 2 * 5000}, async function () {
      // Forgot password is present and users can use it to navigate to the password reset form
      let forgottenPasswordForm  = await loginPageObject.forgottenPasswordForm();
      await helpersObjects.waitForElementVisible(driver, forgottenPasswordForm, 5000);
      let forgottenPasswordFormIsDisplayed = await forgottenPasswordForm.isDisplayed();
      assert.strictEqual(forgottenPasswordFormIsDisplayed, true, 'Forgot password form is missing');
  });
  Given('Password visibility switcher is present', {timeout: 2 * 5000}, async function () {
      // Password visibility switcher is present, allowing users to preview their password
      let visibilitySwitcher  = await loginPageObject.passwordVisibility();
      await helpersObjects.waitForElementVisible(driver, visibilitySwitcher, 5000);
      let visibilitySwitcherIsDisplayed = await visibilitySwitcher.isDisplayed();
      assert.strictEqual(visibilitySwitcherIsDisplayed, true, 'Password visibility switcher is missing');
  });
  When('I enter valid {string} and {string}', {timeout: 2 * 5000}, async function (username, password){
      // Users should be able to login with either their email address or Business Partner ID
      await loginPageObject.login(username, password);
  });
  When('I click login button', {timeout: 2 * 5000}, async function () {
      const loginBtn = await loginPageObject.clickLogin();
      await loginBtn.click();
      await helpersObjects.waitForElementToDisappear(driver, loginBtn, 10000)
  });
  Then('Account icon is present', async function () {
      // Users can successfully log into the website
      let accountIconElement = await loginPageObject.accountIconFunc();
      await helpersObjects.waitForElementVisible(driver, accountIconElement, 5000);
      let accountIconIsDisplayed = await accountIconElement.isDisplayed();
      assert.strictEqual(accountIconIsDisplayed, true, 'Account icon is not displayed');
  });

  After('@basic_login', async function () {
      await driver.quit();
  });