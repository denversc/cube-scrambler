const {
  EVENT_RUN_BEGIN,
  EVENT_RUN_END,
  EVENT_DELAY_BEGIN,
  EVENT_DELAY_END,
  EVENT_SUITE_BEGIN,
  EVENT_SUITE_END,
  EVENT_HOOK_BEGIN,
  EVENT_HOOK_END,
  EVENT_TEST_BEGIN,
  EVENT_TEST_END,
  EVENT_TEST_FAIL,
  EVENT_TEST_PASS,
  EVENT_TEST_PENDING,
  EVENT_TEST_RETRY,
} = Mocha.Runner.constants;

// noinspection JSUnusedGlobalSymbols
export class MochaCustomReporter {
  readonly #log: (...data: unknown[]) => unknown;

  // noinspection JSUnusedGlobalSymbols
  constructor(runner: Mocha.Runner) {
    this.#log = console.log;

    runner.on(EVENT_RUN_BEGIN, () => {
      this.#log("EVENT_RUN_BEGIN");
    });
    runner.on(EVENT_RUN_END, () => {
      this.#log("EVENT_RUN_END");
    });
    runner.on(EVENT_DELAY_BEGIN, () => {
      this.#log("EVENT_DELAY_BEGIN");
    });
    runner.on(EVENT_DELAY_END, () => {
      this.#log("EVENT_DELAY_END");
    });
    runner.on(EVENT_SUITE_BEGIN, (suite: Mocha.Suite) => {
      this.#log("EVENT_SUITE_BEGIN", suite.fullTitle());
    });
    runner.on(EVENT_SUITE_END, (suite: Mocha.Suite) => {
      this.#log("EVENT_SUITE_END", suite.fullTitle());
    });
    runner.on(EVENT_HOOK_BEGIN, (hook: Mocha.Hook) => {
      this.#log("EVENT_HOOK_BEGIN", hook.fullTitle());
    });
    runner.on(EVENT_HOOK_END, (hook: Mocha.Hook) => {
      this.#log("EVENT_HOOK_END", hook.fullTitle());
    });
    runner.on(EVENT_TEST_BEGIN, (test: Mocha.Test) => {
      this.#log("EVENT_TEST_BEGIN", test.fullTitle());
    });
    runner.on(EVENT_TEST_END, (test: Mocha.Test) => {
      this.#log("EVENT_TEST_END", test.fullTitle());
    });
    runner.on(EVENT_TEST_FAIL, (test: Mocha.Test, error: Error) => {
      this.#log("EVENT_TEST_FAIL", test, error);
    });
    runner.on(EVENT_TEST_PASS, (test: Mocha.Test) => {
      this.#log("EVENT_TEST_PASS", test);
    });
    runner.on(EVENT_TEST_PENDING, (test: Mocha.Test) => {
      this.#log("EVENT_TEST_PENDING", test);
    });
    runner.on(EVENT_TEST_RETRY, (test: Mocha.Test, error: Error) => {
      this.#log("EVENT_TEST_RETRY", test, error);
    });
  }
}
