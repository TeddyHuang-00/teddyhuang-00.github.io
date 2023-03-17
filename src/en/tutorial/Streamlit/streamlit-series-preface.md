---
title: 前言
icon: material-symbols:web
date: 2023-01-18
order: 1
category:
  - Streamlit 教程
tag:
  - Python
  - Streamlit
  - Web
sticky: false
star: false
---

<!-- TODO: Translate this page -->

Streamlit 是什么？写给谁？安装与运行

<!-- more -->

::: tip
本教程有随附示例以及在线编辑器：[![Streamlit 链接](https://static.streamlit.io/badges/streamlit_badge_black_white.svg)](https://st-tutorial.streamlit.app)
:::

::: note 当前 Streamlit 版本：1.17.0
:::

## Streamlit 是什么？

Streamlit 是一个用于创建交互式 Web 应用的 Python 库。它的目标是让开发者能够快速地创建一个 Web 应用，而不需要关心前端的技术细节。它的核心思想是，开发者只需要写 Python 代码，然后 Streamlit 会自动将代码转换为 Web 应用。

那么，我的朋友，为什么你会需要 Streamlit，而不是用 Django 或者 Flask 呢？那么就要提到 Streamlit 最突出的三个优点，也是其核心思想，见下文。

### 脚本式开发

Streamlit 具有非常简单明了并且高度封装的函数 API，不仅包含了大量不同功能的组件，并且使用时不需要操心任何网页前端的内容，因为 Streamlit 已经帮你做好前端的工作了，你只需要写后端逻辑部分的 Python 代码。因此，使用 Streamlit 开发就像写脚本一样简单，学习成本极低。

### 重视交互

在使用 Streamlit 时，如果你想要获取用户的输入，你只需要使用对应的一行函数即可，运行时该函数会自动返回用户输入的值。并且这样的输入类函数类型丰富，比如按钮、滑条、文本输入、数字输入、日期选择、颜色选择、文件上传、相机拍照等等，覆盖了大部分的使用场景需求。

### 一键部署

运行 Streamlit 应用只需要一行命令即可，没有繁琐的配置过程。并且 Streamlit 还提供了 [Streamlit 社区云](https://streamlit.io/cloud)，可以一键部署到云端，让你的应用可以被任何人访问，每个账号支持部署一个 GitHub 私有仓库和无限个公开仓库。

### 其他优点

[Streamlit 文档](https://docs.streamlit.io)内容详尽，且提供了大量的示例，可以快速上手。而在 [Streamlit Gallery](https://streamlit.io/gallery) 中你可以查看到大量的 Streamlit 应用示例，可以作为学习参考。除此之外，许多大佬也使用 Streamlit 开放的接口开发了大量[第三方插件](https://streamlit.io/components)，让 Streamlit 的功能更为丰富。如果你在使用或开发过程中遇到任何困难，还可以去 [Streamlit 社区](https://discuss.streamlit.io)寻求帮助。

## 这个系列教程写给谁？

### 适合人群

作为使用 Streamlit 足足两年半的“老”用户，这个系列教程将主要分为两个部分：前半为 Streamlit 基础教程，主要讲解不同类型的 Streamlit 函数；后半为 Streamlit 进阶教程，包含一些 Streamlit 中进阶的功能，以及部分实际使用案例和我个人的心得体会。因此，这个系列教程主要写给想要快速上手 Streamlit 的朋友，而如果你想要深入了解 Streamlit 的原理，或者目标是二次开发，那么这个系列教程就不适合你了。

### 不适合人群

另外值得一提的是，由于 Streamlit 本身的设计理念限制，它的会话是“无状态的”，意味着不会保存上一次会话的信息，并且所有由会话产生的数据也会在关闭标签页时一并丢失，因此并不适合用来开发大型应用。除此之外，Streamlit 提供的功能也不适合用来开发复杂的交互式应用，比如游戏、图形编辑器等等，如果你有这方面的需求，则需要另寻解决方案。

### 前置知识

为了避免这个系列的内容繁琐冗余，我也会尽量抛弃一些边缘和零碎的细节，同时尽量保证任何本教程缺失的部分都应当是可以在搜索引擎中得到答案的。如果要跟上本教程的进度，你至少需要掌握以下一些前置知识：

- Python 基本语法和数据类型（会用 Python 写命令行程序就行）
- 基本的命令行使用（基础到会用 pip 或者 conda 命令安装 Python 包就行）

如果想要更进阶地使用 Streamlit，比如将其真正应用到生产中去，那么我推荐你最好还要掌握以下一些知识：

- Python 虚拟环境的使用与管理（比如 conda 或者 virtualenv）
- Python 日志系统（比如 logging 模块）
- 其他一切实际业务相关的 Python 接口的使用（数据库、远程 API 等等，按需决定）

## 现在就开始吧！

好了，现在我们就开始吧！首先，我们需要安装 Streamlit，这里我推荐使用 pip 命令进行安装（推荐新建一个虚拟环境来安装本教程中可能用到的所有库）：

```bash
pip install streamlit
```

安装完成后，我们就可以运行 Streamlit 自带的示例项目了：

```bash
streamlit hello
```

成功运行后，可以在命令行输出中看到示例网站的 URL，如果是本地运行的话，通常是 [http://localhost:8501](http://localhost:8501)。打开这个网址，就可以看到如下 Streamlit 的示例网站了：

<BrowserMockup>
    <img
        src="/assets/images/streamlit-hello.png"
        alt="Streamlit hello 示例页面">
</BrowserMockup>

一切都很简单，你可以在左侧边栏中选择不同的示例。如果看完了，想要结束运行，只需要在终端按下 <kbd>Ctrl</kbd>+<kbd>C</kbd> 终止命令运行即可。

恭喜你！已经学会如何使用 Streamlit 运行一个网站了！接下来我们将进入正题，学习如何使用 Streamlit 开发一个真正的网站。
