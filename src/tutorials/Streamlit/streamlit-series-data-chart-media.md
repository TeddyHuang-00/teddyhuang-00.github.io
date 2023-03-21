---
title: 数据、图表与媒体
icon: material-symbols:web
date: 2023-01-29
order: 3
category:
  - Streamlit 教程
tag:
  - Python
  - Streamlit
  - Web
sticky: false
star: false
---

Streamlit 中展示数据、绘制图表与显示多媒体

<!-- more -->

::: tip
本章节有随附示例：[![Streamlit 链接](https://static.streamlit.io/badges/streamlit_badge_black_white.svg)](https://st-tutorial.streamlit.app/%E6%95%B0%E6%8D%AE_%E5%9B%BE%E8%A1%A8%E4%B8%8E%E5%AA%92%E4%BD%93)
:::

::: note 当前 Streamlit 版本：1.17.0
:::

## 数据展示

### `st.dataframe`

`st.dataframe` 能够将数据框对象以表格形式展示出来，具体支持的类型有：`pandas.DataFrame`, `pandas.Styler`, `pyarrow.Table`, `numpy.ndarray`, `pyspark.sql.DataFrame`, `snowflake.snowpark.dataframe.DataFrame`, `snowflake.snowpark.table.Table`, `Iterable`, `dict` 或者 `None`。

比如可以传入一个能够转化为数据框的字典对象，同时使用 `width` 和 `height` 指定宽高（默认情况下根据显示内容大小确定）：

```python
st.dataframe(
    {"a": [1, 2], "b": [3, 4]},
    width=200,
    height=100,
)
```

<BrowserMockup>
    <img
        src="/assets/images/streamlit-dataframe-wh.png"
        alt="st.dataframe 指定显示宽高">
</BrowserMockup>

当然也可以传入一个数据框对象，并且指定使用父容器宽度（优先级高于指定宽度）：

```python
import pandas as pd

st.dataframe(
    pd.DataFrame({"a": [1, 2], "b": [3, 4]}),
    use_container_width=True,
)
```

<BrowserMockup>
    <img
        src="/assets/images/streamlit-dataframe-pd.png"
        alt="st.dataframe 使用父容器宽度">
</BrowserMockup>

不管是什么显示样式的数据框，都具有相同的交互功能：

- 列排序：点击列名（升序-降序-默认 轮换）
- 调整列宽：拖动列边缘
- 表格缩放：拖拽表格右下角
- 搜索：<kbd>Ctrl</kbd>+<kbd>F</kbd>（Windows）或 <kbd>⌘ Cmd</kbd>+<kbd>F</kbd>（MacOS）
- 复制：选中一个区域，<kbd>Ctrl</kbd>+<kbd>C</kbd>（Windows）或 <kbd>⌘ Cmd</kbd>+<kbd>C</kbd>（MacOS）复制，<kbd>Ctrl</kbd>+<kbd>V</kbd>（Windows）或 <kbd>⌘ Cmd</kbd>+<kbd>V</kbd>（MacOS）粘贴

<BrowserMockup>
    <VideoPlayer
        src="/assets/videos/streamlit-dataframe-interact.mp4"
        alt="st.dataframe 交互演示">
    </VideoPlayer>
</BrowserMockup>

### `st.table`

与 `st.dataframe` 类似，`st.table` 也能够将数据框对象以表格形式展示出来，支持的数据框对象类型也是一样的，唯一不同是两者的显示样式。`st.dataframe` 支持多种交互功能，而 `st.table` 仅显示为一个静态表格。

```python
st.table({"a": [1, 2], "b": [3, 4]})
```

<BrowserMockup>
    <img
        src="/assets/images/streamlit-table.png"
        alt="st.table 显示样式示例">
</BrowserMockup>

### `st.metric`

`st.metric` 主要用于展示单个数据指标或度量，同时可以指定如下参数：

|               参数 | 含义                                                                                    |
| -----------------: | :-------------------------------------------------------------------------------------- |
|            `label` | （必选）标签，语法支持同[上一篇](./streamlit-series-basic-output.md)中提到的 `markdown` |
|            `value` | （必选）数值，显示在大字部分                                                            |
|            `delta` | 改变量，显示在大字下方小字部分                                                          |
|      `delta_color` | 控制改变量显示颜色，`normal` 时为“增绿减红”，`inverse` 则反之，`off` 时全为灰色         |
| `label_visibility` | 控制标签是否显示                                                                        |
|             `help` | 在标签边上悬浮时显示说明文本，但不支持复杂文本语法                                      |

比如下面显示一个 `int` 类型的数值和改变量：

```python
st.metric(
    "这是度量的标签",
    value=100,
    delta=2,
    delta_color="normal",
    help="这是度量的说明",
    label_visibility="visible",
)
```

<BrowserMockup>
    <img
        src="/assets/images/streamlit-metric-int.png"
        alt="st.table 显示样式示例">
</BrowserMockup>

`value` 和 `delta` 都支持接受 `str`, `int`, `float` 或 `None`。而 `delta` 的颜色则是会根据其开头是否为负号来决定，如果为 `None` 则显示为灰色，比如下面使用一个负号开头的字符串，在默认的 `normal` 颜色规则下则显示为红色：

```python
st.metric(
    "被隐藏的标签",
    value="100",
    delta="-2",
    label_visibility="hidden",
)
```

<BrowserMockup>
    <img
        src="/assets/images/streamlit-metric-str.png"
        alt="st.table 显示负的 delta">
</BrowserMockup>

### `st.json`

`st.json` 则顾名思义，用于展示 JSON 格式的数据，支持的数据类型为一个可以被序列化为 JSON 的 `object` 对象（如嵌套的字典和列表、元组等）或者一个由 JSON 序列化得到的 `str` 字符串，并且可以通过 `expanded` 参数来控制初始状态是否展开嵌套的数据：

```python
st.json(
    [1, 2, {"key": "value"}],
    expanded=True,
)
```

<BrowserMockup>
    <img
        src="/assets/images/streamlit-json.png"
        alt="st.json 显示示例">
</BrowserMockup>

当然 `st.json` 也支持在网页上折叠/展开部分数据，此处不作多展示。

## 绘制图表 - 内置

Streamlit 内置了四个绘图函数，分别是 `st.line_chart`、`st.area_chart`、`st.bar_chart` 和 `st.map`，前三者的用法和参数都是类似的，主要区别在于显示的图表类型和效果上，`st.map` 的用法我们单独介绍。

### `st.line_chart`

`st.line_chart` 用于绘制折线图，其参数列表如下：

|                  参数 | 含义                                                                                   |
| --------------------: | :------------------------------------------------------------------------------------- |
|                `data` | （必选）数据框对象，支持的类型同 [`st.dataframe`](#stdataframe)                        |
|                   `x` | x 轴所用数据列名，默认为 `None` 使用**数据框索引**，否则应为数据框中的列名（或其列表） |
|                   `y` | y 轴所用数据列名，默认为 `None` 使用**所有列**，否则应为数据框中的列名（或其列表）     |
|               `width` | 指定宽度，默认为 `0` 根据内容自动选择                                                  |
|              `height` | 指定高度，默认为 `0` 根据内容自动选择                                                  |
| `use_container_width` | 使用父容器宽度（优先级高于指定宽度）                                                   |

一个使用随机数据的简单例子如下：

```python
st.line_chart(
    pd.DataFrame(np.random.randn(20, 3), columns=["a", "b", "c"]),
    x=None,
    y=["a", "b", "c"],
    width=0,
    height=0,
    use_container_width=True,
)
```

<BrowserMockup>
    <img
        src="/assets/images/streamlit-line-chart.png"
        alt="st.line_chart 显示示例">
</BrowserMockup>

下面是一个使用 `st.line_chart` 的官方示例，你可以直观感受到这类组件的高可交互性，比如拖拽、缩放、双击还原、导出等等：

<BrowserMockup>
    <iframe
        loading="lazy"
        src="https://doc-line-chart.streamlitapp.com/?embedded=true"
        alt="st.line_chart 官方示例">
    </iframe>
</BrowserMockup>

### `st.area_chart`

`st.area_chart` 用于绘制面积图，其参数列表和 `st.line_chart` 一致，下面是一个使用类似数据的简单例子：

```python
st.area_chart(
    pd.DataFrame(np.random.randn(20, 3), columns=["a", "b", "c"]),
)
```

<BrowserMockup>
    <img
        src="/assets/images/streamlit-area-chart.png"
        alt="st.area_chart 显示示例">
</BrowserMockup>

以下同样是一个使用 `st.area_chart` 的官方示例：

<BrowserMockup>
    <iframe
        loading="lazy"
        src="https://doc-area-chart.streamlitapp.com/?embedded=true"
        alt="st.area_chart 官方示例">
    </iframe>
</BrowserMockup>

### `st.bar_chart`

`st.bar_chart` 用于绘制柱状图，其参数列表和 `st.line_chart` 一致，下面是一个使用类似数据的简单例子：

```python
st.bar_chart(
    pd.DataFrame(np.random.randn(20, 3), columns=["a", "b", "c"]),
)
```

<BrowserMockup>
    <img
        src="/assets/images/streamlit-bar-chart.png"
        alt="st.bar_chart 显示示例">
</BrowserMockup>

以下同样是一个使用 `st.bar_chart` 的官方示例：

<BrowserMockup>
    <iframe
        loading="lazy"
        src="https://doc-bar-chart.streamlitapp.com/?embedded=true"
        alt="st.bar_chart 官方示例">
    </iframe>
</BrowserMockup>

### `st.map`

`st.map` 用于在地图上绘制散点，因此对于输入数据有一定特殊要求，其接受的参数为：

|                参数名 | 说明                                                                                                                                                                                                     |
| --------------------: | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
|                `data` | 需要绘制的数据框（支持同[`st.dataframe`](#stdataframe)），必须包含经纬度数据。<br/>经度列名可为 `lon`, `longitude`, `LON`, `LONGITUDE` 之一；<br/>纬度列名可为 `lat`, `latitude`, `LAT`, `LATITUDE` 之一 |
|                `zoom` | 指定初始缩放倍数（默认根据内容调节，各等级对应尺寸详见[此文档](https://wiki.openstreetmap.org/wiki/Zoom_levels)）                                                                                        |
| `use_container_width` | 使用父容器宽度                                                                                                                                                                                           |

比如下面这段代码即在地图上绘制了 100 个随机的点，并且手动指定了缩放等级为 13：

```python
st.map(
    pd.DataFrame(
        np.random.randn(100, 2) / [150, 150] + [39.990, 116.305],
        columns=[
            "lat",
            "lon",
        ],
    ),
    zoom=13,
)
```

<BrowserMockup>
    <img
        src="/assets/images/streamlit-map.png"
        alt="st.map 显示示例">
</BrowserMockup>

以下为 `st.map` 的官方示例：

<BrowserMockup>
    <iframe
        loading="lazy"
        src="https://doc-map.streamlitapp.com/?embedded=true"
        alt="st.map 官方示例">
    </iframe>
</BrowserMockup>

## 绘制图表 - 第三方库

Streamlit 还支持很多第三方库的图表绘制，比如 `matplotlib`、`seaborn`、`plotly` 等，涉及第三方库语法的部分不展开介绍，因此我们仅在此给出各库的网页或文档说明。

### `st.pyplot`

绘制 [`Matplotlib`](https://matplotlib.org/) 图像。除了传入图像对象外，支持一个额外的 `clear_figure` 参数，用于控制是否在绘制后清空画布。以下是官方示例：

```python
import matplotlib.pyplot as plt
import numpy as np

arr = np.random.normal(1, 1, size=100)
fig, ax = plt.subplots()
ax.hist(arr, bins=20)

st.pyplot(fig)
```

<BrowserMockup>
    <iframe
        loading="lazy"
        src="https://doc-pyplot.streamlitapp.com/?embedded=true"
        alt="st.pyplot 官方示例">
    </iframe>
</BrowserMockup>

### `st.altair_chart`

绘制 [`Altair`](https://altair-viz.github.io/) 图像。除图像外接收 `use_container_width` 和 `theme`参数，后者只能为`"streamlit"` 或 `None`，用于选择是否使用 Streamlit 主题配色。以下是官方对比两种主题的示例：

```python
import altair as alt
from vega_datasets import data

source = data.cars()

chart = alt.Chart(source).mark_circle().encode(
    x='Horsepower',
    y='Miles_per_Gallon',
    color='Origin',
).interactive()

tab1, tab2 = st.tabs(["Streamlit theme (default)", "Altair native theme"])

with tab1:
    # 使用 Streamlit 主题（默认）
    st.altair_chart(chart, theme="streamlit", use_container_width=True)
with tab2:
    # 使用 Altair 原生主题
    st.altair_chart(chart, theme=None, use_container_width=True)
```

<BrowserMockup>
    <iframe
        loading="lazy"
        src="https://doc-altair-chart.streamlit.app/?embedded=true"
        alt="st.altair_chart 官方示例">
    </iframe>
</BrowserMockup>

### `st.vega_lite_chart`

使用 [`Vega-Lite`](https://vega.github.io/vega-lite/) 绘制图像。

**注意**：此函数直接接收一个数据框，同 [`st.dataframe`](#stdataframe)，主要绘图选项需要通过 `spec` 参数进行传入，具体请参考[官方文档](https://vega.github.io/vega-lite/docs/)。另外接收 `use_container_width` 和 `theme` 参数，用法同 [`st.altair_chart`](#staltair_chart)。以下为官方示例：

```python
import pandas as pd
import numpy as np

chart_data = pd.DataFrame(
    np.random.randn(200, 3),
    columns=['a', 'b', 'c'])

st.vega_lite_chart(chart_data, {
    'mark': {'type': 'circle', 'tooltip': True},
    'encoding': {
        'x': {'field': 'a', 'type': 'quantitative'},
        'y': {'field': 'b', 'type': 'quantitative'},
        'size': {'field': 'c', 'type': 'quantitative'},
        'color': {'field': 'c', 'type': 'quantitative'},
    },
})
```

<BrowserMockup>
    <iframe
        loading="lazy"
        src="https://doc-vega-lite-chart.streamlit.app/?embedded=true"
        alt="st.vega_lite_chart 官方示例">
    </iframe>
</BrowserMockup>

### `st.plotly_chart`

绘制 [`Plotly`](https://plot.ly/python/) 图像。除图像外接收 `use_container_width`、`theme` 和 `sharing` 参数，后者用于控制图像是否可以分享：

- `streamlit`：默认，将所有依赖项注入前端网页中
- `public`/`secret`/`private`：分别对应“公开”、“秘密”和“私有”，将图像通过 [Chart studio](https://plotly.com/python/chart-studio/) 来生成对应等级的分享链接，需要额外提供 Chart studio 账户信息。

```python
import numpy as np
import plotly.figure_factory as ff

# 添加随机数据
x1 = np.random.randn(200) - 2
x2 = np.random.randn(200)
x3 = np.random.randn(200) + 2

# 组合数据
hist_data = [x1, x2, x3]

group_labels = ['Group 1', 'Group 2', 'Group 3']

# 创建带有自定义 bin_size 的分布图
fig = ff.create_distplot(
        hist_data, group_labels, bin_size=[.1, .25, .5])

# 使用 Streamlit 绘制
st.plotly_chart(fig, use_container_width=True)
```

<BrowserMockup>
    <iframe
        loading="lazy"
        src="https://doc-plotly-chart.streamlit.app/?embedded=true"
        alt="st.plotly_chart 官方示例">
    </iframe>
</BrowserMockup>

### `st.bokeh_chart`

绘制 [`Bokeh`](https://bokeh.pydata.org/) 图像。除图像外接收 `use_container_width` 参数。以下为官方示例：

```python
import streamlit as st
from bokeh.plotting import figure

x = [1, 2, 3, 4, 5]
y = [6, 7, 2, 4, 5]

p = figure(
    title='simple line example',
    x_axis_label='x',
    y_axis_label='y')

p.line(x, y, legend_label='Trend', line_width=2)

st.bokeh_chart(p, use_container_width=True)
```

<BrowserMockup>
    <iframe
        loading="lazy"
        src="https://doc-bokeh-chart.streamlit.app/?embedded=true"
        alt="st.bokeh_chart 官方示例">
    </iframe>
</BrowserMockup>

### `st.pydeck_chart`

绘制 [`Pydeck`](https://deckgl.readthedocs.io/en/latest/) 图像。除图像外接收 `use_container_width` 参数。你也可以另外参考 [`DeckGL` 的文档](https://github.com/uber/deck.gl/tree/master/docs)以及 [`DeckGL JSON` 的文档](https://github.com/uber/deck.gl/tree/master/modules/json)。以下为官方示例：

```python
import pandas as pd
import numpy as np
import pydeck as pdk

chart_data = pd.DataFrame(
   np.random.randn(1000, 2) / [50, 50] + [37.76, -122.4],
   columns=['lat', 'lon'])

st.pydeck_chart(pdk.Deck(
    map_style=None,
    initial_view_state=pdk.ViewState(
        latitude=37.76,
        longitude=-122.4,
        zoom=11,
        pitch=50,
    ),
    layers=[
        pdk.Layer(
           'HexagonLayer',
           data=chart_data,
           get_position='[lon, lat]',
           radius=200,
           elevation_scale=4,
           elevation_range=[0, 1000],
           pickable=True,
           extruded=True,
        ),
        pdk.Layer(
            'ScatterplotLayer',
            data=chart_data,
            get_position='[lon, lat]',
            get_color='[200, 30, 0, 160]',
            get_radius=200,
        ),
    ],
))
```

<BrowserMockup>
    <iframe
        loading="lazy"
        src="https://doc-pydeck-chart.streamlitapp.com/?embedded=true"
        alt="st.pydeck_chart 官方示例">
    </iframe>
</BrowserMockup>

### `st.graphviz_chart`

绘制 [`Graphviz`](https://www.graphviz.org/) 图像。既可以传入 `graphviz` 库所绘制的图像，也可以直接传入一个 [Dot 语言](https://www.graphviz.org/doc/info/lang.html)写的 `str`。另外接收 `use_container_width` 参数。以下为官方示例：

```python
import streamlit as st
import graphviz

# Create a graphlib graph object
graph = graphviz.Digraph()
graph.edge('run', 'intr')
graph.edge('intr', 'runbl')
graph.edge('runbl', 'run')
graph.edge('run', 'kernel')
graph.edge('kernel', 'zombie')
graph.edge('kernel', 'sleep')
graph.edge('kernel', 'runmem')
graph.edge('sleep', 'swap')
graph.edge('swap', 'runswap')
graph.edge('runswap', 'new')
graph.edge('runswap', 'runmem')
graph.edge('new', 'runmem')
graph.edge('sleep', 'runmem')

st.graphviz_chart(graph)
```

<BrowserMockup>
    <iframe
        loading="lazy"
        src="https://doc-graphviz-chart.streamlitapp.com/?embedded=true"
        alt="st.graphviz_chart 官方示例">
    </iframe>
</BrowserMockup>

## 媒体文件

### `st.image`

在页面上显示一个或多个图像，接受参数列表如下：

|               参数 | 说明                                                                                                                                                                                           |
| -----------------: | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
|            `image` | 可以为图像路径（`str` 或 `[str]`），也可以为图像数据（`numpy.ndarray`、`[numpy.ndarray]` 或 `BytesIO`）                                                                                        |
|          `caption` | 图片说明，如果传入了多个图像，则需要等数量的说明文字                                                                                                                                           |
|            `width` | 图片宽度（仅当显示 SVG 图像时为必需）                                                                                                                                                          |
| `use_column_width` | 使用父容器宽度。此处除 `bool` 类型外还可以指定为<br/> `always`（同 `True`，始终使用父容器宽度，忽略图片宽度）、<br/>`auto`（取宽度较小者，默认）或<br/>`never`（同 `False`，永远使用图片宽度） |
|            `clamp` | 截断非法数值（数值合法范围为 0-255），如果未被指定则遇到非法数值即报错                                                                                                                         |
|         `channels` | 通道顺序，仅可为 `RGB` 或 `BGR`                                                                                                                                                                |
|    `output_format` | 前端显示格式，仅可为 `JPEG`（适合照片等）、`PNG`（适合图表等）或 `auto`（默认，自动选择合适的压缩格式）                                                                                        |

使用 URL 作为图像源：

```python
st.image(
    "https://streamlit.io/images/brand/streamlit-mark-color.svg",
    caption="这是 Streamlit 的 logo",
    use_column_width=True,
)
```

<BrowserMockup>
    <img
        src="/assets/images/streamlit-image-url.png"
        alt="st.image 显示通过 URL 指定的图片">
</BrowserMockup>

直接传入图像数据：

```python
st.image(
    np.random.randint(0, 256, (100, 100, 3)),
    width=200,
    clamp=True,
    channels="RGB",
    output_format="auto",
)
```

<BrowserMockup>
    <img
        src="/assets/images/streamlit-image-bytes.png"
        alt="st.image 显示图片的二进制数据">
</BrowserMockup>

### `st.audio`

在页面上播放音频文件，接受参数列表如下：

|          参数 | 说明                                                                                                   |
| ------------: | :----------------------------------------------------------------------------------------------------- |
|        `data` | 可以为音频路径（`str`），也可以为音频数据（`numpy.ndarray`、`bytes`、`io.open()` 或 `BytesIO`）        |
|      `format` | 音频的互联网媒体类型（即 MIME，默认为 `audio/wav`，详见[此说明](https://tools.ietf.org/html/rfc4281)） |
|  `start_time` | 播放开始时间                                                                                           |
| `sample_rate` | 采样率（仅当传入 `numpy.ndarray` 时为必需）                                                            |

演示生成并播放一段 $440\text{Hz}$ 的音频：

```python
st.audio(
    np.sin(440 * np.linspace(0, 2, 2 * 44100, False) * 2 * np.pi),
    sample_rate=44100,
    start_time=0,
    format="audio/wav",
)
```

<BrowserMockup>
    <img
        src="/assets/images/streamlit-audio.png"
        alt="st.audio 播放生成的音频">
</BrowserMockup>

也可以参考官方给出的示例（包含播放来自 URL 的音频）：

<BrowserMockup>
    <iframe
        loading="lazy"
        src="https://doc-audio.streamlitapp.com/?embedded=true"
        alt="st.audio 官方示例">
    </iframe>
</BrowserMockup>

### `st.video`

在页面上播放视频，接受参数基本同 `st.audio`，但 `format` 参数默认为 `video/mp4`，并且没有 `sample_rate` 参数。

播放一个本地视频：

```python
st.video(
    "./Streamlit-hello.webm",
    start_time=0,
    format="video/webm",
)
```

<BrowserMockup>
    <img
        src="/assets/images/streamlit-video.png"
        alt="st.video 播放本地视频">
</BrowserMockup>

也可以参考官方给出的示例（包含播放来自 URL 的音频）：

<BrowserMockup>
    <iframe
        loading="lazy"
        src="https://doc-video.streamlitapp.com/?embedded=true"
        alt="st.video 官方示例">
    </iframe>
</BrowserMockup>

## 总结

从以上这些图像以及媒体类输出函数的效果中，你或许已经能够感受到 Streamlit 强大的可视化以及可交互性了。在下一个章节中，我们会着重介绍 Streamlit 的交互式组件，以及如何使用它们来构建一个简单的应用。
