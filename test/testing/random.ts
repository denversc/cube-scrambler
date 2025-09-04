import { inspect } from "#platform";

import { Alea } from "./alea";
import { repeat } from "./repeat";

export interface ShuffleConfig {
  permutationCount: number;
}

export class Random {
  readonly seed: number | string;
  #alea: Alea;

  constructor(seed?: number | string) {
    this.seed = seed ?? randomSeed();
    this.#alea = new Alea(this.seed);
  }

  elementFrom<T>(array: Readonly<Array<T>>): T {
    if (array.length === 0) {
      throw new Error("array.length === 0 [errs393vc3]");
    }
    return array[this.intBetweenZeroAnd(array.length)]!;
  }

  intBetweenZeroAnd(max: number): number {
    if (!Number.isInteger(max) || max < 0) {
      throw new Error(`invalid max: ${inspect(max)} [errk23edm7]`);
    }
    return Math.floor(this.#alea.next() * max);
  }

  next(): number {
    return this.#alea.next();
  }

  nextBoolean(): boolean {
    return this.next() >= 0.5;
  }

  shuffle(array: unknown[], config: ShuffleConfig): void {
    const { permutationCount } = config;
    if (!Number.isInteger(permutationCount) || permutationCount < 0) {
      throw new Error(`invalid permutation count: ${inspect(permutationCount)} [ba677jsazn]`);
    }

    if (array.length < 2) {
      return;
    }

    repeat(permutationCount, () => {
      const index1 = this.intBetweenZeroAnd(array.length);
      const index2 = this.intBetweenZeroAnd(array.length);
      const index1Value = array[index1];
      array[index1] = array[index2];
      array[index2] = index1Value;
    });
  }

  shuffled<T>(array: readonly T[], config: ShuffleConfig): T[] {
    const copy = [...array];
    this.shuffle(copy, config);
    return copy;
  }
}

const random = new Random(Math.random());

/**
 * Returns a randomly-generated non-negative integer intended for use as a seed of a random number
 * generator.
 */
export function randomSeed(): number {
  return random.intBetweenZeroAnd(Number.MAX_SAFE_INTEGER);
}
