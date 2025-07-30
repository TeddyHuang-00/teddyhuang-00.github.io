export const SITE = {
  website: "https://teddyhuang-00.github.io/", // deployed domain
  profile: "https://teddyhuang-00.github.io/",
  author: "Nan Huang",
  desc: "The personal blog of Nan Huang.",
  title: "Nan's Blog",
  ogImage: null,
  lightAndDarkMode: true,
  postPerIndex: 4,
  postPerPage: 4,
  scheduledPostMargin: 15 * 60 * 1000, // 15 minutes
  showArchives: true,
  showBackButton: true, // show back button in post detail
  editPost: {
    enabled: true,
    text: "Edit page",
    url: "https://github.com/teddyhuang-00/teddyhuang-00.github.io/edit/main/",
  },
  dynamicOgImage: true,
  dir: "ltr", // "rtl" | "auto"
  lang: "en", // html lang code. Set this empty and default will be "en"
  timezone: "America/New_York", // Default global timezone (IANA format) https://en.wikipedia.org/wiki/List_of_tz_database_time_zones
} as const;
