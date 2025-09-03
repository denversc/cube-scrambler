import { unreachable } from "./util/unreachable";

export type Color = "Blue" | "Green" | "Orange" | "Red" | "White" | "Yellow";

export interface Colors extends Record<Color, string> {
  Blue: "Blue";
  Green: "Green";
  Orange: "Orange";
  Red: "Red";
  White: "White";
  Yellow: "Yellow";
}

export const Colors: Readonly<Colors> = Object.freeze({
  Blue: "Blue",
  Green: "Green",
  Orange: "Orange",
  Red: "Red",
  White: "White",
  Yellow: "Yellow",
} satisfies Colors);

export type Face = "Back" | "Down" | "Front" | "Left" | "Right" | "Up";

export interface Faces extends Record<Face, string> {
  Back: "Back";
  Down: "Down";
  Front: "Front";
  Left: "Left";
  Right: "Right";
  Up: "Up";
}

export const Faces: Readonly<Faces> = Object.freeze({
  Back: "Back",
  Down: "Down",
  Front: "Front",
  Left: "Left",
  Right: "Right",
  Up: "Up",
} satisfies Faces);

export interface FaceRanges extends Record<Face, Readonly<[number, number]>> {
  Back: Readonly<[9, 18]>;
  Down: Readonly<[45, 54]>;
  Front: Readonly<[0, 9]>;
  Left: Readonly<[27, 36]>;
  Right: Readonly<[18, 27]>;
  Up: Readonly<[36, 45]>;
}

export const FaceRanges: Readonly<FaceRanges> = Object.freeze({
  Back: Object.freeze([9, 18]),
  Down: Object.freeze([45, 54]),
  Front: Object.freeze([0, 9]),
  Left: Object.freeze([27, 36]),
  Right: Object.freeze([18, 27]),
  Up: Object.freeze([36, 45]),
} satisfies FaceRanges);

const CubeIndexes = {
  Back: {
    BottomLeft: 15,
    BottomMiddle: 16,
    BottomRight: 17,
    MiddleLeft: 12,
    MiddleMiddle: 13,
    MiddleRight: 14,
    TopLeft: 9,
    TopMiddle: 10,
    TopRight: 11,
  } as const,
  Down: {
    BottomLeft: 51,
    BottomMiddle: 52,
    BottomRight: 53,
    MiddleLeft: 48,
    MiddleMiddle: 49,
    MiddleRight: 50,
    TopLeft: 45,
    TopMiddle: 46,
    TopRight: 47,
  } as const,
  Front: {
    BottomLeft: 6,
    BottomMiddle: 7,
    BottomRight: 8,
    MiddleLeft: 3,
    MiddleMiddle: 4,
    MiddleRight: 5,
    TopLeft: 0,
    TopMiddle: 1,
    TopRight: 2,
  } as const,
  Left: {
    BottomLeft: 33,
    BottomMiddle: 34,
    BottomRight: 35,
    MiddleLeft: 30,
    MiddleMiddle: 31,
    MiddleRight: 32,
    TopLeft: 27,
    TopMiddle: 28,
    TopRight: 29,
  } as const,
  Right: {
    BottomLeft: 24,
    BottomMiddle: 25,
    BottomRight: 26,
    MiddleLeft: 21,
    MiddleMiddle: 22,
    MiddleRight: 23,
    TopLeft: 18,
    TopMiddle: 19,
    TopRight: 20,
  } as const,
  Up: {
    BottomLeft: 42,
    BottomMiddle: 43,
    BottomRight: 44,
    MiddleLeft: 39,
    MiddleMiddle: 40,
    MiddleRight: 41,
    TopLeft: 36,
    TopMiddle: 37,
    TopRight: 38,
  } as const,
} as const;

/**
 * An array that represents the state of a Rubik's cube.
 * Each face of the cube is represented by 9 entries in the array.
 * Since there are 6 faces the array has a length of 9 x 6 = 54.
 * The index ranges for each face are defined in the `FaceRanges` object.
 *
 * The colors of each of the 9 stickers on each face are in order from top-left to bottom-right.
 *
 * Front: The "top-left" of the `Right` face is the sticker on the top left when looking directly at
 * the front. This is the "obvious" face, and the other faces' "top-left" are taken relative to this
 * perspective.
 *
 * Back: The "top-left" of the `Back` face is the sticker on the top left if the cube is rotated
 * two turns to the right (or to the left).
 *
 * Right: The "top-left" of the `Right` face is the sticker on the top left if the cube is rotated
 * one turn to the left.
 *
 * Left: The "top-left" of the `Left` face is the sticker on the top left if the cube is rotated
 * one turn to the right.
 *
 * Up: The "top-left" of the `Up` face is the sticker on the top left if the cube is rotated one
 * turn in the "down" direction.
 *
 * Down: The "top-left" of the `Down` face is the sticker on the top left if the cube is rotated
 * one turn in the "up" direction.
 */
