import path from "node:path";

import express from "express";
import signale from "signale";

async function main(): Promise<void> {
  const host = "127.0.0.1";
  const serveDir = path.normalize(path.join(__dirname, "..", "build", "mocha"));
  signale.note(`Starting HTTP server for directory: ${serveDir}`);

  const app = express();
  app.use(express.static(serveDir));

  const startPromise = new DeferredPromise<unknown>();
  const httpServer = app.listen(0, host, error => {
    if (error) {
      startPromise.reject(error);
    } else {
      startPromise.resolve(null);
    }
  });

  await startPromise.promise;

  const address = httpServer.address();
  if (!address) {
    throw new Error("httpServer.address() returned null [cz3vg7ttta]");
  } else if (typeof address === "string") {
    throw new Error(`httpServer.address() returned a string: ${address} [b4kna3r9xj]`);
  }
  const port = address.port;

  signale.note(`HTTP server started at: http://${host}:${port}/`);

  // Wait forever; user will need to cancel with CTRL+C.
  await new Promise(() => {});
}

class DeferredPromise<T> {
  readonly promise: Promise<T>;

  // @ts-expect-error will, in reality, be initialized synchronously in the constructor;
  resolve: (result: T) => unknown;
  // @ts-expect-error will, in reality, be initialized synchronously in the constructor;
  reject: (error: unknown) => unknown;

  constructor() {
    this.promise = new Promise((resolve, reject) => {
      this.resolve = resolve;
      this.reject = reject;
    });
  }
}

main();
