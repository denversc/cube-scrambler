import path from "node:path";

import { execa } from "execa";
import signale from "signale";

export interface EsbuildOptions {
  ui: "html" | "console";
  startTrigger: "button" | "load";
  destDir: string;
}

export async function esbuild(options: EsbuildOptions): Promise<void> {
  const build_ts_path = path.normalize(path.join(__dirname, "..", "build.ts"));
  const cwd = path.normalize(path.join(__dirname, "..", ".."));

  const build_ts_args = ["ts-node", build_ts_path, `--destDir=${options.destDir}`];

  if (options.ui === "html") {
    build_ts_args.push("--html");
  } else if (options.ui === "console") {
    build_ts_args.push("--console");
  } else {
    throw new Error(`invalid value for options.ui: ${options.ui} [xw2sy3ncfn]`);
  }

  if (options.startTrigger === "button") {
    build_ts_args.push("--button");
  } else if (options.startTrigger === "load") {
    build_ts_args.push("--load");
  } else {
    throw new Error(`invalid value for options.startTrigger: ${options.startTrigger} [eqsabmhm4z]`);
  }

  signale.note(`Running command in ${cwd}: ${build_ts_args.join(" ")}`);
  await execa(build_ts_args[0]!, build_ts_args.slice(1), {
    preferLocal: true,
    stdin: "inherit",
    stdout: "inherit",
    stderr: "inherit",
    cwd,
  });
}
