import { solved as solvedCube, moveR, areCubesEqual } from './cube';

const cube = solvedCube();
moveR(cube);
moveR(cube);
moveR(cube);
moveR(cube);
if (! areCubesEqual(cube, solvedCube())) {
  throw new Error("test 1 failed");
}