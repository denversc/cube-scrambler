import { inspect } from "#platform";
import { describe, expect, test } from "vitest";

import {
  type CornerCubeIndex,
  CornerPieceColors,
  CornerPieces,
  type CubeIndex,
  EdgePieceColors,
  EdgePieces,
  isCornerPiece,
  isEdgePiece,
  isMiddlePiece,
  isMove,
  MiddlePieces,
  Moves,
} from "../src/cube";
import { unreachable } from "../src/util/unreachable";
import { Random } from "./testing/random";
import { repeat } from "./testing/repeat";

describe("EdgePieces [q23cgqdztf]", () => {
  test("correct length [a7tx25a3kh]", () => {
    expect(EdgePieces.length).toBe(12);
  });

  test("each value satisfies isEdgePiece() [pks5rpktn6]", () => {
    for (const edgePiece of EdgePieces) {
      const failMessage = `edgePiece=${inspect(edgePiece)}`;
      expect(isEdgePiece(edgePiece), failMessage).toBe(true);
    }
  });

  test("distinct cube indexes [ea3njhkpzq]", () => {
    assertEachValueOccurrenceCount(EdgePieces.flat(), 1, "x6f2ncg3th");
  });

  test("is deeply immutable [mtgk2fmp2g]", () => {
    assertIsTwoLevelsImmutable(EdgePieces, "mtgk2fmp2g");
  });
});

describe("EdgePieceColors [pdna98h8w3]", () => {
  test("correct length [fz5rb6fafv]", () => {
    expect(EdgePieceColors.length).toBe(12);
  });

  test("each color appears 4 times [hnr9a9sbcv]", () => {
    assertEachValueOccurrenceCount(EdgePieceColors.flat(), 4, "jbpqt2eawa");
  });

  test("is deeply immutable [ray8epwreb]", () => {
    assertIsTwoLevelsImmutable(EdgePieceColors, "qa99xz6jdy");
  });
});

describe("isEdgePiece() [bv8h6xec4m]", () => {
  test("returns true for each value in EdgePieces [e5zqzhvpxn]", () => {
    for (const edgePiece of EdgePieces) {
      const failMessage = `edgePiece=${inspect(edgePiece)} [trsspjydts]`;
      expect(isEdgePiece(edgePiece), failMessage).toBe(true);
    }
  });

  test("returns true for each permuted value in EdgePieces [zbzg8w7trz]", () => {
    for (const edgePiece of EdgePieces) {
      const permutedEdgePiece = [edgePiece[1], edgePiece[0]] as const;
      const failMessage = `permutedEdgePiece=${inspect(permutedEdgePiece)} [aga3vasxeh]`;
      expect(isEdgePiece(permutedEdgePiece), failMessage).toBe(true);
    }
  });

  test("returns false if one or both of the indexes is not an edge index [abv7dq9jbw]", () => {
    const random = new Random();
    const nonCornerIndexes: readonly CubeIndex[] = [...CornerPieces.flat(), ...MiddlePieces];

    function randomCubeIndex(type: "edge" | "non-edge"): CubeIndex {
      switch (type) {
        case "edge": {
          return random.elementFrom(random.elementFrom(EdgePieces));
        }
        case "non-edge": {
          return random.elementFrom(nonCornerIndexes);
        }
        default: {
          unreachable(type, "unknown type [h965c53ves]");
        }
      }
    }

    repeat(100, iterationIndex => {
      const nonEdgeIndexCount = 1 + random.intBetweenZeroAnd(1);
      const arrangement: Array<"edge" | "non-edge"> = ["edge", "edge"];
      repeat(nonEdgeIndexCount, index => {
        arrangement[index] = "non-edge";
      });
      random.shuffle(arrangement, { permutationCount: 5 });

      const piece: CubeIndex[] = [];
      for (const element of arrangement) {
        piece.push(randomCubeIndex(element));
      }
      expect(piece.length).toBe(2);

      const failMessage =
        `piece=${inspect(piece)}, arrangement=${inspect(arrangement)}, ` +
        `iterationIndex=${iterationIndex}, random.seed=${random.seed}`;
      expect(isEdgePiece(piece as [CubeIndex, CubeIndex]), failMessage).toBe(false);
    });
  });
});

