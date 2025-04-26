import type { Cube } from "../src/cube";
import { solved } from "../src/cube";

// These constants help improve readability for the immutable rows
const GREEN = "green";
const RED = "red";
const ORANGE = "orange";
const BLUE = "blue";
const WHITE = "white";
const YELLOW = "yellow";

export function getSolvedCubeStates(): CubeStates {
  return {
    initial: solved(),
    // prettier-ignore
    r1: [
      "green", "green", "yellow", "green", GREEN, "yellow", "green", "green", "yellow",
      "orange", "orange", "orange", "orange", ORANGE, "orange", "orange", "orange", "orange",
      "blue", "blue", "white", "blue", BLUE, "white", "blue", "blue", "white",
      "red", "red", "red", "red", RED, "red", "red", "red", "red",
      "white", "white", "green", "white", "white", "green", "white", "white", "green",
      "yellow", "yellow", "blue", "yellow", YELLOW, "blue", "yellow", "yellow", "blue",
    ],
    // prettier-ignore
    r2: [
      "green", "green", "blue", "green", GREEN, "blue", "green", "green", "blue",
      "orange", "orange", "orange", "orange", ORANGE, "orange", "orange", "orange", "orange",
      "blue", "blue", "green", "blue", BLUE, "green", "blue", "blue", "green",
      "red", "red", "red", "red", RED, "red", "red", "red", "red",
      "white", "white", "yellow", "white", WHITE, "yellow", "white", "white", "yellow",
      "yellow", "yellow", "white", "yellow", YELLOW, "white", "yellow", "yellow", "white",
    ],
    // prettier-ignore
    r3: [
      "green", "green", "white", "green", GREEN, "white", "green", "green", "white",
      "orange", "orange", "orange", "orange", ORANGE, "orange", "orange", "orange", "orange",
      "blue", "blue", "yellow", "blue", BLUE, "yellow", "blue", "blue", "yellow",
      "red", "red", "red", "red", "red", RED, "red", "red", "red",
      "white", "white", "blue", "white", WHITE, "blue", "white", "white", "blue",
      "yellow", "yellow", "green", "yellow", YELLOW, "green", "yellow", "yellow", "green",
    ],
  };
}

export function getSampleCubeStates1(): CubeStates {
  return {
    // prettier-ignore
    initial: [
      "red", "white", "blue", "white", GREEN, "red", "green", "blue", "red",
      "orange", "green", "blue", "orange", ORANGE, "red", "green", "blue", "white",
      "green", "blue", "red", "white", BLUE, "white", "blue", "blue", "orange",
      "blue", "white", "orange", "red", RED, "blue", "green", "green", "yellow",
      "yellow", "yellow", "yellow", "white", WHITE, "green", "white", "orange", "orange",
      "blue", "white", "blue", "red", YELLOW, "white", "yellow", "blue", "orange",
    ],
    // prettier-ignore
    r1: [
      "red", "white", "blue", "white", GREEN, "white", "green", "blue", "orange",
      "orange", "green", "blue", "orange", ORANGE, "red", "green", "blue", "white",
      "green", "blue", "yellow", "white", BLUE, "green", "blue", "blue", "orange",
      "green", "red", "blue", "green", RED, "white", "yellow", "blue", "orange",
      "yellow", "yellow", "blue", "white", WHITE, "red", "white", "orange", "red",
      "blue", "white", "red", "red", YELLOW, "white", "yellow", "blue", "orange",
    ],
    // prettier-ignore
    r2: [
      "red", "white", "red", "white", GREEN, "white", "green", "blue", "orange",
      "orange", "green", "blue", "orange", ORANGE, "red", "green", "blue", "white",
      "green", "blue", "blue", "white", BLUE, "red", "blue", "blue", "red",
      "yellow", "green", "green", "blue", RED, "red", "orange", "white", "blue",
      "yellow", "yellow", "blue", "white", WHITE, "white", "white", "orange", "orange",
      "blue", "white", "yellow", "red", YELLOW, "green", "yellow", "blue", "orange",
    ],
    // prettier-ignore
    r3: [
      "red", "white", "yellow", "white", GREEN, "green", "green", "blue", "orange",
      "orange", "green", "blue", "orange", ORANGE, "red", "green", "blue", "white",
      "green", "blue", "blue", "white", BLUE, "white", "blue", "blue", "orange",
      "orange", "blue", "yellow", "white", RED, "green", "blue", "red", "green",
      "yellow", "yellow", "red", "white", WHITE, "white", "white", "orange", "orange",
      "blue", "white", "blue", "red", YELLOW, "red", "yellow", "blue", "red",
    ],
  };
}

export interface CubeStates {
  initial: Cube;
  r1: Cube;
  r2: Cube;
  r3: Cube;
}
