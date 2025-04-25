import {
  type RandomNumberGenerator,
  getRandomElementFrom,
  MathRandomRandomNumberGenerator,
} from "./random";

const CUBE_LENGTH = 54;

export function solved(): Cube {
  // prettier-ignore
  const cube: Cube = Object.seal([
    "green", "green", "green", "green", "green", "green", "green", "green", "green",
    "orange", "orange", "orange", "orange", "orange", "orange", "orange", "orange", "orange",
    "blue", "blue", "blue", "blue", "blue", "blue", "blue", "blue", "blue",
    "red", "red", "red", "red", "red", "red", "red", "red", "red",
    "white", "white", "white", "white", "white", "white", "white", "white", "white",
    "yellow", "yellow", "yellow", "yellow", "yellow", "yellow", "yellow", "yellow", "yellow",
  ]);
  if (cube.length !== CUBE_LENGTH) {
    throw new Error(
      `internal error y9wf7jvh2q: cube.length==${cube.length}, but expected ${CUBE_LENGTH}`,
    );
  }
  return cube;
}

export interface ScrambleOptions {
  numMoves?: number;
  rng?: RandomNumberGenerator;
}

export function scramble(cube: Cube, options?: ScrambleOptions): void {
  const numMoves = options?.numMoves ?? 25;
  if (numMoves < 0) {
    throw new Error(
      `invalid number of moves: ${numMoves} ` +
        `(must be greater than or equal to 0) ` +
        `(error code a3phx79vb4)`,
    );
  }
  const rng = options?.rng ?? new MathRandomRandomNumberGenerator();

  for (let i = 0; i < numMoves; i++) {
    const move = getRandomElementFrom(allMoves, rng);
    performMove(cube, move);
  }
}

export function performMove(cube: Cube, move: Move): void {
  const moveFunction = moveFunctionByMove[move];
  moveFunction(cube);
}

const moveFunctionByMove: Record<Move, (cube: Cube) => void> = Object.freeze({
  "R": moveR,
  "R'": moveRPrime,
  "R2": moveR2,
  "L": moveL,
  "L'": moveLPrime,
  "L2": moveL2,
  "F": moveF,
  "F'": moveFPrime,
  "F2": moveF2,
  "B": moveB,
  "B'": moveBPrime,
  "B2": moveB2,
  "U": moveU,
  "U'": moveUPrime,
  "U2": moveU2,
  "D": moveD,
  "D'": moveDPrime,
  "D2": moveD2,
});

export function moveR(cube: Cube): void {
  rotate(cube, 2, 38, 20, 47);
  rotate(cube, 5, 41, 23, 50);
  rotate(cube, 8, 44, 26, 53);
  rotate(cube, 27, 29, 35, 33);
  rotate(cube, 28, 32, 34, 30);
}

function swap<K extends number>(
  cube: Cube,
  index1: K extends keyof Cube ? K : never,
  index2: K extends keyof Cube ? K : never,
): void {
  const color = cube[index1];
  cube[index1] = cube[index2];
  cube[index2] = color;
}

function rotate<K extends number>(
  cube: Cube,
  index1: K extends keyof Cube ? K : never,
  index2: K extends keyof Cube ? K : never,
  index3: K extends keyof Cube ? K : never,
  index4: K extends keyof Cube ? K : never,
): void {
  const index4Color = cube[index4];
  cube[index4] = cube[index3];
  cube[index3] = cube[index2];
  cube[index2] = cube[index1];
  cube[index1] = index4Color;
}

export function moveRPrime(cube: Cube): void {
  throw new Error("moveRPrime() is not yet implemented (error code nbfy9b5maj)");
}

export function moveR2(cube: Cube): void {
  throw new Error("moveR2() is not yet implemented (error code xea8xd83ba)");
}

export function moveL(cube: Cube): void {
  throw new Error("moveL() is not yet implemented (error code df2t5ctgc3)");
}

export function moveLPrime(cube: Cube): void {
  throw new Error("moveLPrime() is not yet implemented (error code kfmnjg3t39)");
}

export function moveL2(cube: Cube): void {
  throw new Error("moveL2() is not yet implemented (error code qfkn4x4q9k)");
}

export function moveF(cube: Cube): void {
  throw new Error("moveF() is not yet implemented (error code cr6f4nbc9a)");
}

export function moveFPrime(cube: Cube): void {
  throw new Error("moveFPrime() is not yet implemented (error code ydgwbqydzn)");
}

