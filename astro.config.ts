import mdx from "@astrojs/mdx";
import react from "@astrojs/react";
import sitemap from "@astrojs/sitemap";
import {
  pluginCollapsibleSections,
  pluginCollapsibleSectionsTexts,
} from "@expressive-code/plugin-collapsible-sections";
import { pluginFramesTexts } from "@expressive-code/plugin-frames";
import { pluginLineNumbers } from "@expressive-code/plugin-line-numbers";
import playformCompress from "@playform/compress";
import {
  transformerNotationDiff,
  transformerNotationHighlight,
  transformerNotationWordHighlight,
} from "@shikijs/transformers";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig, envField } from "astro/config";
import expressiveCode from "astro-expressive-code";
import icon from "astro-icon";
import og from "astro-og";
import pagefind from "astro-pagefind";
import rehypeKatex from "rehype-katex";
import remarkMath from "remark-math";
import { SITE } from "./src/config";

pluginFramesTexts.overrideTexts("en", {
  copyButtonTooltip: "Copy code",
});

pluginFramesTexts.addLocale("zh", {
  terminalWindowFallbackTitle: "终端窗口",
  copyButtonTooltip: "复制代码",
  copyButtonCopied: "已复制!",
});

pluginCollapsibleSectionsTexts.addLocale("zh", {
  collapsedLines: "已折叠 {lineCount} 行",
});

// https://astro.build/config
export default defineConfig({
  site: SITE.website,
  i18n: {
    locales: Object.entries(SITE.locales).map(([lang, { codes }]) => {
      return {
        path: lang,
        codes: [...codes],
      };
    }),
    defaultLocale: SITE.defaultLocale,
    routing: {
      prefixDefaultLocale: true,
      redirectToDefaultLocale: true,
      fallbackType: "rewrite",
    },
  },
  integrations: [
    react(),
    icon({ iconDir: "src/assets/icons" }),
    og(),
    expressiveCode({
      themes: ["catppuccin-mocha", "catppuccin-latte"],
      useDarkModeMediaQuery: false,
      // themeCssSelector: (theme) => `[data-theme="${theme.type}"] *`,
      customizeTheme: (theme) => {
        theme.name = theme.type;
      },
      defaultProps: {
        // Allow re-collapsing sections
        collapseStyle: "collapsible-auto",
      },
      getBlockLocale: ({ file }) => {
        const fileName = file.path?.split("/").pop() || "";
        const [, locale] = fileName.split(".");
        return Object.keys(SITE.locales).includes(locale)
          ? locale
          : SITE.defaultLocale;
      },
      useThemedSelectionColors: true,
      plugins: [pluginCollapsibleSections(), pluginLineNumbers()],
    }),
    mdx(),
    sitemap({
      filter: (page) => SITE.showArchives || !page.endsWith("/archives"),
    }),
    pagefind(),
    playformCompress({
      Exclude: [
        // ignore /dist/_astro/*.css as csso will mess up nested css selectors
        (File: string) => /dist\/_astro\/.*\.css$/g.test(File),
      ],
    }),
  ],
  markdown: {
    remarkPlugins: [remarkMath],
    rehypePlugins: [rehypeKatex],
    shikiConfig: {
      // For more themes, visit https://shiki.style/themes
      themes: { light: "catppuccin-latte", dark: "catppuccin-mocha" },
      defaultColor: false,
      wrap: false,
      transformers: [
        transformerNotationHighlight(),
        transformerNotationWordHighlight(),
        transformerNotationDiff({ matchAlgorithm: "v3" }),
      ],
    },
  },
  vite: {
    plugins: [tailwindcss()],
    optimizeDeps: {
      exclude: ["@resvg/resvg-js"],
    },
    server: {
      watch: {
        ignored: [
          "**/node_modules/**",
          "**/dist/**",
          "**/.jj/**",
          "**/.git/**",
        ],
      },
    },
  },
  image: {
    responsiveStyles: true,
    layout: "constrained",
  },
  env: {
    schema: {
      PUBLIC_GOOGLE_SITE_VERIFICATION: envField.string({
        access: "public",
        context: "client",
        optional: true,
      }),
    },
  },
  experimental: {
    preserveScriptOrder: true,
  },
});
