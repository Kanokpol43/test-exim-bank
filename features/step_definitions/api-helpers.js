const { Then } = require("@cucumber/cucumber");
const { expect } = require("@playwright/test");

const extractMessage = (data) => {
  if (typeof data === "string") return data;
  return (
    data?.errors?.[0]?.defaultMessage || data?.defaultMessage || data?.message
  );
};

const validateMessage = (
  expectedMsg,
  key,
  lastResponseData,
  lastEmployeeId,
) => {
  let actualMsg;

  if (!key) {
    actualMsg = extractMessage(lastResponseData);
  } else if (key === "defaultMessage") {
    actualMsg =
      lastResponseData?.errors?.[0]?.defaultMessage ||
      lastResponseData?.defaultMessage;
  } else {
    actualMsg = lastResponseData?.[key];
  }

  const formattedMsg = expectedMsg.replace("{id}", lastEmployeeId);
  expect(actualMsg).toContain(formattedMsg);
};

const defineApiSteps = (
  getLastResponseStatus,
  getLastResponseData,
  getLastCreatedId,
) => {
  Then("response status code ควรเป็น {int}", async function (expectedStatus) {
    expect(getLastResponseStatus()).toBe(expectedStatus);
  });

  Then("response body ควรมีข้อความ {string}", async function (expectedMsg) {
    validateMessage(
      expectedMsg,
      null,
      getLastResponseData(),
      getLastCreatedId(),
    );
  });

  Then(
    "response body ควรมีข้อความ {string} ที่ Key {string}",
    async function (expectedMsg, key) {
      validateMessage(
        expectedMsg,
        key,
        getLastResponseData(),
        getLastCreatedId(),
      );
    },
  );
};

module.exports = { extractMessage, validateMessage, defineApiSteps };
