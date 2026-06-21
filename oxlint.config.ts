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
  options: { typeAware: true, typeCheck: true },
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
    // Do not count blank lines and comments as lines of code in function
    "max-lines-per-function": ["warn", { skipBlankLines: true, skipComments: true }],
    // Do not force adding `readonly` noise to anonymous function parameters
    "typescript/prefer-readonly-parameter-types": "allow",
  },
});
