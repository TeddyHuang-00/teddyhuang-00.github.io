---
layout: Slide
title: Vue Tailwind TypeScript 速成
date: 2023-07-15
icon: material-symbols:web
---

<!-- iGEM wiki 课程第二讲 -->

<!-- more -->

@slidestart

## iGEM wiki 课程

<!-- .element: class="r-fit-text" -->

第二讲：Vue Tailwind TypeScript 速成

<!-- .element: class="r-fit-text" -->

> 黄楠 · 2023 年 7 月

---

<!-- .slide: data-auto-animate -->

## Why Vue?

<!-- .element: class="r-fit-text" -->

--

<!-- .slide: data-auto-animate -->

## Why Vue?

视图组件

<!-- .element: class="r-fit-text" -->

--

<!-- .slide: data-auto-animate -->

## Why Vue?

视图组件

代码复用

<!-- .element: class="r-fit-text" -->

--

<!-- .slide: data-auto-animate -->

## Why Vue?

视图组件

代码复用

社区生态

<!-- .element: class="r-fit-text" -->

--

<!-- .slide: data-auto-animate -->

## Why Vue?

视图组件

代码复用

社区生态

简单易学

<!-- .element: class="r-fit-text" -->

--

<!-- .slide: data-auto-animate -->

## Why Vue?

![Vue schematic](/projects/WEB/vue-schematic.svg)

---

<!-- .slide: data-auto-animate -->

## 环境配置

<!-- .element: class="r-fit-text" -->

--

<!-- .slide: data-auto-animate -->

## 环境配置

### [Node.js](https://nodejs.org/zh-cn)

<iframe src="https://nodejs.org/zh-cn"></iframe>

--

<!-- .slide: data-auto-animate -->

## 环境配置

### [pnpm](https://pnpm.io/zh/)

<iframe src="https://pnpm.io/zh/installation"></iframe>

--

<!-- .slide: data-auto-animate -->

## 环境配置

创建项目

```bash
pnpm create vue@latest
```

✅Add TypeScript? Yes

✅Add Vue Router? Yes

在 VS Code 中打开项目并安装依赖

```bash
pnpm install
```

--

<!-- .slide: data-auto-animate -->

## 环境配置

### 插件推荐

- Vue
<!-- .element: class="fragment fade-in" -->
- Vue Language Features (Volar)
<!-- .element: class="fragment fade-in" -->
- TypeScript Vue Plugin (Volar)
<!-- .element: class="fragment fade-in" -->
- Vue VSCode Snippets
<!-- .element: class="fragment fade-in" -->
- vue-helper
<!-- .element: class="fragment fade-in" -->

---

<!-- .slide: data-auto-animate -->

## Vue 概览

<!-- .element: class="r-fit-text" -->

--

<!-- .slide: data-auto-animate -->

## Vue 概览

项目结构

<!-- .element: class="r-fit-text" -->

--

<!-- .slide: data-auto-animate -->

## Vue 概览

项目结构

- `public`：公共资源（不打包）

<!-- .element: class="fragment fade-in" -->

- `src`：源代码
  - `assets`：静态资源（打包）
  - `components`：组件
  - `router`：路由
  - `views`：页面

<!-- .element: class="fragment fade-in" -->

--

<!-- .slide: data-auto-animate -->

## Vue 概览

程序入口

`index.html`

```html
<div id="app"></div>
```

`main.ts`

```ts
createApp(App).mount("#app");
```

--

<!-- .slide: data-auto-animate -->

## Vue 概览

程序入口

`App.vue`

![Vue sfc](/projects/WEB/vue-sfc.svg)

<!-- .element: class="r-stretch" -->

---

<!-- .slide: data-auto-animate -->

## Vue 实战

<!-- .element: class="r-fit-text" -->

--

<!-- .slide: data-auto-animate -->

## Vue 实战

清理项目（`src`）

- 删除 `assets`、`components`、`views`、`router` 目录内容
- `App.vue` 中只保留骨架
- 删除 `main.ts` 中的路由、样式相关代码

--

<!-- .slide: data-auto-animate -->

## Vue 实战

模板语法 - `App.vue`

```vue-html
<template>
  <div>
    <h1>Hello, world!</h1>
  </div>
</template>
```

--

<!-- .slide: data-auto-animate -->

## Vue 实战

模板语法 - `App.vue`

```html
<div>
  <h1>{{ text }}</h1>
</div>
```

```ts
const text = "Hello, world!";
```

--

<!-- .slide: data-auto-animate -->

## Vue 实战

响应式数据 - `App.vue`

