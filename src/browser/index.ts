import { generateScramble, solvedCube, transform } from "../cube";
import { renderCube, renderScrambleText } from "./scramble_renderer";
import { loadUi, type Ui } from "./ui";

function generateAndRenderScramble(ui: Ui) {
  const scramble = generateScramble();

  const cube = solvedCube();
  for (const move of scramble) {
    transform(cube, move);
  }

  renderScrambleText(scramble, ui.scrambleText);
  renderCube(cube, ui.cubeContainer);
}

function main() {
  const ui = loadUi();

  ui.generateButton.addEventListener("click", event => {
    event.preventDefault();
    generateAndRenderScramble(ui);
  });

  generateAndRenderScramble(ui);
}

main();
