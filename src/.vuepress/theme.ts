import { hopeTheme } from "vuepress-theme-hope";
import { enNavbar, zhNavbar } from "./navbar/index.js";
import { enSidebar, zhSidebar } from "./sidebar/index.js";

export default hopeTheme({
  hostname: "https://TeddyHuang-00.github.io",

  author: {
    name: "TeddyHuang-00",
    url: "https://TeddyHuang-00.github.io",
  },

  // iconAssets: "iconfont",
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
    roundAvatar: true,
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

  navbarLayout: {
    start: ["Brand"],
    center: ["Links"],
    end: ["Language", "Repo", "Outlook", "Search"],
  },

  plugins: {
    blog: true,

    components: {
      components: [
        "AudioPlayer",
        "Badge",
        "BiliBili",
        "CodePen",
        "PDF",
        // "Replit",
        // "StackBlitz",
        "VideoPlayer",
        "YouTube",
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

    git: {
      // 展示贡献者
      contributors: false,
      // 展示创建时间
      createdTime: false,
      // 展示最后更新时间
      updatedTime: true,
    },

    mdEnhance: {
      align: true,
      attrs: true,
      chart: true,
      codetabs: true,
      demo: true,
      echarts: true,
      figure: true,
      flowchart: true,
      gfm: true,
      imgLazyload: true,
      imgSize: true,
      include: true,
      katex: true,
      mark: true,
      mermaid: true,
      playground: {
        presets: ["ts", "vue"],
      },
      revealJs: { plugins: ["highlight", "math", "search", "notes", "zoom"] },
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
      tabs: true,
      vPre: true,
      vuePlayground: true,
    },

    // prismjs: {
    //   light: "one-dark",
    //   dark: "one-dark",
    // },
    // Disable prism to use shiki
    prismjs: false,
  },

  sidebarSorter: ["readme", "order", "date", "title", "filename"],

  // themeColor: {
  //   blue: "#2196f3",
  //   red: "#f26d6d",
  //   green: "#3eaf7c",
  //   orange: "#fb9b5f",
  // },
});
