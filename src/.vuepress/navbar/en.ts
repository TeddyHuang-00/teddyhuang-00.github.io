import { navbar } from "vuepress-theme-hope";

export const enNavbar = navbar([
  "/en/",
  {
    text: "Posts",
    icon: "material-symbols:description",
    prefix: "/en/posts/",
    children: [
      {
        text: "Dev Log",
        icon: "material-symbols:code",
        link: "DevLog/",
      },
      {
        text: "Study Note",
        icon: "material-symbols:book",
        link: "Notes/",
      },
      {
        text: "Rand Out",
        icon: "material-symbols:edit-note",
        link: "Misc/",
      },
    ],
  },
  {
    text: "Tutorial",
    icon: "material-symbols:school",
    prefix: "/en/tutorials/",
    children: [
      {
        text: "Streamlit",
        icon: "material-symbols:web",
        link: "Streamlit/",
      },
    ],
  },
  {
    text: "Slides",
    icon: "material-symbols:slideshow",
    prefix: "/en/slides/",
    children: [
      {
        text: "Journal Club",
        icon: "material-symbols:group",
        link: "JC/",
      },
      {
        text: "Others",
        icon: "material-symbols:shuffle",
        link: "Others/",
      },
    ],
  },
]);
