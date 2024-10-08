---
title: 初见 GitHub Actions
icon: material-symbols:article
date: 2023-05-02
category:
  - DevLog
tag:
  - GitHub
  - CI/CD
sticky: false
star: false
---

> 不会有人不喜欢 CI/CD，唯一阻碍我们的是懒。
>
> ——沃玆基·索德

<!-- more -->

## 为什么需要 CI/CD

CI/CD 是持续集成（Continuous Integration）和持续交付（Continuous Delivery）的缩写，是一种软件开发实践，通过自动化的软件流程来构建、测试、发布软件。尽管我只是一个业余的开发者，但是也不免遇到这样的场景：

- 你现在看到的博客站点，原本是由我在本地构建后上传 GitHub 进行部署的，需要等待构建完成后再进行上传，不仅繁琐，而且还可能因为网络原因出错。
- 写了一个简单的爬虫脚本，希望能够定期运行，但是要么没有服务器，要么懒得配置 cron 任务。
- 写了跨平台的程序或者库，但是需要对应平台的运行环境才能构建，比如 Windows 下的 exe 程序，Linux 下的 so 库，Mac 下的 dmg 程序，手头又没有所有的环境。
- 或者更常见一点，写了一个简单的 Python 包，想要在每次 push 之后自动运行测试，或者在版本号更新后自动构建并上传到 PyPI。

这类的需求就非常适合 CI/CD 来解决，通过 GitHub Actions，我们可以在 GitHub 上进行持续集成和持续交付，而不需要自己搭建服务器或者配置 cron 任务。<Badge text="泰酷辣！" type="info" />

## GitHub Actions 核心思想

GitHub Actions 的核心思想是：**事件驱动**。类似于为当前仓库添加一系列的钩子，当触发了某个事件时，就会执行相应的操作，也就是一个工作流 workflow。

### 触发事件

GitHub Actions 支持的事件非常多，概括来说可以分为几大类：

- 源码修改
  - `push`
  - `pull_request`
  - `create`
  - `delete`
  - 等和源码或版本管理相关的事件
- 仓库状态
  - `issue`
  - `discussion`
  - `project`
  - 等 GitHub 平台相关的事件
- 其他
  - 手动：`workflow_dispatch`
  - 计划时间：`schedule`
  - 被调用：`workflow_call`
  - 等其他事件

具体定义和用法可以参考[官方文档](https://docs.github.com/en/actions/using-workflows/events-that-trigger-workflows#workflow_run)。以上触发事件可以多个自由组合，在配置文件中的定义方式为：

```yaml
on:
  push:
    branches:
      - master
  pull_request:
    branches:
      - master
```

### 工作任务

当触发了某个事件时，就会执行相应的工作任务，每个任务直接由其 ID 引导，可以配置不同的权限许可和环境，也可以通过 `needs` 关键字来定义依赖关系。每个任务都可以分为几个步骤，每个步骤都可以配置不同的环境。当然每个任务和步骤都可以通过简单的条件判断来控制是否执行。

在这里，运行的任务和步骤的两大核心操作为：

- 复用 `uses`
  - 调用一个现有 action
  - 可以是 GitHub Marketplace 上提供的
  - 也可以是指向自己写的工作流文件路径
  - 参数通过 `with` 传递
- 自定义 `run`
  - 直接运行命令
  - 由于是在容器中运行，所以基本上可以运行任何命令

::: tip 任务 v.s. 步骤

任务 `job` 和步骤 `step` 的核心区别在于，每个任务都是在一个独立的虚拟环境中运行，因此天生具有可并行的特点，而步骤则是在同一个虚拟环境中运行，能够继承上一个步骤的结果，但必须串行执行。

:::

更多语法以及示例可参考[官方文档](https://docs.github.com/en/actions/using-workflows/workflow-syntax-for-github-actions)。

## GitHub Actions 实践

以下是一个简单的 GitHub Actions 配置文件

```yaml
# 工作流名称
name: GitHub Actions Demo

# 触发条件
on:
  # 有推送时触发
  push:
    branches:
      - main
  # 有 PR 时触发
  pull_request:
    branches:
      - main
  # 手动触发
  workflow_dispatch:
  # 定时触发
  schedule:
    # 每天 0 点 0 分
    - cron: "0 0 * * *"

# 任务
jobs:
  # 任务 ID
  build:
    # 运行环境
    runs-on: ubuntu-latest

    # 任务步骤
    steps:
      # 检出代码（使用现成 action）
      - uses: actions/checkout@v3

      # 执行命令（命令行）
      - name: Run a one-line script
        run: echo Hello GitHub Actions

      # 执行命令（多行）
      - name: Run a multi-line script
        run: |
          echo Add other actions to build,
          echo test, and deploy your project.
```

## 实际案例

### 自动构建并部署博客

这是我最初使用 GitHub Actions 的场景，在有 push 时自动构建并部署，见此[工作流文件](https://github.com/TeddyHuang-00/teddyhuang-00.github.io/blob/main/.github/workflows/deploy-docs.yml)

### 定时更新爬取 PKU 课程列表

趁着放假，拿之前写的爬虫脚本改巴改巴，规定了定时任务，并且自动将结果发布到 [release](https://github.com/TeddyHuang-00/PKU-Course-List/releases)，见此[工作流文件](https://github.com/TeddyHuang-00/PKU-Course-List/blob/main/.github/workflows/scrape-dean.yml)
