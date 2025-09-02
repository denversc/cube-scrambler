/* eslint-disable @typescript-eslint/no-unused-vars */

import {
  type Cube,
  type Face,
  Faces,
  generateScramble,
  getFace,
  type Move,
  solvedCube,
  transform,
} from "./cube.ts";
import { draw } from "./draw.ts";

function log(cube: Cube) {
  for (const face in Faces) {
    console.log(`${face}:`, getFace(cube, face as unknown as Face));
  }
}

function runScramble(scramble?: Move[]) {
  const cube = solvedCube();

  if (scramble === undefined) {
    scramble = generateScramble({
      candidateMoves: ["R", "R2", "R'", "L", "L2", "L'", "U"],
    });
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
