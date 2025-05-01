import type { Suite } from "mocha";

import { Alea } from "../src/alea";
import {
  AleaRandomNumberGenerator,
  getRandomElementFrom,
  getRandomIndexOf,
  MathRandomRandomNumberGenerator,
} from "../src/random";
import {
  initializeRngForEachTest,
  PredeterminedRandomNumberGenerator,
  rng,
  ThrowingRandomNumberGenerator,
} from "./random.testing";

const expect = chai.expect;

describe("random.test.ts [mq8ewq77j9]", function (this: Suite) {
  initializeRngForEachTest(this);

  describe("getRandomElementFrom() [pfzkdmpfjk]", () => {
    it("should throw on empty array", () => {
      const block = () => getRandomElementFrom([], new ThrowingRandomNumberGenerator());
      expect(block).to.throw(/\bggr47yr5be\b/g);
      expect(block).to.throw(/\bempty\b/gi);
    });

    it("should return the only element from a 1-element array", () => {
      const element = Symbol("nshyjnkcvv");
      const rng = new MathRandomRandomNumberGenerator();
      for (let i = 0; i < 100; i++) {
        expect(getRandomElementFrom([element], rng), `i=${i}`).to.equal(element);
      }
    });

    it("should return elements corresponding to the generated random numbers", () => {
      const predeterminedRandomNumbers = [Number.MIN_VALUE, 0.33, 0.66, 1 - Number.EPSILON];
      const rng = new PredeterminedRandomNumberGenerator(predeterminedRandomNumbers);
      const values = Object.freeze([
        "p46s4mknjp",
        "ey4bbmq2hf",
        "ch6n4kh3j7",
        "sxgw8g5xcf",
        "aq2wd394am",
      ]);
      const producedValues1: string[] = [];
      for (let i = 0; i < predeterminedRandomNumbers.length; i++) {
        producedValues1.push(getRandomElementFrom(values, rng));
      }
      const producedValues2: string[] = [];
      for (let i = 0; i < predeterminedRandomNumbers.length; i++) {
        producedValues2.push(getRandomElementFrom(values, rng));
      }
      expect(producedValues1).to.deep.equal(producedValues2);
      expect(producedValues1.length, "producedValues1.length").to.be.greaterThan(0);
    });
  });

  describe("getRandomIndexOf() [c5fb9twr4k]", () => {
    it("should throw on empty array", () => {
      const block = () => getRandomIndexOf([], new ThrowingRandomNumberGenerator());
      expect(block).to.throw(/\bggr47yr5be\b/g);
      expect(block).to.throw(/\bempty\b/gi);
    });

    it("should return 0, the only valid index, for a 1-element array", () => {
      expect(getRandomIndexOf([42], rng)).to.equal(0);
    });

    it("should return element corresponding to the generated random numbers", () => {
      const predeterminedRandomNumbers = [Number.MIN_VALUE, 0.33, 0.66, 1 - Number.EPSILON];
      const rng = new PredeterminedRandomNumberGenerator(predeterminedRandomNumbers);
      const values = Object.freeze([
        "p46s4mknjp",
        "ey4bbmq2hf",
        "ch6n4kh3j7",
        "sxgw8g5xcf",
        "aq2wd394am",
      ]);
      const producedValues1: string[] = [];
      for (let i = 0; i < predeterminedRandomNumbers.length; i++) {
        producedValues1.push(getRandomElementFrom(values, rng));
      }
      const producedValues2: string[] = [];
      for (let i = 0; i < predeterminedRandomNumbers.length; i++) {
        producedValues2.push(getRandomElementFrom(values, rng));
      }
      expect(producedValues1).to.deep.equal(producedValues2);
      expect(producedValues1.length, "producedValues1.length").to.be.greaterThan(0);
    });
  });

  describe("MathRandomRandomNumberGenerator [e97m65kccg]", () => {
    it("should generate numbers", () => {
      const rng = new MathRandomRandomNumberGenerator();
      for (let i = 0; i < 100; i++) {
        expect(rng.next(), `i=${i}`).to.be.a("number");
      }
    });
  });

  describe("AleaRandomNumberGenerator [f7mc2m6brj]", () => {
    it("constructor(Alea)) should generate numbers from the given Alea", () => {
      const seed = Math.random();
      const expectedNumbers: number[] = [];
      {
        const alea = new Alea(seed);
        for (let i = 0; i < 100; i++) {
          expectedNumbers.push(alea.next());
        }
      }

      const rng = new AleaRandomNumberGenerator(new Alea(seed));
      const actualNumbers: number[] = [];
      for (let i = 0; i < 100; i++) {
        actualNumbers.push(rng.next());
      }

      expect(actualNumbers, `seed=${seed}`).to.deep.equal(expectedNumbers);
    });

    it("constructor with no arguments should encapsulate a newly-created Alea instance", () => {
      const rng1 = new AleaRandomNumberGenerator();
      const rng2 = new AleaRandomNumberGenerator();
      const rng3 = new AleaRandomNumberGenerator();
      if (rng1.alea.seed === rng2.alea.seed && rng2.alea.seed === rng3.alea.seed) {
        expect.fail(
          "All AleaRandomNumberGenerator instances used the same seed, " +
            `and they should each have randomly-generated seeds (seed=${rng1.alea.seed})`,
        );
      }
    });

    it("constructor with no arguments should generate numbers from the encapsulated Alea instance", () => {
      const rng = new AleaRandomNumberGenerator();

      const alea = new Alea(rng.alea.seed);
      const expectedNumbers: number[] = [];
      for (let i = 0; i < 10; i++) {
        expectedNumbers.push(alea.next());
      }

      const actualNumbers: number[] = [];
      for (let i = 0; i < 10; i++) {
        actualNumbers.push(rng.next());
      }

      expect(actualNumbers, `seed=${alea.seed}`).to.deep.equal(expectedNumbers);
    });
  });
});
