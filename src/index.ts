/* eslint-disable @typescript-eslint/no-unused-vars */

import { type Cube, type Face, Faces, getFace, type Move, solvedCube } from "./cube";
import { draw } from "./draw";
import { generateScramble } from "./scramble";
import { solveWhiteCross } from "./solve_white_cross";
import { transform } from "./transform";

function log(cube: Cube) {
  for (const face in Faces) {
    console.log(`${face}:`, getFace(cube, face as unknown as Face));
  }
}

function runScramble() {
  const cube = solvedCube();
  const scramble = generateScramble();
  transform(cube, scramble);
  const whiteCrossSolveMoves = solveWhiteCross(cube);
  console.log(scramble.join(", "));
  console.log(whiteCrossSolveMoves.join(", "));
  draw(cube);
}

runScramble();
