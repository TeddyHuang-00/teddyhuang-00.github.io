---
layout: Slide
title: Artificial agents tracking odour plumes
date: 2023-03-23
icon: material-symbols:slideshow
tag:
  - Deep Learning
  - Reinf Learning
  - Comp Neuro
---

<!-- 2023 年 03 月 24 日 JC -->

<!-- more -->

@slidestart white

<!-- .slide: data-auto-animate -->

### Emergent behaviour and neural dynamics in artificial agents tracking odour plumes

Satpreet H. Singh, Floris van Breugel, Rajesh P. N. Rao & Bingni W. Brunton

https://doi.org/10.1038/s42256-022-00599-w

<!-- Previous research: https://doi.org/10.1162/isal_a_00321 -->

---

<!-- .slide: data-auto-animate -->

### Odor tracking

<!-- .element: class="r-fit-text" -->

--

<!-- .slide: data-auto-animate -->

### Odor tracking

Typical behaviors of flying insects

![Natural behaviors](/projects/AAOTP/Fig-1-a.svg)

<!-- .element: class="r-stretch" -->

--

<!-- .slide: data-auto-animate -->

### Odor tracking

Experiment method

![Wind tunnel experiment](/projects/AAOTP/Wind-tunnel.png)

<!-- .element: class="r-stretch" -->

Floris van Breugel et al.: https://doi.org/10.1016/j.cub.2013.12.023

<!-- .element: class="text-sm" -->

--

<!-- .slide: data-auto-animate -->

### Similar studies

<!-- .element: class="r-fit-text" -->

--

<!-- .slide: data-auto-animate -->

### Similar studies

Deep neuroethology of a virtual rodent

<!-- .element: class="r-fit-text" -->

Josh Merel et al.

https://openreview.net/pdf?id=SyxrxR4KPS

--

<!-- .slide: data-auto-animate -->

### Similar studies

_In silico_ virtual rodent

![Virtual rodent model](/projects/AAOTP/Virtual-rodent.svg)

Josh Merel et al.

<!-- .element: class="text-sm" -->

--

<!-- .slide: data-auto-animate -->

### Similar studies

Neuroethology of virtual rodent

![Analysis of neural dynamics](/projects/AAOTP/Neural-dynamics-virtual-rodent.png)

<!-- .element: class="r-stretch" -->

Josh Merel et al.

<!-- .element: class="text-sm" -->

--

<!-- .slide: data-auto-animate -->

### Similar studies

Sector search strategies for odor trail tracking

<!-- .element: class="r-fit-text" -->

Gautam Reddy et al.

https://doi.org/10.1073/pnas.2107431118

--

<!-- .slide: data-auto-animate -->

### Similar studies

Trail tracking strategy in terrestrial animals

![Analysis of neural dynamics](/projects/AAOTP/Odor-trail-tracking.svg)

<!-- .element: class="r-stretch" -->

Gautam Reddy et al.

<!-- .element: class="text-sm" -->

--

<!-- .slide: data-auto-animate -->

### Similar studies

A spiking neural program for sensori-motor control during foraging in flying insects

<!-- .element: class="r-fit-text" -->

Hannes Rapp and Martin Paul Nawrot

https://doi.org/10.1073/pnas.2009821117

--

<!-- .slide: data-auto-animate -->

### Similar studies

Biological spiking network

![Spiking neuron network](/projects/AAOTP/Spiking-neuron-network.svg)

<!-- .element: class="r-stretch" -->

Hannes Rapp and Martin Paul Nawrot

<!-- .element: class="text-sm" -->

--

<!-- .slide: data-auto-animate -->

### Similar studies

Dynamic sensory processing

![Dynamic sensory processing](/projects/AAOTP/Dynamic-sensory-processing.svg)

<!-- .element: class="r-stretch" -->

Hannes Rapp and Martin Paul Nawrot

<!-- .element: class="text-sm" -->

---

<!-- .slide: data-auto-animate -->

### Plume simulation

<!-- .element: class="r-fit-text" -->

--

<!-- .slide: data-auto-animate -->

