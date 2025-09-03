import { Signale } from "signale";

export interface Logger {
  info(...messages: unknown[]): void;
}

export const logger: Logger = new Signale({
  config: {
    displayBadge: true,
    displayDate: false,
    displayFilename: false,
    displayLabel: false,
    displayScope: false,
    displayTimestamp: false,
  },
});