export type Cube = [
  // Front
  Color,
  Color,
  Color,
  Color,
  Color,
  Color,
  Color,
  Color,
  Color,
  // Back
  Color,
  Color,
  Color,
  Color,
  Color,
  Color,
  Color,
  Color,
  Color,
  // Right
  Color,
  Color,
  Color,
  Color,
  Color,
  Color,
  Color,
  Color,
  Color,
  // Left
  Color,
  Color,
  Color,
  Color,
  Color,
  Color,
  Color,
  Color,
  Color,
  // Up
  Color,
  Color,
  Color,
  Color,
  Color,
  Color,
  Color,
  Color,
  Color,
  // Down
  Color,
  Color,
  Color,
  Color,
  Color,
  Color,
  Color,
  Color,
  Color,
];

export type FaceStickers = [Color, Color, Color, Color, Color, Color, Color, Color, Color];

export type Move =
  | "B2"
  | "B"
  | "B'"
  | "D2"
  | "D"
  | "D'"
  | "E2"
  | "E"
  | "E'"
  | "F2"
  | "F"
  | "F'"
  | "L2"
  | "L"
  | "L'"
  | "M2"
  | "M"
  | "M'"
  | "R2"
  | "R"
  | "R'"
  | "S2"
  | "S"
  | "S'"
  | "U2"
  | "U"
  | "U'"
  | "x2"
  | "x"
  | "x'"
  | "y2"
  | "y"
  | "y'"
  | "z2"
  | "z"
  | "z'";

export type MoveFamily = "B" | "D" | "E" | "F" | "L" | "M" | "R" | "S" | "U" | "x" | "y" | "z";

export interface MoveFamilyByMove extends Record<Move, MoveFamily> {
  B: "B";
  B2: "B";
  "B'": "B";
  D: "D";
  D2: "D";
  "D'": "D";
  E: "E";
  E2: "E";
  "E'": "E";
  F: "F";
  F2: "F";
  "F'": "F";
  L: "L";
  L2: "L";
  "L'": "L";
  M: "M";
  M2: "M";
  "M'": "M";
  R: "R";
  R2: "R";
  "R'": "R";
  S: "S";
  S2: "S";
  "S'": "S";
  U: "U";
  U2: "U";
  "U'": "U";
  x: "x";
  x2: "x";
  "x'": "x";
  y: "y";
  y2: "y";
  "y'": "y";
  z: "z";
  z2: "z";
  "z'": "z";
}

export function isMove(value: unknown): value is Move {
  return typeof value === "string" && value in MoveFamilyByMove;
}

export const MoveFamilyByMove: Readonly<MoveFamilyByMove> = Object.freeze({
  B: "B",
  B2: "B",
  "B'": "B",
  D: "D",
  D2: "D",
  "D'": "D",
  E: "E",
  E2: "E",
  "E'": "E",
  F: "F",
  F2: "F",
  "F'": "F",
  L: "L",
  L2: "L",
  "L'": "L",
  M: "M",
  M2: "M",
  "M'": "M",
  R: "R",
  R2: "R",
  "R'": "R",
  S: "S",
  S2: "S",
  "S'": "S",
  U: "U",
  U2: "U",
  "U'": "U",
  x: "x",
  x2: "x",
  "x'": "x",
  y: "y",
  y2: "y",
  "y'": "y",
  z: "z",
  z2: "z",
  "z'": "z",
} as const);

export type MoveAxis = "x" | "y" | "z";

export interface MoveAxisByMoveFamily extends Record<MoveFamily, MoveAxis> {
  B: "z";
  D: "y";
  E: "y";
  F: "z";
  L: "x";
  M: "x";
  R: "x";
  S: "z";
  U: "y";
  x: "x";
  y: "y";
  z: "z";
}

