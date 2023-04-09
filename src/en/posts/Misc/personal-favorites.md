---
title: 个人最爱项目
icon: material-symbols:star
date: 2023-04-08
tag:
  - CLI
  - Editor
  - Web
  - Vue
  - Vuepress
  - Tailwind
  - Streamlit
  - Typst
sticky: false
star: true
---

收集一些我个人最爱的项目，以便日后查阅。时不时更新。

<!-- more -->

## 命令行

### homebrew

::: info

- 主页：[brew.sh](https://brew.sh/)
- GitHub 仓库：[homebrew/brew](https://github.com/homebrew/brew)

:::

不需要多说，这是 macOS 上独一档的包管理器，已经成为了 macOS 上的标配，并且现在也正式整合了 Linuxbrew，可以在 Linux 上使用。

> 我相信 Ubuntu 的一大痛点就是 apt 源的更新速度会比较慢，追求稳定性的 Debian 更加，因此如果想要使用一些更新版本的软件，就需要自己编译安装，这对于一般用户来说是非常不友好的。而由社区维护的 Homebrew 就可以很好地解决这个问题，可以很方便地安装一些最新版本的软件。目前唯一遗憾的是暂时不支持 GUI 应用安装（对应 macOS 下的 cask）

> 其他的类似工具比如 [MPR](https://www.makedeb.org/) 或许也值得一试，但是我还没有尝试过，并且 Homebrew 在 Linux 和 macOS 上都能用，因此我还是更倾向于使用它。

### xonsh

::: info

- 主页：[xon.sh](https://xon.sh/)
- GitHub 仓库：[xonsh/xonsh](https://github.com/xonsh/xonsh)

:::

一款跨平台、基于 Python 的 shell，特点概括为四个：

1. 能用 shell
2. 能用 Python
3. 能在 shell 中用 Python
4. 能在 Python 中用 shell

因此可以用 Python 和 shell 很方便地进行交互，而且还能用 Python 的库，非常适合简单的自动化和调试等。并且这几年来社区活跃度和受支持程度都在不断提高，应当是未来的主流 shell 之一。

> 这也是我的主力 shell，如果可以选，我一定会选用它。

### starship

::: info

- 主页：[starship.rs](https://starship.rs/)
- GitHub 仓库：[starship/starship](https://github.com/starship/starship)

:::

一个支持多种 shell 的命令行提示符，提供了非常多的自定义选项，可以根据自己的喜好和需求进行配置。现已经官方支持了 [xonsh](#xonsh)，而且还有很多社区提供的主题，可以直接使用。

由于基于 Rust，所以响应速度极快，并且功能也比较丰富，提供对于当前目录下的 Git 仓库的支持，以及多种编程语言的项目版本识别等等。用它就对了。

### vhs

::: info

- GitHub 仓库：[charmbracelet/vhs](https://github.com/charmbracelet/vhs)

:::

一个命令行录制工具，可以用非常简单的语法编写脚本来控制操作，轻松生成非常好看的 GIF 动图。

由于可以由脚本控制，因此非常适合命令行工具的演示，也可以作为命令行工具的测试工具。

### glow

::: info

- GitHub 仓库：[charmbracelet/glow](https://github.com/charmbracelet/glow)

:::

一个命令行 Markdown 阅读器，支持多种主题，可以直接在终端中阅读 Markdown 文件。

> 和前面的 [vhs](#vhs) 一样，都是由 [Charm Bracelet](https://charm.sh/) 开发的，因此也是非常好用和好看 <Badge text="这很重要" type="info" /> 的工具。

### typos-cli

::: info

- GitHub 仓库：[crate-ci/typos](https://github.com/crate-ci/typos)

:::

老担心自己的文档或者代码中有拼写错误？`typos-cli` 可以马上帮你纠正，而且还可以自动修复，非常方便。

甚至还有 GitHub Action，可以在你的仓库中自动检查拼写错误。

### tldr

::: info

- 主页：[tldr.sh](https://tldr.sh/)
- GitHub 仓库：[tldr-pages/tldr](https://github.com/tldr-pages/tldr)

:::

记不住各种常用命令的用法？没关系，`tldr` 一下，你就知道！

由社区维护的文档库里面包含了各种常用命令的用法，可以直接在终端中查看，非常方便。既免去了记忆命令的麻烦，也不用每次都去查手册里的用例。

### bpytop

::: info

- GitHub 仓库：[aristocratos/bpytop](https://github.com/aristocratos/bpytop)

:::

一个更现代化的 `top` 命令，支持多种主题，可以直接在终端中显示多种系统资源的使用情况，如 CPU、内存、网络、磁盘、进程信息等。

### bat

::: info

- GitHub 仓库：[sharkdp/bat](https://github.com/sharkdp/bat)

:::

一个更现代化的 `cat` 命令，支持语法高亮、行号、Git 仓库中的差异等等。

### icdiff

::: info

- GitHub 仓库：[jeffkaufman/icdiff](https://github.com/jeffkaufman/icdiff)

:::

一个带颜色的 `diff` 命令，可以直接在终端中显示差异。同时也支持查看 Git 仓库中的更改 `git icdiff`。

### logo-ls

::: info

- GitHub 仓库：[Yash-Handa/logo-ls](https://github.com/Yash-Handa/logo-ls)

:::

一个带有图标的 `ls` 命令，可以直接在终端中显示文件和文件夹的图标。

> 可能因为功能比较简单，所以没有太多的更新，但是已经很完善了。唯一缺憾就是还不支持 Linuxbrew。

### tig

::: info

- GitHub 仓库：[jonas/tig](https://github.com/jonas/tig)

:::

命令行下的 Git 客户端，可以直接在终端中查看 Git 仓库的状态、分支图、提交历史、文件差异等等。

## 编辑器

### VSCode

::: info

- 主页：[code.visualstudio.com](https://code.visualstudio.com/)
- GitHub 仓库：[microsoft/vscode](https://github.com/microsoft/vscode)

:::

非常轻量级的编辑器，但是有非常强大的插件系统，可以满足各种需求，妥妥的第一选择。

> 好用到什么程度？除了 VSCode 我可以不用任何其他编辑器，就能够完成所有的工作。 <Badge text="当然剪视频/看网页啥的不算" type="warning" />

### Cursor

::: info

- 主页：[cursor.so](https://cursor.so/)
- GitHub 仓库：[getcursor/cursor](https://github.com/getcursor/cursor)

:::

非常有前途的后起之秀，主打的就是 GPT-4 进行生成、聊代码、debug 等 AI 辅助功能，比目前 GitHub Copilot 用的模型更新，因此不管是生成速度还是质量上都压过一头。

> 虽然目前仍然在积极开发中，但是最近套壳了 VSCode，接入了庞大的插件生态，因此一下子可以进入第一梯队了，值得后续持续关注。

### SpaceVim

::: info

- 主页：[spacevim.org](https://spacevim.org/)
- GitHub 仓库：[SpaceVim/SpaceVim](https://github.com/SpaceVim/SpaceVim)

:::

一个基于 Vim 或者 NeoVim <Badge text="推荐" type="tip" /> 的编辑器。如果你像我一样不愿意折腾 Vim 的配置，更希望一个配置相对简单但绝不牺牲功能性的编辑器，那么就可以试试 SpaceVim。

> 模块化是最大的优点，只需要简单的几行配置就能启用或禁用某个模块，而且还能自定义模块的配置。界面也很好看，有多种主题可供选择。作为图形化编辑器的临时替代或者主力编辑器都非常不错。

> 如果想要更进一步精简配置，做到开箱即用，你也可以尝试 [Helix](https://github.com/helix-editor/helix)，或许会适合你。

### Warp

::: info

- 主页：[warp.dev](https://warp.dev/)
- GitHub 仓库：[warpdotdev/warp](https://github.com/warpdotdev/Warp)

:::

谁说终端不能是一个编辑器呢？Warp 就是，不仅可以像终端一样使用，还可以像编辑器一样方便地编辑多行命令，并且支持命令分块，可以很方便的追溯历史记录或输出，同时还提供了 AI 辅助功能，可以根据自然语言生成命令，非常方便。

> 最大的遗憾可能是目前只支持 macOS，不过对 Linux 和 Windows 乃至 Web assembly 的支持也在计划中，值得一看。

### CodeEdit

::: info

- 主页：[codeedit.app](https://codeedit.app/)
- GitHub 仓库：[CodeEditApp/CodeEdit](https://github.com/CodeEditApp/CodeEdit)

:::

主打复刻 Xcode 的编辑器，但要比 Xcode 更轻量级，而且还支持多种语言。力图为开发者提供一个和 Xcode 类似但更普适的编辑器。

> 作为几乎从诞生起就一直关注的项目，我本来是很期待的，但是开发速度实在是太慢了，并且相比于做出一个“能用”的编辑器，团队的重心似乎更多地放在了“更原汁原味”的 UI 上，因此目前的体验基本上可以说只有一个空壳，距离其画下的大饼还有很长的路要走。

> 寒假当中的一段时间甚至因为团队内部的不和谐导致分裂出了一个类似的项目 [AuroraEditor](https://github.com/AuroraEditor/AuroraEditor)，开发速度一度超越了 CodeEdit，并且率先一步推出了能够安装使用的版本，但是后来又合并回去了。

> 再加上本身 Swift 语言就决定了要困在苹果的生态内，因此我觉得 CodeEdit 的前景并不是很好，不过也不排除有一天能够成为一个 macOS 上非常好用的编辑器，因此还需要耐心，非常多的耐心来看。

## 网页

### Streamlit

::: info

- 主页：[streamlit.io](https://streamlit.io/)
- GitHub 仓库：[streamlit/streamlit](https://github.com/streamlit/streamlit)

:::

一个非常好用的 Python Web 框架，可以用来快速搭建一个网页应用。丰富的 API，可以很方便地实现各种功能，比如绘图、文件上传下载、表格展示等等。

> 玩法很多，而且第三方的组件生态也很丰富，可以满足各种需求。平时用于搭建简单的单页应用，或者用于快速展示一些数据，非常方便。重点是还有社区云服务器可以白嫖，可以直接部署到云端，只要是公开仓库就不限数量 <Badge text="全体起立" type="success" />，非常方便。

### Vue 3

::: info

- 主页：[vuejs.org](https://vuejs.org/)
- GitHub 仓库：[vuejs/core](https://github.com/vuejs/core)

:::

主流前端框架，不用多说，GitHub 上的星标数会说明一切。

> 良好的生态，丰富的插件，以及 Vue 3 的 Composition API，让 Vue 3 成为了一个非常好用的框架，至少在我看来，Vue 3 已经超越了 React，成为了前端开发的首选框架。

### VuePress 2

::: info

- 主页：[v2.vuepress.vuejs.org](https://v2.vuepress.vuejs.org/)
- GitHub 仓库：[vuepress/vuepress-next](https://github.com/vuepress/vuepress-next)

:::

基于 Vue 3 的静态网站生成器，支持 Markdown，可以很方便地编写文档或博客，而且还支持 Vue 组件，可以方便地实现各种功能。

> 尽管目前还处于 beta 阶段，但是已经基本稳定，可以预见不会有较大的变动，因此已经可以用于生产环境了，你现在正在看的这个网站就是用 VuePress 2 搭建的，使用了 [Hope 主题](https://github.com/vuepress-theme-hope/vuepress-theme-hope)。

### Tailwind CSS

::: info

- 主页：[tailwindcss.com](https://tailwindcss.com/)
- GitHub 仓库：[tailwindlabs/tailwindcss](https://github.com/tailwindlabs/tailwindcss)

:::

非常好用的原子化 CSS 框架，几乎可以做到不写一行 CSS，并且会根据配置和使用情况自动生成 CSS，因此不会有任何冗余的 CSS 代码，非常用户友好。

> 使用 Tailwind CSS 还可以避免取名的烦恼，也不用担心 CSS 样式的冲突。并且由编辑器提供的自动补全功能，可以很方便地编写 CSS 样式，对我这样的小白来说，不仅可以快速上手，还可以避免很多低级错误，并且根据其功能类对应的实现，进一步学习 CSS 的知识。

> 此外，还有 [tailwind components](https://tailwindcomponents.com/) 这样的社群贡献了大量的组件设计，可以直接套用，非常方便。

## 幻灯片

### Slidev

::: info

- 主页：[sli.dev](https://sli.dev/)
- GitHub 仓库：[slidevjs/slidev](https://github.com/slidevjs/slidev)

:::

基于 Vue 3 的幻灯片生成器，使用 Markdown 编写幻灯片，而且还支持 Vue 组件，可以方便地实现各种功能。生成的幻灯片非常简洁美观，内置的功能也能够满足绝大部分的需求。

> 由于该项目目前仍在开发中，因此还存在一些瑕疵，不过好在开发较为活跃，可以再等一段时间后相对稳定了再使用。

> 对我自己而言，Slidev 使用的 Windi CSS 和/或 Uno CSS 与 Tailwind CSS 还是有一定语法上的出入的，不是非常顺手。更重要的是，其 Markdown 语法格式用到了文内的扉页块，这对于大多数格式化工具而言，都是不支持的，因此在使用过程中，还是会时不时遇到由于顺手格式化了文档而导致的错误。再加上其本身也不能够算得上非常轻量级，因此我目前还是使用 [Hope 主题](https://github.com/vuepress-theme-hope/vuepress-theme-hope)整合的基于 Reveal.js 的方式来编写幻灯片。不过如果你不想为了编写幻灯片而搭建一个完整的站点 <Badge text="为了这点醋才包的一盘饺子" type="info" />，那么 Slidev 本身也是一个不错的选择。

## 文稿

### Typst

::: info

- 主页：[typst.app](https://typst.app/)
- GitHub 仓库：[typst/typst](https://github.com/typst/typst)

:::

一个功能强大可比 $\LaTeX$，同时语法简洁的现代排版系统。附带了多种函数来提供更丰富的功能性拓展，甚至还支持简单的脚本允许你自行编写规则。

> 如果要我说最讨厌 $\LaTeX$ 的一点，那莫过于其语法的复杂性了。而 Typst 不仅功能强大、语法简洁，还得益于其 Rust 编译器内核的高效性，Typst 的编译 PDF 速度也非常快，即便是从头生成，也不过一眨眼的事情，更不用说还提供了增量编译来实时预览了，睥睨 Microsoft Word 和 Markdown 那样的所见即所得。

> 如果你不愿意本地安装，也可以直接使用在线的编辑器来编写文档，依然可以享受自动补全和实时预览带来的顶级体验。<Badge text="完全符合我对现代排版系统的想象" type="danger" />

> 比较有争议的点可能在于数学公式采用了一套自己的语法，而不是大量借鉴 $\LaTeX$ 的语法，这可能会让一些人从 $\LaTeX$ 迁移过来时感到不适应，也是很多人批评它的地方。不过我认为这个见仁见智，这样做的好处是可以让 Typst 的语法更加简单，而且在 VSCode 插件的自动补全功能的加持下，似乎也不是什么大问题，这点学习新语法的成本远低于其收益，非常划得来。

> Typst 迅速发展起来的社区生态（比如这个 [awesome list](https://github.com/qjcg/awesome-typst)），也反映出了其在不断地吸引新用户，这也是我非常看好它的原因之一。
