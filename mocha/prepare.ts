import fs from "node:fs";
import path from "node:path";

import signale from "signale";

function main(): void {
  const destDir = path.normalize(path.join(__dirname, "..", "build", "mocha"));
  const nodeModulesDir = path.normalize(path.join(__dirname, "..", "node_modules"));

  signale.note(`Preparing mocha browser tests directory: ${destDir}`);
  fs.mkdirSync(destDir, { recursive: true });

  copyFile(path.join(__dirname, "index.html"), path.join(destDir, "index.html"));
  copyFile(path.join(nodeModulesDir, "mocha", "mocha.css"), path.join(destDir, "mocha.css"));
  copyFile(path.join(nodeModulesDir, "mocha", "mocha.js"), path.join(destDir, "mocha.js"));
}

function copyFile(srcPath: string, destPath: string): void {
  signale.note(`Copying ${srcPath} to ${destPath}`);
  fs.copyFileSync(srcPath, destPath);
}

main();
