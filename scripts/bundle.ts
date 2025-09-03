import { build } from "bun";

import { logger } from "./logger";

export interface BundleConfig {
  isCapacitor: boolean;
  outputDirectory: string;
}

export async function bundle(config: BundleConfig): Promise<void> {
  const { isCapacitor, outputDirectory } = config;
  const entryPoint = "./src/browser/index.html";
  const defines = {
    ce2ycyt3gs_isCapacitor: JSON.stringify(isCapacitor),
  };

  logger.info(`Bundling ${entryPoint} into ${outputDirectory}`);

  const result = await build({
    define: defines,
    entrypoints: [entryPoint],
    outdir: outputDirectory,
    target: "browser",
    throw: true,
  });

  for (const log of result.logs) logger.info(log.level, log.message);
  for (const output of result.outputs) logger.info("Created file:", output.path);
}
