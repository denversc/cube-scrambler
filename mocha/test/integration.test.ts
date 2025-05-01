import { setupBrowserTestTools } from "./integration.testing";

describe("integration.test.ts [j3f27kxwtt]", () => {
  const tools = setupBrowserTestTools();

  it("reporter=html startTrigger=load [m8zbx9643t]", async () => {
    await tools.gotoPage("html", "load");
    await tools.waitForInitializedNotification();
    await tools.verifyStartTestsButtonIsAbsent();

    await tools.waitForMochaRunStartNotification();
    await tools.waitForMochaRunDoneNotification();
    await tools.verifyMochaDivIsNotEmpty();
  });

  it("reporter=console startTrigger=load [f4d34rf57e]", async () => {
    await tools.gotoPage("console", "load");
    await tools.waitForInitializedNotification();
    await tools.verifyStartTestsButtonIsAbsent();

    await tools.waitForMochaRunStartNotification();
    await tools.waitForMochaRunDoneNotification();
    await tools.verifyMochaDivIsEmpty();
  });

  it("reporter=html startTrigger=button [a3rx6syg3p]", async () => {
    await tools.gotoPage("html", "button");
    await tools.waitForInitializedNotification();
    await tools.verifyStartTestsButtonIsPresent();
    await tools.verifyNoMochaRunStartNotification();

    await tools.clickStartTestsButton();
    await tools.waitForMochaRunStartNotification();
    await tools.waitForMochaRunDoneNotification();
    await tools.verifyMochaDivIsNotEmpty();
  });

  it("reporter=console startTrigger=button [xr7wxrnxyp]", async () => {
    await tools.gotoPage("console", "button");
    await tools.waitForInitializedNotification();
    await tools.verifyStartTestsButtonIsPresent();
    await tools.verifyNoMochaRunStartNotification();

    await tools.clickStartTestsButton();
    await tools.waitForMochaRunStartNotification();
    await tools.waitForMochaRunDoneNotification();
    await tools.verifyMochaDivIsEmpty();
  });
});