```html
<div>
  <h1>{{ text }}</h1>
  <button @click="text+='.'">Click me</button>
</div>
```

```ts
import { ref } from "vue";

const text = ref("Hello, world!");
```

--

<!-- .slide: data-auto-animate -->

## Vue 实战

表单输入绑定 - `App.vue`

```html
<div>
  <input v-model="text" />
  <h1>{{ text }}</h1>
</div>
```

```ts
const text = ref("");
```

--

<!-- .slide: data-auto-animate -->

## Vue 实战

响应式列表数据 - `App.vue`

```html
<div>
  <input v-model="text" />
  <h1>{{ text }}</h1>
  {{ todos }}
</div>
```

```ts
const text = ref("");
const todos = ref([] as string[]);
```

--

<!-- .slide: data-auto-animate -->

## Vue 实战

处理提交 - `App.vue`

```html
<form @submit.prevent="appendTodo">
  <input v-model="text" />
  <button type="submit">Add</button>
</form>
```

```ts
function appendTodo() {
  todos.value.push(text.value);
  text.value = "";
}
```

--

<!-- .slide: data-auto-animate -->

## Vue 实战

计算属性 & 条件渲染 - `App.vue`

```html
<div v-if="num_todos">{{ todos }}</div>
<div v-else>No todos here...</div>
```

```ts
import { computed, ref } from "vue";

const num_todos = computed(() => todos.value.length);
```

--

<!-- .slide: data-auto-animate -->

## Vue 实战

列表渲染 - `App.vue`

```html
<div v-if="todos.length">
  <div v-for="todo in todos">{{ todo }}</div>
</div>
<div v-else>No todos here...</div>
```

```ts
function appendTodo() {
  todos.value.push(text.value);
  text.value = "";
}
```

--

<!-- .slide: data-auto-animate -->

## Vue 实战

单文件组件（SFC） - `components/TodoItem.vue`

```html
<div>
  <h3>{{ msg }}</h3>
</div>
```

```ts
const msg = "Hello, world!";
```

--

<!-- .slide: data-auto-animate -->

## Vue 实战

使用 SFC - `App.vue`

```html
<div v-for="todo in todos"><TodoItem></TodoItem></div>
```

```ts
import TodoItem from "./components/TodoItem.vue";
```

--

<!-- .slide: data-auto-animate -->

## Vue 实战

接受参数 - `components/TodoItem.vue`

```ts
defineProps({
  msg: String,
});
```

--

<!-- .slide: data-auto-animate -->

## Vue 实战

传递参数 - `App.vue`

```html
<div v-for="todo in todos">
  <TodoItem :msg="todo"></TodoItem>
</div>
```

--

<!-- .slide: data-auto-animate -->

## Vue 实战

触发事件 - `components/TodoItem.vue`

```html
<button @click="$emit('delete')">Delete</button>
```

```ts
defineEmits({
  delete: null,
});
```

--

<!-- .slide: data-auto-animate -->

## Vue 实战

监听事件 - `App.vue`

```html
<TodoItem :msg="todo" @delete="removeTodo(todo)"></TodoItem>
```

```ts
function removeTodo(msg: string) {
  todos.value = todos.value.filter((todo) => todo !== msg);
}
```

---

<!-- .slide: data-auto-animate -->

## Why Tailwind?

<!-- .element: class="r-fit-text" -->

--

<!-- .slide: data-auto-animate -->

## Why Tailwind?

无需编写 CSS

<!-- .element: class="r-fit-text" -->

--

<!-- .slide: data-auto-animate -->

## Why Tailwind?

无需编写 CSS

实用性优先

<!-- .element: class="r-fit-text" -->

--

<!-- .slide: data-auto-animate -->

## Why Tailwind?

无需编写 CSS

实用性优先

性能优化

<!-- .element: class="r-fit-text" -->

--

<!-- .slide: data-auto-animate -->

## Why Tailwind?

无需编写 CSS

实用性优先

性能优化

可定制性

<!-- .element: class="r-fit-text" -->

---

<!-- .slide: data-auto-animate -->

## 环境配置

<!-- .element: class="r-fit-text" -->

--

<!-- .slide: data-auto-animate -->

## 环境配置

安装依赖

```bash
pnpm add -D tailwindcss@latest postcss@latest autoprefixer@latest
```

--

<!-- .slide: data-auto-animate -->

## 环境配置

初始化 Tailwind 配置文件

```bash
pnpm tailwindcss init -p --ts
```

--

<!-- .slide: data-auto-animate -->

## 环境配置

配置 Tailwind - `tailwind.config.ts`

