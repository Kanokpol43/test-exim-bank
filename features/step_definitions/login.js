const { Given, When, Then } = require("@cucumber/cucumber");
const { expect } = require("@playwright/test");
const testData = require("../example.json");
const config = require("../../config.json");
require("dotenv").config();

const getBaseUrl = () => {
  const environment = process.env.ENVIRONMENT || "production";
  return config[environment].baseUrl;
};

Given("ผู้ใช้นำทางไปยังแอปพลิเคชัน", async function () {
  const url = process.env.webURL || getBaseUrl() + "/auth_ecommerce.html";
  await this.page.goto(url);
});

When("ผู้ใช้กรอกอีเมล {string}", async function (email) {
  const emailValue = email === "default" ? testData.login.email : email;
  await this.page.fill("#email", emailValue);
  await expect(this.page.locator("#email")).toHaveValue(emailValue);
});

When("ผู้ใช้กรอกรหัสผ่าน {string}", async function (password) {
  const passwordValue =
    password === "default" ? testData.login.password : password;
  await this.page.fill("#password", passwordValue);
  await expect(this.page.locator("#password")).toHaveValue(passwordValue);
});

When("ผู้ใช้คลิกปุ่มเข้าสู่ระบบ", async function () {
  await this.page.click("#submitLoginBtn");
});

Then("ผู้ใช้ควรเห็นหน้าร้านค้า", async function () {
  await expect(this.page.locator("#prooood")).toHaveCount(1);
});

Then("ผู้ใช้ควรเห็นข้อความแสดงข้อผิดพลาด", async function () {
  const ERROR_MESSAGE =
    "Bad credentials! Please try again! Make sure that you've registered.";

  await expect(this.page.locator(`text=${ERROR_MESSAGE}`)).toBeVisible({
    timeout: 10000,
  });
});
