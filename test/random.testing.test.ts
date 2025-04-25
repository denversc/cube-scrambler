import { expect } from "chai";

import { initializeRng } from "./random.testing";

describe("random.testing.ts [rkp4trbyqe]", () => {
  describe("initializeRng() [fahrsqbfa2]", () => {
    it("should throw if already initialized", () => {
      const initResult = initializeRng();
      after(() => initResult.clear());
      expect(initializeRng).to.throw(/\btp4746tnr9\b/g);
      expect(initializeRng).to.throw(/\balready initialized\b/gi);
    });

    it("should generate a random seed if the 'seed' argument is not specified", () => {
      const seeds: number[] = [];
      for (let i = 0; i < 10; i++) {
        const initResult = initializeRng();
        seeds.push(initResult.seed);
        initResult.clear();
      }
      expect(seeds).to.di;
    });
  });
});
