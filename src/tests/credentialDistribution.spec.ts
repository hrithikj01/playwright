import { test } from "../fixtures/fixture";

//Login page -> Enter credential free in credential.json
test("Login using credential fixture", async ({ loginPage, credentials }) => {
  await loginPage.navigateToLoginPage();
  await loginPage.Login(
    credentials.username,
    credentials.password,
  );
});

//Login using fixture -> Enter credential free in credential.json
test("Login using fixture2", async ({ homePage }) => {
  await homePage.validateHomePage();
});