export function moveF2(cube: Cube): void {
  throw new Error("moveF2() is not yet implemented (error code yztts76wc4)");
}

export function moveB(cube: Cube): void {
  throw new Error("moveB() is not yet implemented (error code rswdt7dtzv)");
}

export function moveBPrime(cube: Cube): void {
  throw new Error("moveBPrime() is not yet implemented (error code ppzawshv5k)");
}

export function moveB2(cube: Cube): void {
  throw new Error("moveB2() is not yet implemented (error code bx9pvs73nr)");
}

export function moveU(cube: Cube): void {
  throw new Error("moveU() is not yet implemented (error code zz3fsr8ahf)");
}

export function moveUPrime(cube: Cube): void {
  throw new Error("moveUPrime() is not yet implemented (error code yrw9nd85ze)");
}

export function moveU2(cube: Cube): void {
  throw new Error("moveU2() is not yet implemented (error code nx45f9f2xg)");
}

export function moveD(cube: Cube): void {
  throw new Error("moveD() is not yet implemented (error code vyqwck5byt)");
}

export function moveDPrime(cube: Cube): void {
  throw new Error("moveDPrime() is not yet implemented (error code xz4548dxwg)");
}

export function moveD2(cube: Cube): void {
  throw new Error("moveD2() is not yet implemented (error code jp2rhyczas)");
}

export type Color = "green" | "red" | "orange" | "blue" | "white" | "yellow";

const allColors: readonly Color[] = Object.freeze([
  "green",
  "red",
  "orange",
  "blue",
  "white",
  "yellow",
]);

export function isColor(value: unknown): value is Color {
  return (allColors as unknown[]).includes(value);
}

export type Side = "front" | "left" | "right" | "back" | "top" | "bottom";

// prettier-ignore
export type Move =
  | "R" | "R'" | "R2"
  | "L" | "L'" | "L2"
  | "F" | "F'" | "F2"
  | "B" | "B'" | "B2"
  | "U" | "U'" | "U2"
  | "D" | "D'" | "D2";

// prettier-ignore
const allMoves: readonly Move[] = Object.freeze([
  "R", "R'", "R2",
  "L", "L'", "L2",
  "F", "F'", "F2",
  "B", "B'", "B2",
  "U", "U'", "U2",
  "D", "D'", "D2",
]);

export function isMove(value: unknown): value is Color {
  return (allMoves as unknown[]).includes(value);
}

// prettier-ignore
type Cube = [
  // 0-8: Front/Green face
  Color, Color, Color,    // 0,  1,  2: top row left to right
  Color, "green", Color,  // 3,  4,  5: middle row left to right
  Color, Color, Color,    // 6,  7,  8: bottom row left to right

  // 9-17: Left/Orange face
  Color, Color, Color,    //  9,  10,  11: top row left to right
  Color, "orange", Color, // 12,  13,  14: middle row left to right
  Color, Color, Color,    // 15,  16,  17: bottom row left to right

  // 18-26: Back/Blue face
  Color, Color, Color,    // 18,  19,  20: bottom row left to right
  Color, "blue", Color,   // 21,  22,  23: middle row left to right
  Color, Color, Color,    // 24,  25,  26: top row left to right

  // 27-35: Right/Red face
  Color, Color, Color,    // 27,  28,  29: top row left to right
  Color, "red", Color,    // 30,  31,  32: middle row left to right
  Color, Color, Color,    // 33,  34,  35: bottom row left to right

  // 36-44: Top/White face
  Color, Color, Color,    // 36,  37,  38: back row left to right
  Color, "white", Color,  // 39,  40,  41: middle row left to right
  Color, Color, Color,    // 42,  43,  44: front row left to right

  // 45-53: Bottom/Yellow face
  Color, Color, Color,    // 45,  46,  47: front row left to right
  Color, "yellow", Color, // 48,  49,  50: middle row left to right
  Color, Color, Color,    // 51,  52,  53: back row left to right
];

export function isEqualCube(cube1: Cube, cube2: Cube): boolean {
  if (cube1.length !== cube2.length) {
    return false;
  }
  for (let i = 0; i < cube1.length; i++) {
    if (cube1[i] !== cube2[i]) {
      return false;
    }
  }
  return true;
}

export function isCube(value: unknown): value is Cube {
  if (!Array.isArray(value)) {
    return false;
  }
  if (value.length !== CUBE_LENGTH) {
    return false;
  }
  for (let i = 0; i < value.length; i++) {
    if (!isColor(value[i])) {
      return false;
    }
  }
  return true;
}
