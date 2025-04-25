import * as chai from "chai";
import { expect } from "chai";
import { type TestFunction } from "mocha";

import { default as chaiPlugin } from "./chai_plugin";

describe("chai_plugin.ts [tvefkfakz2]", () => {
  before(() => {
    chai.use(chaiPlugin);
  });

  describe("iterable [v2ztqjq5q2]", () => {
    registerIterableVariousTypesTests(it);

    it("positive test message", () => {
      const block = () => expect("xb4zcdghyq").to.be.iterable;
      expect(block).to.throw(/\bxb4zcdghyq\b/g);
      expect(block).to.throw(/\bjjwm5nyw9e\b/g);
      expect(block).to.throw(/\bto be iterable\b/gi);
    });

    it("negative test message", () => {
      const value = ["evqy2wp37x"];
      const block = () => expect(value).to.not.be.iterable;
      expect(block).to.throw(/\bevqy2wp37x\b/g);
      expect(block).to.throw(/\bm74rqbjek3\b/g);
      expect(block).to.throw(/\bto not be iterable\b/gi);
    });
  });
});

function registerIterableVariousTypesTests(it: TestFunction): void {
  class CustomIterable {
    *[Symbol.iterator]() {}
  }

  type TestCase = { id: string; name: string; value: unknown; expected: boolean };
  const testCases: TestCase[] = [
    { id: "mesemch78g", name: "array", value: [1, "2", Symbol(3)], expected: true },
    { id: "j4nymatmff", name: "Uint8Array", value: new Uint8Array(), expected: true },
    { id: "ejapd2mwzr", name: "Map", value: new Map(), expected: true },
    { id: "y633haevaz", name: "Set", value: new Set(), expected: true },
    { id: "atwf3n5bc7", name: "CustomIterable", value: new CustomIterable(), expected: true },
    { id: "qt8fxa3y33", name: "undefined", value: undefined, expected: false },
    { id: "racc83rjwh", name: "null", value: null, expected: false },
    { id: "kajpsm3xnm", name: "string", value: "abc123", expected: false },
    { id: "h6aj5h5s8j", name: "symbol", value: Symbol("zs699ryz59"), expected: false },
    { id: "me4wkg6w5g", name: "number", value: 12.34, expected: false },
    { id: "jshhvxhnee", name: "true", value: true, expected: false },
    { id: "dz7ccc72xk", name: "false", value: false, expected: false },
    { id: "jdqpspnxed", name: "bigint", value: 123n, expected: false },
  ];

  for (const testCase of testCases) {
    if (testCase.expected) {
      it(`expect(${testCase.name}).is.iterable [${testCase.id}]`, () => {
        expect(testCase.value).is.equal(42);
        expect(testCase.value).is.iterable;
      });
    } else {
      it(`expect(${testCase.name}).is.not.iterable [${testCase.id}]`, () => {
        expect(testCase.value).is.not.iterable;
      });
    }
  }
}