describe("CornerPieces [ng7c56yfm3]", () => {
  test("correct length [zrgeb3snw7]", () => {
    expect(CornerPieces.length).toBe(8);
  });

  test("each value satisfies isCornerPiece() [syg68chdq7]", () => {
    for (const cornerPiece of CornerPieces) {
      const failMessage = `cornerPiece=${inspect(cornerPiece)}`;
      expect(isCornerPiece(cornerPiece), failMessage).toBe(true);
    }
  });

  test("distinct cube indexes [c3gpfghxqp]", () => {
    assertEachValueOccurrenceCount(CornerPieces.flat(), 1, "ajb44bh2ky");
  });

  test("is deeply immutable [wcmapfkcw4]", () => {
    assertIsTwoLevelsImmutable(CornerPieces, "c6z7axt5ay");
  });
});

describe("CornerPieceColors [sdwam8yve5]", () => {
  test("correct length [n7er6nzjqq]", () => {
    expect(CornerPieceColors.length).toBe(8);
  });

  test("each color appears 4 times [hnr9a9sbcv]", () => {
    assertEachValueOccurrenceCount(CornerPieceColors.flat(), 4, "qvnmf3sd83");
  });

  test("is deeply immutable [ray8epwreb]", () => {
    assertIsTwoLevelsImmutable(CornerPieceColors, "yayfvsbgbk");
  });
});

function assertEachValueOccurrenceCount(
  array: readonly unknown[],
  expectedOccurrenceCount: number,
  failId: string,
): void {
  const map = new Map<unknown, number>();
  for (const element of array) {
    const incrementedCount = (map.get(element) ?? 0) + 1;
    map.set(element, incrementedCount);
  }

  const incorrectOccurrenceCounts = new Map<unknown, number>();
  for (const [key, occurrenceCount] of map.entries()) {
    if (occurrenceCount !== expectedOccurrenceCount) {
      incorrectOccurrenceCounts.set(key, occurrenceCount);
    }
  }

  const failMessage =
    `incorrect occurrence counts (should all be ${expectedOccurrenceCount}): ` +
    `${inspect(incorrectOccurrenceCounts)} [v5ywmjx3qk, ${failId}]`;
  expect(incorrectOccurrenceCounts.size, failMessage).toBe(0);
}

function assertIsTwoLevelsImmutable(
  array: Readonly<Array<Readonly<unknown[]>>>,
  failId: string,
): void {
  {
    const failMessage = `Object.isFrozen(${inspect(array)}) [a6cdq5t6sn, ${failId}]`;
    expect(Object.isFrozen(array), failMessage).toBe(true);
  }
  for (const [index, element] of array.entries()) {
    const failMessage = `Object.isFrozen(array[${index}]) [pp86y5622k, ${failId}]`;
    expect(Object.isFrozen(element), failMessage).toBe(true);
  }
}

describe("isCornerPiece() [j8tnmzn2qf]", () => {
  test("returns true for each value in CornerPieces [sxyy85phwv]", () => {
    for (const cornerPiece of CornerPieces) {
      const failMessage = `cornerPiece=${inspect(cornerPiece)} [dwkqm8fnbf]`;
      expect(isCornerPiece(cornerPiece), failMessage).toBe(true);
    }
  });

  test("returns true for each permuted value in CornerPieces [map5axx4vb]", () => {
    for (const cornerPiece of CornerPieces) {
      const permutedCornerPieces: Array<[CornerCubeIndex, CornerCubeIndex, CornerCubeIndex]> = [
        [cornerPiece[0], cornerPiece[2], cornerPiece[1]] as const,
        [cornerPiece[1], cornerPiece[0], cornerPiece[2]] as const,
        [cornerPiece[1], cornerPiece[2], cornerPiece[0]] as const,
        [cornerPiece[2], cornerPiece[0], cornerPiece[1]] as const,
        [cornerPiece[2], cornerPiece[1], cornerPiece[0]] as const,
      ] as const;

      for (const permutedCornerPiece of permutedCornerPieces) {
        const failMessage = `permutedCornerPiece=${inspect(permutedCornerPiece)} [pkxps4rytz]`;
        expect(isCornerPiece(permutedCornerPiece), failMessage).toBe(true);
      }
    }
  });

  test("returns false if one or more of the indexes is not a corner index [ag8whc7pda]", () => {
    const random = new Random();
    const nonCornerIndexes: readonly CubeIndex[] = [...EdgePieces.flat(), ...MiddlePieces];

    function randomCubeIndex(type: "corner" | "non-corner"): CubeIndex {
      switch (type) {
        case "corner": {
          return random.elementFrom(random.elementFrom(CornerPieces));
        }
        case "non-corner": {
          return random.elementFrom(nonCornerIndexes);
        }
        default: {
          unreachable(type, "unknown type [errxdny89k]");
        }
      }
    }

    repeat(100, iterationIndex => {
      const nonCornerIndexCount = 1 + random.intBetweenZeroAnd(2);
      const arrangement: Array<"corner" | "non-corner"> = ["corner", "corner", "corner"];
      repeat(nonCornerIndexCount, index => {
        arrangement[index] = "non-corner";
      });
      random.shuffle(arrangement, { permutationCount: 5 });

      const piece: CubeIndex[] = [];
      for (const element of arrangement) {
        piece.push(randomCubeIndex(element));
      }
      expect(piece.length).toBe(3);

      const failMessage =
        `piece=${inspect(piece)}, arrangement=${inspect(arrangement)}, ` +
        `iterationIndex=${iterationIndex}, random.seed=${random.seed}`;
      expect(isCornerPiece(piece as [CubeIndex, CubeIndex, CubeIndex]), failMessage).toBe(false);
    });
  });
});

