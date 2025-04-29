import fs from "node:fs/promises";
import * as process from "node:process";

import { expect } from "chai";
import type { Browser } from "puppeteer";
import puppeteer from "puppeteer";
import toml from "toml";

describe("integration.test.ts [j3f27kxwtt]", async () => {
  const config = await loadIntegrationTestConfig();

  let browser: Browser;

  before(async () => {
    browser = await puppeteer.launch({ browser: "chrome", headless: true });
  });

  after(async () => {
    const localBrowser = browser;
    // @ts-expect-error intentionally violate typing
    browser = undefined;
    await localBrowser?.close();
  });

  if (config.reporter === "html") {
    it("html reporter [m8zbx9643t]", async () => {
      const context = await browser.createBrowserContext();
      try {
        const page = await context.newPage();
        await page.goto(config.url);
        const divHtml = await page.$eval("#mocha", div => div.innerHTML);
        expect(divHtml).is.not.empty;
      } finally {
        await context.close();
      }
    });
  }
});

interface IntegrationTestConfig {
  url: string;
  reporter: "html" | "console";
  startTrigger: "button" | "load";
}

async function loadIntegrationTestConfig(file?: string): Promise<IntegrationTestConfig> {
  if (typeof file === "undefined") {
    const envVarName = "INTEGRATION_TEST_CONFIG_FILE_GTAT4A7YGA";
    const configFile = process.env[envVarName];
    if (!configFile) {
      throw new Error(
        `environment variable ${envVarName} was not set; ` +
          `set it to the path of the integration test configuration toml file [mbvappnqhw]`,
      );
    }
    return loadIntegrationTestConfig(configFile);
  }

  const fileContents = await fs.readFile(file, { encoding: "utf-8" });
  const config = toml.parse(fileContents) as Record<string, unknown>;

  const propertyErrors: Array<{ name: string; message: string }> = [];
  const presentProperties = new Set<string>();
  for (const propertyName of ["url", "reporter", "startTrigger"]) {
    if (Object.hasOwn(config, propertyName)) {
      presentProperties.add(propertyName);
    } else {
      propertyErrors.push({
        name: propertyName,
        message: "property is not specified, but is required [xs8wtxnkmt]",
      });
    }
  }

  const stringProperties = new Set<string>();
  for (const propertyName of presentProperties) {
    const value = config[propertyName];
    if (typeof value === "string") {
      stringProperties.add(propertyName);
    } else {
      propertyErrors.push({
        name: propertyName,
        message: `property must be a string, but got ${typeof value}: ${value} [s93pm4se65]`,
      });
    }
  }

  const validValuesByPropertyName = new Map<string, readonly unknown[]>([
    ["reporter", ["console", "html"]],
    ["startTrigger", ["button", "load"]],
  ]);
  for (const [propertyName, validPropertyValues] of validValuesByPropertyName) {
    if (!stringProperties.has(propertyName)) {
      continue;
    }
    const propertyValue = config[propertyName];
    if (!validPropertyValues.includes(propertyValue)) {
      propertyErrors.push({
        name: propertyName,
        message:
          `property has an invalid value: ${propertyValue} ` +
          `(valid values: ${validPropertyValues.join(", ")}) [znfqhpayx7]`,
      });
    }
  }

  if (propertyErrors.length > 0) {
    throw new Error(
      `parsing integration test configuration file failed: ${file}; ` +
        `${propertyErrors.length} errors encountered: ` +
        propertyErrors
          .map((error, errorIndex) => `${errorIndex + 1}: ${error.name}: ${error.message}`)
          .join(", "),
    );
  }

  return config as unknown as IntegrationTestConfig;
}
