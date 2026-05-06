const { When, Then, Given, Before } = require("@cucumber/cucumber");
const { expect } = require("@playwright/test");
const axios = require("axios");
const config = require("../../config.json");
<<<<<<< HEAD
const { getMessage, defineApiSteps } = require("./api-helpers");
=======
const { defineApiSteps } = require("./api-helpers");
>>>>>>> origin/develop

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
<<<<<<< HEAD
let employeesId = [];
=======
>>>>>>> origin/develop

Before(function () {
  lastResponseStatus = null;
  lastResponseData = null;
  lastCreatedId = null;
<<<<<<< HEAD
  employeesId = [];
=======
>>>>>>> origin/develop
});

When(
  "ผู้ใช้ส่ง POST request สำหรับสร้าง employee ด้วย {string}",
  async function (emailFormat) {
    const employeeData = {
      dob: "2000-05-15",
      email:
        emailFormat === "รูปแบบอีเมลถูกต้อง"
          ? faker.faker.internet.email()
          : "invalid-email",
      firstName: faker.faker.person.firstName(),
      lastName: faker.faker.person.lastName(),
    };

    const response = await axios.post(
<<<<<<< HEAD
      `${getApiUrl()}${ApiUrlEmployees}`,
=======
      `${apiUrl}${ApiUrlEmployees}`,
>>>>>>> origin/develop
      employeeData,
      {
        validateStatus: () => true,
      },
    );
    lastResponseStatus = response.status;
    lastResponseData = response.data;
  },
);

<<<<<<< HEAD
When("ผู้ใช้ดึงข้อมูล employees ทั้งหมด", async function () {
  const response = await axios.get(`${getApiUrl()}${ApiUrlEmployees}`, {});
  employeesId = response.data.map((emp) => emp.id);
});

When("ผู้ใช้ส่ง GET request ด้วย ID {string}", async function (idType) {
  let idToUse;

  if (idType === "ที่มีอยู่") {
    idToUse = employeesId[0];
  } else if (idType === "ที่ไม่มีอยู่") {
    idToUse = Math.max(...employeesId) + 1;
  }

  const response = await axios.get(
    `${getApiUrl()}${ApiUrlEmployees}/${idToUse}`,
    {
      validateStatus: () => true,
    },
  );

  lastResponseStatus = response.status;
  lastResponseData = response.data;
  lastCreatedId = idToUse;
});
=======
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
>>>>>>> origin/develop

defineApiSteps(
  () => lastResponseStatus,
  () => lastResponseData,
  () => lastCreatedId,
);

Then("response body ควรมี employee information", async function () {
  expect(lastResponseData.id).toBeDefined();
  expect(lastResponseData.email).toBeDefined();
  expect(lastResponseData.firstName).toBeDefined();
  expect(lastResponseData.lastName).toBeDefined();
  expect(lastResponseData.dob).toBeDefined();
});
