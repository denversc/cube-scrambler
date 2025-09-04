import { inspect } from "#platform";

import {
  type Cube,
  type Move,
  MoveAxisByMoveFamily,
  type MoveFamily,
  MoveFamilyByMove,
  solvedCube,
} from "./cube";
import { transform } from "./transform";

export interface ScrambleOptions {
  candidateMoves: Readonly<Move[]>;
  moveCount: number;
  random: () => number;
}

export const DefaultScrambleOptions: Readonly<ScrambleOptions> = Object.freeze({
  candidateMoves: Object.freeze([
    "R",
    "R'",
    "R2",
    "L",
    "L'",
    "L2",
    "F",
    "F'",
    "F2",
    "B",
    "B'",
    "B2",
    "U",
    "U'",
    "U2",
    "D",
    "D'",
    "D2",
  ]),
  moveCount: 25,
  random: () => Math.random(),
} satisfies ScrambleOptions);

export interface GenerateScrambledCubeResult {
  cube: Cube;
  moves: Move[];
}

export function generateScramble(options?: Partial<ScrambleOptions>): Move[] {
  const moveCount = options?.moveCount ?? DefaultScrambleOptions.moveCount;
  if (!Number.isInteger(moveCount) || moveCount < 0) {
    throw new Error(`invalid moveCount: ${inspect(moveCount)} [errwq2n67e]`);
  }

  const candidateMoves = options?.candidateMoves ?? DefaultScrambleOptions.candidateMoves;
  if (candidateMoves.length === 0) {
    throw new Error(`invalid candidateMoves: ${inspect(candidateMoves)} [errk2kqncg]`);
  }

  const random = options?.random ?? DefaultScrambleOptions.random;

  const moves: Move[] = [];
  while (moves.length < moveCount) {
    const lastMove = moves.at(-1);
    const excludedMoveFamilies = new Set<MoveFamily>();
    if (lastMove !== undefined) {
      const lastMoveFamily = MoveFamilyByMove[lastMove];
      const lastMoveAxis = MoveAxisByMoveFamily[lastMoveFamily];
      excludedMoveFamilies.add(lastMoveFamily);

      let index = -2;
      while (true) {
        const move = moves.at(index);
        if (move === undefined) {
          break;
        }

        const moveFamily = MoveFamilyByMove[move];
        const moveAxis = MoveAxisByMoveFamily[moveFamily];
        if (moveAxis !== lastMoveAxis) {
          break;
        }

        excludedMoveFamilies.add(moveFamily);
        index--;
      }
    }

    const currentCandidateMoves: Move[] = [];
    for (const move of candidateMoves) {
      if (!excludedMoveFamilies.has(MoveFamilyByMove[move])) {
        currentCandidateMoves.push(move);
      }
    }

    const nextMove = currentCandidateMoves[Math.floor(random() * currentCandidateMoves.length)]!;

    moves.push(nextMove);
  }

  return moves;
}

export function generateScrambledCube(
  options?: Partial<ScrambleOptions>,
): GenerateScrambledCubeResult {
  const cube = solvedCube();
  const moves = generateScramble(options);
  transform(cube, moves);
  return { cube, moves };
}
