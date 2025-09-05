import { inspect } from "#platform";

export function invalid(value: unknown, message: string): never {
  throw new Error(`internal error: should never get here: ${inspect(value)} (${message})`);
}
