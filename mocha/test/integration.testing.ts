import { mkdtemp } from "node:fs/promises";
import type http from "node:http";
import { tmpdir as getSystemTempDir } from "node:os";
import path from "node:path";

import { execa } from "execa";
import express from "express";
import puppeteer, {
  type Browser,
  type BrowserContext,
  type LaunchOptions,
  type Page,
  TimeoutError as PuppeteerTimeoutError,
} from "puppeteer";
import { rimraf } from "rimraf";
import signale from "signale";

export type EsbuildUi = "html" | "console";
export type EsbuildStartTrigger = "button" | "load";

export interface EsbuildOptions {
  ui: EsbuildUi;
  startTrigger: EsbuildStartTrigger;
  destDir: string;
}

export async function esbuild(options: EsbuildOptions): Promise<void> {
  const build_ts_path = path.normalize(path.join(__dirname, "..", "build.ts"));
  const cwd = path.normalize(path.join(__dirname, "..", ".."));

  const build_ts_args = ["ts-node", build_ts_path, `--destDir=${options.destDir}`];

  if (options.ui === "html") {
    build_ts_args.push("--html");
  } else if (options.ui === "console") {
    build_ts_args.push("--console");
  } else {
    throw new Error(`invalid value for options.ui: ${options.ui} [xw2sy3ncfn]`);
  }

  if (options.startTrigger === "button") {
    build_ts_args.push("--button");
  } else if (options.startTrigger === "load") {
    build_ts_args.push("--load");
  } else {
    throw new Error(`invalid value for options.startTrigger: ${options.startTrigger} [eqsabmhm4z]`);
  }

  signale.note(`Running command in ${cwd}: ${build_ts_args.join(" ")}`);
  await execa(build_ts_args[0]!, build_ts_args.slice(1), {
    preferLocal: true,
    stdin: "inherit",
    stdout: "inherit",
    stderr: "inherit",
    cwd,
  });
}

function undefinedValue<T>(): T {
  return undefined as unknown as T;
}

export interface BrowserTestTools {
  tempDir: string;
  browser: Browser;
  browserContext: BrowserContext;
  page: Page;

  gotoPage(ui: EsbuildUi, startTrigger: EsbuildStartTrigger): Promise<void>;
  verifyNoMochaRunStartNotification(): Promise<void>;
  waitForMochaRunStartNotification(): Promise<void>;
  verifyNoMochaRunDoneNotification(): Promise<void>;
  waitForMochaRunDoneNotification(): Promise<void>;
  getMochaDivInnerHtml(): Promise<string>;
  clickStartTestsButton(): Promise<void>;
}

class BrowserTestToolsImpl implements BrowserTestTools {
  tempDir: string = undefinedValue();
  browser: Browser = undefinedValue();
  browserContext: BrowserContext = undefinedValue();
  page: Page = undefinedValue();

  #httpServer: http.Server = undefinedValue();

