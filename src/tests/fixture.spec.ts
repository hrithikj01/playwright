import { test } from "../fixtures/fixture";

test.skip("Home page using fixture", async ({ homePage }) => {
  await homePage.validateHomePage();
});

test.skip("Login with invalid creds using fixture", async ({ loginPage }) => {
  await loginPage.validateLoginPage();
  await loginPage.LoginWithInvalidCreds();
});
