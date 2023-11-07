---
title: 梯度下降的收敛性分析
icon: material-symbols:calculate
date: 2023-11-06
tag:
  - Math
  - Algorithm
sticky: false
star: false
---

记一点凸优化学习笔记。

<!-- more -->

## 前置知识

### Lipschitz 连续

$f: \mathbb{R}^n \rightarrow \mathbb{R}^m$ 是 Lipschitz 连续（$L$-continuous）的，当且仅当 $\exists L > 0$，使得 $\forall x, y \in \mathbb{R}^n$，有

$$
\|f(x) - f(y)\| \le L \|x - y\|
$$

### Lipschitz 光滑

与 Lipschitz 连续类似，$f: \mathbb{R}^n \rightarrow \mathbb{R}^m$ 是 Lipschitz 光滑（$L$-smooth）的，当且仅当 $\exists L > 0$，使得 $\forall x, y \in \mathbb{R}^n$，有

$$
\|\nabla f(x) - \nabla f(y)\| \le L \|x - y\|
$$

### 凸函数

$f: \mathbb{R}^n \rightarrow \mathbb{R}$ 是凸函数（convex function），当且仅当 $\forall x, y \in \mathbb{R}^n, \forall \lambda \in [0, 1]$，有

$$
f(\lambda x + (1 - \lambda) y) \le \lambda f(x) + (1 - \lambda) f(y) \\
\Leftrightarrow f(y) \ge f(x) + \nabla f(x)^T (y - x) \\
\Leftrightarrow \nabla^2 f(x) \succcurlyeq 0
$$

::: note 注

对于矩阵 $A \in \mathbb{R}^{n\times n}$，$\forall x \in \mathbb{R}^n$：

- 如果 $x^T A x \ge 0$，则称 $A$ 是半正定矩阵（positive semi-definite matrix, p.s.d. matrix），记作 $A \succcurlyeq 0$。
- 如果 $x^T A x > 0$，则称 $A$ 是正定矩阵（positive definite matrix, p.d. matrix），记作 $A \succ 0$。

从特征值的角度来看，对于 $A$ 的所有特征值 $\lambda_i, \forall i=1,\cdots,n$

- $A \succcurlyeq 0$ 等价于 $\lambda_i \ge 0$
- $A \succ 0$ 等价于 $\lambda_i > 0$。

:::

### 强凸函数

$f: \mathbb{R}^n \rightarrow \mathbb{R}$ 是强凸函数（strongly convex function），当且仅当 $\exists \mu > 0$，使得 $\forall x, y \in \mathbb{R}^n, \forall \lambda \in [0, 1]$，有

$$
f(\lambda x + (1 - \lambda) y) \le \lambda f(x) + (1 - \lambda) f(y) - \frac{\mu}{2} \lambda (1 - \lambda) \|x - y\|^2 \\
\Leftrightarrow f(y) \ge f(x) + \nabla f(x)^T (y - x) + \frac{\mu}{2} \|x - y\|^2 \\
\Leftrightarrow \nabla^2 f(x) \succcurlyeq \mu I
$$

### 梯度下降

梯度下降（gradient descent）是一种迭代算法，在这里我们只考虑最简单的形式，即要求函数 $f$ 至少是 Lipschitz 光滑的，则有

$$
f(x_{k+1}) \le f(x_k) + \nabla f(x_k)^T (x_{k+1} - x_k) + \frac{L}{2} \|x_{k+1} - x_k\|^2
$$

因此尽管 $f$ 可能不是二次函数，但是梯度下降的迭代过程可以看作是在二次函数 $f(x_k) + \nabla f(x_k)^T (x - x_k) + \frac{L}{2} \|x - x_k\|^2$ 上进行的，因此其优化的目标函数为

$$
q_{x_k}(x) = f(x_k) + \nabla f(x_k)^T (x - x_k) + \frac{L}{2} \|x - x_k\|^2 \approx f(x)
$$

要最小化二次函数 $q_{x_k}(x)$，只需要令其梯度为 0 即可，即令

