import { expect, Page } from "@playwright/test";
import HomePage from "./HomePage";
import logger from "../utils/LoggerUtils";
import { error } from "console";

export default class LoginPage {
  private readonly usernameInputSelector = '[data-test="username"]';
  private readonly passwordInputSelector = '[data-test="password"]';
  private readonly loginBtnSelector = '[data-test="login-button"]';
  private readonly errorBannerSelector = '[data-test="error"]';

  constructor(private page: Page) {}

  async navigateToLoginPage() {
    try {
      await this.page.goto("/");
      logger.info("Navigated to Login page");
    } catch (error) {
      logger.error("Failed to navigate to Login page");
      throw error;
    }
  }

  async validateLoginPage() {
    try {
      await expect(this.page.locator(this.loginBtnSelector)).toBeVisible({
        timeout: 10000,
      });
      logger.info("Validated! you are on login page");
    } catch (error) {
      logger.error("You are not on login page");
      throw error;
    }
  }

  async fillUsername(username?: string) {
    const user = username ?? process.env.username!;
    try {
      await this.page.locator(this.usernameInputSelector).fill(user);
      logger.info("Filled username");
    } catch (error) {
      logger.error("Failed to fill username");
      throw error;
    }
  }

  async fillPassword(passowrd?: string) {
    const pass = passowrd ?? process.env.password!;
    try {
      await this.page.locator(this.passwordInputSelector).fill(pass);
      logger.info("Filled password");
    } catch (error) {
      logger.error("Failed to fill password");
      throw error;
    }
  }

  async clickLoginButton() {
    try {
      await this.page.locator(this.loginBtnSelector).click();
      logger.info("Clicked on login button!!");
    } catch (error) {
      logger.error(`Failed to click on login button`);
      throw error;
    }
  }

  async validateErrorBanner() {
    try {
      const success = await expect(
        this.page.locator(this.errorBannerSelector),
      ).toBeVisible({ timeout: 10000 });
      logger.info(`Failed login banner is visible`);
      return success;
    } catch (error) {
      logger.error(`Failed login banner is not visible`);
      throw error;
    }
  }

  async Login(username?: string, password?: string) {
    try {
      await this.fillUsername(username);
      await this.fillPassword(password);
      await this.clickLoginButton();
      const homePage = new HomePage(this.page);
      logger.info("Successfully logged in with valid user");
      return homePage;
    } catch (error) {
      logger.error(`Failed to login`);
      throw error;
    }
  }

  async LoginWithInvalidCreds(username?: string, password?: string) {
    try {
      await this.fillUsername(username);
      await this.fillPassword(password);
      await this.clickLoginButton();
      await this.validateErrorBanner();
      logger.info(`Login with invalid credentials is failed`);
      return true;
    } catch (error) {
      logger.error(`Failed login banner is not visible`);
      return false;
    }
  }
}
