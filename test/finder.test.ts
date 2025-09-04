import { inspect } from "#platform";
import { describe, expect, test } from "vitest";

import { type Color, type Cube, EdgePieceColors, solvedCube } from "../src/cube";
import { findEdge } from "../src/finder";
import { generateScrambledCube } from "../src/scramble";
import { Random } from "./testing/random";
import { repeat } from "./testing/repeat";

describe("findEdge [jef43gjve4]", () => {
  function randomEdgePieceColors(random: Random): [Color, Color] {
    const normalizedEdgePieceColors = random.elementFrom(EdgePieceColors);
    return random.shuffled(normalizedEdgePieceColors, { permutationCount: 5 }) as [Color, Color];
  }

  function assertFindsEdge(
    cube: Readonly<Cube>,
    edgePieceColors: Readonly<[Color, Color]>,
    testId: string,
  ): void {
    const result = findEdge(cube, edgePieceColors);
    const failMessage =
      `edgePieceColors=${inspect(edgePieceColors)}, ` +
      `result=${inspect(result)} [r6mm6e8jf3, ${testId}]`;
    expect(cube[result[0]], failMessage + " [xdbjjj7848]").toBe(edgePieceColors[0]);
    expect(cube[result[1]], failMessage + " [nspms2fc4f]").toBe(edgePieceColors[1]);
  }

  test("finds edges in solved cube [ks5ya4vw87]", () => {
    const random = new Random();
    repeat(100, iterationIndex => {
      const edgePieceColors = randomEdgePieceColors(random);
      assertFindsEdge(solvedCube(), edgePieceColors, `x3c5jdnhnp-${iterationIndex}`);
    });
  });

  test("finds edges in scrambled cubes [zkf57any5a]", () => {
    const random = new Random();
    repeat(100, iterationIndex => {
      const edgePieceColors = randomEdgePieceColors(random);
      const scrambledCube = generateScrambledCube().cube;
      assertFindsEdge(scrambledCube, edgePieceColors, `ffxn8457c6-${iterationIndex}`);
    });
  });
});
