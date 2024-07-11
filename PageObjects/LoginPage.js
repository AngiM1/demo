const { By } = require('selenium-webdriver');
const CommonPage = require('./CommonPage.js');
const Helpers = require('../helpers.js');

class LoginPage extends CommonPage {
    constructor(driver) {
        super(driver);
        this.helpers = new Helpers(driver);
        this.usernameField = By.id('email');
        this.passwordField = By.name('password');
        this.loginButton = By.className('MyAccountOverlay-SignInButton');
        this.loginWindow = By.className('LoginAccount-SignInWrapper');
        this.loginLink = 'https://example.com';
        this.storeSwitcher = By.className('StoreSwitcher-Title');
        this.passwordForm = By.className('MyAccountOverlay-ForgotPassword');
        this.visibilitySwitcher = By.className('PasswordIcon-Wrapper');
    }
    
    async loginPageFirst() {
        await this.driver.get(this.loginLink);
        const loginWindowElement = await this.driver.findElement(this.loginWindow);
        return await loginWindowElement.isDisplayed();
    }

    async storeSwitcherElement() {
        return await this.driver.findElement(this.storeSwitcher);
    }

    async forgottenPasswordForm() {
        return await this.driver.findElement(this.passwordForm);
    }

    async passwordVisibility() {
        return await this.driver.findElement(this.visibilitySwitcher);
    }

    async clickLogin() {
        return await this.driver.findElement(this.loginButton);
    }

    async login(username, password) {
        const usernameInput = await this.driver.findElement(this.usernameField);
        await usernameInput.clear();
        await usernameInput.sendKeys(username);
        const passwordInput = await this.driver.findElement(this.passwordField);
        await passwordInput.clear();
        await passwordInput.sendKeys(password);
        await this.clickLogin();
    }

    async accountIconFunc() {
        return await this.driver.findElement(this.accountIcon);
    }

    async fullLogin(username, password) {
        await this.driver.get(this.loginLink);
        const usernameInput = await this.driver.findElement(this.usernameField);
        await this.helpers.waitForElementVisible(this.driver, usernameInput, 10000);
        await usernameInput.sendKeys(username);
        const passwordInput = await this.driver.findElement(this.passwordField);
        await passwordInput.clear();
        await passwordInput.sendKeys(password);
        const loginBtn = await this.clickLogin();
        await loginBtn.click();
        await this.helpers.waitForElementToDisappear(this.driver, loginBtn, 10000);
    }

}

module.exports = LoginPage;