import { allColors, Color } from "../src/cube";
import { getRandomElementFrom } from "../src/random";
import { rng as rng } from "./random.testing";

export function nonArrayValues(): unknown[] {
  return [null, undefined, 1.2, Symbol("re2x8pe7br"), "nhypmz8h5j", 1234n, false, true, {}];
}

export function randomColor(): Color {
  return getRandomElementFrom(allColors, rng);
}

export function randomColorArray(length: number): Color[] {
  if (length < 0) {
    throw new Error(
      `randomColorArray() called with invalid length: ${length} (error code ka3tetgf8v)`,
    );
  }
  const array: Color[] = [];
  for (let i = 0; i < length; i++) {
    array.push(randomColor());
  }
  return array;
}
