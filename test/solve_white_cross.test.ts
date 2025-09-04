import { inspect } from "#platform";
import { describe, expect, test } from "vitest";

import { type Color, type Cube, type CubeIndex, CubeIndexes, solvedCube } from "../src/cube";
import { findEdge } from "../src/finder";
import { generateScrambledCube } from "../src/scramble";
import { solveWhiteCross } from "../src/solve_white_cross";
import { Random } from "./testing/random";
import { repeat } from "./testing/repeat";

describe("solveWhiteCross() [mszemy79d5]", () => {
  test("completely solved cube generates no moves [p3zp2tcx8p]", () => {
    const moves = solveWhiteCross(solvedCube());
    expect(moves).toEqual([]);
  });

  test("completely solved cube undergoes no transformations [vcntmc9mqd]", () => {
    // Freeze the `Cube` object so that any attempted transformations will throw.
    solveWhiteCross(Object.freeze(solvedCube()) as Cube);
  });

  test("solves green/white edge [r5y9wz7zm5]", () => {
    assertSolvesEdge({
      edgePieceColors: ["Green", "White"],
      expectedEdgePieceUltimateLocation: [CubeIndexes.Front.TopMiddle, CubeIndexes.Up.BottomMiddle],
      random: new Random(),
      testId: "rwzc3n2d9k",
    });
  });

  test("solves red/white edge [gnve8xtc9a]", () => {
    assertSolvesEdge({
      edgePieceColors: ["Red", "White"],
      expectedEdgePieceUltimateLocation: [CubeIndexes.Right.TopMiddle, CubeIndexes.Up.MiddleRight],
      random: new Random(),
      testId: "qkx6hb68xv",
    });
  });

  test("solves blue/white edge [bak4sc4n4g]", () => {
    assertSolvesEdge({
      edgePieceColors: ["Blue", "White"],
      expectedEdgePieceUltimateLocation: [CubeIndexes.Back.TopMiddle, CubeIndexes.Up.TopMiddle],
      random: new Random(),
      testId: "q2swva88rq",
    });
  });

  test("solves orange/white edge [jje4m8svpw]", () => {
    assertSolvesEdge({
      edgePieceColors: ["Orange", "White"],
      expectedEdgePieceUltimateLocation: [CubeIndexes.Left.TopMiddle, CubeIndexes.Up.MiddleLeft],
      random: new Random(),
      testId: "nenfpf3btb",
    });
  });
});

interface AssertSolvesEdgeParameters {
  edgePieceColors: [Color, Color];
  expectedEdgePieceUltimateLocation: [CubeIndex, CubeIndex];
  random: Random;
  testId: string;
}

function assertSolvesEdge(parameters: AssertSolvesEdgeParameters) {
  const { edgePieceColors, expectedEdgePieceUltimateLocation, random, testId } = parameters;

  repeat(1000, iterationIndex => {
    const cube = generateScrambledCube({ random: () => random.next() }).cube;

    const moves = solveWhiteCross(cube);

    const edgePiece = findEdge(cube, edgePieceColors);
    const failMessage =
      `cube=${inspect(cube)}, moves=${inspect(moves)}, ` +
      `edgePieceColors=${inspect(edgePieceColors)}, ` +
      `iterationIndex=${iterationIndex}, random.seed=${random.seed} [skejy45362, ${testId}]`;
    expect(edgePiece, failMessage).toEqual(expectedEdgePieceUltimateLocation);
  });
}
