import path from "node:path";

import dedent from "dedent";
import signale from "signale";

import { HttpStaticServer } from "./http_static_server";

async function main(): Promise<void> {
  let parsedArgs: ReturnType<typeof parseArgs>;
  try {
    parsedArgs = parseArgs(process.argv.slice(2));
  } catch (e: unknown) {
    if (e instanceof ParseArgsError) {
      console.error(`ERROR: ${__filename}: parsing command-line arguments failed:`);
      console.error(e.message);
      console.error("Run with --help for help");
      process.exit(2);
    }
    throw e;
  }

  if (parsedArgs === "help") {
    showHelp("general");
  } else if (parsedArgs === "help-advanced") {
    showHelp("advanced");
  } else {
    await runHttpServer(parsedArgs);
  }
}

async function runHttpServer(args: ParsedArgs): Promise<void> {
  const serveDirectory = path.normalize(path.resolve(args.serveDirectory));

  if (args.port === 0) {
    signale.note(
      `Starting HTTP server for directory ${serveDirectory} ` +
        `at http://${args.host}/ on a randomly-chosen port`,
    );
  } else {
    signale.note(
      `Starting HTTP server for directory ${serveDirectory} ` +
        `at http://${args.host}:${args.port}`,
    );
  }

  const server = new HttpStaticServer({
    host: args.host,
    port: args.port,
    serveDirectory,
  });

  const { port } = await server.start();
  signale.note(`HTTP server started at: http://${args.host}:${port}/`);

  if (args.exitImmediately) {
    server.close();
  } else {
    signale.note("Press CTRL+C to stop the HTTP server");
  }

  await server.awaitClose();

  signale.note(`HTTP server stopped at http://${args.host}:${port}/`);
}

interface ParsedArgs {
  host: string;
  port: number;
  serveDirectory: string;
  exitImmediately: boolean;
}

function defaultParsedArgs(): ParsedArgs {
  return {
    host: "127.0.0.1",
    port: 0,
    serveDirectory: ".",
    exitImmediately: false,
  };
}

function parseArgs(args: string[]): ParsedArgs | "help" | "help-advanced" {
  const parsedArgs = defaultParsedArgs();

  type LastArg = "--host" | "--port" | "--dir";
  const lastArgValues: LastArg[] = ["--host", "--port", "--dir"];
  function isLastArg(value: string): value is LastArg {
    return lastArgValues.includes(value as unknown as LastArg);
  }

  function portFromArgValue(value: string): number {
    const parsedPort = parseFloat(value);
    if (Number.isNaN(parsedPort)) {
      throw new ParseArgsError(`invalid port: ${value} (must be a number)`);
    } else if (!Number.isInteger(parsedPort)) {
      throw new ParseArgsError(`invalid port: ${value} (must be an integer)`);
    } else if (parsedPort < 0) {
      throw new ParseArgsError(`invalid port: ${value} (must be greater than or equal to 0)`);
    }
    return parsedPort;
  }

  let lastArg: LastArg | null = null;

  for (const arg of args) {
    if (lastArg === "--host") {
      parsedArgs.host = arg;
    } else if (lastArg === "--port") {
      parsedArgs.port = portFromArgValue(arg);
    } else if (lastArg === "--dir") {
      parsedArgs.serveDirectory = arg;
    } else if (lastArg !== null) {
      throw new Error(`internal error: unexpected lastArg: ${lastArg} [m5wx7yf5pq]`);
    }

    if (lastArg !== null) {
      lastArg = null;
      continue;
    }

    if (arg === "-h" || arg === "--help") {
      return "help";
    } else if (arg === "--help-advanced") {
      return "help-advanced";
    } else if (isLastArg(arg)) {
      lastArg = arg;
    } else if (arg == "--exit-immediately") {
      parsedArgs.exitImmediately = true;
    } else if (arg.startsWith("--host=")) {
      parsedArgs.host = arg.substring(7);
    } else if (arg.startsWith("--port=")) {
      parsedArgs.port = portFromArgValue(arg.substring(7));
    } else if (arg.startsWith("--dir=")) {
      parsedArgs.serveDirectory = arg.substring(6);
    } else {
      throw new ParseArgsError(`unknown argument: ${arg} [wn9md9zf6v]`);
    }
  }

  if (lastArg !== null) {
    throw new ParseArgsError(`expected argument after ${lastArg} [r2g6dy48yp]`);
  }

  return parsedArgs;
}

function showHelp(help: "general" | "advanced"): void {
  const defaults = defaultParsedArgs();

  if (help === "general") {
    console.log(dedent`
      Syntax: ${path.basename(__filename)} [options]
     
      Runs an HTTP server that serves the contents of a directory on the local
      file system.
     
      General Options:
     
      --host <host> / --host=<host>
        The interface to which the HTTP server should bind.
        Default: ${defaults.host}
     
      --port <port> / --port=<port>
        The TCP port number to which the HTTP server should listen.
        If 0 (zero) then a random TCP port will be chosen.
        Default: ${defaults.port}
     
      --dir <directory> / --dir=<directory>
        The directory on the local file system whose contents to serve.
        Default: ${defaults.serveDirectory}
     
      -h/--help
        Show this help information and exit successfully.
     
      --help-advanced
        Show advanced help for uncommon use cases and exit successfully.
  `);
  } else if (help === "advanced") {
    console.log(dedent`
      Advanced Options
      
      --exit-immediately
        Start the HTTP server and then shut it down and exit immediately.
        This is intended for self-testing purposes, to make sure that the logic
        to start the HTTP server does not throw any exceptions.
  `);
  } else {
    throw new Error(`internal error: unsupported help: ${help} [rk7rsknsvc]`);
  }
}

class ParseArgsError extends Error {
  override readonly name: "ParseArgsError" = "ParseArgsError" as const;
}

main();