$$
\nabla q_{x_k}(x) = \nabla f(x_k) + L (x - x_k) \xlongequal{!} 0 \\
\Rightarrow x_{k+1} = x = x_k - \frac{1}{L} \nabla f(x_k)
$$

这里的 $-\nabla f(x_k)$ 即为梯度下降的方向，而 $\frac{1}{L}$ 则是步长，记作 $\alpha$；我们由此也能得到

$$
\begin{align*}
  f(x_{k+1}) \le & f(x_k) + \nabla f(x_k)^T (x_{k+1} - x_k) + \frac{L}{2} \|x_{k+1} - x_k\|^2 \\
  = & f(x_k) - \frac{1}{L} \|\nabla f(x_k)\|^2 + \frac{1}{2L} \|\nabla f(x_k)\|^2 \\
  = & f(x_k) - \frac{1}{2L} \|\nabla f(x_k)\|^2
\end{align*}
$$

::: details 牛顿法

除了梯度下降，我们还可以使用牛顿法（Newton's method）来进行优化。为了解 $h(x)=0$，我们可以令 $g(x)=x-\alpha h(x)$，其中 $\alpha>0$ 是缩放系数，那么我们可以如此迭代：

$$
x_{k+1} = g(x_k)
$$

迭代至收敛时，则有

$$
x_* = g(x_*) = x_* - \alpha h(x_*) \\
\Rightarrow h(x_*) = 0
$$

:::

### 收敛标准

假定定义域中 $x_*\in\Omega$ 是 $f$ 的最小值点，对应的函数值为 $f_* = f_*$，那么对于 $\forall\varepsilon > 0$：

1. 如果 $f(x)-f_* \le\varepsilon$，那么称 $x$ 是 $\varepsilon$-最优点（$\varepsilon$-optimal point）
2. 如果 $\|\nabla f(x)\| \le\varepsilon$，那么称 $x$ 是 $\varepsilon$-临界点（$\varepsilon$-critical point）

## 收敛性分析

在前面的推导中，我们得到了对于 Lipschitz 光滑函数 $f$，梯度下降的迭代步长为 $\alpha = \frac{1}{L}$，因此以下分析都是基于这个步长的。需要说明的是，不管是在实际应用中还是理论分析中，对于不仅光滑并且凸的函数，有更优的迭代步长，能够以更快的速度收敛，但是其推导较为复杂，这里我们只考虑最简单的情况。

### Lipschitz 光滑函数

对于 Lipschitz 光滑函数 $f$，我们有

$$
\begin{align*}
  f(x+\alpha d) \le & f(x) + \alpha\nabla f(x)^Td + \frac{L}{2}\alpha^2\|d\|^2 \\
  \Rightarrow f(x_{k+1}) \le & f(x_k) - \frac{1}{2L}\|\nabla f(x_k)\|^2 \\
  \Rightarrow f(x_T) \le & f(x_0) - \frac{1}{2L}\sum_{k=0}^{T-1}\|\nabla f(x_k)\|^2 \\
  \Rightarrow \sum_{k=0}^{T-1}\|\nabla f(x_k)\|^2 \le & 2L\left(f(x_0) - f(x_T)\right) \\
  \le & 2L\left(f(x_0) - f_*\right) \\
  \Rightarrow \min_{0\le k\le T-1}\|\nabla f(x_k)\|^2 \le & \frac{2L}{T}\left(f(x_0) - f_*\right) \\
  \Rightarrow \min_{0\le k\le T-1}\|\nabla f(x_k)\| \le & \sqrt{\frac{2L}{T}\left(f(x_0) - f_*\right)}
\end{align*}
$$

因此可以看到要达到 $\varepsilon$-临界点，需要迭代次数要满足

$$
\begin{align*}
  \sqrt{\frac{2L}{T}\left(f(x_0) - f_*\right)} \le & \varepsilon \\
  \Rightarrow T \ge & \frac{2L}{\varepsilon^2}\left(f(x_0) - f_*\right)
