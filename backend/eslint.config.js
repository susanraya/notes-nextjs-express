import js from "@eslint/js";
import prettier from "eslint-config-prettier";
import globals from "globals";
import tseslint from "typescript-eslint";

export default tseslint.config(
  { ignores: ["dist", "coverage", "test-results"] },
  js.configs.recommended,
  ...tseslint.configs.recommended,
  prettier,
  { languageOptions: { globals: globals.node } },
);
