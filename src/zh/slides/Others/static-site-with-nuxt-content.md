---
layout: SlidePage
title: Nuxt Content 搭建静态网站
date: 2023-07-16
icon: material-symbols:web
---

<!-- iGEM wiki 课程第二讲 -->

<!-- more -->

@slidestart

## iGEM wiki 课程

<!-- .element: class="r-fit-text" -->

第三讲：Nuxt Content 搭建静态网站

<!-- .element: class="r-fit-text" -->

> 黄楠 · 2023 年 7 月

---

<!-- .slide: data-auto-animate -->

## 什么是 Nuxt?

<!-- .element: class="r-fit-text" -->

--

<!-- .slide: data-auto-animate -->

## 什么是 Nuxt?

基于 Vue.js 的框架

<!-- .element: class="r-fit-text" -->

--

<!-- .slide: data-auto-animate -->

## 什么是 Nuxt?

基于 Vue.js 的框架

更便捷的开发体验

<!-- .element: class="r-fit-text" -->

--

<!-- .slide: data-auto-animate -->

## 什么是 Nuxt?

基于 Vue.js 的框架

更便捷的开发体验

插件/模块系统

<!-- .element: class="r-fit-text" -->

--

<!-- .slide: data-auto-animate -->

## 什么是 Nuxt?

基于 Vue.js 的框架

更便捷的开发体验

插件/模块系统

自动路由

<!-- .element: class="r-fit-text" -->

---

<!-- .slide: data-auto-animate -->

## 项目配置

<!-- .element: class="r-fit-text" -->

--

<!-- .slide: data-auto-animate -->

## 项目配置

### 插件推荐

- Nuxt (unofficial)
<!-- .element: class="fragment fade-in" -->
- Iconify IntelliSense
<!-- .element: class="fragment fade-in" -->

--

<!-- .slide: data-auto-animate -->

## 项目配置

创建项目

```bash
pnpm dlx nuxi@latest init content-app -t content
```

在 VS Code 中打开项目并安装依赖

```bash
pnpm install
```

--

<!-- .slide: data-auto-animate -->

## 项目配置

添加 Tailwind 模块

```bash
pnpm add -D @nuxtjs/tailwindcss
```

`nuxt.config.ts`

```ts
export default defineNuxtConfig({
  modules: ["@nuxt/content", "@nuxtjs/tailwindcss"],
  // ...
});
```

--

<!-- .slide: data-auto-animate -->

## 项目配置

添加 Tailwind 模块

`tailwind.config.ts`

```ts
import type { Config } from "tailwindcss";
import colors from "tailwindcss/colors";

export default {
  content: [
    "./app.vue",
    "./{components,pages,content}/**/*.{vue,js,ts,jsx,tsx,html,md}",
  ],
  theme: {
    extend: {
      colors: {
        primary: colors.slate,
      },
    },
  },
  plugins: [],
} satisfies Config;
```

--

<!-- .slide: data-auto-animate -->

## 项目配置

添加 Tailwind 模块

`assets/css/tailwind.css`