describe("MiddlePieces [tfrmdye9fp]", () => {
  test("correct length [ha42psqnkp]", () => {
    expect(MiddlePieces.length).toBe(6);
  });

  test("each value satisfies isMiddlePiece() [f22x6ed3vq]", () => {
    for (const middlePiece of MiddlePieces) {
      const failMessage = `middlePiece=${inspect(middlePiece)}`;
      expect(isMiddlePiece(middlePiece), failMessage).toBe(true);
    }
  });

  test("distinct cube indexes [kbqantq2sq]", () => {
    assertEachValueOccurrenceCount(MiddlePieces, 1, "g8g3bw4v4v");
  });

  test("is deeply immutable [a4327vex2p]", () => {
    expect(Object.isFrozen(MiddlePieces)).toBe(true);
  });
});

describe("isMiddlePiece() [q25depntd8]", () => {
  test("returns true for each value in MiddlePieces [znwj7pvb9t]", () => {
    for (const middlePiece of MiddlePieces) {
      const failMessage = `middlePiece=${inspect(middlePiece)} [kfsmy9fsnn]`;
      expect(isMiddlePiece(middlePiece), failMessage).toBe(true);
    }
  });

  test("returns false if the given index is not a middle index [myc9c6xwz8]", () => {
    const nonMiddleIndexes: readonly CubeIndex[] = [...EdgePieces.flat(), ...CornerPieces.flat()];
    for (const nonMiddleIndex of nonMiddleIndexes) {
      const failMessage = `nonMiddleIndex=${inspect(nonMiddleIndex)}`;
      expect(isMiddlePiece(nonMiddleIndex), failMessage).toBe(false);
    }
  });
});

describe("Moves [m67dy8nsp2]", () => {
  test("correct length [wcag5dbzmd]", () => {
    expect(Moves.length).toBe(36);
  });

  test("each value satisfies isMove() [eb4rnbtr8a]", () => {
    for (const move of Moves) {
      const failMessage = `move=${inspect(move)}`;
      expect(isMove(move), failMessage).toBe(true);
    }
  });

  test("distinct values [qmkspcajkd]", () => {
    assertEachValueOccurrenceCount(Moves, 1, "bqsrnad3vx");
  });

  test("is deeply immutable [enq6yhjxhr]", () => {
    expect(Object.isFrozen(Moves)).toBe(true);
  });
});

describe("isMove() [er7mtx2key]", () => {
  test("returns true for each value in Moves [vx4hc7h7mt]", () => {
    for (const move of Moves) {
      const failMessage = `move=${inspect(move)} [kfsmy9fsnn]`;
      expect(isMove(move), failMessage).toBe(true);
    }
  });

  test("returns false for any type other than string [xxmct2hxh7]", () => {
    const notStrings = [
      true,
      false,
      null,
      undefined,
      Symbol("not a string"),
      () => "not a string",
      {},
      [],
    ];

    for (const notString of notStrings) {
      const failMessage = `notString=${inspect(notString)}`;
      expect(isMove(notString), failMessage).toBe(false);
    }
  });

  test("returns false for any other strings [vjqwrjzmr6]", () => {
    const notMoveStrings: string[] = ["", "'", "X", "X'", "X2", "abcde"];

    for (const notMoveString of notMoveStrings) {
      const failMessage = `notMoveString=${inspect(notMoveString)}`;
      expect(isMove(notMoveString), failMessage).toBe(false);
    }
  });
});
