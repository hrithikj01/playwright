import { test } from "../fixtures/fixture";

test("Home page using fixture", async ({ homePage }) => {
  await homePage.validateHomePage();
});

test("Login with invalid creds using fixture", async ({ loginPage }) => {
  await loginPage.validateLoginPage();
  await loginPage.LoginWithInvalidCreds();
});
