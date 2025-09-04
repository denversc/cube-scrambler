import { inspect } from "#platform";
import { describe, expect, test } from "vitest";

import { arraysContainSameElementsInAnyOrder } from "../../src/util/arrays";
import { Random } from "../testing/random";

describe("arraysContainSameElementsInAnyOrder [anfxm35xkf]", () => {
  const exampleArrays: Array<Array<unknown>> = [
    [],
    [0],
    [0, 1],
    [Symbol()],
    [0n],
    [Number.NaN],
    [Number.POSITIVE_INFINITY],
    [Number.NEGATIVE_INFINITY],
    [true],
    [false],
    [undefined],
    [null],
    ["a string"],
    ["a", "b"],
    [0, 1, 2],
    ["c", "d"],
    ["a", "a", "a"],
    ["a", "a"],
    ["a"],
  ];

  test("empty arrays [erjztbz2xq]", () => {
    expect(arraysContainSameElementsInAnyOrder([], [])).toBe(true);
  });

  test("unequal arrays [jcm4n9seh7]", () => {
    for (let index1 = 0; index1 < exampleArrays.length; index1++) {
      for (let index2 = 0; index2 < exampleArrays.length; index2++) {
        if (index1 === index2) {
          continue;
        }
        const array1 = exampleArrays[index1]!;
        const array2 = exampleArrays[index2]!;
        const failMessage = `array1=${inspect(array1)}, array2=${inspect(array2)})`;
        expect(arraysContainSameElementsInAnyOrder(array1, array2), failMessage).toBe(false);
      }
    }
  });

  test("same arrays [y2eza2wy33]", () => {
    for (const array of exampleArrays) {
      const failMessage = `array1=${inspect(array)}, array2=<same object as array1>)`;
      expect(arraysContainSameElementsInAnyOrder(array, array), failMessage).toBe(true);
    }
  });

  test("arrays with same elements in same order [txpny5n4y4]", () => {
    for (const array1 of exampleArrays) {
      const array2 = [...array1];
      const failMessage = `array1=${inspect(array1)}, array2=${inspect(array2)})`;
      expect(arraysContainSameElementsInAnyOrder(array1, array2), failMessage).toBe(true);
    }
  });

  test("arrays with same elements in different order [em3bhqqjsg]", () => {
    const random = new Random();
    const array = Object.freeze([...exampleArrays.flat(), ...exampleArrays.flat()]);
    expect(array.length).toBeGreaterThan(20); // precondition check

    let iterationsRemaining = 100;
    while (iterationsRemaining > 0) {
      iterationsRemaining--;

      const array2 = [...array];

      let elementSwapsRemaining = Math.floor(Math.random() * 20) + 1;
      while (elementSwapsRemaining > 0) {
        elementSwapsRemaining--;
        const swapIndex1 = random.intBetweenZeroAnd(array2.length);
        const swapIndex2 = random.intBetweenZeroAnd(array2.length);
        const swapIndex1Value = array2[swapIndex1];
        array2[swapIndex1] = array2[swapIndex2];
        array2[swapIndex2] = swapIndex1Value;
      }

      const failMessage =
        `array1=${inspect(array)}, array2=${inspect(array2)}, ` +
        `iterationsRemaining=${iterationsRemaining}, random.seed=${random.seed}`;
      expect(arraysContainSameElementsInAnyOrder(array, array2), failMessage).toBe(true);
    }
  });
});
