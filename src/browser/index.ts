import { solvedCube } from "../cube";
import { generateScrambledCube, type GenerateScrambledCubeResult } from "../scramble";
import { transform } from "../transform";
import { renderCube, renderScrambleText } from "./scramble_renderer";
import { state } from "./state";
import { loadUi, type Ui } from "./ui";

declare let ce2ycyt3gs_isCapacitor: boolean | undefined;

function generateAndRenderScramble(ui: Ui) {
  const scrambleResult = generateScrambledCube();
  state.lastScramble = scrambleResult.moves;
  renderScramble(ui, scrambleResult);
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
    const cube = solvedCube();
    transform(cube, initialScramble);
    renderScramble(ui, { cube, moves: initialScramble });
  } else {
    generateAndRenderScramble(ui);
  }
}

function renderScramble(ui: Ui, scrambleResult: GenerateScrambledCubeResult) {
  const { cube, moves } = scrambleResult;
  renderScrambleText(moves, ui.scrambleText);
  renderCube(cube, ui.cubeContainer);
}

main();
