import { type Cube, CubeIndexes, type Move } from "./cube";
import { findEdge } from "./finder";
import { transform } from "./transform";
import { unreachable } from "./util/unreachable";

export function solveWhiteCross(cube: Cube): Move[] {
  const greenSolveMoves = solveGreen(cube);
  transform(cube, greenSolveMoves);
  const redSolveMoves = solveRed(cube);
  transform(cube, redSolveMoves);
  const blueSolveMoves = solveBlue(cube);
  transform(cube, blueSolveMoves);
  const orangeSolveMoves = solveOrange(cube);
  transform(cube, orangeSolveMoves);
  return [...greenSolveMoves, ...redSolveMoves, ...blueSolveMoves, ...orangeSolveMoves];
}

function solveBlue(cube: Readonly<Cube>): Move[] {
  const blueCubeIndex = findEdge(cube, ["Blue", "White"])[0];

  switch (blueCubeIndex) {
    case CubeIndexes.Back.BottomMiddle: {
      return ["B2"];
    }
    case CubeIndexes.Back.MiddleLeft: {
      return ["B"];
    }
    case CubeIndexes.Back.MiddleRight: {
      return ["B'"];
    }
    case CubeIndexes.Back.TopMiddle: {
      return []; // already solved!
    }
    case CubeIndexes.Down.BottomMiddle: {
      return ["D", "L", "B'"];
    }
    case CubeIndexes.Down.MiddleLeft: {
      return ["L", "B'"];
    }
    case CubeIndexes.Down.MiddleRight: {
      return ["D2", "L", "B'"];
    }
    case CubeIndexes.Down.TopMiddle: {
      return ["D'", "L", "B'"];
    }
    case CubeIndexes.Front.BottomMiddle: {
      return ["D2", "B2"];
    }
    case CubeIndexes.Front.MiddleLeft: {
      return ["L2", "B'"];
    }
    case CubeIndexes.Front.MiddleRight: {
      return ["U2", "R2", "U2", "B"];
    }
    case CubeIndexes.Front.TopMiddle: {
      throw new Error(
        "internal error cr5vdwqkce: should never get here because" +
          "the green/white edge should be occupying this location",
      );
    }
    case CubeIndexes.Left.BottomMiddle: {
      return ["D'", "B2"];
    }
    case CubeIndexes.Left.MiddleLeft: {
      return ["U'", "L", "U"];
    }
    case CubeIndexes.Left.MiddleRight: {
      return ["U'", "L'", "U"];
    }
    case CubeIndexes.Left.TopMiddle: {
      return ["L2", "D'", "B2"];
    }
    case CubeIndexes.Right.BottomMiddle: {
      return ["D", "B2"];
    }
    case CubeIndexes.Right.MiddleLeft: {
      return ["U", "R", "U'"];
    }
    case CubeIndexes.Right.MiddleRight: {
      return ["B'", "D", "L", "B'"];
    }
    case CubeIndexes.Right.TopMiddle: {
      throw new Error(
        "internal error gyf579ycgq: should never get here because " +
          "the red/white edge should be occupying this location",
      );
    }
    case CubeIndexes.Up.BottomMiddle: {
      throw new Error(
        "internal error zvgxndckkb: should never get here because " +
          "the white/green edge should be occupying this location",
      );
    }
    case CubeIndexes.Up.MiddleLeft: {
      return ["L'", "B'"];
    }
    case CubeIndexes.Up.MiddleRight: {
      throw new Error(
        "internal error r2xfew5fdj: should never get here because " +
          "the white/red edge should be occupying this location",
      );
    }
    case CubeIndexes.Up.TopMiddle: {
      return ["B", "U'", "L", "U"];
    }
    default: {
      unreachable(blueCubeIndex, "invalid blueCubeIndex [j9xc7rkvxy]");
    }
  }
}

