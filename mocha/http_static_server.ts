import { EventEmitter } from "node:events";
import http from "node:http";

import express from "express";

/**
 * An HTTP server that serves the contents of a directory on the local file
 * system.
 *
 * The implementation uses the HTTP server from express.js
 * (https://expressjs.com/).
 *
 * After creating an instance of this class, call `start()` to actually start
 * the HTTP server. The HTTP server can be stopped at any time by calling
 * `close()`. If the TCP port specified to the constructor is `0` (zero) then
 * a random port will be chosen, which can be retrieved from the promise
 * returned from `start()`. To simply block forever while the HTTP server is
 * running, call `awaitClose()`.
 */
export class HttpStaticServer {
  readonly #host: string;
  readonly #port: number;
  readonly #serveDirectory: string;

  #state = new HttpStaticServerState(new NewState());

  /**
   * Creates a new instance of this class with the given configuration.
   */
  constructor(config: HttpStaticServerConfig) {
    this.#host = config.host;
    this.#port = config.port;
    this.#serveDirectory = config.serveDirectory;
  }

  /**
   * Starts the HTTP server.
   *
   * This method may only be called on a new instance of this class and can
   * be called at most once. Calling this method more than once or calling it
   * on an instance whose `close()` method has been invoked will result in an
   * exception being thrown synchronously.
   *
   * If an error occurs it will be reported both by the returned promise AND
   * by the promise returned from `awaitClose()`.
   *
   * @return a promise that resolves when the HTTP server has been successfully
   * started, or is rejected if starting the HTTP server fails for some reason,
   * such as if the requested TCP port is already in use.
   */
  start(): Promise<HttpStaticServerStartResult> {
    if (this.#state.get().name !== "new") {
      throw new Error(
        "start() or close() has already been called, " +
          "and start() is only allowed to be called once and must be called " +
          "before close()",
      );
    }

    const app = express();
    app.use(express.static(this.#serveDirectory));

    return new Promise((resolve, reject) => {
      const httpServer = app.listen(this.#port, this.#host, error => {
        if (error) {
          reject(error);
          this.#close(error);
        } else {
          const port = tcpPortFromHttpServer(httpServer);
          resolve({ port });
        }
      });

      httpServer.once("error", error => {
        reject(error);
        this.#close(error);
      });

      this.#state.set(new OpenedState(httpServer));
    });
  }

  /**
   * Returns a promise that resolves when this object is closed, or is rejected
   * when the HTTP server errors permanently. If neither `start()` nor `close()`
   * is called on this object then the returned promise will never resolve or
   * be rejected.
   */
  async awaitClose(): Promise<void> {
    const closedState = await this.#state.awaitState("closed");
    if (closedState.error) {
      return Promise.reject(closedState.error);
    }
  }

  /**
   * Closes this object, stopping the HTTP server if it has been started.
   *
   * If this object is already closed, either due to an explicit call to
   * `close()` or the HTTP server experiencing a permanent error, then this
   * method does nothing.
   *
   * This method does _not_ throw an exception in any case, even if the HTTP
   * server experienced a permanent error. To get an exception in such a case,
   * call `awaitClose()`.
   */
  close(): void {
    this.#close(null);
  }

  #close(newError: Error | null): void {
    const currentState = this.#state.get();
    if ("httpServer" in currentState) {
      currentState.httpServer.close();
    }

    const error = "error" in currentState && currentState.error ? currentState.error : newError;

    this.#state.set(new ClosedState(error));
  }
}

/**
 * The configuration settings for `HttpStaticServer` objects.
 */
export interface HttpStaticServerConfig {
  /** The interface to which the HTTP server will bind (e.g. "127.0.0.1"). */
  host: string;

  /**
   * The number of the TCP port on which the HTTP server will listen; a value of
   * `0` (zero) will cause the HTTP server to select a random available port.
   * The port assigned can be retrieved from the promise returned from the
   * `start()` method.
   */
  port: number;

  /**
   * The path of the directory in the local filesystem whose files to serve from
   * the HTTP server.
   */
  serveDirectory: string;
}

/**
 * The information about a successful call to `start()` on a `HttpStaticServer`
 * object.
 */
export interface HttpStaticServerStartResult {
  /**
   * The number of the TCP port to which the HTTP server is listening.
   * This is especially useful if the `HttpStaticServer` was initialized with
   * a `0` (zero) value for `port`, which causes the HTTP server to choose a
   * random port.
   */
  port: number;
}

type StateName = "new" | "opened" | "closed";

class BaseState<T extends StateName> {
  constructor(readonly name: T) {}
}

class NewState extends BaseState<"new"> {
  constructor() {
    super("new");
  }
}

class OpenedState extends BaseState<"opened"> {
  constructor(readonly httpServer: http.Server) {
    super("opened");
  }
}

class ClosedState extends BaseState<"closed"> {
  constructor(readonly error: Error | null) {
    super("closed");
  }
}

type State = NewState | OpenedState | ClosedState;

interface Events {
  stateChange: [State];
}

class HttpStaticServerState {
  #state: State;
  #events = new EventEmitter<Events>();

  constructor(initialState: State) {
    this.#state = initialState;
  }

  get(): State {
    return this.#state;
  }

  set(newState: State): void {
    this.#state = newState;
    this.#events.emit("stateChange", newState);
  }

  awaitState<T extends StateName>(stateName: T): Promise<BaseState<T> & State> {
    return new Promise(resolve => {
      const listenerCallback = (state: State): void => {
        if (state.name === stateName) {
          resolve(state as unknown as BaseState<T> & State);
          this.#events.removeListener("stateChange", listenerCallback);
        }
      };
      this.#events.addListener("stateChange", listenerCallback);
      listenerCallback(this.#state);
    });
  }
}

function tcpPortFromHttpServer(httpServer: http.Server): number {
  const address = httpServer.address();
  if (!address) {
    throw new Error("httpServer.address() returned null [cz3vg7ttta]");
  } else if (typeof address === "string") {
    throw new Error(`httpServer.address() returned a string: ${address} [b4kna3r9xj]`);
  }
  return address.port;
}
