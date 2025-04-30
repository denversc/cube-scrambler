import type { MainConfig } from "../types";
import { ConsoleMochaReporter } from "./console_mocha_reporter";

declare const main_config_from_esbuild_ycvsy2qgg5: MainConfig;

async function main(config: MainConfig): Promise<void> {
  console.log("index.ts starting [ertgr37c2j]");
  const { ui, startTrigger } = config;

  mocha.setup("bdd");
  mocha.checkLeaks();

  await Promise.all(config.testModules.map(testModule => import(testModule)));

  if (ui === "console") {
    console.log("registering console reporter [ertgr37c2j]");
    mocha.reporter(ConsoleMochaReporter as unknown as Mocha.ReporterConstructor);
  } else if (ui === "html") {
    console.log("setting up html reporter [ertgr37c2j]");
    getElementWithIdOrThrow("mocha").hidden = false;
  } else {
    throw new Error(`invalid value for "ui": ${ui} [b6r9vhk4a8]`);
  }

  if (startTrigger === "button") {
    console.log("setting up button to start tests [ertgr37c2j]");
    const button: HTMLButtonElement = getElementWithIdOrThrow("btnStartTests");
    button.hidden = false;
    button.addEventListener("click", event => {
      event.preventDefault();
      button.disabled = true;
      runMochaTests();
    });
  } else if (startTrigger === "load") {
    runMochaTests();
  } else {
    throw new Error(`invalid value for "startTrigger": ${startTrigger} [t55578mqss]`);
  }
}

function runMochaTests() {
  console.log("mocha.run() start [ertgr37c2j]");
  try {
    mocha.run();
  } finally {
    console.log("mocha.run() done [ertgr37c2j]");
  }
}

function getElementWithIdOrThrow<T extends HTMLElement = HTMLElement>(elementId: string): T {
  const element = document.getElementById(elementId);
  if (!element) {
    throw new Error(`HTML element with ID "${elementId}" not found [x28pvtvpk3]`);
  }
  return element as T;
}

main(main_config_from_esbuild_ycvsy2qgg5);
