import { expect } from "chai";
import type { Suite } from "mocha";

import { copyCube, Cube, CUBE_LENGTH, isCube, isEqualCube, moveR, solved } from "../src/cube";
import { getRandomElementFrom, getRandomIndexOf } from "../src/random";
import { nonArrayValues, randomColor, randomColorArray, randomCube } from "./cube.testing";
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

  describe("copyCube() [tfmp5ansyt]", () => {
    it("should return distinct objects", () => {
      for (let i = 0; i < 100; i++) {
        const cube = randomCube();
        const cubeCopy = copyCube(cube);
        expect(cubeCopy, `i=${i} seed=${seed.seed}`).to.not.equal(cube);
      }
    });

    it("should return equal objects", () => {
      for (let i = 0; i < 100; i++) {
        const cube = randomCube();
        const cubeCopy = copyCube(cube);
        expect(cubeCopy, `i=${i} seed=${seed.seed}`).to.deep.equal(cube);
      }
    });
  });

  describe("moveR() [b37f8k4pkn]", () => {
    it("should caused expected state on solved cube", () => {
      const cube = solved();

      moveR(cube);
      // prettier-ignore
      expect(cube, "after 1 move").to.deep.equal([
        "green", "green", "yellow", "green", GREEN, "yellow", "green", "green", "yellow",
        "orange", "orange", "orange", "orange", ORANGE, "orange", "orange", "orange", "orange",
        "blue", "blue", "white", "blue", BLUE, "white", "blue", "blue", "white",
        "red", "red", "red", "red", RED, "red", "red", "red", "red",
        "white", "white", "green", "white", "white", "green", "white", "white", "green",
        "yellow", "yellow", "blue", "yellow", YELLOW, "blue", "yellow", "yellow", "blue",
      ]);

      moveR(cube);
      // prettier-ignore
      expect(cube, "after 2 moves").to.deep.equal([
        "green", "green", "blue", "green", GREEN, "blue", "green", "green", "blue",
        "orange", "orange", "orange", "orange", ORANGE, "orange", "orange", "orange", "orange",
        "blue", "blue", "green", "blue", BLUE, "green", "blue", "blue", "green",
        "red", "red", "red", "red", RED, "red", "red", "red", "red",
        "white", "white", "yellow", "white", WHITE, "yellow", "white", "white", "yellow",
        "yellow", "yellow", "white", "yellow", YELLOW, "white", "yellow", "yellow", "white",
      ]);

      moveR(cube);
      // prettier-ignore
      expect(cube, "after 3 moves").to.deep.equal([
        "green", "green", "white", "green", GREEN, "white", "green", "green", "white",
        "orange", "orange", "orange", "orange", ORANGE, "orange", "orange", "orange", "orange",
        "blue", "blue", "yellow", "blue", BLUE, "yellow", "blue", "blue", "yellow",
        "red", "red", "red", "red", "red", RED, "red", "red", "red",
        "white", "white", "blue", "white", WHITE, "blue", "white", "white", "blue",
        "yellow", "yellow", "green", "yellow", YELLOW, "green", "yellow", "yellow", "green",
      ]);

      moveR(cube);
      expect(cube, "after 4 moves").to.deep.equal(solved());
    });

    it("should caused expected state on random cube 1", () => {
      // prettier-ignore
      const cube: Cube = [
        "red", "white", "blue", "white", GREEN, "red", "green", "blue", "red",
        "orange", "green", "blue", "orange", ORANGE, "red", "green", "blue", "white",
        "green", "blue", "red", "white", BLUE, "white", "blue", "blue", "orange",
        "blue", "white", "orange", "red", RED, "blue", "green", "green", "yellow",
        "yellow", "yellow", "yellow", "white", WHITE, "green", "white", "orange", "orange",
        "blue", "white", "blue", "red", YELLOW, "white", "yellow", "blue", "orange",
      ];
      const initialCube = copyCube(cube);

      moveR(cube);
      // prettier-ignore
      expect(cube, "after 1 move").to.deep.equal([
        "red", "white", "blue", "white", GREEN, "white", "green", "blue", "orange",
        "orange", "green", "blue", "orange", ORANGE, "red", "green", "blue", "white",
        "green", "blue", "yellow", "white", BLUE, "green", "blue", "blue", "orange",
        "green", "red", "blue", "green", RED, "white", "yellow", "blue", "orange",
        "yellow", "yellow", "blue", "white", WHITE, "red", "white", "orange", "red",
        "blue", "white", "red", "red", YELLOW, "white", "yellow", "blue", "orange",
      ]);

      moveR(cube);
      // prettier-ignore
      expect(cube, "after 2 moves").to.deep.equal([
        "red", "white", "red", "white", GREEN, "white", "green", "blue", "orange",
        "orange", "green", "blue", "orange", ORANGE, "red", "green", "blue", "white",
        "green", "blue", "blue", "white", BLUE, "red", "blue", "blue", "red",
        "yellow", "green", "green", "blue", RED, "red", "orange", "white", "blue",
        "yellow", "yellow", "blue", "white", WHITE, "white", "white", "orange", "orange",
        "blue", "white", "yellow", "red", YELLOW, "green", "yellow", "blue", "orange",
      ]);

      moveR(cube);
      // prettier-ignore
      expect(cube, "after 2 moves").to.deep.equal([
        "red", "white", "yellow", "white", GREEN, "green", "green", "blue", "orange",
        "orange", "green", "blue", "orange", ORANGE, "red", "green", "blue", "white",
        "green", "blue", "blue", "white", BLUE, "white", "blue", "blue", "orange",
        "orange", "blue", "yellow", "white", RED, "green", "blue", "red", "green",
        "yellow", "yellow", "red", "white", WHITE, "white", "white", "orange", "orange",
        "blue", "white", "blue", "red", YELLOW, "red", "yellow", "blue", "red",
      ]);

      moveR(cube);
      expect(cube, "after 4 moves").to.deep.equal(initialCube);
    });
  });
});

// These constants help improve readability for the immutable rows
const GREEN = "green";
const RED = "red";
const ORANGE = "orange";
const BLUE = "blue";
const WHITE = "white";
const YELLOW = "yellow";
