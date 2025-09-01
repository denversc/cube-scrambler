import { type UserConfig } from "vite";
import { defineConfig } from "vitest/config";

const userConfig: UserConfig = defineConfig({
  test: {
    browser: {
      enabled: true,
      instances: [
        {
          browser: "chrome",
          headless: true,
        },
      ],
      provider: "webdriverio",
    },
  },
});

export default userConfig;
