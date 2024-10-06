---
layout: SlidePage
title: Neural Locality Sensitive Hashing
date: 2023-05-10
icon: material-symbols:slideshow
tag:
  - Algorithm
---

<!-- Journal club presentation on May 12th, 2023 -->

<!-- more -->

@slidestart white

<!-- .slide: data-auto-animate -->

## A neural algorithm for a fundamental computing problem

Sanjoy Dasgupta, Charles F. Stevens, Saket Navlakha

https://doi.org/10.1126/science.aam9868

<!-- Previous research: https://doi.org/10.1162/isal_a_00321 -->

---

<!-- .slide: data-auto-animate -->

### Locality Sensitive Hashing

<!-- .element: class="r-fit-text" -->

--

<!-- .slide: data-auto-animate -->

### Locality Sensitive Hashing

Normal Hashing

![Normal Hashing](/projects/NLSH/Hash.svg)

<!-- .element: class="r-stretch" -->

--

<!-- .slide: data-auto-animate -->

### Locality Sensitive Hashing

Locality Sensitive Hashing

![Locality Sensitive Hashing](/projects/NLSH/LSH.svg)

<!-- .element: class="r-stretch" -->

--

<!-- .slide: data-auto-animate -->

### Locality Sensitive Hashing

Formal definition of a LSH function $h: \mathbb{R}^d\mapsto\mathbb{R}^m$:

- Given a similarity function $\phi:\mathbb{R}^d\times \mathbb{R}^d\mapsto[0,1]$

<!-- .element: class="fragment fade-in" -->

- For any two points $p,q\in\mathbb{R}^d$

<!-- .element: class="fragment fade-in" -->

- $\text{Pr}\left[h(p)=h(q)\right]=\phi(p,q)$

<!-- .element: class="fragment fade-in" -->

--

<!-- .slide: data-auto-animate -->

### LSH applications

Near-constant-time lookup of nearby points

![LSH: Neighbor search](/projects/NLSH/NeighborSearch.gif)

<!-- .element: class="r-stretch" -->

Tyler Neylon: https://tylerneylon.com/a/lsh1/

<!-- .element: class="text-sm" -->

--

<!-- .slide: data-auto-animate -->

### LSH applications

- Multimedia processing/fingerprinting

<!-- .element: class="fragment fade-in-then-semi-out" -->

- Malware detection

<!-- .element: class="fragment fade-in-then-semi-out" -->

- Text clustering

<!-- .element: class="fragment fade-in-then-semi-out" -->

- Odor clustering

<!-- .element: class="fragment fade-in text-rose-500" -->

---

<!-- .slide: data-auto-animate -->

### Fly olfactory circuit

<!-- .element: class="r-fit-text" -->

--

<!-- .slide: data-auto-animate -->

### Fly olfactory circuit

![Spiking pattern of ORN](/projects/NLSH/OSN-Spiking.png)

<!-- .element: class="w-full" -->

John Carter, Jocelyn Rego, Daniel Schwartz, Vikas Bhandawat, and Edward Kim: https://doi.org/10.1145/3407197.3407214

<!-- .element: class="text-sm" -->

- No clear pattern in OSN spiking

<!-- .element: class="fragment fade-in" -->

- Impossible to learn from OSN

<!-- .element: class="fragment fade-in" -->

--

<!-- .slide: data-auto-animate -->

### Fly olfactory circuit

![Fly olfactory circuit](/projects/NLSH/Fly-Olfactory-Circuit.svg)

<!-- .element: class="w-full" -->

Zhilei Zhao and Carolyn S. McBride: https://doi.org/10.1007/s00359-020-01399-6

<!-- .element: class="text-sm" -->

- Sparse tags in KCs

<!-- .element: class="fragment fade-in" -->

- Make it possible to learn

<!-- .element: class="fragment fade-in" -->

--

<!-- .slide: data-auto-animate -->

### LSH in fly olfaction

<!-- .element: class="r-fit-text" -->

--

<!-- .slide: data-auto-animate -->

### LSH in fly olfaction

![Fig 1](/projects/NLSH/Fig1.svg)

<!-- .element: class="r-stretch" -->

Sanjoy Dasgupta, Charles F. Stevens, Saket Navlakha

<!-- .element: class="text-sm" -->

---

<!-- .slide: data-auto-animate -->

### Benchmarking

<!-- .element: class="r-fit-text" -->

--

<!-- .slide: data-auto-animate -->

### Benchmarking

![Fig 2](/projects/NLSH/Fig2.svg)

<!-- .element: class="r-stretch" -->

Sanjoy Dasgupta, Charles F. Stevens, Saket Navlakha

<!-- .element: class="text-sm" -->

- Binary projection matrix won't hurt performance

<!-- .element: class="fragment fade-in-then-semi-out" -->

- Winner-take-all increases performance

