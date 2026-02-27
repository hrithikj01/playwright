import { test, expect } from "@playwright/test";
import LoginPage from "../pages/LoginPage";
import HomePage from "../pages/LoginPage";

test.only("Login with valid user", async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.navigateToLoginPage();
  const homePage = await loginPage.LoginWithValidCreds()
  await homePage.validateHomePage();
});

test("Login with Invalid user", async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.navigateToLoginPage();
  expect(await loginPage.LoginWithInvalidCreds()).toBeFalsy();
});
