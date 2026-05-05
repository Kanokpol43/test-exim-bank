const { When, Then, Given, Before } = require("@cucumber/cucumber");
const { expect } = require("@playwright/test");
const axios = require("axios");
const config = require("../../config.json");
const { defineApiSteps } = require("./api-helpers");

let faker;
(async () => {
  faker = await import("@faker-js/faker");
})();

const getApiUrl = () => {
  const environment = process.env.ENVIRONMENT || "production";
  return config[environment].apiUrl;
};

const ApiUrlEmployees = "/api/v1/employees";

let lastResponseStatus;
let lastResponseData;
let lastCreatedId;

Before(function () {
  lastResponseStatus = null;
  lastResponseData = null;
  lastCreatedId = null;
});

When(
  "ผู้ใช้ส่ง POST request สำหรับสร้าง employee ด้วย {string}",
  async function (emailFormat) {
    const apiUrl = getApiUrl();
    const isValidEmail = emailFormat === "รูปแบบอีเมลถูกต้อง";

    const employeeData = {
      dob: "2000-05-15",
      email: isValidEmail ? faker.faker.internet.email() : "invalid-email",
      firstName: faker.faker.person.firstName(),
      lastName: faker.faker.person.lastName(),
    };

    const response = await axios.post(
      `${apiUrl}${ApiUrlEmployees}`,
      employeeData,
      {
        validateStatus: () => true,
      },
    );
    lastResponseStatus = response.status;
    lastResponseData = response.data;
  },
);

When("ผู้ใช้ส่ง GET request ด้วย ID {int}", async function (id) {
  const response = await axios.get(`${getApiUrl()}${ApiUrlEmployees}/${id}`, {
    validateStatus: () => true,
  });

  lastResponseStatus = response.status;
  lastResponseData = response.data;
  lastCreatedId = id;
});

defineApiSteps(
  () => lastResponseStatus,
  () => lastResponseData,
  () => lastCreatedId
);

Then("response body ควรมี employee information", async function () {
  expect(lastResponseData.id).toBeDefined();
  expect(lastResponseData.email).toBeDefined();
  expect(lastResponseData.firstName).toBeDefined();
  expect(lastResponseData.lastName).toBeDefined();
  expect(lastResponseData.dob).toBeDefined();
});
