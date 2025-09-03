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

class StateValue<K extends Key, V extends Value<K>> {
  readonly #storage: Storage | undefined;
  readonly #key: K;
  readonly #valueAsserter: ValueAsserter<V>;

  #cachedValue: V | undefined = undefined;

  constructor(storage: Storage | undefined, key: K, valueAsserter: ValueAsserter<V>) {
    this.#storage = storage;
    this.#key = key;
    this.#valueAsserter = valueAsserter;
  }

  load(): V | undefined {
    const value = this.#loadJSON();
    if (value !== undefined && this.#valueAsserter(value)) {
      this.#cachedValue = value;
      return value;
    }
    return this.#cachedValue;
  }

  store(value: V | undefined): void {
    if (value === undefined) {
      this.#cachedValue = undefined;
      this.#storage?.removeItem(this.#key);
    } else {
      this.#cachedValue = value;
      this.#storeJSON(value);
    }
  }

  #storeJSON(value: unknown): void {
    this.#storage?.setItem(this.#key, JSON.stringify(value));
  }

  #loadJSON(): unknown | undefined {
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
}

class StateImpl implements State {
  get lastScramble(): Move[] | undefined {
    return this.#values.lastScramble.load();
  }

  set lastScramble(newValue: Move[] | undefined) {
    this.#values.lastScramble.store(newValue);
  }

  readonly #values: Readonly<{ [K in Key]: StateValue<K, Value<K>> }>;

  constructor(storage: Storage | undefined) {
    this.#values = Object.freeze({
      lastScramble: new StateValue(storage, Keys.lastScramble, isMoveArray),
    });
  }
}

function getStorage(): Storage | undefined {
  try {
    return globalThis.localStorage ?? undefined;
  } catch (error) {
    console.warn("WARNING: unable to retrieve local storage:", error, "[wrnp5drhjn]");
    return undefined;
  }
}

function isMoveArray(value: unknown): value is Move[] {
  return Array.isArray(value) && value.every(isMove);
}

export const state: State = new StateImpl(getStorage());
