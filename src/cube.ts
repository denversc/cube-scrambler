import { arraysContainSameElementsInAnyOrder } from "./util/arrays";

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

export type CubeIndexes = Readonly<{
  Back: Readonly<{
    BottomLeft: 15;
    BottomMiddle: 16;
    BottomRight: 17;
    MiddleLeft: 12;
    MiddleMiddle: 13;
    MiddleRight: 14;
    TopLeft: 9;
    TopMiddle: 10;
    TopRight: 11;
  }>;
  Down: Readonly<{
    BottomLeft: 51;
    BottomMiddle: 52;
    BottomRight: 53;
    MiddleLeft: 48;
    MiddleMiddle: 49;
    MiddleRight: 50;
    TopLeft: 45;
    TopMiddle: 46;
    TopRight: 47;
  }>;
  Front: Readonly<{
    BottomLeft: 6;
    BottomMiddle: 7;
    BottomRight: 8;
    MiddleLeft: 3;
    MiddleMiddle: 4;
    MiddleRight: 5;
    TopLeft: 0;
    TopMiddle: 1;
    TopRight: 2;
  }>;
  Left: Readonly<{
    BottomLeft: 33;
    BottomMiddle: 34;
    BottomRight: 35;
    MiddleLeft: 30;
    MiddleMiddle: 31;
    MiddleRight: 32;
    TopLeft: 27;
    TopMiddle: 28;
    TopRight: 29;
  }>;
  Right: Readonly<{
    BottomLeft: 24;
    BottomMiddle: 25;
    BottomRight: 26;
    MiddleLeft: 21;
    MiddleMiddle: 22;
    MiddleRight: 23;
    TopLeft: 18;
    TopMiddle: 19;
    TopRight: 20;
  }>;
  Up: Readonly<{
    BottomLeft: 42;
    BottomMiddle: 43;
    BottomRight: 44;
    MiddleLeft: 39;
    MiddleMiddle: 40;
    MiddleRight: 41;
    TopLeft: 36;
    TopMiddle: 37;
    TopRight: 38;
  }>;
}>;

export const CubeIndexes: CubeIndexes = Object.freeze({
  Back: Object.freeze({
    BottomLeft: 15,
    BottomMiddle: 16,
    BottomRight: 17,
    MiddleLeft: 12,
    MiddleMiddle: 13,
    MiddleRight: 14,
    TopLeft: 9,
    TopMiddle: 10,
    TopRight: 11,
  }),
  Down: Object.freeze({
    BottomLeft: 51,
    BottomMiddle: 52,
    BottomRight: 53,
    MiddleLeft: 48,
    MiddleMiddle: 49,
    MiddleRight: 50,
    TopLeft: 45,
    TopMiddle: 46,
    TopRight: 47,
  }),
  Front: Object.freeze({
    BottomLeft: 6,
    BottomMiddle: 7,
    BottomRight: 8,
    MiddleLeft: 3,
    MiddleMiddle: 4,
    MiddleRight: 5,
    TopLeft: 0,
    TopMiddle: 1,
    TopRight: 2,
  }),
  Left: Object.freeze({
    BottomLeft: 33,
    BottomMiddle: 34,
    BottomRight: 35,
    MiddleLeft: 30,
    MiddleMiddle: 31,
    MiddleRight: 32,
    TopLeft: 27,
    TopMiddle: 28,
    TopRight: 29,
  }),
  Right: Object.freeze({
    BottomLeft: 24,
    BottomMiddle: 25,
    BottomRight: 26,
    MiddleLeft: 21,
    MiddleMiddle: 22,
    MiddleRight: 23,
    TopLeft: 18,
    TopMiddle: 19,
    TopRight: 20,
  }),
  Up: Object.freeze({
    BottomLeft: 42,
    BottomMiddle: 43,
    BottomRight: 44,
    MiddleLeft: 39,
    MiddleMiddle: 40,
    MiddleRight: 41,
    TopLeft: 36,
    TopMiddle: 37,
    TopRight: 38,
  }),
});

export type CubeIndex =
  | 0
  | 1
  | 2
  | 3
  | 4
  | 5
  | 6
  | 7
  | 8
  | 9
  | 10
  | 11
  | 12
  | 13
  | 14
  | 15
  | 16
  | 17
  | 18
  | 19
  | 20
  | 21
  | 22
  | 23
  | 24
  | 25
  | 26
  | 27
  | 28
  | 29
  | 30
  | 31
  | 32
  | 33
  | 34
  | 35
  | 36
  | 37
  | 38
  | 39
  | 40
  | 41
  | 42
  | 43
  | 44
  | 45
  | 46
  | 47
  | 48
  | 49
  | 50
  | 51
  | 52
  | 53;

