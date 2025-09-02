import { solvedCube, generateScramble, transform } from "./cube.ts";
import { type Cube, Faces, getFace } from "./cube.ts";
import { inspect } from "#platform";

const SCRAMBLE_TEXT_ELEMENT_ID = "scramble-sequence";
const CUBE_ELEMENT_ID = "cube-container";
const GENERATE_BUTTON_ELEMENT_ID = "generate-button";

function generateAndDrawScramble() {
  const scrambleContainer = document.getElementById(SCRAMBLE_TEXT_ELEMENT_ID);
  if (!scrambleContainer) {
    throw new Error(
      `getElementById(${inspect(SCRAMBLE_TEXT_ELEMENT_ID)}) returned null [errvxvy9gq]`,
    );
  }

  const scramble = generateScramble();
  scrambleContainer.textContent = scramble.join(", ");

  const cube = solvedCube();
  for (const move of scramble) {
    transform(cube, move);
  }
  draw(cube);
}

function draw(cube: Cube): void {
  const container = document.getElementById(CUBE_ELEMENT_ID);
  if (!container) {
    throw new Error(`getElementById(${inspect(CUBE_ELEMENT_ID)}) returned null [errx5yqetg]`);
  }
  container.innerHTML = ""; // Clear previous state

  const faceOrder: (keyof typeof Faces)[] = ["Up", "Left", "Front", "Right", "Back", "Down"];

  for (const faceName of faceOrder) {
    const faceElement = document.createElement("div");
    faceElement.classList.add("face", `${faceName.toLowerCase()}-face`);
    faceElement.style.padding = "16px";

    const stickers = getFace(cube, faceName);
    for (const color of stickers) {
      const stickerElement = document.createElement("div");
      stickerElement.classList.add("sticker", `sticker-${color}`);
      faceElement.appendChild(stickerElement);
    }
    container.appendChild(faceElement);
  }
}

function main() {
  generateAndDrawScramble();

  const generateButton = document.getElementById(GENERATE_BUTTON_ELEMENT_ID);
  if (!generateButton) {
    throw new Error(
      `getElementById(${inspect(GENERATE_BUTTON_ELEMENT_ID)}) returned null [erravh3zqf]`,
    );
  }

  generateButton.addEventListener("click", generateAndDrawScramble);
}

main();