### Plume simulation

![Plume simulation](/projects/AAOTP/Fig-1-b.svg)

<!-- .element: class="r-stretch" -->

- Stochastic (Poisson) emission
<!-- .element: class="fragment fade-in" -->
- Cross-wind perturbation
<!-- .element: class="fragment fade-in" -->
- Radial diffusion
<!-- .element: class="fragment fade-in" -->

--

<!-- .slide: data-auto-animate -->

### Plume simulation

![Plume simulation](/projects/AAOTP/Fig-1-c.svg)

<!-- .element: class="r-stretch" -->

- Advection by wind
<!-- .element: class="fragment fade-in" -->
- Changeable wind direction
<!-- .element: class="fragment fade-in" -->

--

<!-- .slide: data-auto-animate -->

### Different setups

<!-- .element: class="r-fit-text" -->

--

<!-- .slide: data-auto-animate -->

### Different setups

"Constant"

<video
  src="/projects/AAOTP/constantx5b5_HOME_merged_common_ep238.mp4"
  alt="Const wind"
  controls
  autoplay
  loop>
</video>

<!-- .element: class="r-stretch" -->

Wind direction is constant ($0^\circ$)

--

<!-- .slide: data-auto-animate -->

### Different setups

"Switch-once"

<video
  src="/projects/AAOTP/switch45x5b5_HOME_merged_common_ep143.mp4"
  alt="Const wind"
  controls
  autoplay
  loop>
</video>

<!-- .element: class="r-stretch" -->

One $45^\circ$ anticlockwise switch

--

<!-- .slide: data-auto-animate -->

### Different setups

"Switch-many"

<video
  src="/projects/AAOTP/noisy3x5b5_HOME_merged_common_ep227.mp4"
  alt="Const wind"
  controls
  autoplay
  loop>
</video>

<!-- .element: class="r-stretch" -->

Multiple switches at random times and directions

--

<!-- .slide: data-auto-animate -->

### Different setups

"Sparse"

<video
  src="/projects/AAOTP/constantx5b5_0.4_HOME_merged_common_ep008.mp4"
  alt="Const wind"
  controls
  autoplay
  loop>
</video>

<!-- .element: class="r-stretch" -->

"Constant" but reduced birth rate (0.4-fold)

"Sparser": further reduce radial diffusion (0.5-fold)

---

<!-- .slide: data-auto-animate -->

### Reinforcement learning

<!-- .element: class="r-fit-text" -->

--

<!-- .slide: data-auto-animate -->

### Reinforcement learning

**P**artially **O**bservable **M**arkov **D**ecision **P**rocess (POMDP) is hard

<!-- .element: class="r-fit-text" -->

![RL schematic](/projects/AAOTP/Fig-1-d.svg)

<!-- .element: class="r-stretch" -->

--

<!-- .slide: data-auto-animate -->

### Reinforcement learning

**P**artially **O**bservable **M**arkov **D**ecision **P**rocess (POMDP) is hard

<!-- .element: class="r-fit-text" -->

![RL schematic](/projects/AAOTP/Fig-1-f.svg)

<!-- .element: class="r-stretch" -->

--

<!-- .slide: data-auto-animate -->

### Reinforcement learning

Some important formal definitions

- _State_ (observable) $\mathcal{S}_o$
  - odor concentration $s_c\in[0.001,1.0]$
  <!-- .element: class="fragment fade-in" -->
  - egocentric wind velocity $s_x, s_y\in\mathbb{R}$
  <!-- .element: class="fragment fade-in" -->

--

<!-- .slide: data-auto-animate -->

### Reinforcement learning

Some important formal definitions

- _Action_ $\mathcal{A}$
  - turn angle $a_\theta\in[-\theta_m,\theta_m]$
  <!-- .element: class="fragment fade-in" -->
  - forward movement $a_m\in[0,1]$
  <!-- .element: class="fragment fade-in" -->

--

<!-- .slide: data-auto-animate -->

### Reinforcement learning

Some important formal definitions

