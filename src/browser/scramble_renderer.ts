import { inspect } from "#platform";

import { type Cube, type Face, getFace, type Move } from "../cube.ts";

export interface RenderScrambleTextOptions {
  maximumMovesPerLine: number;
}

export function renderCube(cube: Cube, element: HTMLElement): void {
  element.innerHTML = "";

  for (const faceName of RENDER_CUBE_FACE_ORDER) {
    const faceElement = document.createElement("div");
    faceElement.classList.add("face", `${faceName.toLowerCase()}-face`);
    faceElement.style.padding = "16px";

    const stickers = getFace(cube, faceName);
    for (const stickerColor of stickers) {
      const stickerElement = document.createElement("div");
      stickerElement.classList.add("sticker", `sticker-${stickerColor}`);
      faceElement.append(stickerElement);
    }
    element.append(faceElement);
  }
}

export function renderScrambleText(
  scramble: Move[],
  element: HTMLElement,
  options?: Partial<RenderScrambleTextOptions>,
): void {
  const maximumMovesPerLine = options?.maximumMovesPerLine ?? 5;
  if (!Number.isInteger(maximumMovesPerLine) || maximumMovesPerLine < 1) {
    throw new Error(`invalid maximum moves per line: ${inspect(maximumMovesPerLine)} [err23xgq9y]`);
  }

  element.innerHTML = "";

  for (let index = 0; index < scramble.length; index += maximumMovesPerLine) {
    const chunk = scramble.slice(index, index + maximumMovesPerLine);
    const lineElement = document.createElement("div");
    lineElement.classList.add("scramble-line");
    lineElement.textContent =
      NON_BREAKING_SPACE + chunk.map(s => s.padEnd(3, NON_BREAKING_SPACE)).join("");
    element.append(lineElement);
  }
}

const RENDER_CUBE_FACE_ORDER: Readonly<Face[]> = Object.freeze([
  "Up",
  "Left",
  "Front",
  "Right",
  "Back",
  "Down",
]);

const NON_BREAKING_SPACE = "\u00A0";
