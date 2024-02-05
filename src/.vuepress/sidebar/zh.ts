import { sidebar } from "vuepress-theme-hope";

export const zhSidebar = sidebar({
  "/zh/posts/": "structure",
  "/zh/tutorials/": "structure",
  "/zh/slides/": "structure",
  "/zh/": ["", "intro"], // fallback
});