```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

--

<!-- .slide: data-auto-animate -->

## 项目配置

添加 Icon 模块

```bash
pnpm add -D nuxt-icon
```

`nuxt.config.ts`

```ts
export default defineNuxtConfig({
  modules: ["@nuxt/content", "@nuxtjs/tailwindcss", "nuxt-icon"],
  content: {
    documentDriven: true,
    navigation: {
      fields: ["cover"],
    },
  },
});
```

---

<!-- .slide: data-auto-animate -->

## Wiki 网站

<!-- .element: class="r-fit-text" -->

--

<!-- .slide: data-auto-animate -->

## Wiki 网站

项目结构

- `components/`: 组件
  - `content/`: 页面中可使用的组件
- `content/`: 页面源内容（markdown 文件）
- `pages/`: 页面路由框架
- `public/`: 公共资源

--

<!-- .slide: data-auto-animate -->

## Wiki 网站

内容编写 - `content/*.md`

```md
---
title: About
---

# About Content v2

## Hi

**strong** and _italic_ and ~~strikethrough~~ and `Code` text

[Back home](/)
```

--

<!-- .slide: data-auto-animate -->

## Wiki 网站

页面布局 - `app.vue`

```html
<AppLayout>
  <NuxtPage />
</AppLayout>
```

--

<!-- .slide: data-auto-animate -->

## Wiki 网站

页面布局 - `components/AppLayout.vue`

```html
<div>
  <html lang="en" />
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <AppNavBar />
  <slot />
</div>
```

--

<!-- .slide: data-auto-animate -->

## Wiki 网站

导航栏 - `components/AppNavBar.vue`

```html
<div
  class="sticky top-2 z-50 p-4 my-2 mx-4 border border-primary-400 rounded-lg bg-primary-300 bg-opacity-50 border-opacity-50 backdrop-blur-sm"
>
  <ContentNavigation v-slot="{ navigation }" class="float-right">
    <ul class="flex flex-row gap-4">
      <li>
        <Icon name="uil:github" size="24" />
      </li>
      <li class="flex-grow"></li>
      <li
        v-for="link in navigation"
        :key="link._path"
        class="py-2 px-4 border rounded-md bg-primary-100 border-primary-200 hover:bg-primary-200 hover:border-primary-300 transition-colors"
      >
        <NuxtLink :to="link._path" class="border-none hover:border-none">
          <Icon v-if="link.icon" :name="link.icon" size="24" />
          <div v-else>{{ link.title }}</div>
        </NuxtLink>
      </li>
    </ul>
  </ContentNavigation>
</div>
```

--

<!-- .slide: data-auto-animate -->

## Wiki 网站

内容页面 - `pages/[..slug].vue`

```html
<div>
  <AppSideBar />
  <div
    class="max-w-2xl px-4 py-10 m-auto bg-white sm:px-8 sm:shadow ring-1 ring-gray-200 sm:rounded-lg"
  >
    <main class="max-w-none">
      <ContentDoc>
        <template #empty>
          <h1>Oops, nothing here yet</h1>
          <NuxtLink href="/">Go back home</NuxtLink>
        </template>
        <template #not-found>
          <h1>Oops, nothing found</h1>
          <NuxtLink href="/">Go back home</NuxtLink>
        </template>
      </ContentDoc>
    </main>
  </div>
</div>
```

--

<!-- .slide: data-auto-animate -->

## Wiki 网站

侧边栏 - `components/AppSideBar.vue`

```html
<div
  class="fixed left-4 top-24 h-[calc(100vh-7rem)] bg-white bg-opacity-70 backdrop-blur-sm border rounded-lg transition-all ease-out flex flex-row"
  :class="{ 'w-12': !expand, 'w-1/4': expand }"
>
  <div
    class="transition-all ease-in delay-150 overflow-hidden flex-grow"
    :class="{ 'opacity-0': !expand, 'opacity-100': expand }"
  >
    <ul class="m-6" :class="{ 'mx-[100vw]': !expand }">
      <li v-for="e in toc.links" class="list-disc list-inside">
        <NuxtLink :href="'#' + e.id">{{ e.text }}</NuxtLink>
        <ul v-if="e.children.length">
          <li v-for="c in e.children" class="pl-4 list-disc list-inside">
            <NuxtLink :href="'#' + c.id">{{ c.text }}</NuxtLink>
          </li>
        </ul>
      </li>
    </ul>
  </div>
  <div
    @click="expand = !expand"
    class="cursor-pointer h-full flex justify-center items-center transition-all ease-out p-2"
    :class="{ 'rotate-180': expand }"
  >
    <Icon name="ph:play-fill" size="18" />
  </div>
</div>
```

```ts
const { toc } = useContent();
const expand = ref(false);
```

--

<!-- .slide: data-auto-animate -->

## Wiki 网站

全局样式 - `assets/css/tailwind.css`

```css
@layer base {
  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    @apply scroll-mt-20;
  }
  h1 {
    @apply text-3xl;
  }
  h2 {
    @apply text-2xl;
  }
  h3 {
    @apply text-xl;
  }
  h4 {
    @apply text-lg;
  }
  h5 {
    @apply text-base;
  }
  h6 {
    @apply text-sm;
  }
  body {
    @apply bg-primary-50 text-black;
  }
  a {
    @apply border-b border-dashed hover:border-solid transition-all border-primary-900;
  }
  p {
    @apply leading-8;
  }
}
```

--

<!-- .slide: data-auto-animate -->

## Wiki 网站

落地页设计 - `pages/index.vue`

```html
<div>
  <h1
    class="text-center w-full pt-20 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 bg-clip-text text-transparent text-9xl font-bold"
  >
    Hello world!
  </h1>

  <p class="text-center max-w-sm mx-auto pt-20">
    This will be a fancy website landing page
  </p>
</div>
```

--

<!-- .slide: data-auto-animate -->

## Wiki 网站

URL 设置 - `nuxt.config.ts`

```ts
export default defineNuxtConfig({
  // ...
  app: {
    baseURL: "/peking/",
  },
});
```

--

<!-- .slide: data-auto-animate -->

## Wiki 网站

添加图片 - `components/content/ProseImg.vue`

```html
<img :src="refinedSrc" :alt="alt" :width="width" :height="height" />
```

```ts
import { joinURL } from "ufo";

const props = defineProps({
  src: {
    type: String,
    default: "",
  },
  alt: {
    type: String,
    default: "",
  },
  width: {
    type: [String, Number],
    default: undefined,
  },
  height: {
    type: [String, Number],
    default: undefined,
  },
});
const { cdnURL } = useAppConfig();
const refinedSrc = computed(() => {
  return joinURL((cdnURL as string) || "/", props.src);
});
```

--

<!-- .slide: data-auto-animate -->

## Wiki 网站

添加图片 - `app.config.ts`

```ts
export default defineAppConfig({
  cdnURL: "https://static.igem.wiki/teams/4713/wiki/",
});
```

--

<!-- .slide: data-auto-animate -->

## Wiki 网站

添加图片 - `content/about.md`

```md
![iGEM](/igem.png)
```

--

<!-- .slide: data-auto-animate -->

## Wiki 网站

自定义组件 - `components/content/Browser.vue`

```html
<div
  class="bg-primary-50 border border-primary-100 shadow-2xl relative rounded-lg pt-8 overflow-hidden my-5"
>
  <div class="absolute left-3 flex justify-between w-12 top-2.5">
    <span class="w-3 h-3 rounded-full bg-rose-400"></span>
    <span class="w-3 h-3 rounded-full bg-amber-400"></span>
    <span class="w-3 h-3 rounded-full bg-green-400"></span>
  </div>
  <div class="w-full leading-3 block">
    <slot />
  </div>
</div>
```

--

<!-- .slide: data-auto-animate -->

## Wiki 网站

自定义组件 - `pages/*.md`

```md
::Browser
![iGEM](/igem.png)
::
```

---

<!-- .slide: data-auto-animate -->

## GitLab

<!-- .element: class="r-fit-text" -->

--

<!-- .slide: data-auto-animate -->

## GitLab

CI/CD - `.gitlab-ci.yml`

```yml
default:
  image: node:latest
  before_script:
    - corepack enable
    - corepack prepare pnpm@latest-8 --activate
    - pnpm config set store-dir .pnpm-store
  cache:
    key:
      files:
        - pnpm-lock.yaml
    paths:
      - .pnpm-store

pages:
  stage: deploy
  script:
    - pnpm install
    - pnpm generate
    - rm -rf public
    - mv .output/public public
  artifacts:
    paths:
      - public
  only:
    - main
```

---

<!-- .slide: data-auto-animate -->

# 拓展阅读

<!-- .element: class="r-fit-text" -->

--

<!-- .slide: data-auto-animate -->

# 拓展阅读

- [GitHub repo](https://github.com/TeddyHuang-00/ContentSiteDemo)
<!-- .element: class="fragment fade-in" -->
- [Nuxt.js 3 docs](https://v3.nuxtjs.org/)
<!-- .element: class="fragment fade-in" -->
- [Nuxt Content v2 docs](https://content.nuxtjs.org/)
<!-- .element: class="fragment fade-in" -->
- [Icon sets](https://icon-sets.iconify.design/)
<!-- .element: class="fragment fade-in" -->
- [Tailwind Docs](https://www.tailwindcss.cn/docs/installation)
<!-- .element: class="fragment fade-in" -->
- [Component Library](https://flowbite.com/#components)
<!-- .element: class="fragment fade-in" -->

---

<!-- .slide: data-auto-animate -->

# Thanks for your time!

<!-- .element: class="r-fit-text" -->

@slideend
