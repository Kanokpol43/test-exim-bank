const { expect } = require("@playwright/test");

const selectRandomOption = async (
  page,
  dropdownSelector,
  excludePlaceholder = true,
) => {
  const options = await page.$$eval(
    dropdownSelector + " option",
    (els, exclude) =>
      els
        .map((el) => el.value)
        .filter((v) => !exclude || (v !== "" && !v.includes("Select"))),
    excludePlaceholder,
  );

  const randomOption = options[Math.floor(Math.random() * options.length)];
  await page.selectOption(dropdownSelector, randomOption);
  await expect(page.locator(dropdownSelector)).toHaveValue(randomOption);

  return randomOption;
};

const checkValidationRequiredFill = async (page, fieldSelector) => {
  const field = page.locator(fieldSelector);
  const validationMsg = await field.evaluate((el) => el.validationMessage);
  expect(validationMsg).toBeTruthy();
};

module.exports = {
  selectRandomOption,
  checkValidationRequiredFill,
};
