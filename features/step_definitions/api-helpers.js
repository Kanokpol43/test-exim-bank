const { Then } = require("@cucumber/cucumber");
const { expect } = require("@playwright/test");

const getMessage = (responseData) => {
  if (typeof responseData === "string") {
    return responseData;
  }

  return "";
};

const defineApiSteps = (getStatus, getData, getId) => {
  Then("response status code ควรเป็น {int}", async function (expectedStatus) {
    expect(getStatus()).toBe(expectedStatus);
  });

  Then("response body ควรมีข้อความ {string}", async function (expectedMessage) {
    const actualMessage = getMessage(getData());
    const finalMessage = expectedMessage.replace("{id}", getId());
    expect(actualMessage).toContain(finalMessage);
  });

  Then(
    "response body ควรมีข้อความ {string} ที่ Key {string}",
    async function (expectedMessage, keyName) {
      const responseData = getData();
      let actualMessage;

      if (keyName === "defaultMessage") {
        actualMessage = responseData?.errors?.[0]?.defaultMessage;
      } else {
        actualMessage = responseData?.[keyName];
      }
      expect(actualMessage).toContain(expectedMessage);
    },
  );
};

module.exports = { getMessage, defineApiSteps };
