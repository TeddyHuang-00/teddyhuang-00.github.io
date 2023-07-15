---
layout: Slide
title: Web 基础与项目入门
date: 2023-07-08
icon: material-symbols:web
---

<!-- iGEM wiki 课程第一讲 -->

<!-- more -->

@slidestart

## iGEM wiki 课程

<!-- .element: class="r-fit-text" -->

第一讲：Web 基础与项目入门

<!-- .element: class="r-fit-text" -->

> 黄楠 · 2023 年 7 月

---

<!-- .slide: data-auto-animate -->

## Web 基础

<!-- .element: class="r-fit-text" -->

--

<!-- .slide: data-auto-animate -->

## Web 基础

![How web works](/projects/WEB/how-web-works.svg)

<!-- .element: class="r-stretch" -->

--

<!-- .slide: data-auto-animate -->

## Web 基础

![How web works](/projects/WEB/how-web-works.svg)

<!-- .element: class="r-stretch" -->

以[B 站](https://www.bilibili.com)为例

--

<!-- .slide: data-auto-animate -->

## 网站构成

<!-- .element: class="r-fit-text" -->

--

<!-- .slide: data-auto-animate -->

## 网站构成

<div class="grid grid-cols-6 grid-rows-none">
    <span class="col-span-2"></span>
    <div class="col-span-2 max-h-1/2">
        <img src="/projects/WEB/html.svg" alt="HTML">
        <p>HTML</p>
    </div>
    <span class="col-span-2"></span>
</div>

--

<!-- .slide: data-auto-animate -->

## 网站构成

<div class="grid grid-cols-6 grid-rows-none">
    <span></span>
    <div class="col-span-2 max-h-1/2">
        <img src="/projects/WEB/html.svg" alt="HTML">
        <p>HTML</p>
    </div>
    <div class="col-span-2 max-h-1/2">
        <img src="/projects/WEB/css.svg" alt="CSS">
        <p>CSS</p>
    </div>
    <span></span>
</div>

--

<!-- .slide: data-auto-animate -->

## 网站构成

<div class="grid grid-cols-3 grid-rows-none">
    <div class="max-h-1/2">
        <img src="/projects/WEB/html.svg" alt="HTML">
        <p>HTML</p>
    </div>
    <div class="max-h-1/2">
        <img src="/projects/WEB/css.svg" alt="CSS">
        <p>CSS</p>
    </div>
    <div class="max-h-1/2">
        <img src="/projects/WEB/js.svg" alt="JS">
        <p>JS</p>
    </div>
</div>

---

<!-- .slide: data-auto-animate -->

## 开发工具

<!-- .element: class="r-fit-text" -->

--

<!-- .slide: data-auto-animate -->

## 开发工具

### 编辑器

- [VS Code](https://code.visualstudio.com/)

<!-- .element: class="fragment fade-in" -->

- [Sublime Text](https://www.sublimetext.com/)

<!-- .element: class="fragment fade-in" -->

--

<!-- .slide: data-auto-animate -->

## 开发工具

### 编辑器

- [VS Code](https://code.visualstudio.com/)

<!-- .element: class="inline-block" -->

- [Sublime Text](https://www.sublimetext.com/)

<!-- .element: class="inline-block" -->

![who use vscode](/projects/WEB/who-use-vscode.png)

<!-- .element: class="r-stretch" -->

--

<!-- .slide: data-auto-animate -->

## 开发工具

### 编辑器

- [VS Code](https://code.visualstudio.com/)

<!-- .element: class="inline-block" -->

- [Sublime Text](https://www.sublimetext.com/)

<!-- .element: class="inline-block" -->

![why vscode](/projects/WEB/why-vscode.png)

<!-- .element: class="r-stretch" -->

--

<!-- .slide: data-auto-animate -->

## 开发工具

### VS Code 插件推荐

- JavaScript and TypeScript
<!-- .element: class="fragment fade-in" -->
- Auto Close Tag
<!-- .element: class="fragment fade-in" -->
- HTML Preview
<!-- .element: class="fragment fade-in" -->
- Prettier - Code formatter
<!-- .element: class="fragment fade-in" -->

--

<!-- .slide: data-auto-animate -->

## 开发工具

### 浏览器

- [Chrome](https://www.google.com/chrome/)

<!-- .element: class="fragment fade-in" -->

- [Firefox](https://www.mozilla.org/firefox/)

<!-- .element: class="fragment fade-in" -->

- [Edge](https://www.microsoft.com/edge)

<!-- .element: class="fragment fade-in" -->

--

<!-- .slide: data-auto-animate -->

## 开发工具

### 浏览器

- [Chrome](https://www.google.com/chrome/)

<!-- .element: class="inline-block" -->

- [Firefox](https://www.mozilla.org/firefox/)

<!-- .element: class="inline-block" -->

- [Edge](https://www.microsoft.com/edge)

<!-- .element: class="inline-block" -->

![IE may hurt you](/projects/WEB/IE-hurts-you.png)

<!-- .element: class="r-stretch" -->

---

<!-- .slide: data-auto-animate -->

## HTML

<!-- .element: class="r-fit-text" -->

--

<!-- .slide: data-auto-animate -->

## HTML

HyperText Markup Language

<!-- .element: class="r-fit-text" -->

--

<!-- .slide: data-auto-animate -->

## HTML

HyperText Markup Language

超文本标记语言

<!-- .element: class="r-fit-text" -->

--

<!-- .slide: data-auto-animate -->

## HTML

HyperText Markup Language

超文本标记语言

- 用于创建网页的标准标记语言
<!-- .element: class="fragment fade-in" -->
- 组织和格式化网页上的文本、图像和其他元素
<!-- .element: class="fragment fade-in" -->

--

<!-- .slide: data-auto-animate -->

## HTML

元素组成

<!-- .element: class="r-fit-text" -->

--

<!-- .slide: data-auto-animate -->

## HTML

元素组成

![html-tag](/projects/WEB/html-tag.svg)

<!-- .element: class="r-stretch" -->

--

<!-- .slide: data-auto-animate -->

## HTML

元素组成

![html attribute](/projects/WEB/html-attribute.svg)

<!-- .element: class="r-stretch" -->

--

<!-- .slide: data-auto-animate -->

## HTML

文件结构

<!-- .element: class="r-fit-text" -->

--

<!-- .slide: data-auto-animate -->

## HTML

文件结构

<!-- prettier-ignore -->
```html
<!DOCTYPE html>
<html lang="zh-CN">
  <head>
    <meta charset="utf-8" />
    <title>站点标题</title>
  </head>
  <!-- 我是注释 -->
  <body>
    <h1>这是标题</h1>
    <p>这是我的页面内容</p>
  </body>
</html>
```

--

<!-- .slide: data-auto-animate -->

## HTML

列表

```html
<ul>
  <li>列表项1</li>
  <li>列表项2</li>
</ul>
```

超链接

```html
<a href="https://www.example.com">这是一个链接</a>
```

图片

```html
<img src="https://www.example.com/example.png" alt="这是一个图片" />
```

---

<!-- .slide: data-auto-animate -->

## CSS

<!-- .element: class="r-fit-text" -->

--

<!-- .slide: data-auto-animate -->

## CSS

Cascading Style Sheets

<!-- .element: class="r-fit-text" -->

--

<!-- .slide: data-auto-animate -->

## CSS

Cascading Style Sheets

层叠样式表

<!-- .element: class="r-fit-text" -->

--

<!-- .slide: data-auto-animate -->

## CSS

Cascading Style Sheets

层叠样式表

- 用于描述 HTML 文档的呈现形式
<!-- .element: class="fragment fade-in" -->
- 决定元素应该如何被渲染
<!-- .element: class="fragment fade-in" -->

--

<!-- .slide: data-auto-animate -->

## CSS

理解盒模型

![html schematic](/projects/WEB/html-schematic.svg)

<!-- .element: class="r-stretch" -->

--

<!-- .slide: data-auto-animate -->

## CSS

基本语法

<!-- .element: class="r-fit-text" -->

--

<!-- .slide: data-auto-animate -->

## CSS

基本语法

谁 + 怎么样

<!-- .element: class="r-fit-text" -->

--

<!-- .slide: data-auto-animate -->

## CSS

基本语法

谁 + 怎么样

![css syntax](/projects/WEB/css-syntax.svg)

<!-- .element: class="r-stretch" -->

--

<!-- .slide: data-auto-animate -->

## CSS

常用选择器

<div class="grid grid-cols-2 grid-rows-none">

```css
/* 标签选择器 */
h1 {
  color: red;
}
/* 类选择器 */
.title {
  color: red;
}
/* ID 选择器 */
#title {
  color: red;
}
```

```css
/* 属性选择器 */
[type="text"] {
  color: red;
}
/* 伪类选择器 */
a:hover {
  color: red;
}
/* 伪元素选择器 */
p::first-line {
  color: red;
}
```

</div>

--

<!-- .slide: data-auto-animate -->

## CSS

选择器运算

<div class="grid grid-cols-2 grid-rows-none">

```css
/* 列表 */
h1,
.title {
  color: red;
}
/* 子元素 */
ul > li {
  color: red;
}
/* 后代元素 */
ul li {
  color: red;
}
```

```css
/* 邻接元素 */
h1 + p {
  color: red;
}
/* 通用邻接元素 */
h1 ~ p {
  color: red;
}
/* 通用元素 */
* {
  color: red;
}
/* 组合 */
ul > li[type="text"].highlight {
}
```

</div>

--

<!-- .slide: data-auto-animate -->

## CSS

添加样式

<!-- .element: class="r-fit-text" -->

--

<!-- .slide: data-auto-animate -->

## CSS

添加样式

内联样式

`index.html`

```html
<h1 style="color: red;">一级标题</h1>
```

--

<!-- .slide: data-auto-animate -->

## CSS

添加样式

内部样式表

`index.html`

```html
<style>
  h1 {
    color: red;
  }
</style>

<h1>一级标题</h1>
```

--

<!-- .slide: data-auto-animate -->

## CSS

添加样式

外部样式表

`index.html`

```html
<link rel="stylesheet" href="temp.css" />

<h1>一级标题</h1>
```

`style.css`

```css
h1 {
  color: red;
}
```

--

<!-- .slide: data-auto-animate -->

## CSS

![CSS sucks](https://cdn.hashnode.com/res/hashnode/image/upload/v1618132016248/KgEmbHf7K.gif?auto=compress)

---

<!-- .slide: data-auto-animate -->

## JS

<!-- .element: class="r-fit-text" -->

--

<!-- .slide: data-auto-animate -->

## JS

JavaScript

<!-- .element: class="r-fit-text" -->

--

<!-- .slide: data-auto-animate -->

## JS

JavaScript

- 一种轻量级的、高级的、解释型的编程语言
<!-- .element: class="fragment fade-in" -->
- 命令式编程、声明式编程以及面向对象编程
<!-- .element: class="fragment fade-in" -->
- 用于为网页添加各式各样的动态功能
<!-- .element: class="fragment fade-in" -->

--

<!-- .slide: data-auto-animate -->

## JS

基本语法

<!-- .element: class="r-fit-text" -->

--

<!-- .slide: data-auto-animate -->

## JS

基本语法

<div class="grid grid-cols-2 grid-rows-none">

```js
// 变量
let a = 1;
const b = 2;
var c = 3;

// 循环语句
for (let i = 0; i < 10; i++) {
  console.log(i);
}
while (a < 10) {
  a++;
}
```

```js
// 函数
function add(a, b) {
  return a + b;
}

// 条件语句
if (a > b) {
  console.log("a 大于 b");
} else if (a < b) {
  console.log("a 小于 b");
} else {
  console.log("a 等于 b");
}
```

</div>

--

<!-- .slide: data-auto-animate -->

## JS

添加脚本

<!-- .element: class="r-fit-text" -->

--

<!-- .slide: data-auto-animate -->

## JS

添加脚本

内联脚本

`index.html`

```html
<button onclick="alert('Hello World!');">点我</button>
```

--

<!-- .slide: data-auto-animate -->

## JS

添加脚本

内部脚本

`index.html`

```html
<script>
function welcome() {
    alert("Hello World!");
}
< /script>

<button onclick="welcome()">点我</button>
```

--

<!-- .slide: data-auto-animate -->

## JS

添加脚本

外部脚本

`index.html`

```html
<script src="script.js" async>< /script>

<button onclick="welcome()">点我</button>
```

`script.js`

```js
function welcome() {
  alert("Hello World!");
}
```

--

<!-- .slide: data-auto-animate -->

## JS

<iframe width="560" height="315" src="https://www.youtube.com/embed/aXOChLn5ZdQ" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen class="r-stretch"></iframe>

---

<!-- .slide: data-auto-animate -->

# Thanks for your time!

<!-- .element: class="r-fit-text" -->

@slideend
