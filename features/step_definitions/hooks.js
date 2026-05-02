const { Before, After, setDefaultTimeout } = require('@cucumber/cucumber');
const { chromium } = require('playwright');
const dotenv = require('dotenv');
const config = require('../../config.json');

dotenv.config();
setDefaultTimeout(120 * 1000);

Before(async function () {
  this.browser = await chromium.launch({
    headless: process.env.HEADED !== 'true',
  });
  this.context = await this.browser.newContext();
  this.page = await this.context.newPage();
});

After(async function () {
  // รอ 1 วินาทีเพื่อให้เห็นผลลัพธ์ก่อนปิด browser
  await new Promise(resolve => setTimeout(resolve, 1000));

  if (this.page) await this.page.close();
  if (this.context) await this.context.close();
  if (this.browser) await this.browser.close();
});
