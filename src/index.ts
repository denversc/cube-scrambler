/* eslint-disable @typescript-eslint/no-unused-vars */

import { type Cube, type Face, Faces, getFace, type Move, solvedCube } from "./cube";
import { transform } from "./transform";
import { draw } from "./draw";
import { generateScramble } from "./scramble";

function log(cube: Cube) {
  for (const face in Faces) {
    console.log(`${face}:`, getFace(cube, face as unknown as Face));
  }
}

function runScramble(scramble?: Move[]) {
  const cube = solvedCube();

  if (scramble === undefined) {
    scramble = generateScramble();
  }

  console.log(scramble.join(", "));
  for (const move of scramble) {
    console.log("Move:", move);
    transform(cube, move);
    draw(cube);
    console.log();
  }
  console.log(scramble.join(", "));
}

runScramble();
