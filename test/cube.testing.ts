import { allColors, Color } from "../src/cube";
import { getRandomElementFrom, type RandomNumberGenerator } from "../src/random";
import { rng as globalRng } from "./random.testing";

export function nonArrayValues(): unknown[] {
  return [null, undefined, 1.2, Symbol("re2x8pe7br"), "nhypmz8h5j", 1234n, false, true, {}];
}

export function randomColor(rng?: RandomNumberGenerator): Color {
  return getRandomElementFrom(allColors, rng ?? globalRng);
}

export function randomColorArray(length: number, rng?: RandomNumberGenerator): Color[] {
  if (length < 0) {
    throw new Error(
      `randomColorArray() called with invalid length: ${length} (error code ka3tetgf8v)`,
    );
  }
  const array: Color[] = [];
  for (let i = 0; i < length; i++) {
    array.push(randomColor(rng));
  }
  return array;
}