export const MoveAxisByMoveFamily: Readonly<MoveAxisByMoveFamily> = Object.freeze({
  B: "z",
  D: "y",
  E: "y",
  F: "z",
  L: "x",
  M: "x",
  R: "x",
  S: "z",
  U: "y",
  x: "x",
  y: "y",
  z: "z",
});

export function getFace(cube: Cube, face: Face): FaceStickers {
  const range = FaceRanges[face];
  return cube.slice(range[0], range[1]) as FaceStickers;
}
export function solvedCube(): Cube {
  return [
    "Green",
    "Green",
    "Green",
    "Green",
    "Green",
    "Green",
    "Green",
    "Green",
    "Green",
    "Blue",
    "Blue",
    "Blue",
    "Blue",
    "Blue",
    "Blue",
    "Blue",
    "Blue",
    "Blue",
    "Red",
    "Red",
    "Red",
    "Red",
    "Red",
    "Red",
    "Red",
    "Red",
    "Red",
    "Orange",
    "Orange",
    "Orange",
    "Orange",
    "Orange",
    "Orange",
    "Orange",
    "Orange",
    "Orange",
    "White",
    "White",
    "White",
    "White",
    "White",
    "White",
    "White",
    "White",
    "White",
    "Yellow",
    "Yellow",
    "Yellow",
    "Yellow",
    "Yellow",
    "Yellow",
    "Yellow",
    "Yellow",
    "Yellow",
  ];
}

export function transform(cube: Cube, move: Move): void {
  switch (move) {
    case "B": {
      transformB(cube);
      break;
    }
    case "B2": {
      transformB2(cube);
      break;
    }
    case "B'": {
      transformBPrime(cube);
      break;
    }
    case "D": {
      transformD(cube);
      break;
    }
    case "D2": {
      transformD2(cube);
      break;
    }
    case "D'": {
      transformDPrime(cube);
      break;
    }
    case "E": {
      transformE(cube);
      break;
    }
    case "E2": {
      transformE2(cube);
      break;
    }
    case "E'": {
      transformEPrime(cube);
      break;
    }
    case "F": {
      transformF(cube);
      break;
    }
    case "F2": {
      transformF2(cube);
      break;
    }
    case "F'": {
      transformFPrime(cube);
      break;
    }
    case "L": {
      transformL(cube);
      break;
    }
    case "L2": {
      transformL2(cube);
      break;
    }
    case "L'": {
      transformLPrime(cube);
      break;
    }
    case "M": {
      transformM(cube);
      break;
    }
    case "M2": {
      transformM2(cube);
      break;
    }
    case "M'": {
      transformMPrime(cube);
      break;
    }
    case "R": {
      transformR(cube);
      break;
    }
    case "R2": {
      transformR2(cube);
      break;
    }
    case "R'": {
      transformRPrime(cube);
      break;
    }
    case "S": {
      transformS(cube);
      break;
    }
    case "S2": {
      transformS2(cube);
      break;
    }
    case "S'": {
      transformSPrime(cube);
      break;
    }
    case "U": {
      transformU(cube);
      break;
    }
    case "U2": {
      transformU2(cube);
      break;
    }
    case "U'": {
      transformUPrime(cube);
      break;
    }
    case "x": {
      transformX(cube);
      break;
    }
    case "x2": {
      transformX2(cube);
      break;
    }
    case "x'": {
      transformXPrime(cube);
      break;
    }
    case "y": {
      transformY(cube);
      break;
    }
    case "y2": {
      transformY2(cube);
      break;
    }
    case "y'": {
      transformYPrime(cube);
      break;
    }
    case "z": {
      transformZ(cube);
      break;
    }
    case "z2": {
      transformZ2(cube);
      break;
    }
    case "z'": {
      transformZPrime(cube);
      break;
    }
    default: {
      unreachable(move, "invalid move [yzb9429gkk]");
    }
  }
}

