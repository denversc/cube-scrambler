import { expect } from "chai";

import { setupBrowserTestTools } from "./integration.testing";

describe("integration.test.ts [j3f27kxwtt]", () => {
  const tools = setupBrowserTestTools();

  it("reporter=html startTrigger=load [m8zbx9643t]", async () => {
    await tools.gotoPage("html", "load");
    await tools.waitForMochaRunStartNotification();
    await tools.waitForMochaRunDoneNotification();
    const divHtml = await tools.getMochaDivInnerHtml();
    expect(divHtml).is.not.empty;
  });

  it("reporter=console startTrigger=load [f4d34rf57e]", async () => {
    await tools.gotoPage("console", "load");
    await tools.waitForMochaRunStartNotification();
    await tools.waitForMochaRunDoneNotification();
    const divHtml = await tools.getMochaDivInnerHtml();
    expect(divHtml).is.empty;
  });

  it("reporter=html startTrigger=button [m8zbx9643t]", async () => {
    await tools.gotoPage("html", "button");

    await tools.verifyNoMochaRunStartNotification();
    const divHtml1 = await tools.getMochaDivInnerHtml();
    expect(divHtml1, "divHtml1").is.empty;

    await tools.clickStartTestsButton();
    await tools.waitForMochaRunStartNotification();
    await tools.waitForMochaRunDoneNotification();

    const divHtml2 = await tools.getMochaDivInnerHtml();
    expect(divHtml2, "divHtml2").is.not.empty;
  });

  it("reporter=console startTrigger=button [m8zbx9643t]", async () => {
    await tools.gotoPage("console", "button");

    await tools.verifyNoMochaRunStartNotification();
    const divHtml1 = await tools.getMochaDivInnerHtml();
    expect(divHtml1, "divHtml1").is.empty;

    await tools.clickStartTestsButton();
    await tools.waitForMochaRunStartNotification();
    await tools.waitForMochaRunDoneNotification();

    const divHtml2 = await tools.getMochaDivInnerHtml();
    expect(divHtml2, "divHtml2").is.empty;
  });
});
