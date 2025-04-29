import { mkdtemp } from "node:fs/promises";
import path from "node:path";

import { expect } from "chai";
import type { Browser, BrowserContext, Page } from "puppeteer";
import puppeteer from "puppeteer";
import { rimraf } from "rimraf";
import signale from "signale";

import { esbuild } from "./integration.testing";

describe("integration.test.ts [j3f27kxwtt]", () => {
  let tempDir: string;
  before(async () => {
    tempDir = await mkdtemp("cube-scrambler-mvpnyf386e");
    signale.note(`Created temporary directory: ${tempDir}`);
  });

  after(async () => {
    const tempDirLocal = tempDir;
    // @ts-expect-error intentionally violate typing
    tempDir = undefined;
    if (tempDirLocal) {
      signale.note(`Deleting temporary directory: ${tempDirLocal}`);
      await rimraf(tempDirLocal);
    }
  });

  before(async () => {
    await esbuild({ ui: "html", startTrigger: "load", destDir: path.join(tempDir, "html_load") });
    await esbuild({
      ui: "console",
      startTrigger: "load",
      destDir: path.join(tempDir, "console_load"),
    });
    await esbuild({
      ui: "html",
      startTrigger: "button",
      destDir: path.join(tempDir, "html_button"),
    });
    await esbuild({
      ui: "console",
      startTrigger: "button",
      destDir: path.join(tempDir, "console_button"),
    });
  });

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

  let browserContext: BrowserContext;
  let page: Page;

  beforeEach(async () => {
    browserContext = await browser.createBrowserContext();
    page = await browserContext.newPage();
    await page.goto("http://localhost:9080");
  });

  afterEach(async () => {
    const localBrowserContext = browserContext;
    // @ts-expect-error intentionally violate typing
    browserContext = undefined;
    // @ts-expect-error intentionally violate typing
    page = undefined;
    await localBrowserContext?.close();
  });

  it("reporter=html startTrigger=load [m8zbx9643t]", async () => {
    const divHtml = await page.$eval("#mocha", div => div.innerHTML);
    expect(divHtml).is.not.empty;
  });

  it("reporter=console startTrigger=load [f4d34rf57e]", async () => {
    const divHtml = await page.$eval("#mocha", div => div.innerHTML);
    expect(divHtml).is.not.empty;
  });
});