/** Rotates the Back face of the given Cube one turn clockwise. */
export function transformB(cube: Cube): void {
  rotateFaceClockwise(cube, "Back");

  // Adjacent corners 1.
  {
    const originalUpTopLeftColor = cube[CubeIndexes.Up.TopLeft];
    cube[CubeIndexes.Up.TopLeft] = cube[CubeIndexes.Right.TopRight];
    cube[CubeIndexes.Right.TopRight] = cube[CubeIndexes.Down.BottomRight];
    cube[CubeIndexes.Down.BottomRight] = cube[CubeIndexes.Left.BottomLeft];
    cube[CubeIndexes.Left.BottomLeft] = originalUpTopLeftColor;
  }

  // Adjacent corners 2.
  {
    const originalUpTopRightColor = cube[CubeIndexes.Up.TopRight];
    cube[CubeIndexes.Up.TopRight] = cube[CubeIndexes.Right.BottomRight];
    cube[CubeIndexes.Right.BottomRight] = cube[CubeIndexes.Down.BottomLeft];
    cube[CubeIndexes.Down.BottomLeft] = cube[CubeIndexes.Left.TopLeft];
    cube[CubeIndexes.Left.TopLeft] = originalUpTopRightColor;
  }

  // Adjacent edges.
  {
    const originalUpTopMiddleColor = cube[CubeIndexes.Up.TopMiddle];
    cube[CubeIndexes.Up.TopMiddle] = cube[CubeIndexes.Right.MiddleRight];
    cube[CubeIndexes.Right.MiddleRight] = cube[CubeIndexes.Down.BottomMiddle];
    cube[CubeIndexes.Down.BottomMiddle] = cube[CubeIndexes.Left.MiddleLeft];
    cube[CubeIndexes.Left.MiddleLeft] = originalUpTopMiddleColor;
  }
}

/** Rotates the Back face of the given Cube two turns. */
export function transformB2(cube: Cube): void {
  transformB(cube);
  transformB(cube);
}

/** Rotates the Back face of the given Cube one turn counterclockwise. */
export function transformBPrime(cube: Cube): void {
  transformB(cube);
  transformB(cube);
  transformB(cube);
}

/** Rotates the Down face of the given Cube one turn clockwise. */
export function transformD(cube: Cube): void {
  rotateFaceClockwise(cube, "Down");

  // Adjacent corners 1.
  {
    const originalFrontBottomRightColor = cube[CubeIndexes.Front.BottomRight];
    cube[CubeIndexes.Front.BottomRight] = cube[CubeIndexes.Left.BottomRight];
    cube[CubeIndexes.Left.BottomRight] = cube[CubeIndexes.Back.BottomRight];
    cube[CubeIndexes.Back.BottomRight] = cube[CubeIndexes.Right.BottomRight];
    cube[CubeIndexes.Right.BottomRight] = originalFrontBottomRightColor;
  }

  // Adjacent corners 2.
  {
    const originalFrontBottomLeftColor = cube[CubeIndexes.Front.BottomLeft];
    cube[CubeIndexes.Front.BottomLeft] = cube[CubeIndexes.Left.BottomLeft];
    cube[CubeIndexes.Left.BottomLeft] = cube[CubeIndexes.Back.BottomLeft];
    cube[CubeIndexes.Back.BottomLeft] = cube[CubeIndexes.Right.BottomLeft];
    cube[CubeIndexes.Right.BottomLeft] = originalFrontBottomLeftColor;
  }

  // Adjacent edges.
  {
    const originalFrontBottomMiddleColor = cube[CubeIndexes.Front.BottomMiddle];
    cube[CubeIndexes.Front.BottomMiddle] = cube[CubeIndexes.Left.BottomMiddle];
    cube[CubeIndexes.Left.BottomMiddle] = cube[CubeIndexes.Back.BottomMiddle];
    cube[CubeIndexes.Back.BottomMiddle] = cube[CubeIndexes.Right.BottomMiddle];
    cube[CubeIndexes.Right.BottomMiddle] = originalFrontBottomMiddleColor;
  }
}

/** Rotates the Down face of the given Cube two turns. */
export function transformD2(cube: Cube): void {
  transformD(cube);
  transformD(cube);
}

/** Rotates the Down face of the given Cube one turn counterclockwise. */
export function transformDPrime(cube: Cube): void {
  transformD(cube);
  transformD(cube);
  transformD(cube);
}

