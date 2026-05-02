const reporter = require("cucumber-html-reporter");
const fs = require("fs");
const path = require("path");

const options = {
  theme: "bootstrap",
  jsonFile: "reports/cucumber_report.json",
  output: "reports/cucumber_report.html",
  reportSuiteAsScenarios: true,
  scenarioTimestamp: true,
  launchReport: false,
  // metadata: {
  //   'App Version': '1.0.0',
  //   'Test Environment': 'Staging',
  //   'Browser': 'Chrome',
  //   'Platform': process.platform,
  //   'Executed': 'Local',
  //   'Execution Time': new Date().toISOString()
  // }
};

if (!fs.existsSync("reports")) {
  fs.mkdirSync("reports", { recursive: true });
}

try {
  reporter.generate(options);
  console.log("✅ Cucumber HTML Report generated successfully!");
  console.log("📊 Report location: reports/cucumber_report.html");
} catch (error) {
  console.error("❌ Error generating report:", error);
  process.exit(1);
}
