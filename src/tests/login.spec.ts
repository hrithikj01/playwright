import { test, expect } from "@playwright/test";
import LoginPage from "../pages/LoginPage";

//Login -> Validate Home Page
test("Login with valid creds", async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.navigateToLoginPage();
  const homePage = await loginPage.Login();
  await homePage.validateHomePage();
});

//Login -> Failed to Login
test("Login with Invalid creds", async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.navigateToLoginPage();
  await loginPage.LoginWithInvalidCreds();
});