/** Rotates the middle slice between U and D clockwise (like D). */
export function transformE(cube: Cube): void {
  {
    const originalFrontMiddleLeftColor = cube[CubeIndexes.Front.MiddleLeft];
    cube[CubeIndexes.Front.MiddleLeft] = cube[CubeIndexes.Left.MiddleLeft];
    cube[CubeIndexes.Left.MiddleLeft] = cube[CubeIndexes.Back.MiddleLeft];
    cube[CubeIndexes.Back.MiddleLeft] = cube[CubeIndexes.Right.MiddleLeft];
    cube[CubeIndexes.Right.MiddleLeft] = originalFrontMiddleLeftColor;
  }

  {
    const originalFrontMiddleMiddleColor = cube[CubeIndexes.Front.MiddleMiddle];
    cube[CubeIndexes.Front.MiddleMiddle] = cube[CubeIndexes.Left.MiddleMiddle];
    cube[CubeIndexes.Left.MiddleMiddle] = cube[CubeIndexes.Back.MiddleMiddle];
    cube[CubeIndexes.Back.MiddleMiddle] = cube[CubeIndexes.Right.MiddleMiddle];
    cube[CubeIndexes.Right.MiddleMiddle] = originalFrontMiddleMiddleColor;
  }

  {
    const originalFrontMiddleRightColor = cube[CubeIndexes.Front.MiddleRight];
    cube[CubeIndexes.Front.MiddleRight] = cube[CubeIndexes.Left.MiddleRight];
    cube[CubeIndexes.Left.MiddleRight] = cube[CubeIndexes.Back.MiddleRight];
    cube[CubeIndexes.Back.MiddleRight] = cube[CubeIndexes.Right.MiddleRight];
    cube[CubeIndexes.Right.MiddleRight] = originalFrontMiddleRightColor;
  }
}

/** Rotates the middle slice between U and D two turns. */
export function transformE2(cube: Cube): void {
  transformE(cube);
  transformE(cube);
}

/** Rotates the middle slice between U and D counter-clockwise (like D'). */
export function transformEPrime(cube: Cube): void {
  transformE(cube);
  transformE(cube);
  transformE(cube);
}

/** Rotates the Front face of the given Cube one turn clockwise. */
export function transformF(cube: Cube): void {
  rotateFaceClockwise(cube, "Front");

  // Adjacent corners 1.
  {
    const originalUpBottomLeftColor = cube[CubeIndexes.Up.BottomLeft];
    cube[CubeIndexes.Up.BottomLeft] = cube[CubeIndexes.Left.BottomRight];
    cube[CubeIndexes.Left.BottomRight] = cube[CubeIndexes.Down.TopRight];
    cube[CubeIndexes.Down.TopRight] = cube[CubeIndexes.Right.TopLeft];
    cube[CubeIndexes.Right.TopLeft] = originalUpBottomLeftColor;
  }

  // Adjacent corners 2.
  {
    const originalUpBottomRightColor = cube[CubeIndexes.Up.BottomRight];
    cube[CubeIndexes.Up.BottomRight] = cube[CubeIndexes.Left.TopRight];
    cube[CubeIndexes.Left.TopRight] = cube[CubeIndexes.Down.TopLeft];
    cube[CubeIndexes.Down.TopLeft] = cube[CubeIndexes.Right.BottomLeft];
    cube[CubeIndexes.Right.BottomLeft] = originalUpBottomRightColor;
  }

  // Adjacent edges.
  {
    const originalUpBottomMiddleColor = cube[CubeIndexes.Up.BottomMiddle];
    cube[CubeIndexes.Up.BottomMiddle] = cube[CubeIndexes.Left.MiddleRight];
    cube[CubeIndexes.Left.MiddleRight] = cube[CubeIndexes.Down.TopMiddle];
    cube[CubeIndexes.Down.TopMiddle] = cube[CubeIndexes.Right.MiddleLeft];
    cube[CubeIndexes.Right.MiddleLeft] = originalUpBottomMiddleColor;
  }
}

/** Rotates the Front face of the given Cube two turns. */
export function transformF2(cube: Cube): void {
  transformF(cube);
  transformF(cube);
}

/** Rotates the Front face of the given Cube one turn counterclockwise. */
export function transformFPrime(cube: Cube): void {
  transformF(cube);
  transformF(cube);
  transformF(cube);
}