export type EdgeCubeIndex =
  | CubeIndexes["Back"]["BottomMiddle"]
  | CubeIndexes["Back"]["MiddleLeft"]
  | CubeIndexes["Back"]["MiddleRight"]
  | CubeIndexes["Back"]["TopMiddle"]
  | CubeIndexes["Down"]["BottomMiddle"]
  | CubeIndexes["Down"]["MiddleLeft"]
  | CubeIndexes["Down"]["MiddleRight"]
  | CubeIndexes["Down"]["TopMiddle"]
  | CubeIndexes["Front"]["BottomMiddle"]
  | CubeIndexes["Front"]["MiddleLeft"]
  | CubeIndexes["Front"]["MiddleRight"]
  | CubeIndexes["Front"]["TopMiddle"]
  | CubeIndexes["Left"]["BottomMiddle"]
  | CubeIndexes["Left"]["MiddleLeft"]
  | CubeIndexes["Left"]["MiddleRight"]
  | CubeIndexes["Left"]["TopMiddle"]
  | CubeIndexes["Right"]["BottomMiddle"]
  | CubeIndexes["Right"]["MiddleLeft"]
  | CubeIndexes["Right"]["MiddleRight"]
  | CubeIndexes["Right"]["TopMiddle"]
  | CubeIndexes["Up"]["BottomMiddle"]
  | CubeIndexes["Up"]["MiddleLeft"]
  | CubeIndexes["Up"]["MiddleRight"]
  | CubeIndexes["Up"]["TopMiddle"];

export const EdgePieces: Readonly<Array<Readonly<[EdgeCubeIndex, EdgeCubeIndex]>>> = Object.freeze([
  Object.freeze([CubeIndexes.Back.BottomMiddle, CubeIndexes.Down.BottomMiddle] as const),
  Object.freeze([CubeIndexes.Back.MiddleLeft, CubeIndexes.Right.MiddleRight] as const),
  Object.freeze([CubeIndexes.Back.MiddleRight, CubeIndexes.Left.MiddleLeft] as const),
  Object.freeze([CubeIndexes.Back.TopMiddle, CubeIndexes.Up.TopMiddle] as const),
  Object.freeze([CubeIndexes.Front.BottomMiddle, CubeIndexes.Down.TopMiddle] as const),
  Object.freeze([CubeIndexes.Front.MiddleLeft, CubeIndexes.Left.MiddleRight] as const),
  Object.freeze([CubeIndexes.Front.MiddleRight, CubeIndexes.Right.MiddleLeft] as const),
  Object.freeze([CubeIndexes.Front.TopMiddle, CubeIndexes.Up.BottomMiddle] as const),
  Object.freeze([CubeIndexes.Up.MiddleLeft, CubeIndexes.Left.TopMiddle] as const),
  Object.freeze([CubeIndexes.Up.MiddleRight, CubeIndexes.Right.TopMiddle] as const),
  Object.freeze([CubeIndexes.Down.MiddleLeft, CubeIndexes.Left.BottomMiddle] as const),
  Object.freeze([CubeIndexes.Down.MiddleRight, CubeIndexes.Right.BottomMiddle] as const),
]);

export function isEdgePiece(
  piece: Readonly<[CubeIndex, CubeIndex]>,
): piece is [EdgeCubeIndex, EdgeCubeIndex] {
  return EdgePieces.some(edgePiece => arraysContainSameElementsInAnyOrder(edgePiece, piece));
}

export const EdgePieceColors: Readonly<Array<Readonly<[Color, Color]>>> = Object.freeze([
  Object.freeze(["White", "Green"] as const),
  Object.freeze(["White", "Red"] as const),
  Object.freeze(["White", "Blue"] as const),
  Object.freeze(["White", "Orange"] as const),
  Object.freeze(["Yellow", "Green"] as const),
  Object.freeze(["Yellow", "Red"] as const),
  Object.freeze(["Yellow", "Blue"] as const),
  Object.freeze(["Yellow", "Orange"] as const),
  Object.freeze(["Red", "Blue"] as const),
  Object.freeze(["Red", "Green"] as const),
  Object.freeze(["Green", "Orange"] as const),
  Object.freeze(["Orange", "Blue"] as const),
]);

