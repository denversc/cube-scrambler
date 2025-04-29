import fs from "node:fs";
import path from "node:path";

import { execaSync } from "execa";
import nunjucks from "nunjucks";
import { rimrafSync } from "rimraf";
import signale from "signale";

async function main(): Promise<void> {
  const parsedArgs = parseArgs(process.argv.slice(2));

  const builderSettings: BuilderSettings = {
    srcDir: path.normalize(path.join(__dirname, "src")),
    destDir: parsedArgs.destDir,
    nodeModulesDir: path.normalize(path.join(__dirname, "..", "node_modules")),
  };

  const builder = new Builder(builderSettings);
  builder.resetDestDir();
  builder.copyFileFromSrcDir("favicon.svg");
  builder.copyFileFromNodeModules("mocha", "mocha.js");
  builder.copyFileFromNodeModules("mocha", "mocha.css");

  builder.runEsbuild("test/**/*.test.ts", "--external:mocha");

  const indexHtmlRenderContext: Record<string, unknown> = {};
  if (parsedArgs.ui === "console") {
    builder.runEsbuild(
      path.join("mocha", "src", "console_mocha_reporter.ts"),
      "--global-name=console_mocha_reporter_s2he8g3fbt",
    );
    Object.assign(indexHtmlRenderContext, {
      custom_reporter_js_url: "console_mocha_reporter.js",
      custom_reporter_constructor: "console_mocha_reporter_s2he8g3fbt.ConsoleMochaReporter",
    });
  } else if (parsedArgs.ui !== "html") {
    throw new Error(`internal error: invalid parsedArgs.ui: ${parsedArgs.ui} [gpyxgvs6ht]`);
  }

  if (parsedArgs.startTrigger === "button") {
    indexHtmlRenderContext["start_button"] = true;
  } else if (parsedArgs.startTrigger !== "load") {
    throw new Error(
      `internal error: invalid parsedArgs.startTrigger: ${parsedArgs.startTrigger} [r3c2tvydw5]`,
    );
  }

  builder.runNunjucks("index.html", indexHtmlRenderContext);
}

interface BuilderSettings {
  srcDir: string;
  destDir: string;
  nodeModulesDir: string;
}

class Builder {
  readonly #srcDir: string;
  readonly #destDir: string;
  readonly #nodeModulesDir: string;

  constructor(settings: BuilderSettings) {
    this.#srcDir = settings.srcDir;
    this.#destDir = settings.destDir;
    this.#nodeModulesDir = settings.nodeModulesDir;
  }

  resetDestDir(): void {
    if (fs.existsSync(this.#destDir)) {
      signale.note(`Deleting directory: ${this.#destDir}`);
      rimrafSync(this.#destDir);
    }
    signale.note(`Creating directory: ${this.#destDir}`);
    fs.mkdirSync(this.#destDir, { recursive: true });
  }

  copyFileFromNodeModules(...srcPath: string[]): void {
    this.#copyFileFrom(this.#nodeModulesDir, ...srcPath);
  }

  copyFileFromSrcDir(...srcPath: string[]): void {
    this.#copyFileFrom(this.#srcDir, ...srcPath);
  }

  #copyFileFrom(srcDir: string, ...srcPath: string[]): void {
    const srcFullPath = path.join(srcDir, ...srcPath);
    const destPath = path.join(this.#destDir, path.basename(srcFullPath));
    this.#copyFile(srcFullPath, destPath);
  }

  #copyFile(srcPath: string, destPath: string): void {
    signale.note(`Copying ${srcPath} to ${destPath}`);
    fs.copyFileSync(srcPath, destPath);
  }

  runEsbuild(...args: string[]): void {
    this.#runEsbuild(
      "--bundle",
      "--outdir=build/mocha",
      "--sourcemap",
      "--platform=browser",
      "--format=iife",
      ...args,
    );
  }

  #runEsbuild(...args: string[]): void {
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

  runNunjucks(fileName: string, renderContext: Record<string, unknown> | null): void {
    const srcFile = path.join(this.#srcDir, fileName);
    const destFile = path.join(this.#destDir, fileName);
    signale.note(`Generating ${destFile} from ${srcFile}`);

    const env = nunjucks.configure(this.#srcDir, {
      throwOnUndefined: true, // Fail loudly when undefined variables are used, for robustness.
    });
    const template = env.getTemplate(fileName, false);
    const renderedTemplate = template.render(renderContext ?? {});
    fs.writeFileSync(destFile, renderedTemplate);
  }
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
