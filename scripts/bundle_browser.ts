import { bundle } from "./bundle";

await bundle({
  isCapacitor: false,
  outputDirectory: "./build/browser",
});
