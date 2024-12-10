import globals from "globals";
import pluginJs from "@eslint/js";
import pluginReact from "eslint-plugin-react";
import eslintPluginPrettier from "eslint-plugin-prettier";

/** @type {import('eslint').Linter.Config[]} */
export default [
  {
    files: ["**/*.{js,mjs,cjs,jsx}"],
    plugins: { prettier: eslintPluginPrettier },
    rules: {
      "prettier/prettier": "error", // Enforce Prettier rules
    },
  },
  pluginReact.configs.flat.recommended,
  {
    rules: {
      "react/prop-types": "off", // Disable prop-types if using TypeScript
      "react/react-in-jsx-scope": "off", // Not needed for React 17+
    },
  },
];
