import { defineConfig } from "oxfmt";

export default defineConfig({
  arrowParens: "always",
  bracketSameLine: false,
  bracketSpacing: true,
  ignorePatterns: [
    "**/.git",
    "**/.jj",
    "**/.astro",
    "**/.cache",
    "**/node_modules",
    "**/dist",
    "**/pagefind",
  ],
  jsxSingleQuote: false,
  quoteProps: "as-needed",
  semi: true,
  singleQuote: false,
  tabWidth: 2,
  trailingComma: "es5",
  sortImports: true,
});
