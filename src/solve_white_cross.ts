import {inspect} from "#platform";
import { type Cube, type EdgeCubeIndex, CubeIndexes, type Move, type Color } from "./cube";
import { findEdge } from "./finder";
import { transform } from "./transform";
import { unreachable } from "./util/unreachable";
import { invalid } from "./util/invalid";
import {Permutation} from 'js-combinatorics'

export function solveWhiteCross(cube: Readonly<Cube>): Array<WhiteCrossSolution> {
  const solutions: WhiteCrossSolution[] = [];
  for (const solveOrder of new Permutation(["Green", "Red", "Blue", "Orange"] as const)) {
    solveCube(cube, solveOrder, solutions);
  }
  return solutions;
}

export interface WhiteCrossSolution {
  moves: Move[];
  cube: Cube;
}

type WhiteEdgeColor = "Green" | "Red" | "Blue" | "Orange";

function solveCube(cube: Readonly<Cube>, order: readonly WhiteEdgeColor[], solutions: Array<WhiteCrossSolution>): void {
  const solvedColors = getSolvedColors(cube);
  for (const color of order) {
    if (solvedColors.includes(color)) {
      continue;
    }
    solveColor(cube, color, solvedColors, solutions);
    solvedColors.push(color);
  }
}

function solveColor(cube: Readonly<Cube>, color: WhiteEdgeColor, solvedColors: readonly WhiteEdgeColor[], solutions: Array<WhiteCrossSolution>): void {
}

type UpEdgeUpCubeIndex = 
  | typeof CubeIndexes.Up.TopMiddle
  | typeof CubeIndexes.Up.BottomMiddle
  | typeof CubeIndexes.Up.MiddleLeft
  | typeof CubeIndexes.Up.MiddleRight;

type UpEdgeSideCubeIndex = 
  | typeof CubeIndexes.Back.TopMiddle
  | typeof CubeIndexes.Front.TopMiddle
  | typeof CubeIndexes.Left.TopMiddle
  | typeof CubeIndexes.Right.TopMiddle;

interface TopEdge {
  upCubeIndex: UpEdgeUpCubeIndex;
  sideCubeIndex: UpEdgeSideCubeIndex;
}

const UpEdges: readonly TopEdge[] = [
  {upCubeIndex: CubeIndexes.Up.TopMiddle, sideCubeIndex: CubeIndexes.Back.TopMiddle} as const,
  {upCubeIndex: CubeIndexes.Up.BottomMiddle, sideCubeIndex: CubeIndexes.Front.TopMiddle} as const,
  {upCubeIndex: CubeIndexes.Up.MiddleLeft, sideCubeIndex: CubeIndexes.Left.TopMiddle} as const,
  {upCubeIndex: CubeIndexes.Up.MiddleRight, sideCubeIndex: CubeIndexes.Right.TopMiddle} as const,
] as const;

function getSolvedColorsFromCube(cube: Readonly<Cube>): WhiteEdgeColor[] {
  const whiteUpEdges = UpEdges.map(edgePiece => {
    const {upCubeIndex, sideCubeIndex} = edgePiece;
    return {upCubeIndex, upColor: cube[upCubeIndex], sideColor: cube[sideCubeIndex] as WhiteEdgeColor};
  }).filter(it => it.upColor === "White");
  return getSolvedColorsFromWhiteUpEdges(whiteUpEdges);
}

interface WhiteUpEdge {
  upCubeIndex: UpEdgeUpCubeIndex;
  sideColor: WhiteEdgeColor;
};

function getSolvedColorsFromWhiteUpEdges(whiteUpEdges: Readonly<Array<Readonly<WhiteUpEdge>>>): WhiteEdgeColor[] {
  if (whiteUpEdges.length === 0) {
    return [];
  }
  if (whiteUpEdges.length === 1) {
    return [whiteUpEdges[0]!.sideColor];
  }
  if (whiteUpEdges.length === 2) {
    return getSolvedColorsFrom2WhiteUpEdges(whiteUpEdges as [WhiteUpEdge, WhiteUpEdge]);
  }
  if (whiteUpEdges.length === 3) {
    return getSolvedColorsFrom3WhiteUpEdges(whiteUpEdges as [WhiteUpEdge, WhiteUpEdge, WhiteUpEdge]);
  }
  if (whiteUpEdges.length === 4) {
    return getSolvedColorsFrom4WhiteUpEdges(whiteUpEdges as [WhiteUpEdge, WhiteUpEdge, WhiteUpEdge, WhiteUpEdge]);
  }
  invalid(whiteUpEdges.length, "unsupported whiteUpEdges.length [czna2pqkjk]");
}

function getSolvedColorsFrom2WhiteUpEdges(whiteUpEdges: Readonly<[Readonly<WhiteUpEdge>, Readonly<WhiteUpEdge>]>): WhiteEdgeColor[] {
  const [edge1, edge2] = whiteUpEdges;
  const {upCubeIndex: upCubeIndex1, sideColor: sideColor1} = edge1;
  const {upCubeIndex: upCubeIndex2, sideColor: sideColor2} = edge2;

  if (upCubeIndex1 === upCubeIndex2) {
    invalid({upCubeIndex1, upCubeIndex2}, "up cube indexes must be different [q9bf9tb66s]");
  }
}

function getSolvedColorsFrom3WhiteUpEdges(whiteUpEdges: Readonly<[Readonly<WhiteUpEdge>, Readonly<WhiteUpEdge>, Readonly<WhiteUpEdge>]>): WhiteEdgeColor[] {
  throw new Error("not implemented [jmrd22gkfb]")
}

function getSolvedColorsFrom4WhiteUpEdges(whiteUpEdges: Readonly<[Readonly<WhiteUpEdge>, Readonly<WhiteUpEdge>, Readonly<WhiteUpEdge>, Readonly<WhiteUpEdge>]>): WhiteEdgeColor[] {
  throw new Error("not implemented [rdgt5j9def]")
}
