import { hopeTheme } from "vuepress-theme-hope";
import { enNavbar, zhNavbar } from "./navbar/index.js";
import { enSidebar, zhSidebar } from "./sidebar/index.js";

export default hopeTheme({
  hostname: "https://TeddyHuang-00.github.io",

  author: {
    name: "TeddyHuang-00",
    url: "https://TeddyHuang-00.github.io",
  },

  iconAssets: "iconify",

  logo: "/GitHub.png",

  repo: "TeddyHuang-00/teddyhuang-00.github.io",

  docsBranch: "main",

  docsDir: "src",

  blog: {
    medias: {
      // Baidu: "https://example.com",
      BiliBili: "https://space.bilibili.com/13229205",
      // Bitbucket: "https://example.com",
      // Dingding: "https://example.com",
      // Discord: "https://example.com",
      // Dribbble: "https://example.com",
      Email: "mailto:huang_nan_2019@pku.edu.cn",
      // Evernote: "https://example.com",
      // Facebook: "https://example.com",
      // Flipboard: "https://example.com",
      // Gitee: "https://example.com",
      GitHub: "https://github.com/TeddyHuang-00",
      // Gitlab: "https://example.com",
      Gmail: "mailto:teddyhuangnan@gmail.com",
      // Instagram: "https://example.com",
      // Lark: "https://example.com",
      // Lines: "https://example.com",
      // Linkedin: "https://example.com",
      // Pinterest: "https://example.com",
      // Pocket: "https://example.com",
      // QQ: "https://example.com",
      // Qzone: "https://example.com",
      // Reddit: "https://example.com",
      // Rss: "https://example.com",
      // Steam: "https://example.com",
      // Twitter: "https://example.com",
      // Wechat: "https://example.com",
      // Weibo: "https://example.com",
      // Whatsapp: "https://example.com",
      // Youtube: "https://example.com",
      // Zhihu: "https://example.com",
      // MrHope: ["https://mrhope.site", MR_HOPE_AVATAR],
    },
  },

  headerDepth: 2,

  locales: {
    /**
     * Chinese locale config
     */
    "/zh/": {
      // navbar
      navbar: zhNavbar,

      // sidebar
      sidebar: zhSidebar,

      footer: "CC BY-NC-SA 4.0 协议 | 由 ❤️ 驱动",

      displayFooter: true,

      blog: {
        description: "一个不专业的全栈开发者",
        intro: "/zh/intro.html",
      },

      // page meta
      metaLocales: {
        editLink: "编辑此页",
      },
    },

    /**
     * English locale config
     */
    "/en/": {
      // navbar
      navbar: enNavbar,

      // sidebar
      sidebar: enSidebar,

      footer: "CC BY-NC-SA 4.0 Licensed | Made with ❤️",

      displayFooter: true,

      blog: {
        description: "A non-professional full-stack developer",
        intro: "/en/intro.html",
      },

      metaLocales: {
        editLink: "Edit this page",
      },
    },
  },

  markdown: {
    // Markdown Tabs
    tabs: true,
    codeTabs: true,
    // Markdown RevealJS
    revealjs: {
      plugins: ["highlight", "math", "search", "notes", "zoom"],
    },
    // Markdown Image
    imgLazyload: true,
    imgMark: true,
    imgSize: true,
    figure: true,
    // Code highlighter
    highlighter: {
      type: "shiki",
      theme: "dark-plus",
      langs: [
        "ts",
        "scss",
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
    },
    // Markdown Enhance
    align: true,
    attrs: true,
    chartjs: true,
    demo: true,
    echarts: true,
    flowchart: true,
    gfm: true,
    include: true,
    mark: true,
    mermaid: true,
    playground: {
      presets: ["ts", "vue"],
    },
    stylize: [
      {
        matcher: "Recommended",
        replacer: ({ tag }) => {
          if (tag === "em")
            return {
              tag: "Badge",
              attrs: { type: "tip" },
              content: "Recommended",
            };
        },
      },
    ],
    sub: true,
    sup: true,
    vPre: true,
    vuePlayground: true,
  },

  navbarLayout: {
    start: ["Brand"],
    center: ["Links"],
    end: ["Language", "Repo", "Outlook", "Search"],
  },

  plugins: {
    blog: true,

    components: {
      components: [
        "Badge",
        "BiliBili",
        "CodePen",
        "PDF",
        // "Replit",
        // "StackBlitz",
        "VidStack",
      ],
    },

    comment: {
      // // @ts-expect-error: You should generate and use your own comment service
      provider: "Giscus",
      repo: "TeddyHuang-00/teddyhuang-00.github.io",
      repoId: "R_kgDOIIxzaw",
      category: "Announcements",
      categoryId: "DIC_kwDOIIxza84CR07z",
      lightTheme: "light_protanopia",
      darkTheme: "transparent_dark",
    },

    copyright: {
      // 全局启用版权信息
      global: true,
      // 禁用复制
      disableCopy: false,
      // 版权信息
      license: "CC BY-NC-SA 4.0",
    },

    docsearch: {
      appId: "GQWRTHZR5O",
      apiKey: "29d33a940d6df255b8e18ce923022671",
      indexName: "teddyhuang-00io",
      locales: {
        "/zh/": {
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
                reportMissingResultsText:
                  "Do you think this query should have results?",
                reportMissingResultsLinkText: "Click here to report it",
              },
            },
          },
        },
      },
    },

    git: {
      // 展示贡献者
      contributors: false,
      // 展示创建时间
      createdTime: false,
      // 展示最后更新时间
      updatedTime: true,
    },

    redirect: {
      autoLocale: true,
      localeConfig: {
        "/zh/": ["zh-CN", "zh-TW", "zh"],
        "/en/": ["en-US", "en-UK", "en"],
      },
    },
  },

  sidebarSorter: ["readme", "order", "date", "title", "filename"],

  // themeColor: {
  //   blue: "#2196f3",
  //   red: "#f26d6d",
  //   green: "#3eaf7c",
  //   orange: "#fb9b5f",
  // },
});
