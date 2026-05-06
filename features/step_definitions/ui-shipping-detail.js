const { When, Then } = require("@cucumber/cucumber");
const { expect } = require("@playwright/test");
const {
  selectRandomOption,
  checkValidationRequiredFill,
} = require("./ui-helpers");

let faker;
let shippingData = {
  street: "",
  city: "",
  country: "",
};

(async () => {
  faker = await import("@faker-js/faker");
})();

When("ผู้ใช้เลือกประเทศ", async function () {
  shippingData.country = await selectRandomOption(
    this.page,
    "#countries_dropdown_menu",
  );
});

When("ผู้ใช้กรอกเบอร์โทรศัพท์", async function () {
  const phoneNumber = faker.faker.phone.number();
  await this.page.fill("#phone", phoneNumber);
  await expect(this.page.locator("#phone")).toHaveValue(phoneNumber);
});

When("ผู้ใช้กรอกที่อยู่", async function () {
  shippingData.street = faker.faker.location.streetAddress();
  await this.page.fill('[name="street"]', shippingData.street);
  await expect(this.page.locator('[name="street"]')).toHaveValue(
    shippingData.street,
  );
});

When("ผู้ใช้กรอกชื่อเมือง", async function () {
  shippingData.city = faker.faker.location.city();
  await this.page.fill('[name="city"]', shippingData.city);
  await expect(this.page.locator('[name="city"]')).toHaveValue(
    shippingData.city,
  );
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

Then("ผู้ใช้ควรเจอหน้าสรุปที่อยู่ถูกต้อง", async function () {
  const expectedAddress = `${shippingData.street}, ${shippingData.city} - ${shippingData.country}`;
  await expect(this.page.locator("#message")).toContainText(expectedAddress);
});
