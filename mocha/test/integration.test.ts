import { expect } from "chai";

import { setupBrowserTestTools } from "./integration.testing";

describe("integration.test.ts [j3f27kxwtt]", () => {
  const tools = setupBrowserTestTools();

  it("reporter=html startTrigger=load [m8zbx9643t]", async () => {
    await tools.gotoPage("html", "load");
    await tools.page.waitForSelector("[data-wkmc78epyj-mocha-run-start]");
    await tools.page.waitForSelector("[data-wkmc78epyj-mocha-run-done]");
    const divHtml = await tools.page.$eval("#mocha", div => div.innerHTML);
    expect(divHtml).is.not.empty;
  });

  it("reporter=console startTrigger=load [f4d34rf57e]", async () => {
    await tools.gotoPage("console", "load");
    await tools.page.waitForSelector("[data-wkmc78epyj-mocha-run-start]");
    await tools.page.waitForSelector("[data-wkmc78epyj-mocha-run-done]");
    const divHtml = await tools.page.$eval("#mocha", div => div.innerHTML);
    expect(divHtml).is.empty;
  });
});
