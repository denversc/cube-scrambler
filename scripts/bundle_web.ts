import { build } from "bun";
import { Signale } from "signale";

const logger = new Signale({
  config: {
    displayBadge: true,
    displayDate: false,
    displayFilename: false,
    displayLabel: false,
    displayScope: false,
    displayTimestamp: false,
  },
});

const entryPoint = "./src/browser/index.html";
const outputDirectory = "./build/browser";

logger.info(`Bundling ${entryPoint} into ${outputDirectory}`);

const result = await build({
  entrypoints: [entryPoint],
  outdir: outputDirectory,
  target: "browser",
  throw: true,
});

for (const log of result.logs) logger.info(log.level, log.message);
for (const output of result.outputs) logger.info("Created file:", output.path);
