import { defineConfig } from "oxlint";

export default defineConfig({
  categories: {
    correctness: "error",
    suspicious: "warn",
    perf: "warn",
    // style: "warn",
    // nursery: "warn",
    pedantic: "warn",
  },
  env: {
    astro: true,
    builtin: true,
  },
  plugins: [
    // Default enabled
    "eslint",
    "typescript",
    "unicorn",
    "oxc",
    // Extra plugins
    "react",
    "react-perf",
    "vue",
  ],
  rules: {
    // Allow variable shadowing as we know exactly what we are doing
    "no-shadow": "allow",
    // Allow implicit component usage without explicit React
    "react/react-in-jsx-scope": "allow",
    "max-lines-per-function": ["warn", { skipBlankLines: true, skipComments: true }],
  },
});
