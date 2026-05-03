const { When, Then } = require("@cucumber/cucumber");
const { expect } = require("@playwright/test");
const {
  selectRandomOption,
  checkValidationRequiredFill,
} = require("./helpers");

let faker;

(async () => {
  faker = await import("@faker-js/faker");
})();

When("ผู้ใช้เลือกประเทศ", async function () {
  await selectRandomOption(this.page, "#countries_dropdown_menu");
});

When("ผู้ใช้กรอกเบอร์โทรศัพท์", async function () {
  const phoneNumber = faker.faker.phone.number();
  await this.page.fill("#phone", phoneNumber);
  await expect(this.page.locator("#phone")).toHaveValue(phoneNumber);
});

When("ผู้ใช้กรอกที่อยู่", async function () {
  const streetAddress = faker.faker.location.streetAddress();
  await this.page.fill('[name="street"]', streetAddress);
  await expect(this.page.locator('[name="street"]')).toHaveValue(streetAddress);
});

When("ผู้ใช้กรอกชื่อเมือง", async function () {
  const cityName = faker.faker.location.city();
  await this.page.fill('[name="city"]', cityName);
  await expect(this.page.locator('[name="city"]')).toHaveValue(cityName);
});

When("ผู้ใช้คลิกปุ่ม Submit Order", async function () {
  await this.page.click("#submitOrderBtn");
});

Then(
  "ผู้ใช้ควรเจอ Required Message สำหรับ {string}",
  async function (fieldSelector) {
    await checkValidationRequiredFill(this.page, fieldSelector);
  },
);

Then("ผู้ใช้ควรเจอหน้า Congrate You order", async function () {
  await expect(this.page.locator("#message")).toContainText(
    "Congrats! Your order of ",
  );
});