\end{align*}
$$

因此收敛所需时间复杂度为 $O\left(\frac{1}{\varepsilon^2}\right)$，为次线性收敛。

::: details 收敛速度

对于序列 $\{a_n\}$，如果 $\lim_{n\to\infty}a_n\to0$，并且有

$$
\lim_{n\to\infty}\frac{a_{n+1}}{a_n} = \rho
$$

1. 如果 $\rho=0$，则称 $\{a_n\}$ 是超线性收敛的
2. 如果 $\rho\in(0,1)$，则称 $\{a_n\}$ 是线性收敛的
3. 如果 $\rho=1$，则称 $\{a_n\}$ 是次线性收敛的

:::

### Lipschitz 光滑 + 凸函数

对于凸函数 $f$，我们有

$$
\begin{align*}
  f(y) \ge & f(x) + \nabla f(x)^T(y - x) \\
  \text{Let} \begin{cases}
    y=x_*\\
    x=x_k
  \end{cases} \Rightarrow f_* \ge & f(x_k) + \nabla f(x_k)^T(x_* - x_k) \\
  \Rightarrow f(x_k) \le & f_* + \nabla f(x_k)^T(x_k - x_*)
\end{align*}
$$

结合前面推到的 Lipschitz 光滑函数有 $f(x_{k+1}) \le f(x_k)-\frac{1}{2L}\left\|\nabla f(x_k)\right\|^2$，代入可得

$$
f(x_{k+1}) \le f_* + \nabla f(x_k)^T(x_k - x_*) - \frac{1}{2L}\left\|\nabla f(x_k)\right\|^2
$$

又有

$$
\begin{align*}
  \left\|\nabla f(x_k)\right\|^2 = & L^2\left\|x_{k+1} - x_k\right\|^2 \\
  = & L^2 \left(\left\|x_{k+1} - x_*\right\|^2 + \left\|x_k - x_*\right\|^2 - 2 \left<x_{k+1}-x_*,x_k-x_*\right>\right) \\
  = & L^2 \left(\left\|x_{k+1} - x_*\right\|^2 + \left\|x_k - x_*\right\|^2 - 2 \left<x_k-\frac{1}{L}\nabla f(x_k)-x_*,x_k-x_*\right>\right) \\
  = & L^2 \left(\left\|x_{k+1} - x_*\right\|^2 - \left\|x_k - x_*\right\|^2 + \frac{2}{L} \left<\nabla f(x_k),x_k-x_*\right>\right) \\
  = & L^2 \left(\left\|x_{k+1} - x_*\right\|^2 - \left\|x_k - x_*\right\|^2 + \frac{2}{L} \nabla f(x_k)^T(x_k-x_*)\right) \\
\end{align*}
$$

代入上式可得

$$
\begin{align*}
  f(x_{k+1}) \le & f_* + \nabla f(x_k)^T(x_k - x_*) \\
  & - \frac{L}{2}\left(\left\|x_{k+1} - x_*\right\|^2 - \left\|x_k - x_*\right\|^2 + \frac{2}{L} \nabla f(x_k)^T(x_k-x_*)\right) \\
  = & f_* - \frac{L}{2}\left(\left\|x_{k+1} - x_*\right\|^2 - \left\|x_k - x_*\right\|^2\right) \\
  \Rightarrow \sum_{k=0}^{T-1}f(x_{k+1}) \le & Tf_* - \frac{L}{2}\left(\left\|x_T - x_*\right\|^2 - \left\|x_0 - x_*\right\|^2\right) \\
  \le & Tf_* + \frac{L}{2}\left\|x_0 - x_*\right\|^2
\end{align*}
$$

又因为每一步都有 $f(x_{k+1}) \le f(x_k)-\frac{1}{2L}\left\|\nabla f(x_k)\right\|^2$，因此 $\forall k=0,\cdots,T-1,\quad f(x_T)<f(x_k)$，因此有

