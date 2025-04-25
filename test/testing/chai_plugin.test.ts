import * as chai from "chai";
import { expect } from "chai";
import { type TestFunction } from "mocha";

import { default as myChaiPlugin } from "./chai_plugin";

describe("chai_plugin.ts [tvefkfakz2]", () => {
  before(() => {
    chai.use(myChaiPlugin);
  });

  describe("iterable [v2ztqjq5q2]", () => {
    registerIterableVariousTypesTests(it);

    it("positive failure message", () => {
      const block = () => expect("xb4zcdghyq").to.be.iterable;
      expect(block).to.throw(/\bxb4zcdghyq\b/g);
      expect(block).to.throw(/\bjjwm5nyw9e\b/g);
      expect(block).to.throw(/\bto be iterable\b/gi);
    });

    it("negative failure message", () => {
      const value = ["evqy2wp37x"];
      const block = () => expect(value).to.not.be.iterable;
      expect(block).to.throw(/\bevqy2wp37x\b/g);
      expect(block).to.throw(/\bm74rqbjek3\b/g);
      expect(block).to.throw(/\bto not be iterable\b/gi);
    });
  });

  describe("distinct [pzan43h4pv]", () => {
    it("empty list should be distinct", () => {
      expect([]).to.be.distinct;
    });

    it("list of length 1 should be distinct", () => {
      expect([42]).to.be.distinct;
    });

    it("list with distinct strings should be distinct", () => {
      expect(["a", "b", "c"]).to.be.distinct;
    });

    it("list with distinct numbers should be distinct", () => {
      expect([1, 2, 3]).to.be.distinct;
    });

    it("list with both +0 and -0 should not be distinct", () => {
      expect([0, -0]).to.not.be.distinct;
    });

    it("list with multiple NaNs should not be distinct", () => {
      expect([Number.NaN, Number.NaN]).to.not.be.distinct;
    });

    it("list with 0 and '0' should be distinct", () => {
      // @ts-expect-error suppress spurious TS2367: This comparison appears to be unintentional...
      expect(0 == "0").to.be.true; // verify the assumption that 0 and "0" compare equal using ==
      expect([0, "0"]).to.be.distinct;
    });

    it("positive failure message", () => {
      const values = [undefined, undefined, "a", 42, "a", 42, "a", null, undefined, undefined];
      const block = () => expect(values).to.be.distinct;
      expect(block).to.throw(/\bz3g86b6p8m\b/g);
      expect(block).to.throw(/\bgot 3 repeated elements\b/g);
      expect(block).to.throw(/\bcontain distinct elements\b/gi);
      expect(block).to.throw(/\ba\b\s+\(3\)/g);
      expect(block).to.throw(/\b42\b\s+\(2\)/g);
      expect(block).to.throw(/\bundefined\b\s+\(4\)/g);
    });

    it("negative failure message", () => {
      const values = [1, 2, 3, 4];
      const block = () => expect(values).to.not.be.distinct;
      expect(block).to.throw(/\bk4gtkwhx59\b/g);
      expect(block).to.throw(/\ball elements were distinct\b/gi);
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
        expect(testCase.value).is.iterable;
      });
    } else {
      it(`expect(${testCase.name}).is.not.iterable [${testCase.id}]`, () => {
        expect(testCase.value).is.not.iterable;
      });
    }
  }
}