/** Rotates the Left face of the given Cube one turn clockwise. */
export function transformL(cube: Cube): void {
  rotateFaceClockwise(cube, "Left");

  // Adjacent corners 1.
  {
    const originalFrontTopLeftColor = cube[CubeIndexes.Front.TopLeft];
    cube[CubeIndexes.Front.TopLeft] = cube[CubeIndexes.Up.TopLeft];
    cube[CubeIndexes.Up.TopLeft] = cube[CubeIndexes.Back.BottomRight];
    cube[CubeIndexes.Back.BottomRight] = cube[CubeIndexes.Down.TopLeft];
    cube[CubeIndexes.Down.TopLeft] = originalFrontTopLeftColor;
  }

  // Adjacent corners 2.
  {
    const originalFrontBottomLeftColor = cube[CubeIndexes.Front.BottomLeft];
    cube[CubeIndexes.Front.BottomLeft] = cube[CubeIndexes.Up.BottomLeft];
    cube[CubeIndexes.Up.BottomLeft] = cube[CubeIndexes.Back.TopRight];
    cube[CubeIndexes.Back.TopRight] = cube[CubeIndexes.Down.BottomLeft];
    cube[CubeIndexes.Down.BottomLeft] = originalFrontBottomLeftColor;
  }

  // Adjacent edges.
  {
    const originalFrontMiddleLeftColor = cube[CubeIndexes.Front.MiddleLeft];
    cube[CubeIndexes.Front.MiddleLeft] = cube[CubeIndexes.Up.MiddleLeft];
    cube[CubeIndexes.Up.MiddleLeft] = cube[CubeIndexes.Back.MiddleRight];
    cube[CubeIndexes.Back.MiddleRight] = cube[CubeIndexes.Down.MiddleLeft];
    cube[CubeIndexes.Down.MiddleLeft] = originalFrontMiddleLeftColor;
  }
}

/** Rotates the Left face of the given Cube two turns. */
export function transformL2(cube: Cube): void {
  transformL(cube);
  transformL(cube);
}

/** Rotates the Left face of the given Cube one turn counterclockwise. */
export function transformLPrime(cube: Cube): void {
  transformL(cube);
  transformL(cube);
  transformL(cube);
}

/** Rotates the middle slice between R and L counter-clockwise (like L). */
export function transformM(cube: Cube): void {
  {
    const originalFrontTopMiddleColor = cube[CubeIndexes.Front.TopMiddle];
    cube[CubeIndexes.Front.TopMiddle] = cube[CubeIndexes.Up.TopMiddle];
    cube[CubeIndexes.Up.TopMiddle] = cube[CubeIndexes.Back.BottomMiddle];
    cube[CubeIndexes.Back.BottomMiddle] = cube[CubeIndexes.Down.TopMiddle];
    cube[CubeIndexes.Down.TopMiddle] = originalFrontTopMiddleColor;
  }

  {
    const originalFrontMiddleMiddleColor = cube[CubeIndexes.Front.MiddleMiddle];
    cube[CubeIndexes.Front.MiddleMiddle] = cube[CubeIndexes.Up.MiddleMiddle];
    cube[CubeIndexes.Up.MiddleMiddle] = cube[CubeIndexes.Back.MiddleMiddle];
    cube[CubeIndexes.Back.MiddleMiddle] = cube[CubeIndexes.Down.MiddleMiddle];
    cube[CubeIndexes.Down.MiddleMiddle] = originalFrontMiddleMiddleColor;
  }

  {
    const originalFrontBottomMiddleColor = cube[CubeIndexes.Front.BottomMiddle];
    cube[CubeIndexes.Front.BottomMiddle] = cube[CubeIndexes.Up.BottomMiddle];
    cube[CubeIndexes.Up.BottomMiddle] = cube[CubeIndexes.Back.TopMiddle];
    cube[CubeIndexes.Back.TopMiddle] = cube[CubeIndexes.Down.BottomMiddle];
    cube[CubeIndexes.Down.BottomMiddle] = originalFrontBottomMiddleColor;
  }
}

/** Rotates the middle slice between R and L two turns. */
export function transformM2(cube: Cube): void {
  transformM(cube);
  transformM(cube);
}

/** Rotates the middle slice between R and L clockwise (like R). */
export function transformMPrime(cube: Cube): void {
  transformM(cube);
  transformM(cube);
  transformM(cube);
}