<!-- .element: class="fragment fade-in-then-semi-out" -->

--

<!-- .slide: data-auto-animate -->

### Benchmarking

![Fig 3](/projects/NLSH/Fig3.svg)

<!-- .element: class="w-full" -->

Sanjoy Dasgupta, Charles F. Stevens, Saket Navlakha

<!-- .element: class="text-sm" -->

- $20k\to 10d$ KCs (closer to real world)

<!-- .element: class="fragment fade-in-then-semi-out" -->

- Further improvement (especially for small $k$)

<!-- .element: class="fragment fade-in-then-semi-out" -->

--

<!-- .slide: data-auto-animate -->

### Benchmarking

![Fig S1](/projects/NLSH/FigS1.svg)

<!-- .element: class="w-full" -->

Sanjoy Dasgupta, Charles F. Stevens, Saket Navlakha

<!-- .element: class="text-sm" -->

- ~10% PN-to-KC sample rate is good enough

<!-- .element: class="fragment fade-in-then-semi-out" -->

- Much cheaper than dense Gaussian projection

<!-- .element: class="fragment fade-in-then-semi-out" -->

--

<!-- .slide: data-auto-animate -->

### Benchmarking

GIST dataset ($d=960$)

![Fig S2](/projects/NLSH/FigS2.svg)

<!-- .element: class="w-full" -->

Sanjoy Dasgupta, Charles F. Stevens, Saket Navlakha

<!-- .element: class="text-sm" -->

- Conclusion holds for higher-dimensional data

<!-- .element: class="fragment fade-in-then-semi-out" -->

---

<!-- .slide: data-auto-animate -->

### Proof of efficiency

<!-- .element: class="r-fit-text" -->

--

<!-- .slide: data-auto-animate -->

### Proof of efficiency

Denote $x=(x_1,\cdots,x_d)\in\mathbb{R}^d$, $y=(y_1,\cdots,y_m)\in\mathbb{R}^m$

<!-- .element: class="fragment fade-in" -->

And binary sparse projection matrix: $$M_{ji}=\begin{cases}
1&\text{if } x_i \text{ connects to } y_j \text{ with probability }p\\\\
0&\text{otherwise}
\end{cases}$$

<!-- .element: class="fragment fade-in" -->

Then we have $y=Mx$

<!-- .element: class="fragment fade-in" -->

--

<!-- .slide: data-auto-animate -->

### Proof of efficiency

Then we have $y=Mx$

For a given $x\in\mathbb{R}^d$, let $Y_j = M_j\cdot x$

<!-- .element: class="fragment fade-in" -->

$$
\begin{align}
  \mathbb{E}Y_j = & p(\mathbf{1}\cdot x)\\\\
  \mathbb{E}Y_j^2 = & p(1-p)\left\lVert x\right\rVert^2 + p^2(\mathbf{1}\cdot x)^2
\end{align}
$$

<!-- .element: class="fragment fade-in" -->

$$
\mathbb{E}\left\lVert Y\right\rVert^2 = m\left(p(1-p)\left\lVert x\right\rVert^2 + p^2(\mathbf{1}\cdot x)^2\right)
$$

<!-- .element: class="fragment fade-in" -->

--

<!-- .slide: data-auto-animate -->

### Proof of efficiency

$$
\mathbb{E}\left\lVert Y\right\rVert^2 = m\left(p(1-p)\left\lVert x\right\rVert^2 + p^2(\mathbf{1}\cdot x)^2\right)
$$

