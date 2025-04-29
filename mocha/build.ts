import fs from "node:fs";
import path from "node:path";

import { execaSync } from "execa";
import { rimraf } from "rimraf";
import signale from "signale";

async function main(): Promise<void> {
  const destDir = path.normalize(path.join(__dirname, "..", "build", "mocha"));
  const nodeModulesDir = path.normalize(path.join(__dirname, "..", "node_modules"));

  signale.note(`Preparing mocha browser tests directory: ${destDir}`);
  await rimraf(destDir);
  fs.mkdirSync(destDir, { recursive: true });

  copyFile(path.join(__dirname, "index.html"), path.join(destDir, "index.html"));
  copyFile(path.join(nodeModulesDir, "mocha", "mocha.css"), path.join(destDir, "mocha.css"));
  copyFile(path.join(nodeModulesDir, "mocha", "mocha.js"), path.join(destDir, "mocha.js"));

  runEsbuild(
    "--bundle",
    "test/**/*.test.ts",
    "--outdir=build/mocha",
    "--sourcemap",
    "--platform=browser",
    "--format=iife",
    "--external:mocha",
  );

  runEsbuild(
    "--bundle",
    "mocha/browser/mocha_custom_reporter.ts",
    "--outdir=build/mocha",
    "--sourcemap",
    "--platform=browser",
    "--format=iife",
    "--global-name=mocha_custom_reporter_s2he8g3fbt",
  );
}

function copyFile(srcPath: string, destPath: string): void {
  signale.note(`Copying ${srcPath} to ${destPath}`);
  fs.copyFileSync(srcPath, destPath);
}

function runEsbuild(...args: string[]): void {
  const cwd = path.normalize(path.join(__dirname, ".."));
  const commandRunner = execaSync({
    preferLocal: true,
    stdin: "inherit",
    stdout: "inherit",
    stderr: "inherit",
    cwd,
  });

  const allArgs = ["esbuild", ...args];
  signale.note(`Running command: ${allArgs.join(" ")}`);
  commandRunner("esbuild", args);
}

main();
