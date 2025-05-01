import type { MainConfig } from "../types";
import { ConsoleMochaReporter } from "./console_mocha_reporter";

declare const main_config_from_esbuild_ycvsy2qgg5: MainConfig;

async function main(config: MainConfig): Promise<void> {
  console.log("index.ts starting; config:", config, "[ertgr37c2j]");
  const { ui, startTrigger } = config;

  mocha.setup({
    checkLeaks: true,
    failZero: true,
    reporter: reporterForUi(ui),
    ui: "bdd",
  });

  const startTestsButton = configureStartTestsButton(ui, startTrigger);

  await Promise.all(config.testModules.map(testModule => import(testModule)));

  if (startTestsButton) {
    startTestsButton.disabled = false;
  }

  console.log(`startTrigger=${startTrigger} [ertgr37c2j]`);
  if (startTrigger === "load") {
    setTimeout(() => runMochaTests(ui));
  } else if (startTrigger !== "button") {
    throw new Error(`invalid MainConfig.StartTrigger: ${startTrigger} [t55578mqss]`);
  }

  sendNotification("initialized");
}

function reporterForUi(ui: MainConfig.Ui): string | Mocha.ReporterConstructor {
  if (ui === "console") {
    return ConsoleMochaReporter as unknown as Mocha.ReporterConstructor;
  } else if (ui === "html") {
    return "html";
  } else {
    throw new Error(`invalid MainConfig.Ui value: ${ui} [b6r9vhk4a8]`);
  }
}

function runMochaTests(ui: MainConfig.Ui) {
  console.log("runMochaTests(); ui:", ui, "[ertgr37c2j]");

  sendNotification("mocha-run-start");

  console.log("mocha.run() start [ertgr37c2j]");
  try {
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

function configureStartTestsButton(
  ui: MainConfig.Ui,
  startTrigger: MainConfig.StartTrigger,
): HTMLButtonElement | null {
  const button = getElementWithIdOrThrow<HTMLButtonElement>("btnStartTests");
  if (startTrigger === "button") {
    button.addEventListener("click", function (event) {
      event.preventDefault();
      this.remove();
      runMochaTests(ui);
    });
    return button;
  } else if (startTrigger === "load") {
    button.remove();
    return null;
  } else {
    throw new Error(`invalid MainConfig.Ui: ${ui} [d4wamwcbes]`);
  }
}

main(main_config_from_esbuild_ycvsy2qgg5);
