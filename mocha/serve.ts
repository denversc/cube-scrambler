import path from "node:path";

import express from "express";
import signale from "signale";

async function main(): Promise<void> {
  const parsedArgs = parseArgs(process.argv.slice(2));
  const { host, port: portFromArgs, exitImmediately } = parsedArgs;

  const serveDir = path.normalize(path.join(__dirname, "..", "build", "mocha"));
  signale.note(`Starting HTTP server for directory: ${serveDir}`);

  const app = express();
  app.use(express.static(serveDir));

  const startPromise = new DeferredPromise<unknown>();
  const httpServer = app.listen(portFromArgs, host, error => {
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

  // Wait forever (unless exitImmediately=true); user will need to cancel with CTRL+C.
  await new Promise(resolve => {
    if (exitImmediately) {
      resolve(null);
    }
  });

  signale.note("Closing HTTP server...");
  await new Promise((resolve, reject) => {
    httpServer.close(error => {
      if (!error) {
        resolve(null);
      } else {
        reject(error);
      }
    });
  });
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

interface ParsedArgs {
  host: string;
  port: number;
  exitImmediately: boolean;
}

function parseArgs(args: string[]): ParsedArgs {
  const parsedArgs: ParsedArgs = {
    host: "127.0.0.1",
    port: 0,
    exitImmediately: false,
  };

  for (const arg of args) {
    if (arg == "--exit-immediately") {
      parsedArgs.exitImmediately = true;
    } else if (arg.startsWith("--host=")) {
      parsedArgs.host = arg.substring(7);
    } else if (arg.startsWith("--port=")) {
      parsedArgs.port = parseInt(arg.substring(7));
    } else {
      throw new Error(`unknown command-line argument: ${arg} [wn9md9zf6v]`);
    }
  }
  return parsedArgs;
}

main();
