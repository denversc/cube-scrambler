import type { MainConfig } from "../types";
import { ConsoleMochaReporter } from "./console_mocha_reporter";

declare const main_config_from_esbuild_ycvsy2qgg5: MainConfig;

async function main(config: MainConfig): Promise<void> {
  console.log("index.ts starting [ertgr37c2j]");
  const { ui, startTrigger } = config;

  mocha.setup("bdd");
  mocha.checkLeaks();
  mocha.failZero();

  await Promise.all(config.testModules.map(testModule => import(testModule)));

  console.log(`ui=${ui} [ertgr37c2j]`);
  if (ui === "console") {
    mocha.reporter(ConsoleMochaReporter as unknown as Mocha.ReporterConstructor);
  } else if (ui === "html") {
    getElementWithIdOrThrow("mocha").hidden = false;
  } else {
    throw new Error(`invalid value for "ui": ${ui} [b6r9vhk4a8]`);
  }

  console.log(`startTrigger=${startTrigger} [ertgr37c2j]`);
  if (startTrigger === "button") {
    const button: HTMLButtonElement = getElementWithIdOrThrow("btnStartTests");
    button.hidden = false;
    button.addEventListener("click", event => {
      event.preventDefault();
      button.disabled = true;
      runMochaTests();
    });
  } else if (startTrigger === "load") {
    setTimeout(runMochaTests);
  } else {
    throw new Error(`invalid value for "startTrigger": ${startTrigger} [t55578mqss]`);
  }
}

function runMochaTests() {
  console.log("mocha.run() start [ertgr37c2j]");
  try {
    sendNotification("mocha-run-start");
    mocha.run();
  } finally {
    console.log("mocha.run() done [ertgr37c2j]");
    sendNotification("mocha-run-done");
  }
}

function sendNotification(id: string, value?: string): void {
  const attributeName = `data-wkmc78epyj-${id}`;
  console.log(
    `appending notification element with attribute ${JSON.stringify(attributeName)} and value ` +
      `${JSON.stringify(value)} [ertgr37c2j]`,
  );
  const notificationsElement = getElementWithIdOrThrow("notifications");
  const notificationElement = document.createElement("span");
  notificationElement.setAttribute(`data-wkmc78epyj-${id}`, value ?? "");
  notificationsElement.append(notificationElement);
}

function getElementWithIdOrThrow<T extends HTMLElement = HTMLElement>(elementId: string): T {
  const element = document.getElementById(elementId);
  if (!element) {
    throw new Error(`HTML element with ID "${elementId}" not found [x28pvtvpk3]`);
  }
  return element as T;
}

main(main_config_from_esbuild_ycvsy2qgg5);
