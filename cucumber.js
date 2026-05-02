module.exports = {
  default: {
    require: ['features/step_definitions/**/*.js'],
    format: ['progress', 'json:reports/cucumber_report.json'],
    formatOptions: { snippetInterface: 'async-await' },
    parallel: 2,
    timeout: 120000, // 120 วินาที
  },
};
