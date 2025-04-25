import { Alea } from "./alea";

export interface RandomNumberGenerator {
  /**
   * Returns a floating-point number in the half-open range [0..1).
   */
  next(): number;
}

export function getRandomElementFrom<T>(array: readonly T[], rng: RandomNumberGenerator): T {
  return array[getRandomIndexOf(array, rng)]!;
}

export function getRandomIndexOf(array: readonly unknown[], rng: RandomNumberGenerator): number {
  const arrayLength = array.length;
  if (arrayLength === 0) {
    throw new Error("array must not be empty (error code ggr47yr5be)");
  }
  return Math.floor(arrayLength * rng.next());
}

export class MathRandomRandomNumberGenerator implements RandomNumberGenerator {
  next(): number {
    return Math.random();
  }
}

export class AleaRandomNumberGenerator implements RandomNumberGenerator {
  readonly alea: Alea;

  constructor(alea?: Alea) {
    this.alea = alea ?? new Alea(AleaRandomNumberGenerator.randomSeed());
  }

  next(): number {
    return this.alea.next();
  }

  static forSeed(seed: unknown): AleaRandomNumberGenerator {
    return new AleaRandomNumberGenerator(new Alea(seed));
  }

  static randomSeed(): number {
    return Math.random();
  }
}
