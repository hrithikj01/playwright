import { expect, Page } from "@playwright/test";
import HomePage from "./HomePage";
import logger from "../utils/LoggerUtils";

export default class LoginPage {
  private readonly usernameInputSelector = '[data-test="username"]';
  private readonly passwordInputSelector = '[data-test="password"]';
  private readonly loginBtnSelector = '[data-test="login-button"]';
  private readonly errorBannerSelector = '[data-test="error"]';

  constructor(private page: Page) {}

  async navigateToLoginPage() {
    await this.page.goto("/");
    logger.info("Successfully navigated to Login Page!!");
  }
  async fillUsername(username?: string) {
    const user = username ?? process.env.username!;
    await this.page.locator(this.usernameInputSelector).fill(user);
    logger.info("Filled username Successfully!!");
  }
  async fillPassword(passowrd?: string) {
    const pass = passowrd ?? process.env.password!;
    await this.page.locator(this.passwordInputSelector).fill(pass);
    logger.info("Filled password Successfully!!");
  }
  async clickLoginButton() {
    await this.page
      .locator(this.loginBtnSelector)
      .click()
      .catch((error) => {
        logger.error(`Failed to click on Login button ${error}`);
        throw error;
      });
    logger.info("Successfully clicked on Login button!!");
  }
  async LoginWithValidCreds() {
    await this.fillUsername();
    await this.fillPassword();
    await this.clickLoginButton();
    const homePage = new HomePage(this.page);
    logger.info("Successfully Logged in with valid user!!");
    return homePage;
  }
  async LoginWithInvalidCreds() {
    await this.fillUsername(process.env.locked_out_user);
    await this.fillPassword();
    await this.clickLoginButton();
    const success = await expect(
      this.page.locator(this.errorBannerSelector),
    ).toBeVisible({ timeout: 10000 });
    logger.error(`Failed to Login with incorrect credentials`);
    return success;
  }
}
