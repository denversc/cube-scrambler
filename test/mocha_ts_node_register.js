// This file is adapted from node_modules/ts-node/register/transpile-only.js
// to add the "project" property, in addition to "transpileOnly".
//
// Without explicitly specifying the "project" property, ts-node would use the top-level
// tsconfig.json file, which sets up the layout of the project using TypeScript's "Project
// References" feature (https://www.typescriptlang.org/docs/handbook/project-references.html).
// However, ts-node is not compatible with project references and, therefore, fails to load the
// configuration defined in test/tsconfig.json, which, importantly, (at the time of writing)
// specifies compilerOptions lib=[es2023], module=nodenext, and target=es2022.

const path = require("path");
const tsNode = require("ts-node");

const tsNodeOptions = {
  transpileOnly: true,
  project: path.normalize(path.join(__dirname, "tsconfig.json")),
};

console.log(__filename, "Registering ts-node with options:", tsNodeOptions);
tsNode.register(tsNodeOptions);
