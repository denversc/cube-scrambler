import type { Stats } from "node:fs";
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

  await copyDirectory(srcDir, path.join(destDir, "src"));
  await copyDirectory(testsDir, path.join(destDir, "tests"));

  const mochaNodeModulesDir = path.join(nodeModulesDir, "mocha");
  const mochaDestDir = path.join(destDir, "mocha");
  await copyFileToDirectory(path.join(mochaNodeModulesDir, "mocha.js"), mochaDestDir);
  await copyFileToDirectory(path.join(mochaNodeModulesDir, "mocha.css"), mochaDestDir);
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

async function getPathType(fileSystemPath: string): Promise<"file" | "directory" | null> {
  let statResult: Stats;
  try {
    statResult = await fs.stat(fileSystemPath);
  } catch (_) {
    return null;
  }
  if (statResult.isFile()) {
    return "file";
  } else if (statResult.isDirectory()) {
    return "directory";
  } else {
    return null;
  }
}

/**
 * Copies the files from one directory to another, recursively, filtering out
 */
async function copyDirectory(srcDir: string, destDir: string): Promise<void> {
  signale.note(`Copying directory ${srcDir} to ${destDir}`);
  await createDirectory(destDir);
  const tsConfigsForFixup: Array<{ srcFile: string; destFile: string }> = [];
  const suffixesToCopy = new Set([".ts", ".json", ".html"]);
  // noinspection JSUnusedGlobalSymbols
  const copyOptions: fsExtra.CopyOptions = {
    async filter(srcPath, destPath): Promise<boolean> {
      const srcType = await getPathType(srcPath);
      if (srcType === "directory") {
        return true;
      } else if (srcType === null) {
        return false;
      } else if (srcType !== "file") {
        throw new Error(`internal error: unexpected srcType: ${srcType} [d63ckpvy8n]`);
      }
      for (const suffix of suffixesToCopy) {
        if (srcPath.endsWith(suffix)) {
          signale.note(`Copying file ${srcPath} to ${destPath}`);
          if (path.basename(srcPath) == "tsconfig.json") {
            tsConfigsForFixup.push({ srcFile: srcPath, destFile: destPath });
          }
          return true;
        }
      }
      return false;
    },
  };

  await fsExtra.copy(srcDir, destDir, copyOptions);

  for (const tsConfigCopySpec of tsConfigsForFixup) {
    await fixupTsConfig(tsConfigCopySpec.destFile, path.dirname(tsConfigCopySpec.srcFile));
  }
}

/**
 * Fixes up relatives paths in a tsconfig.json file that was copied to a different directory.
 */
async function fixupTsConfig(tsConfigPath: string, baseDir: string): Promise<void> {
  signale.note(`Fixing up relative paths in ${tsConfigPath} based on directory: ${baseDir}`);
  const tsConfigBeforeText = await fs.readFile(tsConfigPath, { encoding: "utf8" });
  let tsConfigBefore: unknown;
  try {
    tsConfigBefore = JSON.parse(tsConfigBeforeText);
  } catch (error: unknown) {
    signale.note(`Parsing JSON from ${tsConfigPath} failed: ${error}; skipping`);
    return;
  }

  if (typeof tsConfigBefore !== "object") {
    signale.note(
      `Parsing JSON from ${tsConfigPath} produced ${typeof tsConfigBefore}, ` +
        `but expected object; skipping`,
    );
    return;
  }

  const tsConfig = tsConfigBefore as unknown as Record<string, unknown>;
  const extendsValue = tsConfig["extends"];
  if (typeof extendsValue !== "string") {
    signale.note(
      `"extends" is not defined as a string in ${tsConfigPath} ` +
        `(got ${typeof extendsValue}); skipping`,
    );
    return;
  }

  if (path.isAbsolute(extendsValue)) {
    signale.note(
      `"extends" defined in ${tsConfigPath} is already absolute: ${extendsValue}; nothing to do`,
    );
    return;
  }

  const newExtendsValue = path.normalize(path.join(baseDir, extendsValue));
  signale.note(
    `"extends" defined in ${tsConfigPath} changed to ${newExtendsValue} (was ${extendsValue})`,
  );
  tsConfig["extends"] = newExtendsValue;

  await fs.writeFile(tsConfigPath, JSON.stringify(tsConfig, undefined, 2), { encoding: "utf8" });
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
