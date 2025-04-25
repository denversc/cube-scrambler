import { expect,  } from 'chai';

import {getRandomElementFrom, RandomNumberGenerator } from '../src/random';

describe('random.ts [mq8ewq77j9]', () => {
  describe("getRandomElementFrom() [pfzkdmpfjk]", () => {
    it("should throw on empty elements", () => {
      const rng = new PredeterminedRandomNumberGenerator([]);
      expect(() => getRandomElementFrom([], rng)).to.throw(/\bggr47yr5be\b/g)
      expect(() => getRandomElementFrom([], rng)).to.throw(/\bempty\b/gi)
    });
  })
});

class PredeterminedRandomNumberGenerator implements RandomNumberGenerator {

  #values: readonly number[]
  #index = 0;

  constructor(values: number[]) {
    this.#values = Object.freeze(Array.from(values));
  }

  next(): number {
    if (this.#index == this.#values.length) {
      throw new Error("no more values for next() to return; " +
      `values were: ${this.#values} (error code x67fpgmb77)`);
    }
    const value = this.#values[this.#index]!;
    this.#index++;
    return value;
  }

}