import { test, expect } from "@playwright/test";
import LoginPage from "../pages/LoginPage";
import HomePage from "../pages/HomePage";
import Session from "../utils/SaveSession";

let authFile = "src/config/auth.json";

test.describe.configure({ mode: 'serial' });

//Login -> HomePage -> Save session
test("Save new session to storageState", async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.navigateToLoginPage();
  const homePage = await loginPage.Login();
  await homePage.validateHomePage();
  await new Session().saveSession(page, authFile);
});

//Open saved session -> Skip login -> Navigate to home page
test("Login to saved browser session", async ({ browser }) => {
  const session = await new Session().getSession(browser, authFile);
  const savedPage = await session.newPage(); 
  const homePage = new HomePage(savedPage)
  await homePage.navigateToHomePage();
  await homePage.validateHomePage();
});