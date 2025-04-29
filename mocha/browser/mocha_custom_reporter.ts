import { Runner } from "mocha";

class MochaCustomReporter {
  readonly #log: (...data: unknown[]) => unknown;

  constructor(runner: Mocha.Runner) {
    this.#log = console.log;

    runner.on(Runner.constants.EVENT_RUN_BEGIN, () => {
      this.#log("EVENT_RUN_BEGIN");
    });
    runner.on(Runner.constants.EVENT_RUN_END, () => {
      this.#log("EVENT_RUN_END");
    });
    runner.on(Runner.constants.EVENT_DELAY_BEGIN, () => {
      this.#log("EVENT_DELAY_BEGIN");
    });
    runner.on(Runner.constants.EVENT_DELAY_END, () => {
      this.#log("EVENT_DELAY_END");
    });
    runner.on(Runner.constants.EVENT_SUITE_BEGIN, (suite: Mocha.Suite) => {
      this.#log("EVENT_SUITE_BEGIN", suite.fullTitle());
    });
    runner.on(Runner.constants.EVENT_SUITE_END, (suite: Mocha.Suite) => {
      this.#log("EVENT_SUITE_END", suite.fullTitle());
    });
    runner.on(Runner.constants.EVENT_HOOK_BEGIN, (hook: Mocha.Hook) => {
      this.#log("EVENT_HOOK_BEGIN", hook.fullTitle());
    });
    runner.on(Runner.constants.EVENT_HOOK_END, (hook: Mocha.Hook) => {
      this.#log("EVENT_HOOK_END", hook.fullTitle());
    });
    runner.on(Runner.constants.EVENT_TEST_BEGIN, (test: Mocha.Test) => {
      this.#log("EVENT_TEST_BEGIN", test.fullTitle());
    });
    runner.on(Runner.constants.EVENT_TEST_END, (test: Mocha.Test) => {
      this.#log("EVENT_TEST_END", test.fullTitle());
    });
    runner.on(Runner.constants.EVENT_TEST_FAIL, (test: Mocha.Test, error: Error) => {
      this.#log("EVENT_TEST_FAIL", test, error);
    });
    runner.on(Runner.constants.EVENT_TEST_PASS, (test: Mocha.Test) => {
      this.#log("EVENT_TEST_PASS", test);
    });
    runner.on(Runner.constants.EVENT_TEST_PENDING, (test: Mocha.Test) => {
      this.#log("EVENT_TEST_PENDING", test);
    });
    runner.on(Runner.constants.EVENT_TEST_RETRY, (test: Mocha.Test, error: Error) => {
      this.#log("EVENT_TEST_RETRY", test, error);
    });
  }
}

export default MochaCustomReporter;
