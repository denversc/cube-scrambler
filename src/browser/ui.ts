import { inspect } from "#platform";

export interface Ui {
  cubeContainer: HTMLElement;
  generateButton: HTMLButtonElement;
  scrambleText: HTMLElement;
}

export function loadUi(): Ui {
  return {
    cubeContainer: getElementById("cube-container"),
    generateButton: getElementById("generate-button"),
    scrambleText: getElementById("scramble-sequence"),
  };
}

// eslint-disable-next-line @typescript-eslint/no-unnecessary-type-parameters
function getElementById<T extends HTMLElement>(id: string): T {
  const element = document.querySelector("#" + id);
  if (!element) {
    throw new Error(`unable to find element with ID ${inspect(id)} [errktkyf2g]`);
  }
  return element as T;
}
