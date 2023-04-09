---
title: 乔迁新站
icon: material-symbols:article
date: 2023-03-17
category:
  - DevLog
tag:
  - Blog
  - Web
  - Vuepress
  - Vue
  - Tailwind
sticky: false
star: true
---

使用基于 Vuepress 2 的 Hope 主题和 Tailwind CSS 重构了个人博客。

<!-- more -->

## 为什么要重构

[之前提到](../Misc/migration-note.md)，我之前的博客是基于 Pelican 搭建的，主要使用 Python Jinja2 的语法来作为模板生成内容。这种方式的好处是可以使用 Python 的强大功能，但是缺点也很明显，就是需要大量造轮子，并且编写 CSS 也比较费时费力。因此决定转用 Vuepress 2 + Typescript + Tailwind CSS 作为新的博客框架。

## 使用 Vuepress Theme Hope

[Hope 主题](https://theme-hope.vuejs.press/)基于 Vuepress 2 构建，内置了大量实用组件，并且也提供了一个不错的博客站点风格，相较于其他一些主题而言，开发与更新的活跃度也比较高，因此选择这个主题作为起始。

### 创建项目

我不是专业的前端开发者，因此对于 Node.js 的包管理工具一直都是比较迷糊的，所以用默认的 [npm](https://www.npmjs.com/) 来管理依赖。你也可以使用 [pnpm](https://pnpm.io/)<Badge text="官方推荐" type="tip" /> 或者 [yarn](https://yarnpkg.com/) 来安装。

::: warning
所有 Node.js 的包管理工具相关说明仅有 npm 经过测试，其他工具的使用方法如有出入，请自行查阅官方文档，或者在本文底下留言或提出 issue
:::

::: code-tabs#shell

@tab npm

```shell
npm init vuepress-theme-hope [dir]
```

@tab pnpm

```shell
pnpm create vuepress-theme-hope [dir]
```

@tab yarn

```shell
yarn create vuepress-theme-hope [dir]
```

:::

::: info 提示
`[dir]` 应当是你的博客站点的根目录名，不过这并不影响后续开发与部署
:::

### 启动开发服务器

根据命令行交互提示，设置完站点名称、作者、开源许可证等信息后，项目就会被创建好了。可以看到目录中 `package.json` 文件内包含了一些预设的命令：

```json
"scripts": {
  // 构建项目
  "docs:build": "vuepress build src",
  // 清除缓存，并启动开发服务器
  "docs:clean-dev": "vuepress dev src --clean-cache",
  // 启动开发服务器
  "docs:dev": "vuepress dev src",
  // 升级 Vuepress 与 Hope 主题
  "docs:update-package": "npx vp-update"
},
```

借此，我们可以进入项目目录，启动开发服务器了。

::: code-tabs#shell

@tab npm

```shell
cd [dir]
npm run docs:dev
```

@tab pnpm

```shell
cd [dir]
pnpm run docs:dev
```

@tab yarn

```shell
cd [dir]
yarn docs:dev
```

:::

### 编写内容

生成的 `src` 目录应当类似这样：

```text:no-line-numbers {14,18}
src/
├── .vuepress
│   ├── config.ts
│   ├── navbar/
│   ├── public/
│   ├── sidebar/
│   ├── styles/
│   └── theme.ts
├── README.md
├── zh/
│   ├── README.md
│   ├── intro.md
│   ├── demo/
│   ├── posts/
│   └── slide.md
├── intro.md
├── demo/
├── posts/
└── slide.md
```

其中 `/posts/` 和 `/zh/posts/` 目录就是用来存放博客文章的，当然你也可以新建其他的目录或者建子目录来存放不同分类的内容。文章以 Markdown 格式编写，支持的 Markdown 语法参见[主题文档](https://theme-hope.vuejs.press/zh/guide/get-started/markdown.html)。除了基本的语法支持外，还有很多[内置的增强功能](https://theme-hope.vuejs.press/zh/guide/markdown/intro.html)可用，这里不再一一赘述。

### 默认语言

由于我希望默认的站点语言是中文，因此主要需要修改的是 `locales` 以及路径相关的配置：

::: tabs

@tab 文件结构

把 `/zh/` 中的内容移动到 `/` 目录下，然后删除 `/zh/` 目录。原根目录中的对应内容提前移至 `/en/` 目录下。

@tab 主题配置

主题有关的配置文件位于 `/src/.vuepress/theme.ts`，这里还可以配置主题的基本信息、内置功能选项和插件等等。

需要将 `locales` 中的路径配置做调整

```ts
export default hopeTheme({
  // ...
  locales: {
    "/": {
      navbar: zhNavbar,
      sidebar: zhSidebar,
      // ...
    },

    "/en/": {
      navbar: enNavbar,
      sidebar: enSidebar,
      // ...
    },
  },
  // ...
});
```

@tab 站点配置

站点主配置文件位于 `/src/.vuepress/config.ts`，囊括了站点的基本信息、主题配置、插件配置、Markdown 配置等等。

同样需要将 `locales` 中的路径配置做调整

```ts
export default defineUserConfig({
  // ...
  locales: {
    "/": {
      lang: "zh-CN",
      // ...
    },
    "/en/": {
      lang: "en-US",
      // ...
    },
  },
  // ...
});
```

@tab 导航栏与侧边栏

导航栏配置位于 `/src/.vuepress/navbar/`，侧边栏配置位于 `/src/.vuepress/sidebar/`，均包含 `index.ts`、`zh.ts` 和 `en.ts` 三个文件，分别为索引、中文和英文配置。我们只需要将 `zh.ts` 和 `en.ts` 中的路径配置做调整即可。

以 `navbar/en.ts` 为例：

```ts
export const enNavbar = navbar([
  "/en/",
  {
    // ...
    prefix: "/en/posts/",
    children: [
      // ...
    ],
  },
]);
```

:::

## 自定义组件

### 编写组件

得益于 Vuepress 的强大功能，我们可以在 Markdown 中使用 Vue 组件，这样就可以在文章中插入一些自定义的内容了。比如，我想把原站点的仿浏览器装饰容器给加回来，就可以使用 Vue 写一个简单的单文件组件（SFC）即可。组件路径没有特殊要求，这里我们遵循一些约定，将其放在 `/src/.vuepress/components/` 目录下。新建一个文件 `BrowserMockup.vue`，并且往里面填入一些简单的模板：

```vue-html
<template>
  <div>
    <slot></slot>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped></style>
```

### 注册组件

到这里，这个组件还没有在项目中注册。我们将使用官方插件 [@vuepress/plugin-register-components@next](https://v2.vuepress.vuejs.org/reference/plugin/register-components.html) 为 Vuepress 注册我们的自定义组件：

::: code-tabs#shell

@tab npm

```shell
npm install -D @vuepress/plugin-register-components@next
```

@tab pnpm

```shell
pnpm add -D @vuepress/plugin-register-components@next
```

@tab yarn

```shell
yarn add -D @vuepress/plugin-register-components@next
```

:::

安装完成后，我们需要在 `/src/.vuepress/config.ts` 中使用进行注册。

::: tip

此处我们使用 Vuepress 内置功能获取路径，并且指定 `componentsDir` 将组件目录设置为 `/src/.vuepress/components`，这样该目录中所有 Vue 文件都会被注册为全局组件，方便以后使用。

:::

```ts {5,10-12}
// ...
import { registerComponentsPlugin } from "@vuepress/plugin-register-components";
import { getDirname, path } from "@vuepress/utils";
// ...
const __dirname = getDirname(import.meta.url);

export default defineUserConfig({
  // ...
  plugins: [
    registerComponentsPlugin({
      componentsDir: path.resolve(__dirname, "./components"),
    }),
    // ...
  ],
  // ...
});
```

完成注册之后，我们就能在 Markdown 中使用 `<BrowserMockup>` 标签来使用这个组件了。

```vue-html
<BrowserMockup>
  <img src="图片路径" alt="替代文本" />
</BrowserMockup>
```

## Tailwind 支持

由于 Hope 主题本身并不是使用 Tailwind CSS 开发的，因此我们需要自己配置一下 Tailwind CSS 的支持，这样我们在写自己的组件时可以方便地使用 Tailwind CSS 的工具类，不需要费劲脑汁取名和考虑打包体积了。

### 安装 Tailwind 工具链

按照 [Tailwind CSS 官方文档](https://tailwindcss.com/docs/guides/vue-3-vite)的指引，我们首先需要安装一些依赖，并且初始化 Tailwind CSS 的配置文件。

::: code-tabs#shell

@tab npm

```shell
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
```

@tab pnpm

```shell
pnpm add -D tailwindcss postcss autoprefixer
pnpx tailwindcss init -p
```

@tab yarn

```shell
yarn add -D tailwindcss postcss autoprefixer
yarn tailwindcss init -p
```

:::

### 配置 Tailwind

运行上面的命令后，在项目的根目录下应当可见 `tailwind.config.cjs` 和 `postcss.config.cjs` 两个文件，分别是 Tailwind CSS 和 PostCSS 的配置文件。我们需要在 `tailwind.config.cjs` 中添加一些额外的配置，以便于在 Vue 中使用 Tailwind CSS。

```js {6-7,11,18-25,29-31}
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    // 由于 . 开头的文件夹无法被通配符匹配
    // 因此需要手动指定其路径
    "./src/.vuepress/**/*.{vue,ts,js,jsx,tsx,md,html}",
    "./src/**/*.{vue,ts,js,jsx,tsx,md,html}",
  ],
  corePlugins: {
    // 禁用 preflight，防止覆盖原有样式
    preflight: false,
  },
  theme: {
    extend: {
      colors: {
        // 以下颜色变量来自 Hope 主题
        // 添加它们以便在 Tailwind 中使用
        "theme-color": "var(--theme-color)",
        "bg-primary": "var(--bg-color)",
        "bg-secondary": "var(--bg-color-secondary)",
        "bg-tertiary": "var(--bg-color-tertiary)",
        "border-color": "var(--border-color)",
        "box-shadow": "var(--box-shadow)",
        "text-color": "var(--text-color)",
        "card-shadow": "var(--card-shadow)",
      },
      screens: {
        // 参照 Hope 主题的配置，调整部分响应式断点
        sm: "720px",
        lg: "960px",
        xl: "1440px",
      },
    },
  },
  plugins: [],
};
```

为了能够全局使用 Tailwind CSS，我们需要在主题样式中进行导入，在 `/src/.vuepress/styles/index.scss` 中添加以下内容：

```scss
@tailwind base;
@tailwind components;
@tailwind utilities;
```

### 配置 PostCSS

最后一步，我们需要在 Vuepress 构建项目时正确地使用 PostCSS，以便于 Tailwind CSS 能够正常工作。我们需要在 `/src/.vuepress/config.ts` 中添加以下内容：

```ts {8-16}
import { defineUserConfig, viteBundler } from "vuepress";
import tailwindcss from "tailwindcss";
import autoprefixer from "autoprefixer";
// ...

export default defineUserConfig({
  // ...
  bundler: viteBundler({
    viteOptions: {
      css: {
        postcss: {
          plugins: [tailwindcss, autoprefixer],
        },
      },
    },
  }),
  // ...
});
```

到此为止，我们就能够在文档、本地组件等等中愉快地使用 Tailwind CSS 了。

## 部署到 GitHub Pages

最重要的一步，当然是把我们的站点让其他人能够访问到了，这里我们选择使用 GitHub Pages，因为它是免费的，而且几乎不需要额外的配置。

### 准备仓库

为了能够将站点部署到 `.github.io` 的根路径下，我们需要创建一个和 GitHub 用户名相同<Badge text="也可全部转为小写" type="info"/>的仓库，例如如果 GitHub 用户名是 `MeteorGuy`，那么就需要创建一个名为 `meteorguy.github.io` 的仓库。

为了后续方便操作，最好将仓库设置为追踪远程分支：

```shell
git remote add origin git@github.com:TeddyHuang-00/teddyhuang-00.github.io.git
```

::: tip
将路径替换为你自己的仓库路径
:::

### 发布方式

通常部署至 GitHub Pages 有多种方式，你可以：

- 选择将源分支下的 `docs` 文件夹作为站点根目录
- 选择将源分支的根目录作为站点根目录
- 选择使用特定的 GitHub Actions 工作流来部署

具体选项可以在仓库的 `设置` -> `页面` 中进行更改。这里我们使用第三种方式，即使用 GitHub Actions 来部署。可以自定义发布流程，灵活程度较高。

### 配置 GitHub Actions

GitHub Actions 是 GitHub 提供的 CI/CD 服务，可以在 GitHub 仓库中自动运行脚本，以实现自动化部署等功能。这里我保留了两种部署方式，一种是自动部署（在主分支有更新推送时自动构建），一种是手动部署（本地构建后部署）。两种方式各有优劣，自动部署更适合上手，因此我更推荐使用自动部署的方式。

:::: tabs

@tab 自动部署

尽管 Hope 主题已经提供了 GitHub Actions 的工作流，但是由于它会保留所有构建历史，对于站点仓库而言就是一种污染，会导致 git 不无限膨胀，因此我选择在此基础上魔改一下，将构建结果直接部署，因此也就不会有污染问题了。

首先，我们需要在仓库的根目录下创建 `.github/workflows/deploy.yml` 文件，内容如下：

```yml
# 工作流名称
name: 部署文档

# 确保有权限访问仓库和 GitHub Pages
permissions:
  contents: write
  pages: write
  id-token: write

# 触发条件，仅当有推送到 main 分支时触发
on:
  push:
    branches:
      # 确保这是你正在使用的分支名称
      - main
  # 允许你需要手动触发部署
  workflow_dispatch:

# 限制并发，防止多个相同工作流同时运行
concurrency:
  group: "pages"
  cancel-in-progress: true

jobs:
  build-n-deploy:
    # 部署到 GitHub Pages 必需的环境
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v3
        with:
          fetch-depth: 0
          # 如果你文档需要 Git 子模块，取消注释下一行
          # submodules: true

      - name: 设置 Node.js
        uses: actions/setup-node@v3
        with:
          node-version: 18
          cache: npm

      - name: 安装依赖
        run: npm ci

      - name: 构建文档
        env:
          NODE_OPTIONS: --max_old_space_size=8192
        run: |-
          npm run docs:build
          > src/.vuepress/dist/.nojekyll

      # 这一步是为了方便我们使用 Makefile
      # 来做一些后处理任务，不需要的话可以删除这步
      - name: Make 任务
        run: |
          make

      - name: 设置 Pages
        uses: actions/configure-pages@v2

      - name: 上传文件
        uses: actions/upload-pages-artifact@v1
        with:
          path: "src/.vuepress/dist"

      - name: 部署 GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v1
```

在上面的流程中，我们还设置了一步运行 Makefile 的任务，这是为了方便我们在构建完成后做一些后处理任务，即便不需要这一步，我也建议你暂时保留，以备不时之需。对应地，我们还需要在仓库的根目录下创建 `Makefile` 文件，内容如下：

```makefile
.PHONY: post-process

post-process:
	@echo "Hello from Makefile!"
```

其中具体任务的部分则可以根据需求自行配置，如果不需要，保持目标任务为空即可。

至此，你就可以利用 GitHub Actions 来自动构建和部署啦。

@tab 手动部署

由于我之前不太喜欢基于 GitHub Actions 的 CI/CD，感觉速度较慢，因此我选择将在本地构建完后，将构建好的文件作为无历史的孤儿分支强制推送到远程 `gh-pages` 分支 <Badge text="可以防止污染git仓库" type="info"/>，然后再使用 GitHub Actions 直接将 `gh-pages` 分支下的内容部署到 GitHub Pages。

Vuepress 默认的构建输出目录是 `/src/.vuepress/dist`，因此想要使用 GitHub Actions，需要在此目录中添加 `.github/workflows/deploy.yml` 文件，可以选择将整个 `.github` 文件夹添加至 `/src/.vuepress/public` 文件夹下，这样在构建时就能够被复制到构建输出目录中。`deploy.yml` 的文件内容如下：

```yaml
# 将静态内容部署至 GitHub Pages 的简单工作流
name: Deploy static content to Pages

on:
  # 当 gh-pages 分支有推送时触发
  push:
    branches:
      - gh-pages

  # 允许手动触发
  workflow_dispatch:

# 允许访问 GITHUB_TOKEN 以部署至 GitHub Pages
permissions:
  contents: read
  pages: write
  id-token: write

# 最多允许一个并发的工作流
concurrency:
  group: "pages"
  cancel-in-progress: true

jobs:
  deploy:
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v3
        with:
          ref: gh-pages
      - name: 配置 Pages
        uses: actions/configure-pages@v2
      - name: 上传文件
        uses: actions/upload-pages-artifact@v1
        with:
          # 上传整个目录
          path: "."
      - name: 部署至 GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v1
```

最后我们只需要在根目录中新建一个 `Makefile` 文件，用于在本地构建并自动推送到 `gh-pages` 分支：

```make {11}
.PHONY: github clean build

github: clean build
	@echo "======================================================"
	@echo "deploying to github"
	cd src/.vuepress/dist && \
	git init && \
	git add -A && \
	git commit -m 'deploy at $(shell date)' && \
	git branch -m local-build && \
	git push -f git@github.com:TeddyHuang-00/teddyhuang-00.github.io.git local-build:gh-pages

clean:
	@echo "======================================================"
	@echo "cleaning up output directory"
	- rm -rf src/.vuepress/dist

build:
	@echo "======================================================"
	@echo "building site"
	npm run docs:build
```

::: tip
你需要将最后一行中的路径设置为你自己的仓库路径。
:::

这样，每次可以选择在本地调试到满意后，敲一行命令就能完成部署了。

```shell
make github
# 或者
make
```

::::

## 总结

到此为止，我们已经完成了一个基于 Vuepress 的个人博客的搭建。其中一些部分确实花了我不少时间，但总的来说，相对于获得的主题功能和生态支持，这都是值得的。

如果你觉得这篇文章对你有所帮助，欢迎给我点个赞，或者在评论区留下你的想法。祝生活愉快！
