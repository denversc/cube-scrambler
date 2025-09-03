import { bundle } from "./bundle";

await bundle({
  isCapacitor: true,
  outputDirectory: "./build/capacitor",
});