- _Rewards_ $\mathcal{R}$
  - $+100$ upon (nearly) reaching the source
  <!-- .element: class="fragment fade-in" -->
  - $-10$ if strayed away from centerline
  <!-- .element: class="fragment fade-in" -->
  - $r_{t_0}-r_{t_T}$ for closer to source at the end
  <!-- .element: class="fragment fade-in" -->
  - $-\epsilon$ per timestep as penalty
  <!-- .element: class="fragment fade-in" -->

--

<!-- .slide: data-auto-animate -->

### Reinforcement learning

Some important formal definitions

- _Transition_ $\mathcal{T}$
  - Deterministic (no noise)
  <!-- .element: class="fragment fade-in" -->

--

<!-- .slide: data-auto-animate -->

### Reinforcement learning

Our goal:

- Find an optimal policy $\pi^\ast(a\mid s)$ that
<!-- .element: class="fragment fade-in" -->
- maximize the expected return $\mathbb{E}_{\pi}\left[G_t\right]$
<!-- .element: class="fragment fade-in" -->
- where $G_t$ is the long term reward $$\sum_{k=t+1}^{T}{\gamma^{k-t-1}\mathcal{R}_k}$$
<!-- .element: class="fragment fade-in" -->

--

<!-- .slide: data-auto-animate -->

### Reinforcement learning

Alternatively:

- Find an optimal state value function $V^{\pi^\ast}(s)$: $$V^{\pi^\ast}(s)=\max_{\pi}\mathbb{E}_{\pi}\left[G_t\mid S_t=s\right]$$
<!-- .element: class="fragment fade-in" -->
- And/or an optimal action value function $Q^{\pi^\ast}(s)$: $$Q^{\pi^\ast}(s)=\max_{\pi}\mathbb{E}_{\pi}\left[G_t\mid S_t=s;A_t=a\right]$$
<!-- .element: class="fragment fade-in" -->

---

<!-- .slide: data-auto-animate -->

### Approaches to RL

<!-- .element: class="r-fit-text" -->

--

<!-- .slide: data-auto-animate -->

### Approaches to RL

Value based

Q-learning

<!-- .element: class="fragment strike" -->

$$
Q(s,a)=r(s,a)+\gamma\max_{a'}Q(s',a')
$$

![TD MC and DP](/projects/AAOTP/TD_MC_DP_backups.png)

<!-- .element: class="r-stretch" -->

https://lilianweng.github.io/posts/2018-02-19-rl-overview/

<!-- .element: class="text-sm" -->

--

<!-- .slide: data-auto-animate -->

### Approaches to RL

Value based with function approximation

**D**eep **D**eterministic **P**olicy **G**radient (DDPG)

$$
Q(s,a)=r(s,a)+\gamma Q(s',\color{red}{\mu_ \theta(s')})
$$

$$
\mu_ \theta=\max_ \theta\mathbb{E}_ s\left[Q\left(s,\mu_ \theta(s)\right)\right]
$$

Used in https://doi.org/10.1162/isal_a_00321

<!-- .element: class="text-sm" -->

--

<!-- .slide: data-auto-animate -->

### Approaches to RL

Policy based

Policy gradient

$$
\theta' = \theta + \alpha\nabla_ \theta\mathbb{E}_ {\pi_ \theta}\left[r(\tau)\right]
$$

$$
\nabla_ \theta\mathbb{E}_ {\pi_ \theta}\left[r(\tau)\right]=\mathbb{E}_ {\pi_ \theta}\left[r(\tau)\sum_ {t=1}^{T}{\nabla\log_ \theta\pi _\theta\left(a_t\mid s_t\right)}\right]
$$

<!-- .element: class="r-fit-text" -->

--

<!-- .slide: data-auto-animate -->

### Approaches to RL

Policy based

REINFORCE

$$
\nabla_ \theta\mathbb{E}_ {\pi_ \theta}\left[r(\tau)\right]=\mathbb{E}_ {\pi_ \theta}\left[\sum_ {t=1}^{T}{\color{red}{G_t}\nabla\log_ \theta\pi _\theta\left(a_t\mid s_t\right)}\right]
$$

