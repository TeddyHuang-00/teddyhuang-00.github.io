import type { GiscusProps } from "@giscus/react";

export const SITE = {
  // deployed domain
  website: "https://teddyhuang-00.github.io/",
  profile: "https://teddyhuang-00.github.io/",
  author: "Nan Huang",
  ogImage: null,
  lightAndDarkMode: true,
  postPerIndex: 4,
  postPerPage: 4,
  // 15 minutes
  scheduledPostMargin: 15 * 60 * 1000,
  showArchives: true,
  // show back button in post detail
  showBackButton: true,
  editPost: {
    enabled: true,
    text: "Edit page",
    url: "https://github.com/teddyhuang-00/teddyhuang-00.github.io/edit/main/",
  },
  dynamicOgImage: true,
  // "rtl" | "auto"
  dir: "ltr",
  // html lang code. Set this empty and default will be "en"
  lang: "en",
  // supported locales
  locales: {
    en: { label: "English", codes: ["en", "en-US"] },
    zh: { label: "中文", codes: ["zh", "zh-CN"] },
  },
  // default locale
  defaultLocale: "en",
  // Default global timezone (IANA format) https://en.wikipedia.org/wiki/List_of_tz_database_time_zones
  timezone: "America/New_York",
} as const;

export const GISCUS: GiscusProps = {
  repo: "TeddyHuang-00/teddyhuang-00.github.io",
  repoId: "R_kgDOIIxzaw",
  category: "Announcements",
  categoryId: "DIC_kwDOIIxza84CR07z",
  mapping: "pathname",
  reactionsEnabled: "1",
  emitMetadata: "0",
  inputPosition: "top",
  loading: "lazy",
};
