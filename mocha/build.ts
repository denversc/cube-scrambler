import fs from "node:fs/promises";
import path from "node:path";

import { execa } from "execa";
import fsExtra from "fs-extra";
import signale from "signale";

import type { MainConfig } from "./types";

function main(): Promise<void> {
  const parsedArgs = parseArgs(process.argv.slice(2));

  const config: BuildConfig = {
    srcDir: path.normalize(path.join(__dirname, "src")),
    resourcesDir: path.normalize(path.join(__dirname, "resources")),
    destDir: parsedArgs.destDir,
    testsDir: path.normalize(path.join(__dirname, "..", "test")),
    nodeModulesDir: path.normalize(path.join(__dirname, "..", "node_modules")),
    ui: parsedArgs.ui,
    startTrigger: parsedArgs.startTrigger,
  };

  return build(config);
}

interface BuildConfig {
  srcDir: string;
  resourcesDir: string;
  testsDir: string;
  destDir: string;
  nodeModulesDir: string;
  ui: MainConfig.Ui;
  startTrigger: MainConfig.StartTrigger;
}

async function build(config: BuildConfig): Promise<void> {
  const { srcDir, resourcesDir, testsDir, destDir, nodeModulesDir, ui, startTrigger } = config;

  await emptyDirectory(destDir);
  await copyDirectory(resourcesDir, destDir);

  const mochaNodeModulesDir = path.join(nodeModulesDir, "mocha");
  const mochaDestDir = path.join(destDir, "mocha");
  await copyFileToDirectory(path.join(mochaNodeModulesDir, "mocha.js"), mochaDestDir);
  await copyFileToDirectory(path.join(mochaNodeModulesDir, "mocha.css"), mochaDestDir);

  const chaiNodeModulesDir = path.join(nodeModulesDir, "chai");
  const chaiDestDir = path.join(destDir, "chai");
  await copyFileToDirectory(path.join(chaiNodeModulesDir, "chai.js"), chaiDestDir);

  const jsTestModules = await compileTestsJs({ destDir, testsDir });
  await compileIndexJs({ srcDir, destDir, ui, startTrigger, jsTestModules });
}

interface CompileIndexJsConfig {
  srcDir: string;
  destDir: string;
  ui: MainConfig.Ui;
  startTrigger: MainConfig.StartTrigger;
  jsTestModules: string[];
}

/**
 * Compiles the "index.js" for import by the browser into a JavaScript module.
 */
async function compileIndexJs(config: CompileIndexJsConfig): Promise<void> {
  const { srcDir, destDir, ui, startTrigger, jsTestModules: testModules } = config;
  const mainConfig: MainConfig = { ui, startTrigger, testModules };
  await runEsBuild(
    { cwd: destDir },
    path.join(srcDir, "index.ts"),
    "--outdir=js/src",
    `--define:main_config_from_esbuild_ycvsy2qgg5=${JSON.stringify(mainConfig)}`,
  );
}

interface CompileTestsJsConfig {
  destDir: string;
  testsDir: string;
}

/**
 * Compiles the mocha tests into individual JavaScript modules for use in the browser.
 * @return the imports to issue in the browser to import the tests.
 */
async function compileTestsJs(config: CompileTestsJsConfig): Promise<string[]> {
  const { destDir, testsDir } = config;
  await runEsBuild({ cwd: destDir }, `${testsDir}/**/*.test.ts`, "--outdir=js/tests");

  const jsTestModules: string[] = [];
  for await (const testPath of fs.glob("**/*.test.js", {
    cwd: path.join(destDir, "js", "tests"),
  })) {
    jsTestModules.push("../tests/" + testPath);
  }

  return jsTestModules;
}

/**
 * Invokes the "esbuild" command to generate JavaScript browser code.
 */
async function runEsBuild(config: { cwd: string }, ...args: string[]): Promise<void> {
  const allArgs = [
    "esbuild",
    "--bundle",
    "--platform=browser",
    "--format=esm",
    "--sourcemap",
    "--sources-content=true",
    ...args,
  ];

  signale.note(`Running command: ${allArgs.join(" ")}`);
  const execFunction = execa({ preferLocal: true, cwd: config.cwd, stdio: "inherit" });
  await execFunction(allArgs[0]!, allArgs.slice(1));
}

/**
 * Deletes the given directory with all of its files, recursively, then re-creates it.
 */
async function emptyDirectory(directoryPath: string): Promise<void> {
  signale.note(`Emptying or creating directory: ${directoryPath}`);
  await fsExtra.emptyDir(directoryPath);
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
 * Returns if the given file system path is a directory.
 * @return true if the given path exists in the file system AND is a directory; false otherwise,
 * including if determining whether it was a directory failed.
 */
async function isDirectory(fileSystemPath: string): Promise<boolean> {
  try {
    const statResult = await fs.stat(fileSystemPath);
    return statResult.isDirectory();
  } catch (_: unknown) {
    return false;
  }
}

/**
 * Copies the files from one directory to another, recursively, filtering out
 */
async function copyDirectory(srcDir: string, destDir: string): Promise<void> {
  signale.note(`Copying directory ${srcDir} to ${destDir}`);
  // noinspection JSUnusedGlobalSymbols
  fsExtra.copy(srcDir, destDir, {
    async filter(src: string, dest: string): Promise<boolean> {
      const srcIsDirectory = await isDirectory(src);
      if (!srcIsDirectory) {
        signale.note(`Copying file ${src} to ${dest}`);
      }
      return true;
    },
  });
}

interface ParsedArgs {
  ui: MainConfig.Ui;
  startTrigger: MainConfig.StartTrigger;
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
