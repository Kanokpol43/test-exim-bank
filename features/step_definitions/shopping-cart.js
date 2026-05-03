const { When, Then } = require("@cucumber/cucumber");
const { expect } = require("@playwright/test");

let cartTotal = 0;
let itemPrices = [];

When(
  "ผู้ใช้เลือกสินค้า {string} จำนวน {int} ชิ้น",
  async function (productName, quantity) {
    const productElement = this.page
      .locator(".shop-item")
      .filter({ hasText: productName });

    // ดึงราคาจาก element
    const priceText = await productElement
      .locator(".shop-item-price")
      .textContent();
    const price = parseFloat(priceText.replace("$", ""));

    // เก็บราคาไว้ใช้ในการคำนวณ
    itemPrices.push({ productName, price, quantity });
    cartTotal += price * quantity;

    await productElement.locator(".shop-item-button").click();
    await this.page
      .locator(".cart-quantity-input")
      .last()
      .fill(quantity.toString());
    await this.page.keyboard.press("Enter");
  },
);

Then("ยอดรวมควรมีราคา ${float}", async function (expectedTotal) {
  expect(cartTotal).toBeCloseTo(expectedTotal);

  itemPrices = [];
  cartTotal = 0;
});

When("ผู้ใช้คลิกปุ่ม {string}", async function (buttonName) {
  await this.page.locator(`button:has-text("${buttonName}")`).click();
});
