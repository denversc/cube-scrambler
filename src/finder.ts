import { inspect } from "#platform";

import { type Color, type Cube, type EdgeCubeIndex, EdgePieces } from "./cube";

export function findEdge(
  cube: Readonly<Cube>,
  piece: Readonly<[Color, Color]>,
): [EdgeCubeIndex, EdgeCubeIndex] {
  const [color1, color2] = piece;

  for (const edgePiece of EdgePieces) {
    const edgeIndex1 = edgePiece[0];
    const edgeIndex2 = edgePiece[1];
    const candidateColor1 = cube[edgeIndex1];
    const candidateColor2 = cube[edgeIndex2];
    if (color1 === candidateColor1 && color2 === candidateColor2) {
      return [edgeIndex1, edgeIndex2];
    } else if (color1 === candidateColor2 && color2 === candidateColor1) {
      return [edgeIndex2, edgeIndex1];
    }
  }

  throw new Error(
    `edge piece not found: piece=${inspect(piece)}, cube=${inspect(cube)} [vn7s9teyvn]`,
  );
}
