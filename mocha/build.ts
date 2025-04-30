import fs from "node:fs/promises";
import path from "node:path";

import fsExtra from "fs-extra";
import { rimraf } from "rimraf";
import signale from "signale";

function main(): Promise<void> {
  const parsedArgs = parseArgs(process.argv.slice(2));

  const config: BuildConfig = {
    srcDir: path.normalize(path.join(__dirname, "src")),
    destDir: parsedArgs.destDir,
    testsDir: path.normalize(path.join(__dirname, "..", "test")),
    nodeModulesDir: path.normalize(path.join(__dirname, "..", "node_modules")),
  };

  return build(config);
}

interface BuildConfig {
  srcDir: string;
  testsDir: string;
  destDir: string;
  nodeModulesDir: string;
}

async function build(config: BuildConfig): Promise<void> {
  const { srcDir, testsDir, destDir, nodeModulesDir } = config;
  await deleteDirectory(destDir);
  await createDirectory(destDir);
  await copyDirectory(srcDir, destDir);
  await copyDirectory(testsDir, path.join(destDir, "tests"));
  await copyFileToDirectory(path.join(nodeModulesDir, "mocha", "mocha.js"), destDir);
  await copyFileToDirectory(path.join(nodeModulesDir, "mocha", "mocha.css"), destDir);
}

/**
 * Deletes the given directory with all of its files, recursively.
 * If the directory does not exist then this function does nothing and returns as if successful.
 * @param directoryPath the path of the directory to delete.
 */
async function deleteDirectory(directoryPath: string): Promise<void> {
  const destDirExists: boolean = await fsExtra.pathExists(directoryPath);
  if (!destDirExists) {
    return;
  }
  signale.note(`Deleting directory: ${directoryPath}`);
  await rimraf(directoryPath);
}

/**
 * Creates the directory with the given path, and any missing parent directories.
 * If the directory already exists then this function does nothing and returns as if successful.
 * @param directoryPath the path of the directory to create.
 */
async function createDirectory(directoryPath: string): Promise<void> {
  const destDirExists: boolean = await fsExtra.pathExists(directoryPath);
  if (destDirExists) {
    return;
  }
  signale.note(`Creating directory: ${directoryPath}`);
  await fs.mkdir(directoryPath, { recursive: true });
}

/**
 * Copies the given file into the given directory.
 */
async function copyFileToDirectory(srcFile: string, destDir: string): Promise<void> {
  const destFile = path.join(destDir, path.basename(srcFile));
  signale.note(`Copying file ${srcFile} to ${destFile}`);
  await createDirectory(destDir);
  await fs.copyFile(srcFile, destFile);
}

/**
 * Copies the files from one directory to another, recursively, filtering out
 */
async function copyDirectory(srcDir: string, destDir: string): Promise<void> {
  await createDirectory(destDir);
  const suffixesToCopy = new Set([".ts", ".json", ".html"]);
  await fsExtra.copy(srcDir, destDir, {
    filter: (srcPath, destPath) => {
      for (const suffix of suffixesToCopy) {
        if (srcPath.endsWith(suffix)) {
          signale.note(`Copying file ${srcPath} to ${destPath}`);
          return true;
        }
      }
      return false;
    },
  });
}

interface ParsedArgs {
  ui: "html" | "console";
  startTrigger: "button" | "load";
  destDir: string;
}

function parseArgs(args: string[]): ParsedArgs {
  const parsedArgs: ParsedArgs = {
    ui: "html",
    startTrigger: "load",
    destDir: path.normalize(path.join(__dirname, "..", "build", "mocha")),
  };

  const destDirPrefix = "--destDir=";
  for (const arg of args) {
    if (arg == "--html") {
      parsedArgs.ui = "html";
    } else if (arg == "--console") {
      parsedArgs.ui = "console";
    } else if (arg == "--button") {
      parsedArgs.startTrigger = "button";
    } else if (arg == "--load") {
      parsedArgs.startTrigger = "load";
    } else if (arg.startsWith(destDirPrefix)) {
      parsedArgs.destDir = arg.substring(destDirPrefix.length);
    } else {
      throw new Error(`unknown command-line argument: ${arg}`);
    }
  }
  return parsedArgs;
}

main();