export type CornerCubeIndex =
  | CubeIndexes["Back"]["BottomLeft"]
  | CubeIndexes["Back"]["BottomRight"]
  | CubeIndexes["Back"]["TopLeft"]
  | CubeIndexes["Back"]["TopRight"]
  | CubeIndexes["Down"]["BottomLeft"]
  | CubeIndexes["Down"]["BottomRight"]
  | CubeIndexes["Down"]["TopLeft"]
  | CubeIndexes["Down"]["TopRight"]
  | CubeIndexes["Front"]["BottomLeft"]
  | CubeIndexes["Front"]["BottomRight"]
  | CubeIndexes["Front"]["TopLeft"]
  | CubeIndexes["Front"]["TopRight"]
  | CubeIndexes["Left"]["BottomLeft"]
  | CubeIndexes["Left"]["BottomRight"]
  | CubeIndexes["Left"]["TopLeft"]
  | CubeIndexes["Left"]["TopRight"]
  | CubeIndexes["Right"]["BottomLeft"]
  | CubeIndexes["Right"]["BottomRight"]
  | CubeIndexes["Right"]["TopLeft"]
  | CubeIndexes["Right"]["TopRight"]
  | CubeIndexes["Up"]["BottomLeft"]
  | CubeIndexes["Up"]["BottomRight"]
  | CubeIndexes["Up"]["TopLeft"]
  | CubeIndexes["Up"]["TopRight"];

export const CornerPieces: Readonly<
  Array<Readonly<[CornerCubeIndex, CornerCubeIndex, CornerCubeIndex]>>
> = Object.freeze([
  Object.freeze([
    CubeIndexes.Up.TopLeft,
    CubeIndexes.Left.TopLeft,
    CubeIndexes.Back.TopRight,
  ] as const),
  Object.freeze([
    CubeIndexes.Up.TopRight,
    CubeIndexes.Right.TopRight,
    CubeIndexes.Back.TopLeft,
  ] as const),
  Object.freeze([
    CubeIndexes.Up.BottomLeft,
    CubeIndexes.Left.TopRight,
    CubeIndexes.Front.TopLeft,
  ] as const),
  Object.freeze([
    CubeIndexes.Up.BottomRight,
    CubeIndexes.Right.TopLeft,
    CubeIndexes.Front.TopRight,
  ] as const),

  Object.freeze([
    CubeIndexes.Down.TopLeft,
    CubeIndexes.Left.BottomRight,
    CubeIndexes.Front.BottomLeft,
  ] as const),
  Object.freeze([
    CubeIndexes.Down.TopRight,
    CubeIndexes.Right.BottomLeft,
    CubeIndexes.Front.BottomRight,
  ] as const),
  Object.freeze([
    CubeIndexes.Down.BottomLeft,
    CubeIndexes.Left.BottomLeft,
    CubeIndexes.Back.BottomRight,
  ] as const),
  Object.freeze([
    CubeIndexes.Down.BottomRight,
    CubeIndexes.Right.BottomRight,
    CubeIndexes.Back.BottomLeft,
  ] as const),
]);

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

export function isCornerPiece(
  piece: Readonly<[CubeIndex, CubeIndex, CubeIndex]>,
): piece is [CornerCubeIndex, CornerCubeIndex, CornerCubeIndex] {
  return CornerPieces.some(cornerPiece => arraysContainSameElementsInAnyOrder(cornerPiece, piece));
}

export const CornerPieceColors: Readonly<Array<Readonly<[Color, Color, Color]>>> = Object.freeze([
  Object.freeze(["White", "Green", "Orange"] as const),
  Object.freeze(["White", "Green", "Red"] as const),
  Object.freeze(["White", "Red", "Blue"] as const),
  Object.freeze(["White", "Blue", "Orange"] as const),
  Object.freeze(["Yellow", "Green", "Orange"] as const),
  Object.freeze(["Yellow", "Green", "Red"] as const),
  Object.freeze(["Yellow", "Red", "Blue"] as const),
  Object.freeze(["Yellow", "Blue", "Orange"] as const),
]);

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

export type MiddleCubeIndex =
  | CubeIndexes["Back"]["MiddleMiddle"]
  | CubeIndexes["Down"]["MiddleMiddle"]
  | CubeIndexes["Front"]["MiddleMiddle"]
  | CubeIndexes["Left"]["MiddleMiddle"]
  | CubeIndexes["Right"]["MiddleMiddle"]
  | CubeIndexes["Up"]["MiddleMiddle"];
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

export const MiddlePieces: Readonly<MiddleCubeIndex[]> = Object.freeze([
  CubeIndexes.Up.MiddleMiddle,
  CubeIndexes.Down.MiddleMiddle,
  CubeIndexes.Front.MiddleMiddle,
  CubeIndexes.Back.MiddleMiddle,
  CubeIndexes.Left.MiddleMiddle,
  CubeIndexes.Right.MiddleMiddle,
] as const);

export function isMiddlePiece(piece: CubeIndex): piece is MiddleCubeIndex {
  return MiddlePieces.includes(piece as MiddleCubeIndex);
}
