import { generateScramble, type Move, solvedCube, transform } from "../cube";
import { renderCube, renderScrambleText } from "./scramble_renderer";
import { state } from "./state";
import { loadUi, type Ui } from "./ui";

declare let ce2ycyt3gs_isCapacitor: boolean | undefined;

function generateAndRenderScramble(ui: Ui) {
  const scramble = generateScramble();
  state.lastScramble = scramble;
  renderScramble(ui, scramble);
}

function main() {
  if (ce2ycyt3gs_isCapacitor) {
    document.body.style.marginTop = "48px";
  }

  const ui = loadUi();

  ui.generateButton.addEventListener("click", event => {
    event.preventDefault();
    generateAndRenderScramble(ui);
  });

  const initialScramble = state.lastScramble;
  if (initialScramble) {
    renderScramble(ui, initialScramble);
  } else {
    generateAndRenderScramble(ui);
  }
}

function renderScramble(ui: Ui, scramble: Move[]) {
  const cube = solvedCube();
  for (const move of scramble) {
    transform(cube, move);
  }

  renderScrambleText(scramble, ui.scrambleText);
  renderCube(cube, ui.cubeContainer);
}

main();
