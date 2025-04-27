import type { Suite } from "mocha";

import { AleaRandomNumberGenerator, type RandomNumberGenerator } from "../src/random";

const UNINITIALIZED = Symbol("UNINITIALIZED wyn2qpvbnf");

function uninitializedRandomNumberGenerator(): RandomNumberGenerator {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return UNINITIALIZED as any;
}

/**
 * A random number generator for convenience to use in tests.
 *
 * Call `initializeRng()` in a Mocha "beforeEach" function and clear it by calling the function it
 * returns in an "afterEach" callback.
 */
export let rng: RandomNumberGenerator = uninitializedRandomNumberGenerator();

export interface InitializeRngResult {
  seed: number;
  clear(): void;
}

export function initializeRng(seed?: number): InitializeRngResult {
  if (rng !== uninitializedRandomNumberGenerator()) {
    throw new Error(
      `refusing to initialize rng because it is already initialized to ${rng}; make sure that ` +
        `all calls to initializeRng() call the returned "clear" function before calling ` +
        `initializeRng() again [tp4746tnr9]`,
    );
  }

  if (typeof seed === "undefined") {
    seed = AleaRandomNumberGenerator.randomSeed();
  }

  const numericSeed: number = seed;
  const newRng = AleaRandomNumberGenerator.forSeed(numericSeed);
  rng = newRng;

  return {
    seed: numericSeed,
    clear: () => {
      if (rng === uninitializedRandomNumberGenerator()) {
        return;
      }
      if (rng !== newRng) {
        throw new Error(
          `internal error: rng should be either uninitialized or newRng (${newRng}), ` +
            `but got ${rng} [r5m8zzfcrx]`,
        );
      }
      rng = uninitializedRandomNumberGenerator();
    },
  };
}

export class ThrowingRandomNumberGenerator implements RandomNumberGenerator {
  next(): number {
    throw new Error("ThrowingRandomNumberGenerator forced error [p4wnxzxq67]");
  }
}

export class PredeterminedRandomNumberGenerator implements RandomNumberGenerator {
  #values: readonly number[];
  #index = 0;

  constructor(values: number[]) {
    this.#values = Object.freeze(Array.from(values));
  }

  next(): number {
    if (this.#index == this.#values.length) {
      this.#index = 0;
    }
    const value = this.#values[this.#index]!;
    this.#index++;
    return value;
  }
}

export interface HasSeed {
  seed: number;
}

class HasSeedImpl implements HasSeed {
  public initResult?: InitializeRngResult;

  get seed(): number {
    return this.initResult!.seed;
  }
}

export function initializeRngForEachTest(suite: Suite, seed?: number): HasSeed {
  const returnValue = new HasSeedImpl();

  suite.beforeEach(() => {
    returnValue.initResult = initializeRng(seed);
  });

  suite.afterEach(() => {
    returnValue.initResult?.clear();
    delete returnValue.initResult;
  });

  return returnValue;
}