  constructor() {
    before(() => this.#initializeTempDir());
    after(() => this.#uninitializeTempDir());

    before(() => this.#esbuild());

    before(() => this.#initializeHttpServer());
    after(() => this.#uninitializeHttpServer());

    before(() => this.#initializeBrowser());
    after(() => this.#uninitializeBrowser());

    beforeEach(() => this.#initializeBrowserContext());
    afterEach(() => this.#uninitializeBrowserContext());

    beforeEach(() => this.#initializePage());
    afterEach(() => this.#uninitializePage());
  }

  async gotoPage(ui: EsbuildUi, startTrigger: EsbuildStartTrigger): Promise<void> {
    const url = `http://localhost:${this.#httpServerPort}/${ui}_${startTrigger}`;
    signale.note(`Navigating browser to URL: ${url}`);
    const result = (await this.page.goto(url))!;
    if (!result.ok()) {
      throw new Error(
        `failed to navigate browser to url: ${url} ` +
          `(HTTP Status: ${result.status()} ${result.statusText()}) [ynhspqdbq7]`,
      );
    }
  }

  async waitForMochaRunStartNotification(): Promise<void> {
    await this.page.waitForSelector("[data-wkmc78epyj-mocha-run-start]", { timeout: 1000 });
  }

  async waitForMochaRunDoneNotification(): Promise<void> {
    await this.page.waitForSelector("[data-wkmc78epyj-mocha-run-done]", { timeout: 1000 });
  }

  verifyNoMochaRunStartNotification(): Promise<void> {
    return this.#verifyNoNotification("data-wkmc78epyj-mocha-run-start");
  }

  async verifyNoMochaRunDoneNotification(): Promise<void> {
    return this.#verifyNoNotification("data-wkmc78epyj-mocha-run-done");
  }

  async #verifyNoNotification(attributeName: string): Promise<void> {
    const selector = `[${attributeName}]`;
    await new Promise((resolve, reject) => {
      this.page
        .waitForSelector(selector, { timeout: 200 })
        .then(() => reject(`got notification ${attributeName}, but expected to NOT get it`))
        .catch(error => {
          if (error instanceof PuppeteerTimeoutError) {
            resolve(null);
          } else {
            reject(error);
          }
        });
    });
  }

  getMochaDivInnerHtml(): Promise<string> {
    return this.page.$eval("#mocha", div => div.innerHTML);
  }

  clickStartTestsButton(): Promise<void> {
    return this.page.$eval("#btnStartTests", button => button.click());
  }

  get #httpServerPort(): number {
    const address = this.#httpServer?.address();
    if (!address) {
      throw new Error("HTTP server is not started [jv7xt9qfnz]");
    } else if (typeof address === "string") {
      throw new Error(`Don't know how to get port from address string: ${address} [pp9a8tz8yh]`);
    }
    return address.port;
  }

  async #initializeTempDir(): Promise<void> {
    this.tempDir = await mkdtemp(path.join(getSystemTempDir(), "cube-scrambler-mvpnyf386e"));
    signale.note(`Created temporary directory: ${this.tempDir}`);
  }

  async #uninitializeTempDir(): Promise<void> {
    const tempDir = this.tempDir;
    this.tempDir = undefinedValue();
    if (tempDir) {
      signale.note(`Deleting temporary directory: ${tempDir}`);
      await rimraf(tempDir);
    }
  }

  async #esbuild(): Promise<void> {
    await esbuild({
      ui: "html",
      startTrigger: "load",
      destDir: path.join(this.tempDir, "html_load"),
    });
    await esbuild({
      ui: "console",
      startTrigger: "load",
      destDir: path.join(this.tempDir, "console_load"),
    });
    await esbuild({
      ui: "html",
      startTrigger: "button",
      destDir: path.join(this.tempDir, "html_button"),
    });
    await esbuild({
      ui: "console",
      startTrigger: "button",
      destDir: path.join(this.tempDir, "console_button"),
    });
  }

  #initializeHttpServer(): Promise<void> {
    signale.note("Starting HTTP server");
    return new Promise<void>((resolve, reject) => {
      const app = express();
      app.use(express.static(this.tempDir));
      this.#httpServer = app.listen(0, "127.0.0.1", error => {
        if (error) {
          reject(error);
        } else {
          resolve();
        }
      });
    });
  }

  #uninitializeHttpServer(): Promise<void> {
    const httpServer = this.#httpServer;
    this.#httpServer = undefinedValue();
    return new Promise((resolve, reject) => {
      if (!httpServer) {
        resolve();
      } else {
        signale.note("Shutting down HTTP server");
        httpServer.close(error => {
          if (error) {
            reject(error);
          } else {
            resolve();
          }
        });
      }
    });
  }

  async #initializeBrowser(): Promise<void> {
    const launchOptions = { browser: "chrome", headless: true } satisfies LaunchOptions;
    signale.note(`Launching browser: ${JSON.stringify(launchOptions)}`);
    this.browser = await puppeteer.launch(launchOptions);
  }

  async #uninitializeBrowser(): Promise<void> {
    const browser = this.browser;
    this.browser = undefinedValue();
    if (browser) {
      signale.note(`Closing browser`);
      await browser.close();
    }
  }

  async #initializeBrowserContext(): Promise<void> {
    signale.note("Starting browser incognito session");
    this.browserContext = await this.browser.createBrowserContext();
  }

  async #uninitializeBrowserContext(): Promise<void> {
    const browserContext = this.browserContext;
    this.browserContext = undefinedValue();
    if (browserContext) {
      signale.note("Closing browser incognito session");
      await browserContext.close();
    }
  }

  async #initializePage(): Promise<void> {
    signale.note("Opening incognito browser tab");
    this.page = await this.browserContext.newPage();
  }

  async #uninitializePage(): Promise<void> {
    this.page = undefinedValue();
  }
}

export function setupBrowserTestTools(): Readonly<BrowserTestTools> {
  return new BrowserTestToolsImpl();
}