<!-- .element: class="r-fit-text" -->

--

<!-- .slide: data-auto-animate -->

### Approaches to RL

Policy based

REINFORCE

$$
\nabla_ \theta\mathbb{E}_ {\pi_ \theta}\left[r(\tau)\right]=\mathbb{E}_ {\pi_ \theta}\left[\sum_ {t=1}^{T}{\nabla\log_ \theta\pi_ \theta\left(a_t\mid s_t\right)\color{red}{Q^{\pi_ \theta}(s_t,a_t)}}\right]
$$

<!-- .element: class="r-fit-text" -->

--

<!-- .slide: data-auto-animate -->

### Approaches to RL

Policy based

REINFORCE

$$
\nabla_ \theta\mathbb{E}_ {\pi_ \theta}\left[r(\tau)\right]=\mathbb{E}_ {\pi_ \theta}\left[\nabla\log_ \theta\pi_ \theta\color{red}{\left(a\mid s\right)}Q^{\pi_ \theta}\color{red}{(s,a)}\right]
$$

<!-- .element: class="r-fit-text" -->

--

<!-- .slide: data-auto-animate -->

### Approaches to RL

Policy based

REINFORCE with baseline

$$
\nabla_ \theta\mathbb{E}_ {\pi_ \theta}\left[r(\tau)\right]=\mathbb{E}_ {\pi_ \theta}\left[\nabla\log_ \theta\pi_ \theta\left(a\mid s\right)\left(Q^{\pi_ \theta}(s,a)\color{red}{-b}\right)\right]
$$

<!-- .element: class="r-fit-text" -->

--

<!-- .slide: data-auto-animate -->

### Approaches to RL

Actor-critic

Advantage actor-critic

$$
\nabla_ \theta\mathbb{E}_ {\pi_ \theta}\left[r(\tau)\right]=\mathbb{E}_ {\pi_ \theta}\left[\nabla\log_ \theta\pi_ \theta\left(a\mid s\right)\underbrace{\left(Q^{\pi_ \theta}(s,a)-\color{red}{V^{\pi_ \theta}(s)}\right)}_ {A^{\pi_ \theta}(s,a)}\right]
$$

<!-- .element: class="r-fit-text" -->

--

<!-- .slide: data-auto-animate -->

### Approaches to RL

Actor-critic

**T**rust **R**egion **P**olicy **O**ptimization (TRPO)

$$
\theta'=\arg\max_ {\theta'}\mathbb{E}_ {\pi_ \theta}\left[\color{red}{\frac{\pi_ {\theta'}(a\mid s)}{\pi_ \theta(a\mid s)}}A^{\pi_ \theta}(s,a)\right]
$$

$$
D_ {KL}(\theta\mid\mid\theta')=\mathbb{E}_ {\pi_ \theta}\left[D_ {KL}(\pi_ \theta(\cdot\mid s)\mid\mid\pi_ \theta'(\cdot\mid s))\right]\le\delta
$$

<!-- .element: class="r-fit-text" -->

--

<!-- .slide: data-auto-animate -->

### Approaches to RL

Actor-critic

**P**roximal **P**olicy **O**ptimization (PPO) v2

$$
\theta'=\arg\max_ {\theta'}\mathbb{E}_ {\pi_ \theta}\left[\color{red}{\min}\left(\frac{\pi_ {\theta'}(a\mid s)}{\pi_ \theta(a\mid s)}A^{\pi_ \theta}(s,a),\color{red}{\text{clip}\left(\frac{\pi_ {\theta'}(a\mid s)}{\pi_ \theta(a\mid s)},1-\epsilon,1+\epsilon\right)A^{\pi_ \theta}(s,a)}\right)\right]
$$

<!-- .element: class="r-fit-text" -->

--

<!-- .slide: data-auto-animate -->

### Approaches to RL

**P**roximal **P**olicy **O**ptimization (PPO) v2

![Model](/projects/AAOTP/Fig-1-e.svg)

<!-- .element: class="r-stretch" -->

