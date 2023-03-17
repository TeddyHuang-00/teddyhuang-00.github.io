import { defineUserConfig, viteBundler } from "vuepress";
import { registerComponentsPlugin } from '@vuepress/plugin-register-components'
import { getDirname, path } from '@vuepress/utils'
import { docsearchPlugin } from "@vuepress/plugin-docsearch"
import { shikiPlugin } from '@vuepress/plugin-shiki'
import tailwindcss from "tailwindcss"
import autoprefixer from "autoprefixer"
import theme from "./theme.js"

const __dirname = getDirname(import.meta.url)

export default defineUserConfig({
  alias: {
    '@': path.resolve(__dirname, '../.vuepress')
  },

  base: "/",

  bundler: viteBundler({
    // vite options
    viteOptions: {
      css: {
        postcss: {
          plugins: [
            tailwindcss,
            autoprefixer,
          ],
        }
      }
    }
  }),

  locales: {
    "/": {
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
    registerComponentsPlugin({
      componentsDir: path.resolve(__dirname, './components'),
    }),
    shikiPlugin({
      theme: "dark-plus"
    }),
    docsearchPlugin({
      appId: "GQWRTHZR5O",
      apiKey: "29d33a940d6df255b8e18ce923022671",
      indexName: "teddyhuang-00io",
      locales: {
        "/": {
          placeholder: "搜索站点",
          translations: {
            button: {
              buttonText: "搜索站点",
              buttonAriaLabel: "搜索站点",
            },
            modal: {
              searchBox: {
                resetButtonTitle: "清除查询条件",
                resetButtonAriaLabel: "清除查询条件",
                cancelButtonText: "取消",
                cancelButtonAriaLabel: "取消",
              },
              startScreen: {
                recentSearchesTitle: "搜索历史",
                noRecentSearchesText: "没有搜索历史",
                saveRecentSearchButtonTitle: "保存至搜索历史",
                removeRecentSearchButtonTitle: "从搜索历史中移除",
                favoriteSearchesTitle: "收藏",
                removeFavoriteSearchButtonTitle: "从收藏中移除",
              },
              errorScreen: {
                titleText: "无法获取结果",
                helpText: "你可能需要检查你的网络连接",
              },
              footer: {
                selectText: "选择",
                navigateText: "切换",
                closeText: "关闭",
                searchByText: "搜索提供者",
              },
              noResultsScreen: {
                noResultsText: "无法找到相关结果",
                suggestedQueryText: "你可以尝试查询",
                reportMissingResultsText: "你认为该查询应该有结果？",
                reportMissingResultsLinkText: "点击反馈",
              },
            },
          },
        },
        "/en/": {
          placeholder: "Search site",
          translations: {
            button: {
              buttonText: "Search site",
              buttonAriaLabel: "Search site",
            },
            modal: {
              searchBox: {
                resetButtonTitle: "Reset query",
                resetButtonAriaLabel: "Reset query",
                cancelButtonText: "Cancel",
                cancelButtonAriaLabel: "Cancel",
              },
              startScreen: {
                recentSearchesTitle: "Recent searches",
                noRecentSearchesText: "No recent searches",
                saveRecentSearchButtonTitle: "Save to recent searches",
                removeRecentSearchButtonTitle: "Remove from recent searches",
                favoriteSearchesTitle: "Favorites",
                removeFavoriteSearchButtonTitle: "Remove from favorites",
              },
              errorScreen: {
                titleText: "Unable to get results",
                helpText: "You might need to check your network connection",
              },
              footer: {
                selectText: "Select",
                navigateText: "Navigate",
                closeText: "Close",
                searchByText: "Search by",
              },
              noResultsScreen: {
                noResultsText: "No results found",
                suggestedQueryText: "You can try searching for",
                reportMissingResultsText: "Do you think this query should have results?",
                reportMissingResultsLinkText: "Click here to report it",
              },
            },
          },
        },
      },
    })
  ],
});