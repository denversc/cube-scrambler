export interface MainConfig {
  ui: "html" | "console";
  startTrigger: "button" | "load";
  testModules: readonly string[];
}

// TODO: Fix the global declaration below to satisfy the "no-namespace" check.
// See https://typescript-eslint.io/rules/no-namespace/
// eslint-disable-next-line @typescript-eslint/no-namespace
export namespace MainConfig {
  export type Ui = "html" | "console";
  export type StartTrigger = "button" | "load";
}
