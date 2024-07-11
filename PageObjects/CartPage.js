const { By, until } = require('selenium-webdriver');
const CommonPage = require('./CommonPage.js');
const ListingPage = require('./ListingPage.js');
const assert = require('assert');
const Helpers = require('../helpers.js');
const CheckoutPage = require('./CheckoutPage.js')

class CartPage extends CommonPage {
    constructor(driver) {
        super(driver);
        this.helpers = new Helpers(driver);
        this.listingPage = new ListingPage(driver);
        this.checkoutPage = new CheckoutPage(driver);
        this.cartPage = 'https://example.com/cart';
        this.deleteBtn = By.css('.Button.CartPage-DeleteOrderButton');
        this.firstQtyField = By.css('.ProductStockGrid-OrderRow .ProductStockGrid-OrderCell:nth-child(2) [type="number"]');
        this.updCartBtn = By.css('.CartItem-Update');
        this.nextStepBtn = By.css('.CartPage-Items .Button.CartPage-CheckoutButton');
        this.successfulOrder = 'https://example.com/checkout/success';
    }
    
    async placeOrderWithExpectedBehavior(user_type, order_type, expected_behavior) {
        if (user_type === 'direct' && order_type === 'customer') {
            assert.equal(await this.isActiveCustomerElementDisplayed(), true, 'Active customer element is not present for a direct user');
            return expected_behavior;
        } else if (user_type === 'direct' && order_type === 'replenishment') {
            // find match day set menu item and go to PLP
            await this.navigateToMatchDaySet();
            // add a product to cart from PLP
            await this.listingPage.addingToCartVestaWhiteRoyalBlueProduct();
            // add details to the order on cart page
            await this.addDetailsToOrder();
            // click next step button on shipping page
            await this.checkoutPage.nextStepBtnShippment();
            // click place order button
            await this.checkoutPage.placeOrder();
            // check that order was successfully placed
            assert.equal(await this.driver.getCurrentUrl(), this.successfulOrder, 'Not on success order page');
            return expected_behavior;
          }
    }

  async addDetailsToOrder() {
      // added sleep timer as a workaround until the issue with long loading of the products in the cart is fixed
      await this.driver.sleep(5000);
      // uncomment this if the issue is fixed:
          // const foundLoader = this.driver.findElement(this.listingPage.loader)
          // await this.helpers.waitForElementToDisappear(this.driver, foundLoader, 5000);
      const firstQtyField = await this.driver.findElement(this.firstQtyField);
      await firstQtyField.sendKeys('1');

      await this.driver.wait(until.elementLocated(this.updCartBtn), 10000, 'Update cart button is not located');
      const updCartBtnVisible = await this.isUpdCartBtnDisplayed();
      assert.equal(updCartBtnVisible, true, 'Update cart button is not present');
      await this.driver.wait(until.elementLocated(this.updCartBtn), 10000, 'Update cart button is not located');
      const updCartBtnFound = await this.driver.findElement(this.updCartBtn);
      await updCartBtnFound.click();

      const foundLoader = this.driver.findElement(this.listingPage.loader)
      await this.helpers.waitForElementToDisappear(this.driver, foundLoader, 5000);

      await this.driver.wait(until.elementLocated(this.nextStepBtn), 10000, 'Next step button is not located');
      const nextStepBtnVisible = await this.isNextStepBtnDisplayed();
      assert.equal(nextStepBtnVisible, true, 'Next step button is not present');
      await this.driver.wait(until.elementLocated(this.nextStepBtn), 10000, 'Next step button is not located');
      const nextStepBtnFound = await this.driver.findElement(this.nextStepBtn);
      await nextStepBtnFound.click();
      await this.helpers.waitForElementToDisappear(this.driver, nextStepBtnFound, 10000);

      assert.equal(await this.driver.getCurrentUrl(), this.checkoutPage.linkToCheckout, 'Not on checkout page');
  }

  async isNextStepBtnDisplayed() {
      const nextStepBtnDisplayed = await this.driver.findElement(this.nextStepBtn);
      await this.helpers.waitForElementVisible(this.driver, nextStepBtnDisplayed, 5000);
      return await nextStepBtnDisplayed.isDisplayed();
  }

  async isUpdCartBtnDisplayed() {
    const updCartBtnDisplayed = await this.driver.findElement(this.updCartBtn);
      await this.helpers.waitForElementVisible(this.driver, updCartBtnDisplayed, 5000);
      return await updCartBtnDisplayed.isDisplayed();
  }

  async isEmptyCartBtnDisplayed() {
      await this.driver.wait(until.elementLocated(this.deleteBtn), 5000, 'Delete button not located');
      const deleteBtnDisplayed = await this.driver.findElement(this.deleteBtn);
      await this.helpers.waitForElementVisible(this.driver, deleteBtnDisplayed, 5000);
      return await deleteBtnDisplayed.isDisplayed();
  }
}

module.exports = CartPage;