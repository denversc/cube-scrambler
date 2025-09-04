import { type Move, type MoveFamily, MoveFamilyByMove } from "./cube";

const moveAmountByMove: Readonly<Record<Move, number>> = {
  B: 1,
  B2: 2,
  "B'": 3,
  D: 1,
  D2: 2,
  "D'": 3,
  E: 1,
  E2: 2,
  "E'": 3,
  F: 1,
  F2: 2,
  "F'": 3,
  L: 1,
  L2: 2,
  "L'": 3,
  M: 1,
  M2: 2,
  "M'": 3,
  R: 1,
  R2: 2,
  "R'": 3,
  S: 1,
  S2: 2,
  "S'": 3,
  U: 1,
  U2: 2,
  "U'": 3,
  x: 1,
  x2: 2,
  "x'": 3,
  y: 1,
  y2: 2,
  "y'": 3,
  z: 1,
  z2: 2,
  "z'": 3,
};

const moveByMoveFamilyByMoveAmount: Record<number, Record<MoveFamily, Move>> = {
  1: {
    B: "B",
    D: "D",
    E: "E",
    F: "F",
    L: "L",
    M: "M",
    R: "R",
    S: "S",
    U: "U",
    x: "x",
    y: "y",
    z: "z",
  },
  2: {
    B: "B2",
    D: "D2",
    E: "E2",
    F: "F2",
    L: "L2",
    M: "M2",
    R: "R2",
    S: "S2",
    U: "U2",
    x: "x2",
    y: "y2",
    z: "z2",
  },
  3: {
    B: "B'",
    D: "D'",
    E: "E'",
    F: "F'",
    L: "L'",
    M: "M'",
    R: "R'",
    S: "S'",
    U: "U'",
    x: "x'",
    y: "y'",
    z: "z'",
  },
};

export function optimizedMoves(moves: readonly Move[]): Move[] {
  const optimizedMoves: Move[] = [];

  for (const move of moves) {
    if (optimizedMoves.length === 0) {
      optimizedMoves.push(move);
      continue;
    }

    const lastMove = optimizedMoves.at(-1)!;
    const lastMoveFamily = MoveFamilyByMove[lastMove];
    const currentMoveFamily = MoveFamilyByMove[move];

    if (lastMoveFamily !== currentMoveFamily) {
      optimizedMoves.push(move);
      continue;
    }

    const lastMoveAmount = moveAmountByMove[lastMove];
    const currentMoveAmount = moveAmountByMove[move];
    const resolvedAmount = (lastMoveAmount + currentMoveAmount) % 4;

    if (resolvedAmount === 0) {
      optimizedMoves.pop();
    } else {
      const resolvedMove = moveByMoveFamilyByMoveAmount[resolvedAmount]![currentMoveFamily];
      optimizedMoves.splice(-1, 1, resolvedMove);
    }
  }

  return optimizedMoves;
}
