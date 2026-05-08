const { Before, After, setDefaultTimeout } = require("@cucumber/cucumber");
const { chromium } = require("playwright");
const dotenv = require("dotenv");
const config = require("../../config.json");

dotenv.config();
setDefaultTimeout(120 * 1000);

Before(async function () {
  this.browser = await chromium.launch({
    headless: process.env.HEADED !== "true",
  });
  this.context = await this.browser.newContext();
  this.page = await this.context.newPage();
  this.page.setDefaultNavigationTimeout(60000); // 60s for page navigation
});

After(async function ({ result }) {
  if (result.status === "FAILED") {
    const timestamp = new Date().toISOString().replace(/[:.]/g, "-");
    const screenshotPath = `reports/screenshots/error-${timestamp}.png`;

    if (this.page) {
      await this.page.screenshot({ path: screenshotPath });
      console.log(`Screenshot saved: ${screenshotPath}`);
    }
  }

  if (this.page) await this.page.close();
  if (this.context) await this.context.close();
  if (this.browser) await this.browser.close();
});
