import { expect } from "chai";

import { randomColor, rng, randomColorArray, nonArrayValues } from "./cube.testing";
import { isCube, solved } from "../src/cube";
import { AleaRandomNumberGenerator, getRandomElementFrom } from "../src/random";
import { beforeEach } from "mocha";

describe("cube.ts [g7em876hy4]", () => {

  beforeEach(() => {
    const newRng = new AleaRandomNumberGenerator();
    rng = newRng;
  });

  describe("isCube() [pvbdrgebe8]", () => {
    it("should return true on a solved cube", () => {
      const cube = solved();
      expect(isCube(cube), `cube=${cube}`).to.equal(true);
    });

    it("should return true on a scrambled cube", () => {
      const cube = solved();
      for (let i = 0; i < cube.length; i++) {
        cube[i] = randomColor();
      }
      expect(isCube(cube), `cube=${cube}`).to.equal(true);
    });

    it("should return true on a manually-created array of colors with the correct length", () => {
      const cubeLength = solved().length;
      const cube = randomColorArray(cubeLength);
      expect(isCube(cube), `cube=${cube}`).to.equal(true);
    });

    it("should return false for non-arrays", () => {
      type Result = { value: unknown; returnValue: boolean };
      const actualResults: Array<Result> = [];
      const expectedResults: Array<Result> = [];
      for (const value of nonArrayValues()) {
        actualResults.push({ value, returnValue: isCube(value) });
        expectedResults.push({ value, returnValue: false });
      }
      expect(actualResults).to.deep.equal(expectedResults);
    });

    it("should return false for arrays of an incorrect length", () => {
      type Result = { value: unknown; returnValue: boolean };
      const actualResults: Array<Result> = [];
      const expectedResults: Array<Result> = [];
      const cubeLength = solved().length;

      expect(cubeLength, "cubeLength").is.lessThan(100);
      for (let i = 0; i < 100; i++) {
        if (i == cubeLength) {
          continue;
        }
        const value = Object.freeze(randomColorArray(i));
        actualResults.push({ value, returnValue: isCube(value) });
        expectedResults.push({ value, returnValue: false });
      }
      expect(actualResults).to.deep.equal(expectedResults);
    });

    it("should return false for arrays containing non-color values", () => {
      type Result = { value: unknown[]; returnValue: boolean };
      const actualResults: Array<Result> = [];
      const expectedResults: Array<Result> = [];

      for (let i = 0; i < 100; i++) {
        const value: unknown[] = solved();
        const index = Math.floor(rng.next() * value.length);
        value[index] = getRandomElementFrom(nonArrayValues(), rng);
        actualResults.push({ value, returnValue: isCube(value) });
        expectedResults.push({ value, returnValue: false });
      }
      expect(actualResults).to.deep.equal(expectedResults);
    });
  });
});
