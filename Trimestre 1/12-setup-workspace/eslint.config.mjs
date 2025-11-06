import globals from "globals";
import pluginJs from "@eslint/js";
import stylistic from "@stylistic/eslint-plugin";

export default [
  pluginJs.configs.recommended,
  {
    plugins: {
      stylistic
    },
    languageOptions: {
      globals: globals.node
    },
    rules: {
      "stylistic/semi": ["error", "always"],
      "no-var": "error",
      "no-unused-vars": "error",
      "stylistic/indent": ["error", 2],
      "stylistic/quotes": ["error", "double"]
    }
  }
];
