import globals from "globals";
import pluginJs from "@eslint/js";

/** @type {import('eslint').Linter.Config[]} */
export default [
  {
    files: ["**/*.js", "**/*.cjs", "**/*.mjs"],
    rules: {
      "prefer-const": "warn",
      "no-constant-binary-expression": "warn",
      semi: ["error", "always"]
    },
    languageOptions: { globals: globals.node },
  },
  pluginJs.configs.recommended,
];
