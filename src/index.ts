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
    scramble = generateScramble();
  }

  console.log(scramble.join(", "));
  for (const move of scramble) {
    console.log("Move:", move);
    transform(cube, move);
    draw(cube);
    log(cube);
    console.log();
  }
  console.log(scramble.join(", "));
}

runScramble();
