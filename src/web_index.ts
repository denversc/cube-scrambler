import { solvedCube, generateScramble, transform } from "./cube.ts";
import { type Cube, Faces, getFace } from "./cube.ts";

function main() {
  const cube = solvedCube();
  const scramble = generateScramble();

  const scrambleContainer = document.getElementById("scramble-sequence");
  if (scrambleContainer) {
    scrambleContainer.textContent = scramble.join(", ");
  }

  for (const move of scramble) {
    transform(cube, move);
  }

  draw(cube, "cube-container");
}

function draw(cube: Cube, containerId: string): void {
  const container = document.getElementById(containerId);
  if (!container) {
    console.error(`Container with id #${containerId} not found.`);
    return;
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

main();
