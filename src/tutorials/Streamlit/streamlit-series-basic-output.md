---
title: 文本与基础输出
icon: material-symbols:web
date: 2023-01-20
order: 2
category:
  - Streamlit 教程
tag:
  - Python
  - Streamlit
  - Web
sticky: false
star: false
---

Streamlit 的文字类以及基础输出

<!-- more -->

::: tip
本章节有随附示例：[![Streamlit 链接](https://static.streamlit.io/badges/streamlit_badge_black_white.svg)](https://st-tutorial.streamlit.app/%E6%96%87%E6%9C%AC%E4%B8%8E%E5%9F%BA%E7%A1%80%E6%98%BE%E7%A4%BA)
:::

::: note 当前 Streamlit 版本：1.17.0
:::

## Streamlit 项目结构

作为初学者，我们可以先从单文件的简单程序开始学起，创建一个 Python 文件，比如 `app.py`，然后在其中首先引入 Streamlit 库：

```python
import streamlit as st
```

此后的教程中我们也会使用 `st` 作为 Streamlit 库的别名。要运行所写的程序，只需要在命令行中使用一行简单的命令：

```sh
streamlit run app.py
```

在自动打开的标签页中你将会看到运行的网站（如果没有自动打开，也可以参考命令行输出的地址手动访问），因为我们还没有写任何输出函数，因此只有一个空白界面，下面我们就讲介绍一些最简单和基础的输出函数。

::: warning

在修改 Python 文件并保存后，浏览器中网页右上角会有如下提示*源文件已更改*，可以选择“重新运行”或“始终重新运行”来应用更新，因此可以边修改边看效果，不需要终止命令后再运行！

:::

<BrowserMockup>
    <img
        src="/assets/images/streamlit-rerun-info.png"
        alt="Streamlit 重新运行提示">
</BrowserMockup>

## 标题类

Streamlit 本身支持三种标题类型，区别在于字体大小不同，从大到小分别是 `st.header`、`st.subheader` 和 `st.subheader`。标题的文本语法与下文中 `markdown` 函数所支持的语法一致。所有的标题类函数都可以添加额外的 `anchor` 参数来指定锚链接，即可通过 `<URL>#<anchor>` 的形式来跳转至该元素位置，默认情况下 `anchor` 使用标题文本。

### `st.title`

一级标题

```python
st.title(
        # 标题文本
        "一级标题",
        # 指定锚名称
        anchor="默认使用标题名",
    )
```

### `st.header`

二级标题

```python
st.header(
        # 标题文本
        "二级标题"
    )
```

### `st.subheader`

三级标题

```python
st.header(
        # 标题文本
        "三级标题"
    )
```

各级标题与正文对比图如下

<BrowserMockup>
    <img
        src="/assets/images/streamlit-title-text.png"
        alt="streamlit title、header、subheader 和 text 对比">
</BrowserMockup>

## 正文元素

### `st.text`

最简单的文本元素，接受单个字符串参数，支持多行文本，但不支持 Markdown 等语法。

```python
st.text("纯文本")
```

### `st.code`

显示一段代码，接受一个字符串参数（代码文本），并且可以指定 `language` 参数来根据语言类型改变高亮显示，默认语言为 Python，所有支持的语言见[此链接](https://github.com/react-syntax-highlighter/react-syntax-highlighter/blob/master/AVAILABLE_LANGUAGES_PRISM.MD)。

```python
st.code(
    "print('Hello, world!') # 展示代码，使用 language 指定语言",
    language="python",
)
```

<BrowserMockup>
    <img
        src="/assets/images/streamlit-code.png"
        alt="st.code 示例">
</BrowserMockup>

### `st.markdown`

支持文本语法最丰富的输出函数。支持：

- [GitHub 风格的 Markdown 语法](https://github.github.com/gfm)
- [emoji 简码](https://share.streamlit.io/streamlit/emoji-shortcodes)
- [LaTeX 表达式](https://katex.org/docs/supported.html)
- `:<color>[<content>]` 格式来添加颜色，其中 `color` 仅能为 `blue`、`green`、`orange`、`red`、`violet` 之一
- HTML 标签元素（出于安全性考虑，需要手动指定 `unsafe_allow_html` 为 `True`）

```python
st.markdown(
    "*GitHub*风格的**Markdown**:sunglasses:，"
    + "可以给:blue[任意部分]添加:red[颜色]，"
    + "以及可选的 <b style='opacity: .5;'>HTML</b> 支持",
    unsafe_allow_html=True,
)
```

<BrowserMockup>
    <img
        src="/assets/images/streamlit-markdown.png"
        alt="st.markdown 示例">
</BrowserMockup>

### `st.caption`

比正文字号小一号的文本，用于图注、脚注、边注或者说明。使用方法和支持语法与 `st.markdown` 一致。

```python
st.caption("小号显示的说明文字")
```

<BrowserMockup>
    <img
        src="/assets/images/streamlit-caption.png"
        alt="st.caption 示例">
</BrowserMockup>

### `st.latex`

LaTeX 表达式的支持同 Markdown 中 LaTeX 部分，也可以为 `sympy` 的表达式，会自动转换为 LaTeX 表达式。

```python
st.latex(r"""\LaTeX""")
```

<BrowserMockup>
    <img
        src="/assets/images/streamlit-latex.png"
        alt="st.latex 示例">
</BrowserMockup>

## 其他基础输出

### `st.write` 与 magic command

`st.write` 是最通用的输出函数，可以接受任意类型、任意个数的参数，其输出效果会根据参数类型自动调整：

|   参数类型   | 输出效果                                                        |
| :----------: | :-------------------------------------------------------------- |
|   `string`   | 效果同 `st.markdown` 函数                                       |
| `data_frame` | 表格形式输出 `DataFrame`                                        |
|   `error`    | 输出报错信息                                                    |
|    `func`    | 输出函数文档                                                    |
|   `module`   | 输出模块文档                                                    |
|    `dict`    | 以可交互形式输出字典                                            |
|  `mpl_fig`   | 显示 Matplotlib 图像                                            |
|   `altair`   | 显示 Altair 图表                                                |
|   `keras`    | 显示 Keras 模型                                                 |
|  `graphviz`  | 显示 Graphviz 图表                                              |
| `plotly_fig` | 显示 Plotly 图像                                                |
| `bokeh_fig`  | 显示 Bokeh 图像                                                 |
| `sympy_expr` | 效果同 `st.latex` 函数                                          |
|  `htmlable`  | 如果对象具有 `_repr_html()` 方法，则调用该方法进行输出          |
|    `obj`     | 如果对象可被转化为字符串，则输出 `str(obj)`，否则输出 `unknown` |

一句话概括，就是 `st.write` 是一个万能输出函数，支持几乎任意对象类型，并且不限个数。

而魔法方法（magic commands）则是指如果直接将上述类型的对象写在 Python 文件当中，不加任何函数，Streamlit 同样会对其进行输出，效果与使用 `st.write` 相同。

```python
st.write(
    "write 不仅支持字符串，还可以是几乎任意对象类型，不限个数：", [], {}, ()
    )

"""
魔法方法指可以直接在 Python 代码中写下要输出的内容，
类似于你在 notebook 中做的那样，
同样会进行输出，效果同使用 st.write
"""
```

<BrowserMockup>
    <img
        src="/assets/images/streamlit-write-magic.png"
        alt="st.write 和魔法方法示例">
</BrowserMockup>

### `st.echo`

通过 `st.echo` 可以将源代码输出到页面中，该函数接受一个参数 `code_location`，用于指定输出的位置，可选值有 "above" 和 "below"，默认为 "below"。需要使用 `with` 语法来指定需要输出的代码部分。

```python
# 外
with st.echo("above"):
    # 内
    st.write("只有在 st.echo 环境内的代码才会被输出")
```

<BrowserMockup>
    <img
        src="/assets/images/streamlit-echo.png"
        alt="st.echo 示例">
</BrowserMockup>

### `st.help`

`st.help` 用于输出函数、模块、类的文档，其效果与交互式 Python 内置的 `help()` 函数相同。

```python
st.help(st.help)
```

<BrowserMockup>
    <img
        src="/assets/images/streamlit-help.png"
        alt="st.help 示例">
</BrowserMockup>

## 总结

以上介绍的各种输出函数是 Streamlit 最基础的输出方式，但是不要小看他们的功能，在一个设计良好的网页应用中，你时常会需要用到这些函数来引导用户，告知用户一些信息，或者是在搭建网页时输出一些调试信息，因此最好能够熟悉它们。
