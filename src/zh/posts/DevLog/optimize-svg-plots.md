---
title: 优化 SVG 绘图
icon: material-symbols:article
date: 2023-05-21
category:
  - DevLog
tag:
  - SVG
  - Matplotlib
  - Taskfile
sticky: false
star: false
---

阁下的 Matplotlib 固然厉害，但是如果，我是说如果画个十万个点和线，阁下又该如何应对呢？

<!-- more -->

> 你想想，你带着数据，做着毕设，写着文章做着图，突然就被 Adobe Illustrator 给卡着了......

Matplotlib 是 Python 中最常用的绘图库，非常简单易用，上限也很高。然而如果你某天需要在图上画几万个数据点，又想导出为矢量图后塞进 AI 里面加个标注，那么你就会发现，Matplotlib 生成的 SVG 体积巨大，AI 很有可能会卡死。

## 问题成因

造成问题的原因有很多，这里只是列举其中部分：

- `<path>` 标签中的 `d` 属性，用于描述路径，生成的 SVG 中 `d` 属性的值默认每行一个命令，这样的话，如果有几万个点，那么 `d` 属性的值就会有几万行，不必要的换行符会增加文件体积。可以优化，但不是影响 AI 性能的关键。
- 绘制的折线（对应 `plt.plot`）会被包装在一个 `<g>` 标签中，这个标签的 `id` 属性会被设置为 `line2d_{index}`，其中 `index` 为折线的索引。但其实我们并不需要每条线有单独编组，在绝大多数情况下，我们不需要这些 `<g>` 标签，这样可以极大减小文件的体积（尤其是如果你没有使用 `LineCollection` 而是调用了几万次 `plt.plot` 来绘制线条的话），并且减少嵌套层级，提高 AI 的性能。
- 绘制的点（对应 `plt.scatter`）使用 `<use>`，复用同一个 `<path>` 标签，尽管已经一定程度地减小文件体积了，但问题在于许多重复的样式，如 `fill`、`fill-opacity`、`stroke`、`stroke-opacity` 等，这些还是会以内联样式的形式被写在 `<use>` 标签中，导致文件体积虚大，而且我们也可以通过将相邻的点合并为一个 `<g>` 标签来共享样式，更好压缩文件体积。
- 不论是点还是线 <Badge type='info'>或许也适用于其他类型</Badge>，Matplotlib 会引用同一个全局的 `<clipPath>` 用于限制绘制区域，并且有时依赖于一个 `<g>` 标签包裹，这些也是性能开销的很大一部分。
- 其他问题，如不必要的 `<metadata>`，`id` 长得没必要等，这些琐碎问题不再赘述，下面会给出解决方案。

## 工具

### sed

使用 `sed` 可以很方便地将各类标签中的 `clip-path` 属性去掉：

```bash
#       +-- 替换内容
#       |                              +-- 行内替换
#       v                              v
sed -i 's/clip-path="url(#[0-9a-z]*)"//g' input.svg
#    ^                ^                       ^
#    |                |                       +-- 待处理的文件
#    |                +-- 用于匹配属性的正则表达式
#    +-- 这里的 -i 参数表示直接修改文件，而不是输出到标准输出
```

### Scour

::: info 项目链接

Github 仓库: https://github.com/scour-project/scour

:::

Scour 是一个用于优化 SVG 的 Python 脚本，提供了命令行入口，包含了一些非常强大的优化选项。可以通过 `Homebrew` 安装，或者使用 `pip` 安装，我更推荐您使用 `pipx`，可以避免污染全局环境：

::: code-tabs#pm

@tab Homebrew

```bash
brew install scour
```

@tab pipx

```bash
pipx install scour
```

@tab pip

```bash
pip install scour
```

:::

由于 Scour 没法原位操作文件，因此正好利用这一特性，我们将使用 Scour 的处理分为两步，最后再移除中间文件：

```bash
#         +-- 原文件
#         |             +-- 临时文件
#         v             v
scour input.svg input.svg.tmp.svg --enable-id-stripping --shorten-ids
#                                          ^                  ^
#                                          |                  +-- 简化 id
#                                          +-- 去除未被引用的 id
#             +-- 临时文件
#             |             +-- 原文件
#             v             v
scour input.svg.tmp.svg input.svg --create-groups --remove-descriptive-elements
#                                        ^                     ^
#                                        |                     +-- 移除描述性元素
#                                        +-- 为具有相同属性的相邻对象建组
rm input.svg.tmp.svg
#          ^
#          +-- 临时文件
```

### svg-optimizer

::: info 项目链接

Github 仓库: https://github.com/svg/svgo

:::

svg-optimizer 是另一个用于优化 SVG 的 Node.js 模块，也提供了命令行入口。安装方式也可以选择通过 `Homebrew` 安装，或者使用 `Node.js` 的任意包管理器安装：

::: code-tabs#pm

@tab Homebrew

```bash
brew install svgo
```

@tab pnpm

```bash
pnpm -g install svgo
```

@tab npm

```bash
npm -g install svgo
```

@tab yarn

```bash
yarn global add svgo
```

:::

svgo 的强大之处在于提供了一个插件平台，可以通过插件来实现各种优化，你也可以自定义插件。这里我们使用默认的插件，只需要简单地调用命令即可，既可以处理单个文件，也可以处理整个目录：

```bash
#                    +-- 输入文件
#                    v
svgo --multipass input.svg
#          ^
#          +-- 多次优化
#                       +-- 输入文件目录
#                       v
svgo --multipass -r -f src/
#                 ^  ^
#                 |  +-- 指定目录
#                 +-- 递归处理
```

## 效果