function solveGreen(cube: Readonly<Cube>): Move[] {
  const greenCubeIndex = findEdge(cube, ["Green", "White"])[0];

  switch (greenCubeIndex) {
    case CubeIndexes.Back.BottomMiddle: {
      return ["B2", "U2"];
    }
    case CubeIndexes.Back.MiddleLeft: {
      return ["B", "U2"];
    }
    case CubeIndexes.Back.MiddleRight: {
      return ["B'", "U2"];
    }
    case CubeIndexes.Back.TopMiddle: {
      return ["U2"];
    }
    case CubeIndexes.Down.BottomMiddle: {
      return ["D", "L'", "F"];
    }
    case CubeIndexes.Down.MiddleLeft: {
      return ["L'", "F"];
    }
    case CubeIndexes.Down.MiddleRight: {
      return ["R", "F'"];
    }
    case CubeIndexes.Down.TopMiddle: {
      return ["D", "R", "F'"];
    }
    case CubeIndexes.Front.BottomMiddle: {
      return ["F2"];
    }
    case CubeIndexes.Front.MiddleLeft: {
      return ["F"];
    }
    case CubeIndexes.Front.MiddleRight: {
      return ["F'"];
    }
    case CubeIndexes.Front.TopMiddle: {
      return [];
    } // already solved!
    case CubeIndexes.Left.BottomMiddle: {
      return ["L2", "U'"];
    }
    case CubeIndexes.Left.MiddleLeft: {
      return ["L", "U'"];
    }
    case CubeIndexes.Left.MiddleRight: {
      return ["L'", "U'"];
    }
    case CubeIndexes.Left.TopMiddle: {
      return ["U'"];
    }
    case CubeIndexes.Right.BottomMiddle: {
      return ["R2", "U"];
    }
    case CubeIndexes.Right.MiddleLeft: {
      return ["R", "U"];
    }
    case CubeIndexes.Right.MiddleRight: {
      return ["R'", "U"];
    }
    case CubeIndexes.Right.TopMiddle: {
      return ["U"];
    }
    case CubeIndexes.Up.BottomMiddle: {
      return ["U", "L", "F"];
    }
    case CubeIndexes.Up.MiddleLeft: {
      return ["L", "F"];
    }
    case CubeIndexes.Up.MiddleRight: {
      return ["R'", "F'"];
    }
    case CubeIndexes.Up.TopMiddle: {
      return ["U", "R'", "F'"];
    }
    default: {
      unreachable(greenCubeIndex, "invalid greenCubeIndex [ykjzjyzsw3]");
    }
  }
}

function solveOrange(cube: Readonly<Cube>): Move[] {
  const orangeCubeIndex = findEdge(cube, ["Orange", "White"])[0];

  switch (orangeCubeIndex) {
    case CubeIndexes.Back.BottomMiddle: {
      return ["D", "L2"];
    }
    case CubeIndexes.Back.MiddleLeft: {
      return ["U", "B", "U'"];
    }
    case CubeIndexes.Back.MiddleRight: {
      return ["U", "B'", "U'"];
    }
    case CubeIndexes.Back.TopMiddle: {
      throw new Error(
        "internal error q53vqgdnq8: should never get here because" +
          "the blue/white edge should be occupying this location",
      );
    }
    case CubeIndexes.Down.BottomMiddle: {
      return ["U", "B'", "U'", "L"];
    }
    case CubeIndexes.Down.MiddleLeft: {
      return ["L'", "U'", "F", "U"];
    }
    case CubeIndexes.Down.MiddleRight: {
      return ["R'", "U", "B", "U'", "R"];
    }
    case CubeIndexes.Down.TopMiddle: {
      return ["U'", "F", "U", "L'"];
    }
    case CubeIndexes.Front.BottomMiddle: {
      return ["U'", "F2", "U"];
    }
    case CubeIndexes.Front.MiddleLeft: {
      return ["U'", "F", "U"];
    }
    case CubeIndexes.Front.MiddleRight: {
      return ["U'", "F'", "U"];
    }
    case CubeIndexes.Front.TopMiddle: {
      throw new Error(
        "internal error vjyge63dvr: should never get here because" +
          "the green/white edge should be occupying this location",
      );
    }
    case CubeIndexes.Left.BottomMiddle: {
      return ["L2"];
    }
    case CubeIndexes.Left.MiddleLeft: {
      return ["L"];
    }
    case CubeIndexes.Left.MiddleRight: {
      return ["L'"];
    }
    case CubeIndexes.Left.TopMiddle: {
      return []; // already solved!
    }
    case CubeIndexes.Right.BottomMiddle: {
      return ["U2", "R2", "U2"];
    }
    case CubeIndexes.Right.MiddleLeft: {
      return ["U2", "R", "U2"];
    }
    case CubeIndexes.Right.MiddleRight: {
      return ["U2", "R'", "U2"];
    }
    case CubeIndexes.Right.TopMiddle: {
      throw new Error(
        "internal error k6z5vvndbw: should never get here because " +
          "the red/white edge should be occupying this location",
      );
    }
    case CubeIndexes.Up.BottomMiddle: {
      throw new Error(
        "internal error fwfn2kqca4: should never get here because " +
          "the white/green edge should be occupying this location",
      );
    }
    case CubeIndexes.Up.MiddleLeft: {
      return ["L'", "U", "B'", "U'"];
    }
    case CubeIndexes.Up.MiddleRight: {
      throw new Error(
        "internal error zrtbq6xdar: should never get here because " +
          "the white/red edge should be occupying this location",
      );
    }
    case CubeIndexes.Up.TopMiddle: {
      throw new Error(
        "internal error mcq5a2m4p3: should never get here because" +
          "the white/blue edge should be occupying this location",
      );
    }
    default: {
      unreachable(orangeCubeIndex, "invalid orangeCubeIndex [j9xc7rkvxy]");
    }
  }
}

