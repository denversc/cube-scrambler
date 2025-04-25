import { expect  } from 'chai';

import { Alea } from '../src/alea';
import {
  AleaRandomNumberGenerator,
  getRandomElementFrom,
  MathRandomRandomNumberGenerator,
  RandomNumberGenerator
} from '../src/random';

describe('random.ts [mq8ewq77j9]', () => {
  describe("getRandomElementFrom() [pfzkdmpfjk]", () => {
    it("should throw on empty elements", () => {
      const block = () => getRandomElementFrom([], new ThrowingRandomNumberGenerator());
      expect(block).to.throw(/\bggr47yr5be\b/g)
      expect(block).to.throw(/\bempty\b/gi)
    });

    it("should return only element from a 1-element list", () => {
      const element = Symbol("nshyjnkcvv");
      const rng = new MathRandomRandomNumberGenerator();
      for (let i=0; i < 100; i++) {
        expect(getRandomElementFrom([element], rng), `i=${i}`).to.equal(element)
      }
    });

    it("should return element corresponding to the generated random numbers", () => {
      const predeterminedRandomNumbers = [Number.MIN_VALUE, 0.33, 0.66, 1-Number.EPSILON];
      const rng = new PredeterminedRandomNumberGenerator(predeterminedRandomNumbers);
      const values = Object.freeze(["p46s4mknjp", "ey4bbmq2hf", "ch6n4kh3j7", "sxgw8g5xcf", "aq2wd394am"]);
      const producedValues1: string[] = [];
      for (let i=0; i<predeterminedRandomNumbers.length; i++) {
        producedValues1.push(getRandomElementFrom(values, rng));
      }
      const producedValues2: string[] = [];
      for (let i=0; i<predeterminedRandomNumbers.length; i++) {
        producedValues2.push(getRandomElementFrom(values, rng));
      }
      expect(producedValues1).to.deep.equal(producedValues2);
      expect(producedValues1.length, "producedValues1.length").to.be.greaterThan(0);
    });
  });

  describe("MathRandomRandomNumberGenerator [e97m65kccg]", () => {
    it("should generate numbers", () => {
      const rng = new MathRandomRandomNumberGenerator();
      for (let i=0; i<100; i++) {
        expect(rng.next(), `i=${i}`).to.be.a('number');
      }
    });
  });

  describe("AleaRandomNumberGenerator [f7mc2m6brj]", () => {
    it("should generate same numbers as the underlying Alea", () => {
      const seed = 0.9302521400230523;
      const alea1 = new Alea(seed);
      const aleaNumbers: number[] = [];
      for (let i=0; i<100; i++) {
        aleaNumbers.push(alea1.next());
      }

      const alea2 = new Alea(seed);
      const rng = new AleaRandomNumberGenerator(alea2);
      const rngNumbers: number[] = [];
      for (let i=0; i<100; i++) {
        rngNumbers.push(rng.next());
      }

      expect(rngNumbers, `seed=${seed}`).to.deep.equal(aleaNumbers);
    });
  })
});

class ThrowingRandomNumberGenerator implements RandomNumberGenerator {

  next(): number {
    throw new Error("ThrowingRandomNumberGenerator forced error [p4wnxzxq67]");
  }

}

class PredeterminedRandomNumberGenerator implements RandomNumberGenerator {

  #values: readonly number[]
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