// Specify this file to mocha as --file in order to put the "chai" object into the global scope.
// This allows chai to be used without explicit imports both when the tests are run locally via
// Node.js and when bundled with esbuild and executed in a web browser.

import chai from "chai";

// @ts-expect-error TS2339: Property chai does not exist on type typeof globalThis
globalThis.chai = chai;