$$
\begin{align*}
  T f(x_T) \le & T f_* + \frac{L}{2}\left\|x_0 - x_*\right\|^2 \\
  \Rightarrow f(x_T) - f_* \le & \frac{L}{2T}\left\|x_0 - x_*\right\|^2 \\
\end{align*}
$$

要达到 $\varepsilon$-最优点，需要迭代次数要满足

$$
\begin{align*}
  \frac{L}{2T}\left\|x_0 - x_*\right\|^2 \le & \varepsilon \\
  \Rightarrow T \ge & \frac{L}{2\varepsilon}\left\|x_0 - x_*\right\|^2
\end{align*}
$$

因此收敛所需时间复杂度为 $O\left(\frac{1}{\varepsilon}\right)$，依然为次线性收敛。

### Lipschitz 光滑 + 强凸函数

对于强凸函数 $f$，我们有

$$
\begin{align*}
  f(y) \ge & f(x) + \nabla f(x)^T(y - x) + \frac{\mu}{2}\|y - x\|^2 \\
  \text{Let} \begin{cases}
    y=x_*\\
    y-x=-\frac{\nabla f(x)}{\mu}
  \end{cases} \Rightarrow f_* \ge & f(x) - \frac{1}{\mu}\left\|\nabla f(x)\right\|^2 + \frac{\mu}{2}\cdot\frac{1}{\mu^2}\left\|\nabla f(x)\right\|^2 \\
  = & f(x) - \frac{1}{2\mu}\left\|\nabla f(x)\right\|^2 \\
  \Rightarrow f(x)-f_* \le & \frac{1}{2\mu}\left\|\nabla f(x)\right\|^2
\end{align*}
$$

结合前面推到的 Lipschitz 光滑函数有 $f(x_{k+1}) \le f(x_k)-\frac{1}{2L}\left\|\nabla f(x_k)\right\|^2$，代入可得

$$
\begin{align*}
  f(x_{k+1}) \le & f(x_k) - \frac{2\mu}{2L}\left(f(x_k)-f_*\right) \\
  \Rightarrow f(x_{k+1})-f_* \le & f(x_k)-f_* - \frac{\mu}{L}\left(f(x_k)-f_*\right) \\
  = & \left(1-\frac{\mu}{L}\right)\left(f(x_k)-f_*\right) \\
  \Rightarrow f(x_T)-f_* \le & \left(1-\frac{\mu}{L}\right)^T\left(f(x_0)-f_*\right)
\end{align*}
$$

要达到 $\varepsilon$-最优点，需要迭代次数要满足

$$
\begin{align*}
  \left(1-\frac{\mu}{L}\right)^T\left(f(x_0)-f_*\right) \le & \varepsilon \\
  \Rightarrow \frac{f(x_0)-f_*}{\varepsilon} \le & \left(1-\frac{\mu}{L}\right)^{-T} \\
  \Rightarrow \log\frac{f(x_0)-f_*}{\varepsilon} \le & T\underbrace{\log\frac{1}{1-\frac{\mu}{L}}}_{\approx \frac{\mu}{L}} \\
  \Rightarrow T \ge & \frac{L}{\mu}\log\frac{f(x_0)-f_*}{\varepsilon}
\end{align*}
$$

因此收敛所需时间复杂度为 $O\left(\log\frac{1}{\varepsilon}\right)$，为线性收敛。

## 杂记

期中季实在太忙了，有好多想写的东西，但是连手头在做的项目代码都没时间写，就都别提这些了，只能先记一点可能是最有用的，其他的以后再补充吧。

凸优化相关的还有很多内容，包括加速梯度下降算法，随机梯度下降算法，约束优化等等等等，这些都是很有意思的，当然如果要做收敛性分析就很有挑战了，以后有机会再写吧。~~大概率太难不写。~~

## 参考资料

- Wright, S., & Recht, B. (2022). Optimization for Data Analysis. Cambridge: Cambridge University Press. doi:[10.1017/9781009004282](https://doi.org/10.1017/9781009004282)