```ts
import type { Config } from "tailwindcss";

export default {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx,html}"],
  theme: {
    extend: {},
  },
  plugins: [],
} satisfies Config;
```

--

<!-- .slide: data-auto-animate -->

## 环境配置

导入 Tailwind

`src/assets/tailwind.css`

```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

`src/main.ts`

```ts
import "@/assets/tailwind.css";
```

--

<!-- .slide: data-auto-animate -->

## 环境配置

插件推荐

Tailwind CSS IntelliSense

---

<!-- .slide: data-auto-animate -->

## Tailwind 实战

<!-- .element: class="r-fit-text" -->

--

<!-- .slide: data-auto-animate -->

## Tailwind 实战

添加背景色与宽高 - `App.vue`

```html
<body class="bg-gray-300 w-full h-full min-h-screen">
  <!-- ... -->
</body>
```

--

<!-- .slide: data-auto-animate -->

## Tailwind 实战

元素大小与边距 - `App.vue`

```html
<div class="container max-w-lg mx-auto py-8 px-10">
  <!-- ... -->
</div>
```

--

<!-- .slide: data-auto-animate -->

## Tailwind 实战

字体大小与居中 - `App.vue`

```html
<h1 class="text-3xl text-center py-10">Todo List</h1>
<!-- ... -->
<div v-else class="pt-5 text-2xl text-center">No todos here...</div>
```

--

<!-- .slide: data-auto-animate -->

## Tailwind 实战

相对位置、字符、边框 - `App.vue`

```html
<form @submit.prevent="appendTodo" class="relative">
  <input
    v-model="text"
    class="block w-full p-4 rounded-lg border border-gray-300 text-xl text-gray-900 bg-gray-50"
    placeholder="Add a todo..."
  />
  <button
    type="submit"
    class="absolute right-2.5 bottom-2.5 px-4 py-2 rounded-lg font-semibold text-xl text-white bg-blue-700"
  >
    Add
  </button>
</form>
```

--

<!-- .slide: data-auto-animate -->

## Tailwind 实战

状态 - `App.vue`

```html
<form @submit.prevent="appendTodo" class="relative">
  <input
    v-model="text"
    class="block w-full p-4 rounded-lg border border-gray-300 text-xl text-gray-900 bg-gray-50 focus:ring-blue-500 focus:border-blue-500"
    placeholder="Add a todo..."
  />
  <button
    type="submit"
    class="absolute right-2.5 bottom-2.5 px-4 py-2 rounded-lg font-semibold text-xl text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300"
  >
    Add
  </button>
</form>
```

--

<!-- .slide: data-auto-animate -->

## Tailwind 实战

flex - `components/TodoItem.vue`

```html
<div class="pt-1 flex flex-row gap-1">
  <h1
    class="w-full p-4 rounded-lg border border-gray-300 text-xl text-gray-900 bg-gray-50 focus:ring-blue-500 focus:border-blue-500"
  >
    {{ msg }}
  </h1>
  <button
    @click="$emit('delete')"
    class="flex-1 px-4 py-2 rounded-lg text-md font-medium text-white bg-rose-600 hover:bg-rose-700 focus:ring-4 focus:outline-none focus:ring-rose-300"
  >
    Delete
  </button>
</div>
```

---

<!-- .slide: data-auto-animate -->

# 拓展阅读

<!-- .element: class="r-fit-text" -->

--

<!-- .slide: data-auto-animate -->

# 拓展阅读

- [GitHub repo](https://github.com/TeddyHuang-00/VueAppDemo)
<!-- .element: class="fragment fade-in" -->
- [Vue.js 3 Docs](https://cn.vuejs.org/guide/introduction.html#api-styles)
<!-- .element: class="fragment fade-in" -->
- [Tailwind Docs](https://www.tailwindcss.cn/docs/installation)
<!-- .element: class="fragment fade-in" -->
- [Component Library](https://flowbite.com/#components)
<!-- .element: class="fragment fade-in" -->
- [Vue.js 3 Tutorial - The Net Ninja](https://www.youtube.com/playlist?list=PL4cUxeGkcC9hYYGbV60Vq3IXYNfDk8At1)
<!-- .element: class="fragment fade-in" -->
- [Vue.js + Tailwind - The Net Ninja](https://www.youtube.com/watch?v=gUsBaB5ViAo&list=PL4cUxeGkcC9hfoy8vFQ5tbXO3vY0xhhUZ&pp=iAQB)
<!-- .element: class="fragment fade-in" -->

---

<!-- .slide: data-auto-animate -->

# Thanks for your time!

<!-- .element: class="r-fit-text" -->

@slideend
