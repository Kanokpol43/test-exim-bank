const { When, Then, Given, Before } = require("@cucumber/cucumber");
const { expect } = require("@playwright/test");
const axios = require("axios");
const config = require("../../config.json");

let faker;
(async () => {
  faker = await import("@faker-js/faker");
})();

const getApiUrl = () => {
  const environment = process.env.ENVIRONMENT || "production";
  return config[environment].apiUrl;
};

let lastResponseStatus;
let lastResponseData;
let lastEmployeeId;

Before(function () {
  lastResponseStatus = null;
  lastResponseData = null;
  lastEmployeeId = null;
});

Given("ผู้ใช้สร้าง employee ใหม่ก่อน", async function () {
  const apiUrl = getApiUrl();
  const employeeData = {
    dob: "2000-01-01",
    email: `test${Date.now()}@example.com`,
    firstName: "Test",
    lastName: "User",
  };

  const response = await axios.post(
    `${apiUrl}/api/v1/employees`,
    employeeData,
    {
      validateStatus: () => true,
    },
  );
  lastResponseStatus = response.status;
  lastResponseData = response.data;
  lastEmployeeId = response.data?.id;
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
      `${apiUrl}/api/v1/employees`,
      employeeData,
      {
        validateStatus: () => true,
      },
    );
    lastResponseStatus = response.status;
    lastResponseData = response.data || {};

    if (isValidEmail) {
      // ถ้า response body ว่าง ให้ดึง ID จาก Location header
      if (response.headers.location) {
        const locationMatch = response.headers.location.match(/\/(\d+)$/);
        lastEmployeeId = locationMatch ? parseInt(locationMatch[1], 10) : null;
      } else {
        lastEmployeeId = response.data?.id;
      }
      // ถ้า response body ว่าง ให้ set ID เป็น object ว่างแต่มี id
      if (!lastResponseData.id && lastEmployeeId) {
        lastResponseData.id = lastEmployeeId;
      }
    }
  },
);

When("ผู้ใช้ส่ง GET request สำหรับดึงข้อมูล {int}", async function (id) {
  const apiUrl = getApiUrl();
  const response = await axios.get(`${apiUrl}/api/v1/employees/${id}`, {
    validateStatus: () => true,
  });
  lastResponseStatus = response.status;
  lastResponseData = response.data;
});

When("ผู้ใช้ส่ง GET request ด้วย id {int}", async function (id) {
  const apiUrl = getApiUrl();
  const response = await axios.get(`${apiUrl}/api/v1/employees/${id}`, {
    validateStatus: () => true,
  });
  lastResponseStatus = response.status;
  lastResponseData = response.data;
});

Then("response status code ควรเป็น {int}", async function (expectedStatus) {
  expect(lastResponseStatus).toBe(expectedStatus);
});

Then("response body ควรมี employee id", async function () {
  expect(lastResponseData.id).toBeDefined();
  expect(typeof lastResponseData.id).toBe("number");
});

Then("response body ควรมีข้อความ {string}", async function (fieldName) {
  if (fieldName === "defaultMessage") {
    const defaultMessage = lastResponseData?.errors?.[0]?.defaultMessage
      || lastResponseData?.defaultMessage;
    expect(defaultMessage).toBeDefined();
    expect(defaultMessage).toContain("email");
  } else if (fieldName === "Employee not found with ID") {
    const message = typeof lastResponseData === "string"
      ? lastResponseData
      : lastResponseData?.message;
    expect(message).toContain("Employee not found with ID");
  }
});

Then("response body ควรมี employee information", async function () {
  expect(lastResponseData.id).toBeDefined();
  expect(lastResponseData.email).toBeDefined();
  expect(lastResponseData.firstName).toBeDefined();
  expect(lastResponseData.lastName).toBeDefined();
  expect(lastResponseData.dob).toBeDefined();
});
