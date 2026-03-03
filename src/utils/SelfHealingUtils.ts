import { Locator, Page } from "@playwright/test";
import logger from "./LoggerUtils";
import { LocatorStrategy } from "./LocatorTypes";

export default async function findValidElement(
  page: Page,
  strategies: LocatorStrategy[],
  timeout: number = 5000,
): Promise<Locator | null> {
  let locator: Locator | null = null;
  for (const strategy of strategies) {
    try {
      switch (strategy.type) {
        case "role":
          locator = page.getByRole(strategy.value, strategy.options);
          break;

        case "label":
          locator = page.getByLabel(strategy.value);
          break;

        case "placeholder":
          locator = page.getByPlaceholder(strategy.value);
          break;

        case "text":
          locator = page.getByText(strategy.value);
          break;

        case "testId":
          locator = page.getByTestId(strategy.value);
          break;

        case "css":
          locator = page.locator(strategy.value);
          break;

        case "xpath":
          locator = page.locator(`xpath=${strategy.value}`);
          break;

        default:
          continue;
      }

      await locator.waitFor({ state: "visible", timeout });

      logger.info(
        `Valid locator found using ${strategy.type}: ${strategy.value}`,
      );
      return locator;
    } catch {
      logger.warn(`Locator failed: ${strategy.type} -> ${strategy.value}`);
    }
  }

  logger.error("All locator strategies failed");
  return null;
}
