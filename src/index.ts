/* eslint-disable @typescript-eslint/no-unused-vars */

import { type Cube, type Face, Faces, getFace, type Move, solvedCube } from "./cube";
import { draw } from "./draw";
import { calculateOptimizedMoves } from "./optimize";
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
  console.log(`scramble: ${scramble.join(" ")} ` + `(length=${scramble.length})`);

  const whiteCrossSolveMoves = solveWhiteCross(cube);
  console.log(
    `whiteCrossSolveMoves: ${whiteCrossSolveMoves.join(" ")} ` +
      `(length=${whiteCrossSolveMoves.length})`,
  );

  const unoptimizedMoves = [...scramble, ...whiteCrossSolveMoves];
  console.log(
    `unoptimizedMoves: ${unoptimizedMoves.join(" ")} ` + `(length=${unoptimizedMoves.length})`,
  );

  const optimizedMoves = calculateOptimizedMoves(unoptimizedMoves);
  console.log(`optimizedMoves: ${optimizedMoves.join(" ")} ` + `(length=${optimizedMoves.length})`);

  draw(cube);
}

runScramble();
