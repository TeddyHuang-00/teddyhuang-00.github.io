---
layout: Slide
title: 闭包网络演化
date: 2023-03-17
icon: material-symbols:hub
---

@slidestart

## 闭包网络演化

<!-- .element: class="r-fit-text" -->

一个简单的闭包演化模拟

<!-- .element: class="r-fit-text" -->

> 黄楠 · 1900012126 · 生命科学学院

---

<!-- .slide: data-auto-animate -->

## 生成数据

<!-- .element: class="r-fit-text" -->

--

<!-- .slide: data-auto-animate -->

## 生成数据

<!-- .element: class="r-fit-text" -->

### 课件图示数据

<!-- .element: class="r-fit-text" -->

--

<!-- .slide: data-auto-animate -->

## 生成数据

### 课件图示数据

![Nodes only](/assets/images/init-network-nodes.svg)

<!-- .element: class="r-stretch" -->

--

<!-- .slide: data-auto-animate -->

## 生成数据

### 课件图示数据

$$
A =
\begin{bmatrix}
    0 & 1 & 0 & 1 & 0 & 0 & 0 & 0 & 0 & 0\\\\
      & 0 & 0 & 0 & 0 & 0 & 0 & 0 & 0 & 0\\\\
      &   & 0 & 0 & 0 & 0 & 0 & 0 & 0 & 0\\\\
      &   &   & 0 & 0 & 1 & 1 & 0 & 0 & 0\\\\
      &   &   &   & 0 & 0 & 0 & 0 & 0 & 0\\\\
      &   &   &   &   & 0 & 0 & 1 & 0 & 1\\\\
      &   &   &   &   &   & 0 & 1 & 0 & 1\\\\
      &   &   &   &   &   &   & 0 & 1 & 0\\\\
      &   &   &   &   &   &   &   & 0 & 1\\\\
      &   &   &   &   &   &   &   &   & 0
\end{bmatrix}
$$

<!-- .element: class="text-sm" -->

![Nodes only](/assets/images/init-network-nodes.svg)

<!-- .element: class="r-stretch" -->

--

<!-- .slide: data-auto-animate -->

## 生成数据

### 课件图示数据

![Nodes only](/assets/images/init-network-nodes.svg)

<!-- .element: class="r-stretch" -->

--

<!-- .slide: data-auto-animate -->

## 生成数据

### 课件图示数据

![Nodes and clubs](/assets/images/init-network-nodes-all.svg)

<!-- .element: class="r-stretch" -->

--

<!-- .slide: data-auto-animate -->

## 生成数据

### 课件图示数据

$$
B =
\begin{bmatrix}
    1 & 1 & 0 & 0 & 0 & 1 & 0 & 0 & 0 & 0\\\\
    0 & 1 & 1 & 1 & 1 & 0 & 0 & 0 & 0 & 0\\\\
\end{bmatrix}^T
$$

<!-- .element: class="text-sm" -->

![Nodes and clubs](/assets/images/init-network-nodes-all.svg)

<!-- .element: class="r-stretch" -->

--

<!-- .slide: data-auto-animate -->

## 生成数据

### 课件图示数据

![Nodes and clubs](/assets/images/init-network-nodes-all.svg)

<!-- .element: class="r-stretch" -->

---

<!-- .slide: data-auto-animate -->

## 生成数据

<!-- .element: class="r-fit-text" -->

--

<!-- .slide: data-auto-animate -->

## 生成数据

<!-- .element: class="r-fit-text" -->

### 随机数据

<!-- .element: class="r-fit-text" -->

--

<!-- .slide: data-auto-animate -->

## 生成数据

### 随机数据

$$
\begin{align*}
  A \in \text{Bern}(p)^{N\times N}\\\\
  B \in \text{Bern}(q)^{N\times C}\\\\
\end{align*}
$$

<!-- .element: class="r-fit-text" -->

--

<!-- .slide: data-auto-animate -->

## 生成数据

### 随机数据

$$
\begin{align*}
  A \in \text{Bern}(p)^{N\times N}\\\\
  B \in \text{Bern}(q)^{N\times C}\\\\
\end{align*}
$$

- $N$ 和 $C$ 分别表示节点数（总人数）和社团数
<!-- .element: class="fragment fade-in" -->
- $\text{Bern}(\cdot)$ 表示伯努利分布
<!-- .element: class="fragment fade-in" -->
- $p$ 和 $q$ 控制初始网络的稀疏程度
<!-- .element: class="fragment fade-in" -->
- $A$ 和 $B$ 分别为邻接矩阵以及社团归属矩阵
<!-- .element: class="fragment fade-in" -->

--

<!-- .slide: data-auto-animate -->

## 生成数据

### 随机数据

$$
\begin{align*}
  A \in \text{Bern}(p)^{N\times N}\\\\
  B \in \text{Bern}(q)^{N\times C}\\\\
\end{align*}
$$

例：生成共 100 个人，10 个社团，人与人之间的朋友关系的概率为 0.1，每个人参与各社团的概率为 0.1 的数据（默认输出目录 `data`，矩阵文件 `A.npy` & `B.npy`）

<!-- .element: class="r-fit-text" -->

```sh
python3 random_data.py -N 100 -C 10 -p 0.1 -q 0.1
```

<!-- .element: class="r-fit-text" -->

---

<!-- .slide: data-auto-animate -->

## 闭包演化

<!-- .element: class="r-fit-text" -->

--

<!-- .slide: data-auto-animate -->

## 闭包演化

<!-- .element: class="r-fit-text" -->

### 计算新边

<!-- .element: class="r-fit-text" -->

