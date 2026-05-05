module.exports = {
  default: {
    require: ["features/step_definitions/**/*.js"],
    format: ["progress", "json:reports/cucumber_report.json"],
    formatOptions: { snippetInterface: "async-await" },
    parallel: 1,
  },
};
