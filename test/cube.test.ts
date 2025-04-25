import { expect } from "chai";
import type { Suite } from "mocha";

import { copyCube,CUBE_LENGTH, isCube, isEqualCube, solved } from "../src/cube";
import { getRandomElementFrom, getRandomIndexOf } from "../src/random";
import { nonArrayValues, randomColor, randomColorArray,randomCube } from "./cube.testing";
import { initializeRngForEachTest, rng } from "./random.testing";

describe("cube.test.ts [g7em876hy4]", function (this: Suite) {
  const seed = initializeRngForEachTest(this);

  it("CUBE_LENGTH [qz9pw7j27t]", () => {
    expect(CUBE_LENGTH).to.equal(solved().length);
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
      const cube = randomColorArray(CUBE_LENGTH);
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

      for (let i = 0; i < 100; i++) {
        if (i == CUBE_LENGTH) {
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
      expect(actualResults, `seed=${seed.seed}`).to.deep.equal(expectedResults);
    });
  });

  describe("isEqualCube() [nrwqww5n3j]", () => {
    it("should return true for two solved cubes", () => {
      const cube1 = solved();
      const cube2 = solved();
      expect(isEqualCube(cube1, cube2), `cube1=${cube1} cube2=${cube2}`).to.equal(true);
    });

    it("should return true for two identical unsolved cubes", () => {
      for (let i = 0; i < 100; i++) {
        const cube1 = randomCube();
        const cube2 = copyCube(cube1);
        expect(cube1).is.not.equal(cube2); // confirm that copyCube() returns a distinct object
        const message = `i=${i} seed=${seed.seed} cube1=${cube1} cube2=${cube2}`;
        expect(isEqualCube(cube1, cube2), message).to.equal(true);
      }
    });

    it("should return false if one element differs", () => {
      for (let i = 0; i < 100; i++) {
        const cube1 = randomCube();
        const cube2 = copyCube(cube1);

        const indexToChange = getRandomIndexOf(cube2, rng);
        const oldValueAtIndexToChange = cube2[indexToChange];
        while (true) {
          const newValueAtIndexToChange = randomColor();
          if (newValueAtIndexToChange !== oldValueAtIndexToChange) {
            cube2[indexToChange] = newValueAtIndexToChange;
            break;
          }
        }

        const message = `i=${i} seed=${seed.seed} cube1=${cube1} cube2=${cube2}`;
        expect(isEqualCube(cube1, cube2), message).to.equal(false);
      }
    });
  });
});
