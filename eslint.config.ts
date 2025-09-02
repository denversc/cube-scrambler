import eslint from "@eslint/js";
import perfectionist from "eslint-plugin-perfectionist";
import unicorn from "eslint-plugin-unicorn";
import tseslint, { type Config } from "typescript-eslint";

const config: Config = tseslint.config(
  {
    ignores: ["android/", "build/", "gh-pages/", "node_modules/"],
  },
  eslint.configs.recommended,
  ...tseslint.configs.recommended,
  ...tseslint.configs.strictTypeChecked,
  {
    languageOptions: {
      parserOptions: {
        project: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
  },
  perfectionist.configs["recommended-natural"],
  unicorn.configs["all"],
  {
    rules: {
      "@typescript-eslint/no-non-null-assertion": "off",
      "@typescript-eslint/no-unnecessary-condition": [
        "error",
        {
          allowConstantLoopConditions: "only-allowed-literals",
        },
      ],
      "unicorn/filename-case": [
        "error",
        {
          case: "snakeCase",
        },
      ],
    },
  },
);

export default config;