光说无用，下面是使用上面的工具处理后的效果：

|      操作      |  大小   |   耗时    | 单步压缩比 | 累计压缩比 |
| :------------: | :-----: | :-------: | :--------: | :--------: |
|     原文件     | 21755 K |     -     |     -      |   100 %    |
|     `sed`      | 18948 K |    0s     |  87.10 %   |  87.10 %   |
| 第一趟 `scour` | 13519 K | 1h 5m 28s |  71.35 %   |  62.14 %   |
| 第二趟 `scour` | 9744 K  |    16s    |  72.08 %   |  44.79 %   |
|     `svgo`     | 8839 K  |    32s    |  90.71 %   |  40.63 %   |

这里用的例子比较极端，是我最近项目中最大的一个图，因此耗时超过了一小时，但是效果也是最好的。如果你的图不是很大，那么耗时应该会比较短。不论如何，我觉得尝试一下也是值得的。

## 自动化

::: tip

这一部分并不是必须的，而且如果你从来没接触过 Makefile 或者 Taskfile 这类工具，可能会觉得有些复杂。

如果你只需要处理一次，那么直接使用上面的命令即可，如果你需要多次处理，或者需要提高多图处理的效率，那么可以考虑使用这一部分的内容。

:::

Taskfile 是一个用 Go 语言编写的任务管理工具，类似于 Makefile，但是更加简单易用，而且可以跨平台使用，配置文件仅是一个 YAML 文件。

::: info 项目链接

Github 仓库: https://github.com/go-task/task

英文文档: https://taskfile.dev/

中文文档: https://task-zh.readthedocs.io/zh_CN/latest/

:::

这里选用 Taskfile 的原因之一是其支持用十分简单的语法定义模板任务，可以对需要重复执行的任务进行封装，大大提高代码复用率，而且可以通过变量来实现对任务的参数化。

另外，Taskfile 对依赖项的处理默认是并行的，因此尽管 `scour` 和 `svgo` 都是单线程运行的，如果你有一大堆图片要处理，还是能够大大提高效率。

Taskfile 的语法简单，但放在这里讲解又有些跑题，因此这里只是简单介绍一下，更多的内容可以参考官方文档。你也可以直接参考以下的 Taskfile 配置文件：

```yml {4-6,54-64}
version: 3

env:
  # 修改这里的路径来与你的项目相匹配
  SRC_PATH: ./src
  IMAGE_PATH: ./images

tasks:
  collect:
    desc: 主入口任务
    deps:
      - task: fig-1
      - task: fig-2
  clean:
    desc: 清理输出文件夹
    cmds:
      - rm -rf ${IMAGE_PATH}
  minify:
    desc: 压缩优化 SVG
    vars:
      BASE_NAME: '{{default "${IMAGE_PATH}" .BASE_NAME}}'
      DIR_NAME: '{{default "tmp" .DIR_NAME}}'
    cmds:
      - |
        if [ -d {{.IMAGE_PATH}}/{{.DIR_NAME}}/ ]; then
          sed -i 's/clip-path="url(#[0-9a-z]*)"//g' {{.IMAGE_PATH}}/{{.DIR_NAME}}/*.svg
          for filename in $(ls {{.IMAGE_PATH}}/{{.DIR_NAME}}/*.svg); do
            scour ${filename} ${filename}.tmp.svg --enable-id-stripping --shorten-ids
            scour ${filename}.tmp.svg ${filename} --create-groups --remove-descriptive-elements
            rm ${filename}.tmp.svg
          done
          svgo --multipass -r -f {{.IMAGE_PATH}}/{{.DIR_NAME}}/
        else
          echo "{{.IMAGE_PATH}}/{{.DIR_NAME}} not found!"
        fi
  prepare:
    desc: 准备工作（创建子目录）
    vars:
      BASE_NAME: '{{default "${IMAGE_PATH}" .BASE_NAME}}'
      DIR_NAME: '{{default "tmp" .DIR_NAME}}'
    cmds:
      - echo "Collecting {{.DIR_NAME}}..."
      - mkdir -p {{.BASE_NAME}}/{{.DIR_NAME}}
  fig-1:
    desc: 收集图一所用的图片
    vars:
      DIR_NAME: sensory_neuron
    cmds:
      - task: prepare
        vars: { DIR_NAME: "{{.DIR_NAME}}" }
      - cp -u ${SRC_PATH}/figure/1/*.svg ${IMAGE_PATH}/{{.DIR_NAME}}/
      - task: minify
        vars: { DIR_NAME: "{{.DIR_NAME}}" }
  # 参考以下或上面的 fig-1 来添加更多的任务
  fig-2:
    desc: 收集图二所用的图片
    vars:
      DIR_NAME: training_rewards
    cmds:
      - task: prepare
        vars: { DIR_NAME: "{{.DIR_NAME}}" }
      - cp -u ${SRC_PATH}/figure/2/some.svg ${IMAGE_PATH}/2-some.svg
      - task: minify
        vars: { DIR_NAME: "{{.DIR_NAME}}" }
```

将上面的配置文件保存至 `Taskfile.yml` 中，并根据你的项目结构做修改，然后运行以下命令即可：

```bash
task collect
```

如果你想要清理输出文件夹，可以运行以下命令：

```bash
task clean
```

## 总结

其实还有其他的 SVG 压缩或优化软件，比如使用 Rust 写的 `svgcleaner`，但可惜大多数软件要么不尽完善或者缺乏乃至停止维护，剩下的一些网页应用或商业化应用又不太方便集成到自动化流程中，因此这里就不再介绍了。

如果你有其他的好用的 SVG 压缩或优化软件，也欢迎在评论区留言分享。
