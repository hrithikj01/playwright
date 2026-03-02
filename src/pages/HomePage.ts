import { expect, Page } from "@playwright/test";
import { error } from "console";
import logger from "../utils/LoggerUtils";

export default class HomePage {
  private readonly productSelector = "Products";

  constructor(private page: Page) {}

  async getHomePage() {
    return this.page;
  }

  async navigateToHomePage() {
    try {
      await this.page.goto("/inventory.html");
      logger.info("Navigated to home page");
    } catch (error) {
      logger.error("Failed to navigate home page");
      throw error;
    }
  }
  
  async validateHomePage() {
    try {
      await expect(this.page.getByText(this.productSelector)).toBeVisible({
        timeout: 10000,
      });
      logger.info("Validated! you are on home page");
    } catch (error) {
      logger.error("Failed to validate home page");
      throw error;
    }
  }
}