/** Rotates the Right face of the given Cube one turn clockwise. */
export function transformR(cube: Cube): void {
  rotateFaceClockwise(cube, "Right");

  // Adjacent corners 1.
  {
    const originalFrontTopRightColor = cube[CubeIndexes.Front.TopRight];
    cube[CubeIndexes.Front.TopRight] = cube[CubeIndexes.Down.TopRight];
    cube[CubeIndexes.Down.TopRight] = cube[CubeIndexes.Back.BottomLeft];
    cube[CubeIndexes.Back.BottomLeft] = cube[CubeIndexes.Up.TopRight];
    cube[CubeIndexes.Up.TopRight] = originalFrontTopRightColor;
  }

  // Adjacent corners 2.
  {
    const originalFrontBottomRightColor = cube[CubeIndexes.Front.BottomRight];
    cube[CubeIndexes.Front.BottomRight] = cube[CubeIndexes.Down.BottomRight];
    cube[CubeIndexes.Down.BottomRight] = cube[CubeIndexes.Back.TopLeft];
    cube[CubeIndexes.Back.TopLeft] = cube[CubeIndexes.Up.BottomRight];
    cube[CubeIndexes.Up.BottomRight] = originalFrontBottomRightColor;
  }

  // Adjacent edges.
  {
    const originalFrontMiddleRightColor = cube[CubeIndexes.Front.MiddleRight];
    cube[CubeIndexes.Front.MiddleRight] = cube[CubeIndexes.Down.MiddleRight];
    cube[CubeIndexes.Down.MiddleRight] = cube[CubeIndexes.Back.MiddleLeft];
    cube[CubeIndexes.Back.MiddleLeft] = cube[CubeIndexes.Up.MiddleRight];
    cube[CubeIndexes.Up.MiddleRight] = originalFrontMiddleRightColor;
  }
}

/** Rotates the Right face of the given Cube two turns. */
export function transformR2(cube: Cube): void {
  transformR(cube);
  transformR(cube);
}

/** Rotates the Right face of the given Cube one turn counterclockwise. */
export function transformRPrime(cube: Cube): void {
  transformR(cube);
  transformR(cube);
  transformR(cube);
}

/** Rotates the middle slice between F and B clockwise (like F). */
export function transformS(cube: Cube): void {
  {
    const originalUpMiddleLeftColor = cube[CubeIndexes.Up.MiddleLeft];
    cube[CubeIndexes.Up.MiddleLeft] = cube[CubeIndexes.Left.BottomMiddle];
    cube[CubeIndexes.Left.BottomMiddle] = cube[CubeIndexes.Down.MiddleRight];
    cube[CubeIndexes.Down.MiddleRight] = cube[CubeIndexes.Right.TopMiddle];
    cube[CubeIndexes.Right.TopMiddle] = originalUpMiddleLeftColor;
  }

  {
    const originalUpMiddleMiddleColor = cube[CubeIndexes.Up.MiddleMiddle];
    cube[CubeIndexes.Up.MiddleMiddle] = cube[CubeIndexes.Left.MiddleMiddle];
    cube[CubeIndexes.Left.MiddleMiddle] = cube[CubeIndexes.Down.MiddleMiddle];
    cube[CubeIndexes.Down.MiddleMiddle] = cube[CubeIndexes.Right.MiddleMiddle];
    cube[CubeIndexes.Right.MiddleMiddle] = originalUpMiddleMiddleColor;
  }

  {
    const originalUpMiddleRightColor = cube[CubeIndexes.Up.MiddleRight];
    cube[CubeIndexes.Up.MiddleRight] = cube[CubeIndexes.Left.TopMiddle];
    cube[CubeIndexes.Left.TopMiddle] = cube[CubeIndexes.Down.MiddleLeft];
    cube[CubeIndexes.Down.MiddleLeft] = cube[CubeIndexes.Right.BottomMiddle];
    cube[CubeIndexes.Right.BottomMiddle] = originalUpMiddleRightColor;
  }
}

/** Rotates the middle slice between F and B two turns. */
export function transformS2(cube: Cube): void {
  transformS(cube);
  transformS(cube);
}

/** Rotates the middle slice between F and B counter-clockwise (like F'). */
export function transformSPrime(cube: Cube): void {
  transformS(cube);
  transformS(cube);
  transformS(cube);
}

