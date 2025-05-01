export interface MainConfig {
  ui: MainConfig.Ui;
  startTrigger: MainConfig.StartTrigger;
  testModules: readonly string[];
}

export namespace MainConfig {
  export type Ui = "html" | "console";
  export type StartTrigger = "button" | "load";
}
