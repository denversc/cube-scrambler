import eslint from "@eslint/js";
import perfectionist from "eslint-plugin-perfectionist";
import unicorn from "eslint-plugin-unicorn";
import tseslint, { type Config } from "typescript-eslint";

const config: Config = tseslint.config(
  {
    ignores: ["build/", "node_modules/"],
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
