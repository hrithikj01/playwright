import { test as base, expect as defaultExpect } from "@playwright/test";
import HomePage from "../pages/HomePage";
import LoginPage from "../pages/LoginPage";
import {
  acquireCredential,
  releaseCredential,
} from "../utils/CredentialManager";
import logger from "../utils/LoggerUtils";

type UIPages = {
  homePage: HomePage;
  loginPage: LoginPage;
  credentials: Credentials;
};

type Credentials = {
  username: string;
  password: string;
  index: number;
};

export const expect = defaultExpect;

export const test = base.extend<UIPages>({
  credentials: async ({}, use) => {
    const cred = await acquireCredential();
    logger.info(`Using creds ${cred.username}`);
    try {
      await use(cred);
    } finally {
      releaseCredential(cred.index);
      logger.info(`Released creds ${cred.username}`);
    }
  },
  loginPage: async ({ page }, use) => {
    const loginPage = new LoginPage(page);
    await loginPage.navigateToLoginPage();
    await use(loginPage);
  },
  homePage: async ({ page, credentials }, use) => {
    const loginPage = new LoginPage(page);
    await loginPage.navigateToLoginPage();
    const homePage = await loginPage.Login(credentials.username, credentials.password!);
    await use(homePage);
  },
});
