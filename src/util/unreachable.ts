import { inspect } from "#platform";

export function unreachable(value: never, message: string): never {
  throw new Error(`internal error: should never get here: ${inspect(value)} (${message})`);
}