$$
\mathbf{h}_ t=\text{tanh}\left(W_ \mathbf{h}\mathbf{h}_ {t-1}+W_ \mathbf{x}\mathbf{x}_ t+\mathbf{b}\right)
$$

---

<!-- .slide: data-auto-animate -->

### Behavioral results

<!-- .element: class="r-fit-text" -->

--

<!-- .slide: data-auto-animate -->

### Behavioral results

Distinct behavior modules

![Modules](/projects/AAOTP/Fig-3-a.svg)

<!-- .element: class="r-stretch" -->

classified by interval between odor encounters

- "Tracking" $<0.5\text{s}$
<!-- .element: class="fragment fade-in" -->
- "Recovering" $\sim 0.5\text{s}$
<!-- .element: class="fragment fade-in" -->
- "Lost" $>1\text{s}$
<!-- .element: class="fragment fade-in" -->

--

<!-- .slide: data-auto-animate -->

### Behavioral results

Distinct behavior modules emerge

![Modules](/projects/AAOTP/Fig-3-b.svg)

<!-- .element: class="r-stretch" -->

classified by interval between odor encounters

- "Tracking" $<0.5\text{s}$
- "Recovering" $\sim 0.5\text{s}$
- "Lost" $>1\text{s}$

--

<!-- .slide: data-auto-animate -->

### Behavioral results

Module statistics in constant wind

![Modules](/projects/AAOTP/Fig-3-c.svg)

--

<!-- .slide: data-auto-animate -->

### Behavioral results

Agents learn to track odor centerline

![Modules](/projects/AAOTP/Fig-3-d-f.svg)

---

<!-- .slide: data-auto-animate -->

### Neural activity

<!-- .element: class="r-fit-text" -->

--

<!-- .slide: data-auto-animate -->

### Neural activity

Low dimensional neural activity

![Modules](/projects/AAOTP/Fig-4-g.svg)

<!-- .element: class="r-stretch" -->

$\mathbf{h}\in\mathbb{R}^{64}$, explained variance $>0.9$ with $5\sim 8$ PCs

--

<!-- .slide: data-auto-animate -->

### Neural activity

Task-relevant variable representations

![Modules](/projects/AAOTP/Fig-4-a.svg)

<!-- .element: class="r-stretch" -->

Absolute head direction $\Theta_ {\text{HEAD}}$

--

<!-- .slide: data-auto-animate -->

### Neural activity

Task-relevant variable representations

![Modules](/projects/AAOTP/Fig-4-b.svg)

<!-- .element: class="r-stretch" -->

Time elapsed since last encounter $T_ {\text{last}}$

--

<!-- .slide: data-auto-animate -->

### Neural activity

Task-relevant variable representations

![Modules](/projects/AAOTP/Fig-4-c.svg)

<!-- .element: class="r-stretch" -->

EWMA of odor concentration $Odour_ {\text{EWMA}}$

--

<!-- .slide: data-auto-animate -->

### Neural activity

Task-relevant variable representations

![Modules](/projects/AAOTP/Fig-4-d.svg)

<!-- .element: class="r-stretch" -->

EWMA of odor encounters $Odour_ {\text{ENC}}$

--

<!-- .slide: data-auto-animate -->

### Neural activity

Sliding windows sized determined by regression

![Modules](/projects/AAOTP/Fig-4-e.svg)

<!-- .element: class="r-stretch" -->

$\text{EWMA}(t)=\alpha x(t)+(1-\alpha)\text{EWMA}(t-1), \alpha=\frac{2}{N+1}$

<!-- .element: class="r-fit-text" -->

--

<!-- .slide: data-auto-animate -->

### Neural activity

Variable features are related with module state

![Modules](/projects/AAOTP/Fig-4-f.svg)

<!-- .element: class="r-stretch" -->

- Accuracy $64\\\% \to 77\\\%$ (v.s. observations only)
<!-- .element: class="fragment fade-in" -->
- Accuracy $37\\\% \to 77\\\%$ (v.s. majority class)
<!-- .element: class="fragment fade-in" -->

---

<!-- .slide: data-auto-animate -->

### Neural dynamics

