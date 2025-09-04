export function repeat(count: number, function_: (index: number) => unknown): void {
  for (let index = 0; index < count; index++) {
    function_(index);
  }
}
