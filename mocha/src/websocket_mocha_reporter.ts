import WebSocket from "ws";

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

type StateName = "new" | "closed" | "initialized" | "opening" | "opened";

interface BaseState {
  readonly name: StateName;
}

class NewState implements BaseState {
  readonly name: "new" = "new" as const;
  readonly enqueuedMessages: Array<unknown> = [];
}

class ClosedState implements BaseState {
  readonly name: "closed" = "closed" as const;
  constructor(readonly error: Error | null) {}
}

class InitializedState implements BaseState {
  readonly name: "initialized" = "initialized" as const;

  constructor(
    readonly url: string,
    readonly enqueuedMessages: Array<unknown>,
  ) {}
}

class OpeningState implements BaseState {
  readonly name: "opening" = "opening" as const;

  constructor(
    readonly socket: WebSocket,
    readonly enqueuedMessages: Array<unknown>,
  ) {}
}

class OpenedState implements BaseState {
  readonly name: "opened" = "opened" as const;
  constructor(readonly socket: WebSocket) {}
}

type State = NewState | ClosedState | InitializedState | OpeningState | OpenedState;

// noinspection JSUnusedGlobalSymbols
export class WebSocketMochaReporter {
  #state: State = new NewState();

  initialize(url: string): void {
    const newState = this.#assertState("new");
    this.#state = new InitializedState(url, newState.enqueuedMessages);
  }

  open(): void {
    const initializedState = this.#assertState("initialized");
    const socket = new WebSocket(initializedState.url);
    this.#state = new OpeningState(socket, initializedState.enqueuedMessages);

    socket.on("error", error => {
      socket.close();
      const oldState = this.#state;
      if (oldState.name !== "closed") {
        this.#state = new ClosedState(error);
      }
    });

    socket.on("close", () => {
      const oldState = this.#state;
      if (oldState.name !== "closed") {
        this.#state = new ClosedState(null);
      }
    });

    socket.on("open", () => {
      const oldState = this.#state;
      if (oldState.name === "opening") {
        for (const enqueuedMessage of oldState.enqueuedMessages) {
          socket.send(JSON.stringify(enqueuedMessage));
        }
        this.#state = new OpenedState(socket);
      }
    });
  }

  close(): void {
    const oldState = this.#state;
    if (oldState.name === "closed") {
      return;
    }

    if ("socket" in oldState) {
      oldState.socket.close();
    }

    this.#state = new ClosedState(null);
  }

  #assertState<T extends StateName>(stateName: T): State & { name: T } {
    if (this.#state.name !== stateName) {
      throw new Error(`WebSocketMochaReporter state is ${this.#state}, but expected ${stateName}`);
    }
    // @ts-expect-error I couldn't figure out how to make the TypeScript type system indicate the
    //  return type is the corresponding State object based solely on its name.
    return this.#state;
  }

  #send(...data: unknown[]): void {
    if ("enqueuedMessages" in this.#state) {
      this.#state.enqueuedMessages.push(data);
    } else if (this.#state.name === "opened") {
      this.#state.socket.send(data);
    } else {
      console.warn(`unable to send/enqueue message when state=${this.#state.name}:`, data);
    }
  }

  // noinspection JSUnusedGlobalSymbols
  constructor(runner: Mocha.Runner) {
    runner.on(EVENT_RUN_BEGIN, () => {
      this.#send("EVENT_RUN_BEGIN");
    });
    runner.on(EVENT_RUN_END, () => {
      this.#send("EVENT_RUN_END");
    });
    runner.on(EVENT_DELAY_BEGIN, () => {
      this.#send("EVENT_DELAY_BEGIN");
    });
    runner.on(EVENT_DELAY_END, () => {
      this.#send("EVENT_DELAY_END");
    });
    runner.on(EVENT_SUITE_BEGIN, (suite: Mocha.Suite) => {
      this.#send("EVENT_SUITE_BEGIN", suite.fullTitle());
    });
    runner.on(EVENT_SUITE_END, (suite: Mocha.Suite) => {
      this.#send("EVENT_SUITE_END", suite.fullTitle());
    });
    runner.on(EVENT_HOOK_BEGIN, (hook: Mocha.Hook) => {
      this.#send("EVENT_HOOK_BEGIN", hook.fullTitle());
    });
    runner.on(EVENT_HOOK_END, (hook: Mocha.Hook) => {
      this.#send("EVENT_HOOK_END", hook.fullTitle());
    });
    runner.on(EVENT_TEST_BEGIN, (test: Mocha.Test) => {
      this.#send("EVENT_TEST_BEGIN", test.fullTitle());
    });
    runner.on(EVENT_TEST_END, (test: Mocha.Test) => {
      this.#send("EVENT_TEST_END", test.fullTitle());
    });
    runner.on(EVENT_TEST_FAIL, (test: Mocha.Test, error: Error) => {
      this.#send("EVENT_TEST_FAIL", test, error);
    });
    runner.on(EVENT_TEST_PASS, (test: Mocha.Test) => {
      this.#send("EVENT_TEST_PASS", test);
    });
    runner.on(EVENT_TEST_PENDING, (test: Mocha.Test) => {
      this.#send("EVENT_TEST_PENDING", test);
    });
    runner.on(EVENT_TEST_RETRY, (test: Mocha.Test, error: Error) => {
      this.#send("EVENT_TEST_RETRY", test, error);
    });
  }
}
