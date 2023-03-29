import { navbar } from "vuepress-theme-hope";

export const zhNavbar = navbar([
  "/zh/",
  {
    text: "文章",
    icon: "material-symbols:description",
    prefix: "/zh/posts/",
    children: [
      {
        text: "开发日志",
        icon: "material-symbols:code",
        link: "DevLog/",
      },
      {
        text: "随笔",
        icon: "material-symbols:edit-note",
        link: "Misc/",
      },
    ],
  },
  {
    text: "教程",
    icon: "material-symbols:school",
    prefix: "/zh/tutorials/",
    children: [
      {
        text: "Streamlit",
        icon: "material-symbols:web",
        link: "Streamlit/",
      },
    ],
  },
  {
    text: "幻灯片",
    icon: "material-symbols:slideshow",
    prefix: "/zh/slides/",
    children: [
      {
        text: "组会",
        icon: "material-symbols:group",
        link: "JC/",
      },
      {
        text: "其他",
        icon: "material-symbols:shuffle",
        link: "Others/",
      },
    ],
  },
]);
