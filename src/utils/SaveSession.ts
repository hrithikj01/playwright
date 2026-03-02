import { Browser, Page } from "@playwright/test";
import logger from "./LoggerUtils";

export default class Session {
  constructor() {}

  async saveSession(page: Page, filePath: string) {
    try {
      const session = await page.context().storageState({ path: filePath });
      logger.info(`Session saved to ${filePath}`);
      return session;
    } catch (error) {
      logger.error(`Failed to create new session to ${filePath}`);
      throw error;
    }
  }

  async getSession(browser: Browser, filePath: string) {
    try {
      const session = await browser.newContext({ storageState: filePath });
      logger.info(`Retrived session stored in ${filePath}`);
      return session;
    } catch (error) {
      logger.info(`Failed to retrived session stored in ${filePath}`);
      throw error;
    }
  }
}
