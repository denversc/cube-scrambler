export function inspect(object: unknown): string {
  try {
    return JSON.stringify(object);
  } catch {
    // ignore
  }

  try {
    return String(object);
  } catch {
    // ignore
  }

  return `<${typeof object}>`;
}