--

<!-- .slide: data-auto-animate -->

## 闭包演化

### 计算新边

三元闭包

```python
# 计算共同朋友数
T = A @ A.T
# 根据阈值 t 生成三元闭包
triadic = np.where(
    (A == 0) & (T >= t) & np.triu(np.ones_like(A, dtype=bool), k=1)
    )
```

--

<!-- .slide: data-auto-animate -->

## 闭包演化

### 计算新边

会员闭包

```python
# 计算朋友共同社团数
S = B @ B.T
# 根据阈值 s 生成会员闭包
social = np.where(
    (A == 0) & (S >= s) & np.triu(np.ones_like(A, dtype=bool), k=1)
    )
```

--

<!-- .slide: data-auto-animate -->

## 闭包演化

### 计算新边

社团闭包

```python
# 计算社团中朋友数
M = A @ B
# 根据阈值 m 生成社团闭包
member = np.where((B == 0) & (M >= m))
```

--

<!-- .slide: data-auto-animate -->

## 闭包演化

<!-- .element: class="r-fit-text" -->

### 计算异质性

<!-- .element: class="r-fit-text" -->

--

<!-- .slide: data-auto-animate -->

## 闭包演化

### 计算异质性

根据参加社团的情况划分，统计不同类型的节点数

```python
props: defaultdict[tuple, int] = defaultdict(int)
for b in B:
    # 将参加社团的情况作为键
    props[tuple(b)] += 1
```

--

<!-- .slide: data-auto-animate -->

## 闭包演化

### 计算异质性

根据异质节点计数，计算异质边概率，即两端节点分属不同类型的边概率，此为期望值

```python
prob = 0.0
for i, p in enumerate(list(props.values())[:-1]):
    # 避免重复计数
    for q in list(props.values())[i + 1 :]:
        prob += p * q
prob *= 2.0
# 归一化，每个因子都需除以节点数，故为平方
prob /= len(A) ** 2
```

--

<!-- .slide: data-auto-animate -->

## 闭包演化

### 计算异质性

计数实际观察到异质边频率，此为观测值

```python
freq = 0.0
# 遍历所有边（单次）
for i, j in zip(*np.where((A > 0) & np.triu(np.ones_like(A, dtype=bool), k=1))):
    # 判断两端节点是否属于不同类型
    if not np.array_equal(B[i], B[j]):
        freq += 1
# 归一化，需要除以总边数
freq /= np.sum(A * np.triu(np.ones_like(A, dtype=bool), k=1))
```

---

<!-- .slide: data-auto-animate -->

## 可视化

<!-- .element: class="r-fit-text" -->

--

<!-- .slide: data-auto-animate -->

## 可视化

初始化图，添加人员节点与俱乐部节点以及连接

```python
# 由邻接矩阵建图
G: nx.Graph = nx.from_numpy_array(A)
# 添加各俱乐部节点
for i in range(B.shape[1]):
    G.add_node(f"C {i+1}", shape="box")
# 添加成员-俱乐部归属连接
for i, c in enumerate(B):
    for j, b in enumerate(c):
        if b:
            G.add_edge(i, f"C {j+1}")
```

--

<!-- .slide: data-auto-animate -->

## 可视化

绘制人员节点与俱乐部节点与边

```python
# 计算节点位置（固定圆形布局）
pos = nx.circular_layout(G)
# 绘制人员节点（默认颜色与形状）
nx.draw_networkx_nodes(G, pos, ...)
# 绘制俱乐部节点（不同颜色与形状）
nx.draw_networkx_nodes(G, pos, ...)
# 绘制所有边
nx.draw_networkx_edges(G, pos)
```

--

<!-- .slide: data-auto-animate -->

## 可视化

高亮新加入的边，并绘制标签

```python
# 高亮新加入的边（红色：新朋友、绿色：新成员）
if new_friend is not None:
    nx.draw_networkx_edges(G, pos, edgelist=new_friend, edge_color="tab:red")
if new_member is not None:
    nx.draw_networkx_edges(G, pos, ..., edge_color="tab:green")
# 绘制节点标签
nx.draw_networkx_labels(G, pos)
```

---

<!-- .slide: data-auto-animate -->

## 后期处理

<!-- .element: class="r-fit-text" -->

--

<!-- .slide: data-auto-animate -->

## 后期处理

<!-- .element: class="r-fit-text" -->

### 合成视频

<!-- .element: class="r-fit-text" -->

--

<!-- .slide: data-auto-animate -->

## 后期处理

### 合成视频

使用 `ffmpeg` 将各帧以 2 FPS 的速度合成视频，并输出到 `video/movie.mp4`

```sh
python3 post_process.py \
    -d frames `# 输入目录` \
    -i frame-%d.png `# 帧文件格式` \
    -o video/movie.mp4 `# 输出路径` \
    -f 2 `# 帧率` \
    -l `# 循环播放`
```

--

<!-- .slide: data-auto-animate -->

<video src="/assets/videos/network-closure-evolution.mp4" alt="视频展示" controls autoplay loop>
</video>

<!-- .element: class="r-stretch" -->

---

<!-- .slide: data-auto-animate -->

# 完整代码

<!-- .element: class="r-fit-text" -->

[GitHub Repo](https://github.com/TeddyHuang-00/Computational-Thinking-in-Social-Sciences)

<!-- .element: class="r-fit-text" -->

---

<!-- .slide: data-auto-animate data-background-gradient="linear-gradient(to bottom,rgb(0,0,0),rgb(40,40,40))" -->

# Thanks for your time!

<!-- .element: class="r-fit-text" -->

@slideend
