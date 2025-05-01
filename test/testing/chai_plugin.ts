declare global {
  namespace Chai {
    interface Assertion {
      /**
       * Asserts that an object conforms to the "iterable protocol".
       * See https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Iteration_protocols#the_iterable_protocol
       */
      iterable: Assertion;

      /**
       * Asserts that an iterable object contains distinct elements.
       * Elements are compared for equality using the "Same-value-zero equality" method.
       * See https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Equality_comparisons_and_sameness#same-value-zero_equality
       */
      distinct: Assertion;
    }
  }
}

const registrations = new WeakSet<Chai.ChaiStatic>();

function isIterable(obj: unknown): obj is Iterable<unknown> {
  return typeof obj === "object" && obj !== null && Symbol.iterator in obj;
}

type ElementCountPair = { element: unknown; count: number };

function makeDuplicateElementsStr(counts: ElementCountPair[]): string {
  const chunks: string[] = [];
  for (const { element, count } of counts) {
    chunks.push(`${element} (${count})`);
  }
  return chunks.join(", ");
}

function distinctChaiProperty(this: Chai.AssertionStatic): void {
  const iterable = this._obj;
  if (!isIterable(iterable)) {
    throw new Error(`expected ${iterable} to be iterable, but it was not [ez848re496]`);
  }

  const countByElement = new Map<unknown, number>();
  for (const element of iterable) {
    const oldCount = countByElement.get(element) ?? 0;
    countByElement.set(element, oldCount + 1);
  }

  const duplicateElements: ElementCountPair[] = [];
  for (const [element, count] of countByElement) {
    if (count !== 1) {
      duplicateElements.push({ element, count });
    }
  }

  this.assert(
    duplicateElements.length === 0,
    `expected #{this} to contain distinct elements, but got ${duplicateElements.length} ` +
      `repeated elements: ${makeDuplicateElementsStr(duplicateElements)} [z3g86b6p8m]`,
    `expected #{this} to contain at least one non-distinct element, ` +
      `but all elements were distinct [k4gtkwhx59]`,
    [],
    duplicateElements,
  );
}

function iterableChaiProperty(this: Chai.AssertionStatic): void {
  this.assert(
    isIterable(this._obj),
    "expected #{this} to be iterable [jjwm5nyw9e]",
    "expected #{this} to not be iterable [m74rqbjek3]",
    undefined,
  );
}

function chaiPlugin(chai: Chai.ChaiStatic, util: Chai.ChaiUtils): void {
  if (registrations.has(chai)) {
    return;
  }
  registrations.add(chai);

  util.addProperty(chai.Assertion.prototype, "iterable", iterableChaiProperty);
  util.addProperty(chai.Assertion.prototype, "distinct", distinctChaiProperty);
}

export default chaiPlugin;