/** Rotates the Up face of the given Cube one turn clockwise. */
export function transformU(cube: Cube): void {
  rotateFaceClockwise(cube, "Up");

  // Adjacent corners 1.
  {
    const originalFrontTopRightColor = cube[CubeIndexes.Front.TopRight];
    cube[CubeIndexes.Front.TopRight] = cube[CubeIndexes.Right.TopRight];
    cube[CubeIndexes.Right.TopRight] = cube[CubeIndexes.Back.TopRight];
    cube[CubeIndexes.Back.TopRight] = cube[CubeIndexes.Left.TopRight];
    cube[CubeIndexes.Left.TopRight] = originalFrontTopRightColor;
  }

  // Adjacent corners 2.
  {
    const originalFrontTopLeftColor = cube[CubeIndexes.Front.TopLeft];
    cube[CubeIndexes.Front.TopLeft] = cube[CubeIndexes.Right.TopLeft];
    cube[CubeIndexes.Right.TopLeft] = cube[CubeIndexes.Back.TopLeft];
    cube[CubeIndexes.Back.TopLeft] = cube[CubeIndexes.Left.TopLeft];
    cube[CubeIndexes.Left.TopLeft] = originalFrontTopLeftColor;
  }

  // Adjacent edges.
  {
    const originalFrontTopMiddleColor = cube[CubeIndexes.Front.TopMiddle];
    cube[CubeIndexes.Front.TopMiddle] = cube[CubeIndexes.Right.TopMiddle];
    cube[CubeIndexes.Right.TopMiddle] = cube[CubeIndexes.Back.TopMiddle];
    cube[CubeIndexes.Back.TopMiddle] = cube[CubeIndexes.Left.TopMiddle];
    cube[CubeIndexes.Left.TopMiddle] = originalFrontTopMiddleColor;
  }
}

/** Rotates the Up face of the given Cube two turns. */
export function transformU2(cube: Cube): void {
  transformU(cube);
  transformU(cube);
}

/** Rotates the Up face of the given Cube one turn counterclockwise. */
export function transformUPrime(cube: Cube): void {
  transformU(cube);
  transformU(cube);
  transformU(cube);
}

/** Rotates the entire Cube up (like the R move). */
export function transformX(cube: Cube): void {
  transformR(cube);
  transformLPrime(cube);
  transformMPrime(cube);
}

/** Rotates the entire Cube up two turns. */
export function transformX2(cube: Cube): void {
  transformX(cube);
  transformX(cube);
}

/** Rotates the entire Cube up counter-clockwise. */
export function transformXPrime(cube: Cube): void {
  transformX(cube);
  transformX(cube);
  transformX(cube);
}

/** Rotates the entire Cube left (like the U move). */
export function transformY(cube: Cube): void {
  transformU(cube);
  transformEPrime(cube);
  transformDPrime(cube);
}

/** Rotates the entire Cube left two turns. */
export function transformY2(cube: Cube): void {
  transformY(cube);
  transformY(cube);
}

/** Rotates the entire Cube right (like the U' move). */
export function transformYPrime(cube: Cube): void {
  transformY(cube);
  transformY(cube);
  transformY(cube);
}

/** Rotates the entire Cube clockwise (like the F move). */
export function transformZ(cube: Cube): void {
  transformF(cube);
  transformS(cube);
  transformBPrime(cube);
}

/** Rotates the entire Cube clockwise two turns. */
export function transformZ2(cube: Cube): void {
  transformZ(cube);
  transformZ(cube);
}

/** Rotates the entire Cube counter-clockwise (like the F' move). */
export function transformZPrime(cube: Cube): void {
  transformZ(cube);
  transformZ(cube);
  transformZ(cube);
}

function rotateFaceClockwise(cube: Cube, face: Face): void {
  const indexes = CubeIndexes[face];

  // Rotate the corners.
  const originalTopLeftColor = cube[indexes.TopLeft];
  cube[indexes.TopLeft] = cube[indexes.BottomLeft];
  cube[indexes.BottomLeft] = cube[indexes.BottomRight];
  cube[indexes.BottomRight] = cube[indexes.TopRight];
  cube[indexes.TopRight] = originalTopLeftColor;

  // Rotate the edges.
  const originalTopMiddleCorner = cube[indexes.TopMiddle];
  cube[indexes.TopMiddle] = cube[indexes.MiddleLeft];
  cube[indexes.MiddleLeft] = cube[indexes.BottomMiddle];
  cube[indexes.BottomMiddle] = cube[indexes.MiddleRight];
  cube[indexes.MiddleRight] = originalTopMiddleCorner;
}
