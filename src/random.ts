import { Alea } from "./alea";

export interface RandomNumberGenerator {
  /**
   * Returns a floating-point number in the half-open range [0..1).
   */
  next(): number;
}

export function getRandomElementFrom<T>(elements: readonly T[], rng: RandomNumberGenerator): T {
  const elementsLength = elements.length;
  if (elementsLength === 0) {
    throw new Error("elements must be empty (error code ggr47yr5be)");
  }
  const randomNumber = rng.next();
  if (randomNumber < 0 || randomNumber >= 1) {
    throw new Error(
      `RandomNumberGenerator ${rng} produced an out-of-range number: ${randomNumber}` +
        ` (must be greater than or equal to zero and strictly less than 1) ` +
        `(error code xy7zr5xkxr)`,
    );
  }
  const elementIndex = Math.floor(elementsLength * randomNumber);
  return elements[elementIndex]!;
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
