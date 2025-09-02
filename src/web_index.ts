import { inspect } from "#platform";

import { generateScramble, solvedCube, transform } from "./cube.ts";
import { type Cube, type Face, getFace } from "./cube.ts";

interface Ui {
  cubeContainer: HTMLElement;
  generateButton: HTMLButtonElement;
  scrambleText: HTMLElement;
}

function draw(cube: Cube, container: HTMLElement): void {
  const faceOrder: Face[] = ["Up", "Left", "Front", "Right", "Back", "Down"];

  for (const faceName of faceOrder) {
    const faceElement = document.createElement("div");
    faceElement.classList.add("face", `${faceName.toLowerCase()}-face`);
    faceElement.style.padding = "16px";

    const stickers = getFace(cube, faceName);
    for (const color of stickers) {
      const stickerElement = document.createElement("div");
      stickerElement.classList.add("sticker", `sticker-${color}`);
      faceElement.append(stickerElement);
    }
    container.append(faceElement);
  }
}

function generateAndDrawScramble(ui: Ui) {
  const scramble = generateScramble();

  ui.scrambleText.innerHTML = "";
  const chunkSize = 5;
  for (let index = 0; index < scramble.length; index += chunkSize) {
    const chunk = scramble.slice(index, index + chunkSize);
    const lineElement = document.createElement("div");
    lineElement.classList.add("scramble-line");
    lineElement.textContent = chunk.map(s => s.padEnd(2, "\u00A0")).join("\u00A0");
    ui.scrambleText.append(lineElement);
  }

  const cube = solvedCube();
  for (const move of scramble) {
    transform(cube, move);
  }

  ui.cubeContainer.innerHTML = "";
  draw(cube, ui.cubeContainer);
}

function getElementById<T extends HTMLElement>(id: string): T {
  const element = document.querySelector("#" + id);
  if (!element) {
    throw new Error(`unable to find element with ID ${inspect(id)} [errktkyf2g]`);
  }
  return element as T;
};

function loadUi(): Ui {
  return {
    cubeContainer: getElementById("cube-container"),
    generateButton: getElementById("generate-button"),
    scrambleText: getElementById("scramble-sequence"),
  };
}

function main() {
  const ui = loadUi();

  ui.generateButton.addEventListener("click", event => {
    event.preventDefault();
    generateAndDrawScramble(ui);
  });

  generateAndDrawScramble(ui);
}

main();
