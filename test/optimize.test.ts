import { inspect } from "#platform";
import { describe, expect, test } from "vitest";

import { type Move, MoveFamilyByMove, Moves, solvedCube } from "../src/cube";
import { optimizedMoves } from "../src/optimize";
import { generateScramble } from "../src/scramble";
import { transform } from "../src/transform";
import { Random } from "./testing/random";
import { repeat } from "./testing/repeat";

describe("optimizedMoves() [s6w78n6x3w]", () => {
  test("empty array [yzc8qemhyv]", () => {
    expect(optimizedMoves([])).toEqual([]);
  });

  test("array length 1 [dfq7yt74bz]", () => {
    for (const move of Moves) {
      expect(optimizedMoves([move])).toEqual([move]);
    }
  });

  test("scrambles should always be optimized [jt3yvamjsd]", () => {
    const random = new Random();
    repeat(1000, iterationIndex => {
      const scramble = Object.freeze(generateScramble({ random: () => random.next() }));
      const failMessage =
        `scramble=${inspect(scramble)}, iterationIndex=${iterationIndex}, ` +
        `random.seed=${random.seed} [f89y7ftdpp]`;
      expect(optimizedMoves(scramble), failMessage).toEqual(scramble);
    });
  });

  test("should annihilate opposite moves (e.g. [U, U'] -> []) [sjkyckxksf]", () => {
    assertOptimizedMovesReturns({
      generateTestData(randomMoves: Move[]) {
        const scramble: Move[] = [];
        const expectedOptimizedScramble: Move[] = [];
        for (const move of randomMoves) {
          scramble.push(move);
          expectedOptimizedScramble.push(move);
          if (move.at(-1) === "'") {
            scramble.push(move.slice(0, -1) as Move, move);
          } else if (move.length === 1) {
            scramble.push(`${move}'` as Move, move);
          }
        }
        return { expectedOptimizedScramble, scramble };
      },
      testId: "pjapj8e6x2",
    });
  });

  test("should merge repeated non-2 moves (e.g. [U, U] -> [U2]) [zxst77dqsk]", () => {
    assertOptimizedMovesReturns({
      generateTestData(randomMoves: Move[]) {
        const scramble: Move[] = [];
        const expectedOptimizedScramble: Move[] = [];
        for (const move of randomMoves) {
          if (move.at(-1) === "2") {
            scramble.push(move);
            expectedOptimizedScramble.push(move);
          } else {
            scramble.push(move, move);
            expectedOptimizedScramble.push(`${move.slice(0, 1)}2` as Move);
          }
        }
        return { expectedOptimizedScramble, scramble };
      },
      testId: "dgbbrcttdj",
    });
  });

  test("should annihilate repeated 2-moves (e.g. [U2, U2] -> []) [sfgmx54qa2]", () => {
    assertOptimizedMovesReturns({
      generateTestData(randomMoves: Move[]) {
        const scramble: Move[] = [];
        for (const move of randomMoves) {
          if (move.at(-1) === "2") {
            scramble.push(move, move, move);
          } else {
            scramble.push(move);
          }
        }
        return { expectedOptimizedScramble: randomMoves, scramble };
      },
      testId: "gd47s69y2a",
    });
  });

  test("should combine 3 repeated non-2 moves (e.g. [U, U, U] -> [U']) [zxst77dqsk]", () => {
    assertOptimizedMovesReturns({
      generateTestData(randomMoves: Move[]) {
        const scramble: Move[] = [];
        const expectedOptimizedScramble: Move[] = [];
        for (const move of randomMoves) {
          if (move.at(-1) === "2") {
            scramble.push(move);
            expectedOptimizedScramble.push(move);
          } else if (move.at(-1) === "'") {
            scramble.push(move, move, move);
            expectedOptimizedScramble.push(move.slice(0, 1) as Move);
          } else {
            scramble.push(move, move, move);
            expectedOptimizedScramble.push(`${move}'` as Move);
          }
        }
        return { expectedOptimizedScramble, scramble };
      },
      testId: "jzwxx5dj2s",
    });
  });

  test("should annihilate 4 repeated non-2 moves (e.g. [U, U, U U] -> []) [wkzhpdft2e]", () => {
    assertOptimizedMovesReturns({
      generateTestData(randomMoves: Move[]) {
        const scramble: Move[] = [];
        for (const move of randomMoves) {
          scramble.push(move, move, move, move, move);
        }
        return { expectedOptimizedScramble: randomMoves, scramble };
      },
      testId: "nmyp7dh53w",
    });
  });

  test("should combine non-2 and 2-moves (e.g. [U, U2] -> [U']) [kz8k34bydw]", () => {
    assertOptimizedMovesReturns({
      generateTestData(randomMoves: Move[]) {
        const random = new Random(randomMoves.join(""));
        const scramble: Move[] = [];
        const expectedOptimizedScramble: Move[] = [];
        for (const move of randomMoves) {
          const moveFamily = MoveFamilyByMove[move];
          const move1 = (moveFamily + "2") as Move;
          const move2 = (moveFamily + (random.nextBoolean() ? "'" : "")) as Move;
          if (random.nextBoolean()) {
            scramble.push(move1, move2);
          } else {
            scramble.push(move2, move1);
          }
          if (move2.at(-1) === "'") {
            expectedOptimizedScramble.push(moveFamily);
          } else {
            expectedOptimizedScramble.push((moveFamily + "'") as Move);
          }
        }
        return { expectedOptimizedScramble, scramble };
      },
      testId: "qs3v67nmrn",
    });
  });

  test("optimized scrambles should produce the same cube state [nqtta633j5]", () => {
    const random = new Random();
    repeat(100, iterationIndex => {
      const scramble = generateScramble({ moveCount: 1000, random: () => random.next() });
      random.shuffle(scramble, { permutationCount: 500 });

      const optimizedScramble = optimizedMoves(scramble);

      const cube = solvedCube();
      transform(cube, scramble);
      const optimizedCube = solvedCube();
      transform(optimizedCube, optimizedScramble);

      const failMessage =
        `scramble=${inspect(scramble)}, optimizedScramble=${inspect(optimizedScramble)}, ` +
        `cube=${inspect(cube)}, optimizedCube=${inspect(optimizedCube)}, ` +
        `iterationIndex=${iterationIndex}, ` +
        `random.seed=${random.seed} [rtgedhhfkr]`;
      expect(optimizedScramble.length, failMessage).toBeLessThanOrEqual(scramble.length);
      expect(optimizedCube, failMessage).toEqual(cube);
    });
  });
});

interface AssertOptimizedMovesReturnsConfig {
  generateTestData: (randomMoves: Move[]) => {
    expectedOptimizedScramble: Move[];
    scramble: Move[];
  };
  testId: string;
}

function assertOptimizedMovesReturns(config: AssertOptimizedMovesReturnsConfig): void {
  const { generateTestData, testId } = config;

  const random = new Random();
  repeat(1000, iterationIndex => {
    const randomMoves = generateScramble({ random: () => random.next() });
    const { expectedOptimizedScramble, scramble } = generateTestData(randomMoves);
    const failMessage =
      `scramble=${inspect(scramble)}, ` +
      `expectedOptimizedScramble=${inspect(expectedOptimizedScramble)}, ` +
      `iterationIndex=${iterationIndex}, random.seed=${random.seed} [mq6q7nsjtp=${testId}]`;
    expect(optimizedMoves(scramble), failMessage).toEqual(expectedOptimizedScramble);
  });
}
