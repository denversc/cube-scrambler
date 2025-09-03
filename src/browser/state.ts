import { isMove, type Move } from "../cube";

export interface State {
  lastScramble: Move[] | undefined;
}

const Keys = Object.freeze({
  lastScramble: "lastScramble",
} as const);

type Key = keyof typeof Keys;
type Value<K extends Key> = State[K];

interface ValueAsserter<T> {
  (value: unknown): value is T;
}

class StateImpl implements State {
  get lastScramble(): Move[] | undefined {
    return this.#values.lastScramble.load();
  }

  set lastScramble(value: Move[] | undefined) {
    this.#values.lastScramble.store(value);
  }

  readonly #values: Readonly<{ [K in Key]: StateValue<K, Value<K>> }>;

  constructor(storage: Storage | undefined) {
    this.#values = Object.freeze({
      lastScramble: new StateValue(storage, Keys.lastScramble, isMoveArray),
    });
  }
}

class StateValue<K extends Key, V extends Value<K>> {
  #cachedValue: undefined | V = undefined;
  readonly #key: K;
  readonly #storage: Storage | undefined;

  readonly #valueAsserter: ValueAsserter<V>;

  constructor(storage: Storage | undefined, key: K, valueAsserter: ValueAsserter<V>) {
    this.#storage = storage;
    this.#key = key;
    this.#valueAsserter = valueAsserter;
  }

  load(): undefined | V {
    const value = this.#loadJSON();
    if (value !== undefined && this.#valueAsserter(value)) {
      this.#cachedValue = value;
      return value;
    }
    return this.#cachedValue;
  }

  store(value: undefined | V): void {
    if (value === undefined) {
      this.#cachedValue = undefined;
      this.#storage?.removeItem(this.#key);
    } else {
      this.#cachedValue = value;
      this.#storeJSON(value);
    }
  }

  #loadJSON(): unknown {
    const value = this.#storage?.getItem(this.#key) ?? undefined;
    if (value === undefined) {
      return undefined;
    }
    try {
      return JSON.parse(value);
    } catch {
      return undefined;
    }
  }

  #storeJSON(value: unknown): void {
    this.#storage?.setItem(this.#key, JSON.stringify(value));
  }
}

function getStorage(): Storage | undefined {
  try {
    return globalThis.localStorage;
  } catch (error) {
    console.warn("WARNING: unable to retrieve local storage:", error, "[wrnp5drhjn]");
    return undefined;
  }
}

function isMoveArray(value: unknown): value is Move[] {
  return Array.isArray(value) && value.every(item => isMove(item));
}

export const state: State = new StateImpl(getStorage());