function solveRed(cube: Readonly<Cube>): Move[] {
  const redCubeIndex = findEdge(cube, ["Red", "White"])[0];

  switch (redCubeIndex) {
    case CubeIndexes.Back.BottomMiddle: {
      return ["U'", "B2", "U"];
    }
    case CubeIndexes.Back.MiddleLeft: {
      return ["B'", "D'", "R2"];
    }
    case CubeIndexes.Back.MiddleRight: {
      return ["B", "D'", "R2"];
    }
    case CubeIndexes.Back.TopMiddle: {
      return ["B2", "D'", "R2"];
    }
    case CubeIndexes.Down.BottomMiddle: {
      return ["B", "R'"];
    }
    case CubeIndexes.Down.MiddleLeft: {
      return ["D'", "B", "R'"];
    }
    case CubeIndexes.Down.MiddleRight: {
      return ["D", "B", "R'"];
    }
    case CubeIndexes.Down.TopMiddle: {
      return ["D2", "B", "R'"];
    }
    case CubeIndexes.Front.BottomMiddle: {
      return ["D", "R2"];
    }
    case CubeIndexes.Front.MiddleLeft: {
      return ["L'", "U", "B'", "U'", "R'"];
    }
    case CubeIndexes.Front.MiddleRight: {
      return ["R2", "U'", "B", "U"];
    }
    case CubeIndexes.Front.TopMiddle: {
      throw new Error(
        "internal error n2zjgwnjza: should never get here because" +
          "the green/white edge should be occupying this location",
      );
    }
    case CubeIndexes.Left.BottomMiddle: {
      return ["D2", "R2"];
    }
    case CubeIndexes.Left.MiddleLeft: {
      return ["U2", "L", "U2"];
    }
    case CubeIndexes.Left.MiddleRight: {
      return ["U2", "L'", "U2"];
    }
    case CubeIndexes.Left.TopMiddle: {
      return ["L2", "D2", "R2"];
    }
    case CubeIndexes.Right.BottomMiddle: {
      return ["R2"];
    }
    case CubeIndexes.Right.MiddleLeft: {
      return ["R"];
    }
    case CubeIndexes.Right.MiddleRight: {
      return ["R'"];
    }
    case CubeIndexes.Right.TopMiddle: {
      return []; // already solved!
    }
    case CubeIndexes.Up.BottomMiddle: {
      throw new Error(
        "internal error eskwy5jarr: should never get here because " +
          "the white/green edge should be occupying this location",
      );
    }
    case CubeIndexes.Up.MiddleLeft: {
      return ["U", "B'", "U'", "R'"];
    }
    case CubeIndexes.Up.MiddleRight: {
      return ["U", "F", "U'", "R"];
    }
    case CubeIndexes.Up.TopMiddle: {
      return ["B'", "R'"];
    }
    default: {
      unreachable(redCubeIndex, "invalid redCubeIndex [wpx8jga6kq]");
    }
  }
}
