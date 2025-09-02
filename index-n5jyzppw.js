// src/util/platform/browser_platform.ts
function inspect(object) {
  try {
    return JSON.stringify(object);
  } catch {}
  try {
    return String(object);
  } catch {}
  return `<${typeof object}>`;
}

// src/util/unreachable.ts
function unreachable(value, message) {
  throw new Error(`internal error: should never get here: ${inspect(value)} (${message})`);
}

// src/cube.ts
var Colors = Object.freeze({
  Blue: "Blue",
  Green: "Green",
  Orange: "Orange",
  Red: "Red",
  White: "White",
  Yellow: "Yellow"
});
var Faces = Object.freeze({
  Back: "Back",
  Down: "Down",
  Front: "Front",
  Left: "Left",
  Right: "Right",
  Up: "Up"
});
var FaceRanges = Object.freeze({
  Back: Object.freeze([9, 18]),
  Down: Object.freeze([45, 54]),
  Front: Object.freeze([0, 9]),
  Left: Object.freeze([27, 36]),
  Right: Object.freeze([18, 27]),
  Up: Object.freeze([36, 45])
});
var CubeIndexes = {
  Back: {
    BottomLeft: 15,
    BottomMiddle: 16,
    BottomRight: 17,
    MiddleLeft: 12,
    MiddleMiddle: 13,
    MiddleRight: 14,
    TopLeft: 9,
    TopMiddle: 10,
    TopRight: 11
  },
  Down: {
    BottomLeft: 51,
    BottomMiddle: 52,
    BottomRight: 53,
    MiddleLeft: 48,
    MiddleMiddle: 49,
    MiddleRight: 50,
    TopLeft: 45,
    TopMiddle: 46,
    TopRight: 47
  },
  Front: {
    BottomLeft: 6,
    BottomMiddle: 7,
    BottomRight: 8,
    MiddleLeft: 3,
    MiddleMiddle: 4,
    MiddleRight: 5,
    TopLeft: 0,
    TopMiddle: 1,
    TopRight: 2
  },
  Left: {
    BottomLeft: 33,
    BottomMiddle: 34,
    BottomRight: 35,
    MiddleLeft: 30,
    MiddleMiddle: 31,
    MiddleRight: 32,
    TopLeft: 27,
    TopMiddle: 28,
    TopRight: 29
  },
  Right: {
    BottomLeft: 24,
    BottomMiddle: 25,
    BottomRight: 26,
    MiddleLeft: 21,
    MiddleMiddle: 22,
    MiddleRight: 23,
    TopLeft: 18,
    TopMiddle: 19,
    TopRight: 20
  },
  Up: {
    BottomLeft: 42,
    BottomMiddle: 43,
    BottomRight: 44,
    MiddleLeft: 39,
    MiddleMiddle: 40,
    MiddleRight: 41,
    TopLeft: 36,
    TopMiddle: 37,
    TopRight: 38
  }
};
var MoveFamilyByMove = Object.freeze({
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
  "z'": "z"
});
var MoveAxisByMoveFamily = Object.freeze({
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
  z: "z"
});
function solvedCube() {
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
    "Yellow"
  ];
}
function transform(cube, move) {
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
function transformB(cube) {
  rotateFaceClockwise(cube, "Back");
  {
    const originalUpTopLeftColor = cube[CubeIndexes.Up.TopLeft];
    cube[CubeIndexes.Up.TopLeft] = cube[CubeIndexes.Right.TopRight];
    cube[CubeIndexes.Right.TopRight] = cube[CubeIndexes.Down.BottomRight];
    cube[CubeIndexes.Down.BottomRight] = cube[CubeIndexes.Left.BottomLeft];
    cube[CubeIndexes.Left.BottomLeft] = originalUpTopLeftColor;
  }
  {
    const originalUpTopRightColor = cube[CubeIndexes.Up.TopRight];
    cube[CubeIndexes.Up.TopRight] = cube[CubeIndexes.Right.BottomRight];
    cube[CubeIndexes.Right.BottomRight] = cube[CubeIndexes.Down.BottomLeft];
    cube[CubeIndexes.Down.BottomLeft] = cube[CubeIndexes.Left.TopLeft];
    cube[CubeIndexes.Left.TopLeft] = originalUpTopRightColor;
  }
  {
    const originalUpTopMiddleColor = cube[CubeIndexes.Up.TopMiddle];
    cube[CubeIndexes.Up.TopMiddle] = cube[CubeIndexes.Right.MiddleRight];
    cube[CubeIndexes.Right.MiddleRight] = cube[CubeIndexes.Down.BottomMiddle];
    cube[CubeIndexes.Down.BottomMiddle] = cube[CubeIndexes.Left.MiddleLeft];
    cube[CubeIndexes.Left.MiddleLeft] = originalUpTopMiddleColor;
  }
}
function transformB2(cube) {
  transformB(cube);
  transformB(cube);
}
function transformBPrime(cube) {
  transformB(cube);
  transformB(cube);
  transformB(cube);
}
function transformD(cube) {
  rotateFaceClockwise(cube, "Down");
  {
    const originalFrontBottomRightColor = cube[CubeIndexes.Front.BottomRight];
    cube[CubeIndexes.Front.BottomRight] = cube[CubeIndexes.Left.BottomRight];
    cube[CubeIndexes.Left.BottomRight] = cube[CubeIndexes.Back.BottomRight];
    cube[CubeIndexes.Back.BottomRight] = cube[CubeIndexes.Right.BottomRight];
    cube[CubeIndexes.Right.BottomRight] = originalFrontBottomRightColor;
  }
  {
    const originalFrontBottomLeftColor = cube[CubeIndexes.Front.BottomLeft];
    cube[CubeIndexes.Front.BottomLeft] = cube[CubeIndexes.Left.BottomLeft];
    cube[CubeIndexes.Left.BottomLeft] = cube[CubeIndexes.Back.BottomLeft];
    cube[CubeIndexes.Back.BottomLeft] = cube[CubeIndexes.Right.BottomLeft];
    cube[CubeIndexes.Right.BottomLeft] = originalFrontBottomLeftColor;
  }
  {
    const originalFrontBottomMiddleColor = cube[CubeIndexes.Front.BottomMiddle];
    cube[CubeIndexes.Front.BottomMiddle] = cube[CubeIndexes.Left.BottomMiddle];
    cube[CubeIndexes.Left.BottomMiddle] = cube[CubeIndexes.Back.BottomMiddle];
    cube[CubeIndexes.Back.BottomMiddle] = cube[CubeIndexes.Right.BottomMiddle];
    cube[CubeIndexes.Right.BottomMiddle] = originalFrontBottomMiddleColor;
  }
}
function transformD2(cube) {
  transformD(cube);
  transformD(cube);
}
function transformDPrime(cube) {
  transformD(cube);
  transformD(cube);
  transformD(cube);
}
function transformE(cube) {
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
function transformE2(cube) {
  transformE(cube);
  transformE(cube);
}
function transformEPrime(cube) {
  transformE(cube);
  transformE(cube);
  transformE(cube);
}
function transformF(cube) {
  rotateFaceClockwise(cube, "Front");
  {
    const originalUpBottomLeftColor = cube[CubeIndexes.Up.BottomLeft];
    cube[CubeIndexes.Up.BottomLeft] = cube[CubeIndexes.Left.BottomRight];
    cube[CubeIndexes.Left.BottomRight] = cube[CubeIndexes.Down.TopRight];
    cube[CubeIndexes.Down.TopRight] = cube[CubeIndexes.Right.TopLeft];
    cube[CubeIndexes.Right.TopLeft] = originalUpBottomLeftColor;
  }
  {
    const originalUpBottomRightColor = cube[CubeIndexes.Up.BottomRight];
    cube[CubeIndexes.Up.BottomRight] = cube[CubeIndexes.Left.TopRight];
    cube[CubeIndexes.Left.TopRight] = cube[CubeIndexes.Down.TopLeft];
    cube[CubeIndexes.Down.TopLeft] = cube[CubeIndexes.Right.BottomLeft];
    cube[CubeIndexes.Right.BottomLeft] = originalUpBottomRightColor;
  }
  {
    const originalUpBottomMiddleColor = cube[CubeIndexes.Up.BottomMiddle];
    cube[CubeIndexes.Up.BottomMiddle] = cube[CubeIndexes.Left.MiddleRight];
    cube[CubeIndexes.Left.MiddleRight] = cube[CubeIndexes.Down.TopMiddle];
    cube[CubeIndexes.Down.TopMiddle] = cube[CubeIndexes.Right.MiddleLeft];
    cube[CubeIndexes.Right.MiddleLeft] = originalUpBottomMiddleColor;
  }
}
function transformF2(cube) {
  transformF(cube);
  transformF(cube);
}
function transformFPrime(cube) {
  transformF(cube);
  transformF(cube);
  transformF(cube);
}
function transformL(cube) {
  rotateFaceClockwise(cube, "Left");
  {
    const originalFrontTopLeftColor = cube[CubeIndexes.Front.TopLeft];
    cube[CubeIndexes.Front.TopLeft] = cube[CubeIndexes.Up.TopLeft];
    cube[CubeIndexes.Up.TopLeft] = cube[CubeIndexes.Back.BottomRight];
    cube[CubeIndexes.Back.BottomRight] = cube[CubeIndexes.Down.TopLeft];
    cube[CubeIndexes.Down.TopLeft] = originalFrontTopLeftColor;
  }
  {
    const originalFrontBottomLeftColor = cube[CubeIndexes.Front.BottomLeft];
    cube[CubeIndexes.Front.BottomLeft] = cube[CubeIndexes.Up.BottomLeft];
    cube[CubeIndexes.Up.BottomLeft] = cube[CubeIndexes.Back.TopRight];
    cube[CubeIndexes.Back.TopRight] = cube[CubeIndexes.Down.BottomLeft];
    cube[CubeIndexes.Down.BottomLeft] = originalFrontBottomLeftColor;
  }
  {
    const originalFrontMiddleLeftColor = cube[CubeIndexes.Front.MiddleLeft];
    cube[CubeIndexes.Front.MiddleLeft] = cube[CubeIndexes.Up.MiddleLeft];
    cube[CubeIndexes.Up.MiddleLeft] = cube[CubeIndexes.Back.MiddleRight];
    cube[CubeIndexes.Back.MiddleRight] = cube[CubeIndexes.Down.MiddleLeft];
    cube[CubeIndexes.Down.MiddleLeft] = originalFrontMiddleLeftColor;
  }
}
function transformL2(cube) {
  transformL(cube);
  transformL(cube);
}
function transformLPrime(cube) {
  transformL(cube);
  transformL(cube);
  transformL(cube);
}
function transformM(cube) {
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
function transformM2(cube) {
  transformM(cube);
  transformM(cube);
}
function transformMPrime(cube) {
  transformM(cube);
  transformM(cube);
  transformM(cube);
}
function transformR(cube) {
  rotateFaceClockwise(cube, "Right");
  {
    const originalFrontTopRightColor = cube[CubeIndexes.Front.TopRight];
    cube[CubeIndexes.Front.TopRight] = cube[CubeIndexes.Down.TopRight];
    cube[CubeIndexes.Down.TopRight] = cube[CubeIndexes.Back.BottomLeft];
    cube[CubeIndexes.Back.BottomLeft] = cube[CubeIndexes.Up.TopRight];
    cube[CubeIndexes.Up.TopRight] = originalFrontTopRightColor;
  }
  {
    const originalFrontBottomRightColor = cube[CubeIndexes.Front.BottomRight];
    cube[CubeIndexes.Front.BottomRight] = cube[CubeIndexes.Down.BottomRight];
    cube[CubeIndexes.Down.BottomRight] = cube[CubeIndexes.Back.TopLeft];
    cube[CubeIndexes.Back.TopLeft] = cube[CubeIndexes.Up.BottomRight];
    cube[CubeIndexes.Up.BottomRight] = originalFrontBottomRightColor;
  }
  {
    const originalFrontMiddleRightColor = cube[CubeIndexes.Front.MiddleRight];
    cube[CubeIndexes.Front.MiddleRight] = cube[CubeIndexes.Down.MiddleRight];
    cube[CubeIndexes.Down.MiddleRight] = cube[CubeIndexes.Back.MiddleLeft];
    cube[CubeIndexes.Back.MiddleLeft] = cube[CubeIndexes.Up.MiddleRight];
    cube[CubeIndexes.Up.MiddleRight] = originalFrontMiddleRightColor;
  }
}
function transformR2(cube) {
  transformR(cube);
  transformR(cube);
}
function transformRPrime(cube) {
  transformR(cube);
  transformR(cube);
  transformR(cube);
}
function transformS(cube) {
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
function transformS2(cube) {
  transformS(cube);
  transformS(cube);
}
function transformSPrime(cube) {
  transformS(cube);
  transformS(cube);
  transformS(cube);
}
function transformU(cube) {
  rotateFaceClockwise(cube, "Up");
  {
    const originalFrontTopRightColor = cube[CubeIndexes.Front.TopRight];
    cube[CubeIndexes.Front.TopRight] = cube[CubeIndexes.Right.TopRight];
    cube[CubeIndexes.Right.TopRight] = cube[CubeIndexes.Back.TopRight];
    cube[CubeIndexes.Back.TopRight] = cube[CubeIndexes.Left.TopRight];
    cube[CubeIndexes.Left.TopRight] = originalFrontTopRightColor;
  }
  {
    const originalFrontTopLeftColor = cube[CubeIndexes.Front.TopLeft];
    cube[CubeIndexes.Front.TopLeft] = cube[CubeIndexes.Right.TopLeft];
    cube[CubeIndexes.Right.TopLeft] = cube[CubeIndexes.Back.TopLeft];
    cube[CubeIndexes.Back.TopLeft] = cube[CubeIndexes.Left.TopLeft];
    cube[CubeIndexes.Left.TopLeft] = originalFrontTopLeftColor;
  }
  {
    const originalFrontTopMiddleColor = cube[CubeIndexes.Front.TopMiddle];
    cube[CubeIndexes.Front.TopMiddle] = cube[CubeIndexes.Right.TopMiddle];
    cube[CubeIndexes.Right.TopMiddle] = cube[CubeIndexes.Back.TopMiddle];
    cube[CubeIndexes.Back.TopMiddle] = cube[CubeIndexes.Left.TopMiddle];
    cube[CubeIndexes.Left.TopMiddle] = originalFrontTopMiddleColor;
  }
}
function transformU2(cube) {
  transformU(cube);
  transformU(cube);
}
function transformUPrime(cube) {
  transformU(cube);
  transformU(cube);
  transformU(cube);
}
function transformX(cube) {
  transformR(cube);
  transformLPrime(cube);
  transformMPrime(cube);
}
function transformX2(cube) {
  transformX(cube);
  transformX(cube);
}
function transformXPrime(cube) {
  transformX(cube);
  transformX(cube);
  transformX(cube);
}
function transformY(cube) {
  transformU(cube);
  transformEPrime(cube);
  transformDPrime(cube);
}
function transformY2(cube) {
  transformY(cube);
  transformY(cube);
}
function transformYPrime(cube) {
  transformY(cube);
  transformY(cube);
  transformY(cube);
}
function transformZ(cube) {
  transformF(cube);
  transformS(cube);
  transformBPrime(cube);
}
function transformZ2(cube) {
  transformZ(cube);
  transformZ(cube);
}
function transformZPrime(cube) {
  transformZ(cube);
  transformZ(cube);
  transformZ(cube);
}
function rotateFaceClockwise(cube, face) {
  const indexes = CubeIndexes[face];
  const originalTopLeftColor = cube[indexes.TopLeft];
  cube[indexes.TopLeft] = cube[indexes.BottomLeft];
  cube[indexes.BottomLeft] = cube[indexes.BottomRight];
  cube[indexes.BottomRight] = cube[indexes.TopRight];
  cube[indexes.TopRight] = originalTopLeftColor;
  const originalTopMiddleCorner = cube[indexes.TopMiddle];
  cube[indexes.TopMiddle] = cube[indexes.MiddleLeft];
  cube[indexes.MiddleLeft] = cube[indexes.BottomMiddle];
  cube[indexes.BottomMiddle] = cube[indexes.MiddleRight];
  cube[indexes.MiddleRight] = originalTopMiddleCorner;
}
var DefaultScrambleOptions = Object.freeze({
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
    "D2"
  ]),
  moveCount: 25,
  random: () => Math.random()
});
function generateScramble(options) {
  const moveCount = options?.moveCount ?? DefaultScrambleOptions.moveCount;
  if (!Number.isInteger(moveCount) || moveCount < 0) {
    throw new Error(`invalid moveCount: ${inspect(moveCount)} [errwq2n67e]`);
  }
  const candidateMoves = options?.candidateMoves ?? DefaultScrambleOptions.candidateMoves;
  if (candidateMoves.length === 0) {
    throw new Error(`invalid candidateMoves: ${inspect(candidateMoves)} [errk2kqncg]`);
  }
  const random = options?.random ?? DefaultScrambleOptions.random;
  const moves = [];
  while (moves.length < moveCount) {
    const lastMove = moves.at(-1);
    const excludedMoveFamilies = new Set;
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
    const currentCandidateMoves = [];
    for (const move of candidateMoves) {
      if (!excludedMoveFamilies.has(MoveFamilyByMove[move])) {
        currentCandidateMoves.push(move);
      }
    }
    const nextMove = currentCandidateMoves[Math.floor(random() * currentCandidateMoves.length)];
    moves.push(nextMove);
  }
  return moves;
}
function getFace(cube, face) {
  const range = FaceRanges[face];
  return cube.slice(range[0], range[1]);
}

// src/browser/scramble_renderer.ts
function renderCube(cube, element) {
  element.innerHTML = "";
  for (const faceName of RENDER_CUBE_FACE_ORDER) {
    const faceElement = document.createElement("div");
    faceElement.classList.add("face", `${faceName.toLowerCase()}-face`);
    faceElement.style.padding = "16px";
    const stickers = getFace(cube, faceName);
    for (const stickerColor of stickers) {
      const stickerElement = document.createElement("div");
      stickerElement.classList.add("sticker", `sticker-${stickerColor}`);
      faceElement.append(stickerElement);
    }
    element.append(faceElement);
  }
}
function renderScrambleText(scramble, element, options) {
  const maximumMovesPerLine = options?.maximumMovesPerLine ?? 5;
  if (!Number.isInteger(maximumMovesPerLine) || maximumMovesPerLine < 1) {
    throw new Error(`invalid maximum moves per line: ${inspect(maximumMovesPerLine)} [err23xgq9y]`);
  }
  element.innerHTML = "";
  for (let index = 0;index < scramble.length; index += maximumMovesPerLine) {
    const chunk = scramble.slice(index, index + maximumMovesPerLine);
    const lineElement = document.createElement("div");
    lineElement.classList.add("scramble-line");
    lineElement.textContent = NON_BREAKING_SPACE + chunk.map((s) => s.padEnd(3, NON_BREAKING_SPACE)).join("");
    element.append(lineElement);
  }
}
var RENDER_CUBE_FACE_ORDER = Object.freeze([
  "Up",
  "Left",
  "Front",
  "Right",
  "Back",
  "Down"
]);
var NON_BREAKING_SPACE = " ";

// src/browser/ui.ts
function loadUi() {
  return {
    cubeContainer: getElementById("cube-container"),
    generateButton: getElementById("generate-button"),
    scrambleText: getElementById("scramble-sequence")
  };
}
function getElementById(id) {
  const element = document.querySelector("#" + id);
  if (!element) {
    throw new Error(`unable to find element with ID ${inspect(id)} [errktkyf2g]`);
  }
  return element;
}

// src/browser/index.ts
function generateAndRenderScramble(ui) {
  const scramble = generateScramble();
  const cube = solvedCube();
  for (const move of scramble) {
    transform(cube, move);
  }
  renderScrambleText(scramble, ui.scrambleText);
  renderCube(cube, ui.cubeContainer);
}
function main() {
  const ui = loadUi();
  ui.generateButton.addEventListener("click", (event) => {
    event.preventDefault();
    generateAndRenderScramble(ui);
  });
  generateAndRenderScramble(ui);
}
main();
