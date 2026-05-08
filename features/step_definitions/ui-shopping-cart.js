const { When, Then, Before } = require("@cucumber/cucumber");
const { expect } = require("@playwright/test");

let cartTotal = 0;
let itemPrices = [];

Before(function () {
  cartTotal = 0;
  itemPrices = [];
});

When(
  "ผู้ใช้เลือกสินค้า {string} จำนวน {int} ชิ้น",
  async function (productName, quantity) {
    try {
      await this.page.waitForFunction(
        () => {
          return document.querySelectorAll(".shop-item").length > 0;
        },
        { timeout: 5000 },
      );
    } catch (error) {
      const timestamp = new Date().toISOString().replace(/[:.]/g, "-");
      await this.page.screenshot({
        path: `reports/screenshots/shop-items-not-found-${timestamp}.png`,
      });
      throw error;
    }

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
When("ผู้ใช้คลิกปุ่ม {string}", async function (buttonName) {
  await this.page.locator(`button:has-text("${buttonName}")`).click();
});

Then("ยอดรวมควรมีราคา {float}", async function (expectedTotal) {
  expect(cartTotal).toBeCloseTo(expectedTotal);

  itemPrices = [];
  cartTotal = 0;
});

Then("ผู้ใช้ควรเห็นหน้ารายละเอียดจัดส่งสินค้า", async function () {
  await expect(this.page.locator("#shippingForm")).toBeVisible();
});