<!-- .element: class="r-fit-text" -->

--

<!-- .slide: data-auto-animate -->

### Neural dynamics

Example success trajectory

![Success](/projects/AAOTP/Fig-5-a.svg)

<!-- .element: class="r-stretch" -->

--

<!-- .slide: data-auto-animate -->

### Neural dynamics

Funnel-like structure

![Success](/projects/AAOTP/Fig-5-c.svg)

<!-- .element: class="r-stretch" -->

--

<!-- .slide: data-auto-animate -->

### Neural dynamics

Example failure trajectory

![Failure](/projects/AAOTP/Fig-5-b.svg)

<!-- .element: class="r-stretch" -->

--

<!-- .slide: data-auto-animate -->

### Neural dynamics

Limit-cycle structure

![Failure](/projects/AAOTP/Fig-5-d.svg)

<!-- .element: class="r-stretch" -->

--

<!-- .slide: data-auto-animate -->

### Neural dynamics

No fix point but dynamic regimes

![Failure](/projects/AAOTP/Fig-5-e.svg)

<!-- .element: class="r-stretch" -->

--

<!-- .slide: data-auto-animate -->

### Neural dynamics

Reorganized eigenvalue spectrum

![Eigen spectrum](/projects/AAOTP/Fig-6-a.svg)

<!-- .element: class="r-stretch" -->

At least 1 strictly real eigenvalue $\ge 1$

--

<!-- .slide: data-auto-animate -->

### Neural dynamics

Reduction in timescale

![Time scale](/projects/AAOTP/Fig-6-b.svg)

<!-- .element: class="r-stretch" -->

- All well below $300$ (max episode length)
<!-- .element: class="fragment fade-in" -->
- Majority scale down to $<12, \sim 0.5\text{s}$
<!-- .element: class="fragment fade-in" -->

--

<!-- .slide: data-auto-animate -->

### Neural dynamics

Longer memory length are more favorable

![Time scale](/projects/AAOTP/Fig-6-c.svg)

<!-- .element: class="r-stretch" -->

- MLP as fixed memory length RNN
<!-- .element: class="fragment fade-in" -->
- $\mathcal{S}'=\left[s_c^0,s_x^0,s_y^0,\cdots,s_c^k,s_x^k,s_y^k\right]$
<!-- .element: class="fragment fade-in" -->

---

<!-- .slide: data-auto-animate -->

### Conclusions

<!-- .element: class="r-fit-text" -->

--

<!-- .slide: data-auto-animate -->

### Conclusions

- Complex behavior emerges from simple rules

--

<!-- .slide: data-auto-animate -->

### Conclusions

- Complex behavior emerges from simple rules
- Biological plausibility compared to **Infotaxis**

--

<!-- .slide: data-auto-animate -->

### Conclusions

- Complex behavior emerges from simple rules
- Biological plausibility compared to **Infotaxis**
- Neural actitivity encode crucial variables

--

<!-- .slide: data-auto-animate -->

### Conclusions

- Complex behavior emerges from simple rules
- Biological plausibility compared to **Infotaxis**
- Neural actitivity encode crucial variables
- Neural dynamics show stable structure

--

<!-- .slide: data-auto-animate -->

### Conclusions

- Complex behavior emerges from simple rules
- Biological plausibility compared to **Infotaxis**
- Neural actitivity encode crucial variables
- Neural dynamics show stable structure
- Long-term memory in changing environment

--

<!-- .slide: data-auto-animate -->

### Highlights

<!-- .element: class="r-fit-text" -->

--

<!-- .slide: data-auto-animate -->

### Highlights

- Simple rules yet fit real world behavior

--

<!-- .slide: data-auto-animate -->

### Highlights

- Simple rules yet fit real world behavior
- New perspective on neural dynamics

--

<!-- .slide: data-auto-animate -->

### Highlights

- Simple rules yet fit real world behavior
- New perspective on neural dynamics
- Unified analysis of behavior and neural activity

---

<!-- .slide: data-auto-animate -->

### Thank you for listening

<!-- .element: class="r-fit-text" -->

@slideend
