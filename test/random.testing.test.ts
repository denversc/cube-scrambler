import { AleaRandomNumberGenerator } from "../src/random";
import { initializeRng, rng } from "./random.testing";
import { default as myChaiPlugin } from "./testing/chai_plugin";

const expect = chai.expect;

describe("random.testing.test.ts [rkp4trbyqe]", () => {
  before(() => {
    chai.use(myChaiPlugin);
  });

  describe("initializeRng() [fahrsqbfa2]", () => {
    it("should throw if already initialized", () => {
      const initResult = initializeRng();
      try {
        expect(initializeRng).to.throw(/\btp4746tnr9\b/g);
        expect(initializeRng).to.throw(/\balready initialized\b/gi);
      } finally {
        initResult.clear();
      }
    });

    it("rng should generate random values 'seed' argument is not specified", () => {
      const randomNumbers: number[] = [];
      const initResult = initializeRng();
      try {
        for (let i = 0; i < 10; i++) {
          randomNumbers.push(rng.next());
        }
      } finally {
        initResult.clear();
      }

      expect(randomNumbers).to.be.distinct;
    });

    it("should generate a random seed if the 'seed' argument is not specified", () => {
      const seeds: number[] = [];
      for (let i = 0; i < 10; i++) {
        const initResult = initializeRng();
        seeds.push(initResult.seed);
        initResult.clear();
      }
      expect(seeds).to.be.distinct;
    });

    it("should use the given 'seed' argument", () => {
      const seed = AleaRandomNumberGenerator.randomSeed();
      const expectedNumbers: number[] = [];
      {
        const alea = AleaRandomNumberGenerator.forSeed(seed);
        for (let i = 0; i < 10; i++) {
          expectedNumbers.push(alea.next());
        }
      }

      const actualNumbers: number[] = [];
      const initResult = initializeRng(seed);
      try {
        for (let i = 0; i < 10; i++) {
          actualNumbers.push(rng.next());
        }
      } finally {
        initResult.clear();
      }

      expect(actualNumbers, `seed=${seed}`).to.deep.equal(expectedNumbers);
    });
  });
});
