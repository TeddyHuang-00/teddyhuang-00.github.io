import { defineUserConfig } from "vuepress";
import { viteBundler } from "@vuepress/bundler-vite";
import { registerComponentsPlugin } from "@vuepress/plugin-register-components";
import { getDirname, path } from "@vuepress/utils";
import { shikiPlugin } from "@vuepress/plugin-shiki";
import tailwindcss from "tailwindcss";
import autoprefixer from "autoprefixer";
import theme from "./theme.js";

const __dirname = getDirname(import.meta.url);

export default defineUserConfig({
  alias: {
    "@": path.resolve(__dirname, "../.vuepress"),
  },

  base: "/",

  bundler: viteBundler({
    // vite options
    viteOptions: {
      css: {
        postcss: {
          plugins: [tailwindcss, autoprefixer],
        },
      },
    },
  }),

  locales: {
    "/zh/": {
      lang: "zh-CN",
      title: "楠的博客",
      description: "WWW::CyberBase(NanHuang);",
    },
    "/en/": {
      lang: "en-US",
      title: "Nan's Blog",
      description: "WWW::CyberBase(NanHuang);",
    },
  },

  theme,

  plugins: [
    shikiPlugin({
      theme: "dark-plus",
      langs: [
        "ts",
        "py",
        "yaml",
        "r",
        "cpp",
        "rust",
        "csharp",
        "json",
        "makefile",
        "ps",
        "vue",
        "vue-html",
        "md",
        "bash",
        "diff",
      ],
    }),
    registerComponentsPlugin({
      componentsDir: path.resolve(__dirname, "./components"),
    }),
  ],
});