$$
\begin{align}
  \mathbb{E}\left\lVert Y-Y'\right\rVert^2 = & mp(1-p)\left\lVert x-x'\right\rVert^2 \\\\
    & + mp^2(\mathbf{1}\cdot (x-x'))^2
\end{align}
$$

<!-- .element: class="fragment fade-in" -->

when $x-x'\approx 0$

<!-- .element: class="fragment fade-in" -->

$$
\mathbb{E}\left\lVert Y-Y'\right\rVert^2 \approx mp(1-p)\left\lVert x-x'\right\rVert^2
$$

<!-- .element: class="fragment fade-in" -->

--

<!-- .slide: data-auto-animate -->

### $\mathcal{l}_2$ distances are preserved

$$
\mathbb{E}\left\lVert Y-Y'\right\rVert^2 \approx mp(1-p)\left\lVert x-x'\right\rVert^2
$$

--

<!-- .slide: data-auto-animate -->

### Proof of efficiency

See [Supplementary Material](https://www.science.org/action/downloadSupplement?doi=10.1126%2Fscience.aam9868&file=aam9868_dasgupta_sm.pdf) for detail

<!-- .element: class="text-sm" -->

We still need guarantee on variance $$(1-\epsilon)\mathbb{E}\left\lVert Y\right\rVert^2 \leq \left\lVert Y\right\rVert^2 \leq (1+\epsilon)\mathbb{E}\left\lVert Y\right\rVert^2$$

<!-- .element: class="fragment fade-in" -->

$\forall 0<\delta,\epsilon<1$, take $m\ge\frac{5}{\epsilon^2\delta}\left(2pd+\color{red}{\frac{d\left\lVert x\right\rVert_4^4}{\left\lVert x\right\rVert^4}}\right)$

<!-- .element: class="fragment fade-in" -->

Then $\text{Pr}\left[1-\epsilon\leq \frac{\left\lVert Y\right\rVert^2}{\mathbb{E}\left\lVert Y\right\rVert^2} \leq 1+\epsilon\right]\ge 1-\delta$

<!-- .element: class="fragment fade-in" -->

--

<!-- .slide: data-auto-animate -->

### Proof of efficiency

See [Supplementary Material](https://www.science.org/action/downloadSupplement?doi=10.1126%2Fscience.aam9868&file=aam9868_dasgupta_sm.pdf) for detail

<!-- .element: class="text-sm" -->

If $\forall X_i \in X$, $X_i$ is i.i.d. draws from some $\text{Exp}(\lambda)$

<!-- .element: class="fragment fade-in" -->

Then $\frac{\left\lVert x\right\rVert_4^4}{\left\lVert x\right\rVert^4}=\frac{\left\lVert x\right\rVert_4^4}{\left(\left\lVert x\right\rVert_2^2\right)^2}=\frac{6}{d}$

<!-- .element: class="fragment fade-in" -->

Then $\text{Pr}\left[1-\epsilon\leq \frac{\left\lVert Y\right\rVert^2}{\mathbb{E}\left\lVert Y\right\rVert^2} \leq 1+\epsilon\right]\ge 1-\delta$

<!-- .element: class="fragment fade-in" -->

And $\forall \delta\in(0,1), k\in\mathbb{N}^+$
$$\text{Pr}\left[1-\frac{2^k}{\sqrt{d\delta}}\leq \frac{\left\lVert X\right\rVert_k^k}{\mathbb{E}\left\lVert X\right\rVert_k^k} \leq 1+\frac{2^k}{\sqrt{d\delta}}\right]\ge 1-\delta$$

<!-- .element: class="fragment fade-in" -->

---

<!-- .slide: data-auto-animate -->

### Conclusion

<!-- .element: class="r-fit-text" -->

--

<!-- .slide: data-auto-animate -->

### Conclusion

Similar strategy exists for other species

|             Species |              Sensory               |                 Random Projection                  |                   Expansion                   |       Winner Take All       |
| ------------------: | :--------------------------------: | :------------------------------------------------: | :-------------------------------------------: | :-------------------------: |
|   Fly<br/>olfaction |  Antennae lobe;<br/>50 glomeruli   |      Sparse, binary;<br/>samples 6 glomeruli       |     Mushroom body;<br/>2000 Kenyon cells      |   APL neuron;<br/>top 5%    |
|                     |                                    |                                                    |                                               |                             |
| Mouse<br/>olfaction | Olfactory bulb;<br/>1000 glomeruli |       Dense, weak;<br/>samples all glomeruli       | Piriform cortex;<br/>100,000 semi-lunar cells |    Layer 2A;<br/>top 10%    |
|                     |                                    |                                                    |                                               |                             |
|  Rat<br/>cerebellum |        Precerebellar nuclei        | Sparse, binary;<br/>samples 4 precerebellar nuclei |  Granule cell layer;<br/>250M granule cells   | Golgi cells;<br/>top 10-20% |
|                     |                                    |                                                    |                                               |                             |
| Rat<br/>hippocampus |        Precerebellar nuclei        |                         /                          |     Dentate gyrus;<br/>1.2M granule cells     |   Hilar cells;<br/>top 2%   |
|                     |                                    |                                                    |                                               |                             |

<!-- .element: class="r-fit-text" -->

--

<!-- .slide: data-auto-animate -->

### Conclusion

~3-fold improvement with same computational cost

![Fig S3](/projects/NLSH/FigS3.svg)

<!-- .element: class="r-stretch" -->

Sanjoy Dasgupta, Charles F. Stevens, Saket Navlakha

<!-- .element: class="text-sm" -->

--

<!-- .slide: data-auto-animate -->

### Questions

- Why not use the first layer of sensory neurons as the tags in the first place?

<!-- .element: class="fragment fade-in" -->

- Where does the high-firing rate tail (Gaussian/exponential) of PNs come from?

<!-- .element: class="fragment fade-in" -->

- What about data-dependent hashing?

<!-- .element: class="fragment fade-in" -->

---

<!-- .slide: data-auto-animate -->

### Thank you for listening

<!-- .element: class="r-fit-text" -->

A [Python package](https://github.com/TeddyHuang-00/FlyHash) is available for playing around

@slideend
