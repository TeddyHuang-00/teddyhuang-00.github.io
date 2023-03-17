---
title: 初次尝试构建 Python 包
icon: material-symbols:article
date: 2022-10-23
category:
  - DevLog
tag:
  - Python
sticky: false
star: false
# footer: 自定义页脚
# copyright: 无版权
---

从零开始构建一个 Python 包，记录一些心得。

<!-- more -->

## 10 月 23 日更新

先在这儿开个坑，有空了慢慢写。

这次是做一个树洞的 Python 包，主要是为了学习一下 Python 包的构建，以及一些 Python 包的开发规范。目前有个能跑的版本，大致用法如下：

```python
import json

from treehole import TreeHoleClient

secrets = json.load(open("secrets.json"))

client = TreeHoleClient(secrets["token"])

# 获取一个树洞主体
body, timestamp = client.get_hole(4226377)
print("Body:", body)
print("Timestamp:", timestamp)

# 获取一个树洞的评论
comments, attention = client.get_comment(4224963)
print("Comments:", comments[:2] if comments else comments)
print("Attention:", attention)

# 获取首页列表的树洞
holes, timestamp = client.get_holes()
print("Holes:", holes[:2] if holes else holes)
print("Timestamp:", timestamp)

# 获取关注的树洞
holes, timestamp = client.get_attention()
print("Holes:", holes[:2] if holes else holes)
print("Timestamp:", timestamp)
```

欢迎来[仓库](https://github.com/TeddyHuang-00/pyTreeHole)提 issues 和 PR，当然更欢迎 star 和 follow！

---

## 10 月 24 日更新

发布了一个 `1.0.0` 版本，添加了一些发洞和回复之类的功能，总之该有的功能都添加了，顺便写了[一些文档](https://teddyhuang-00.github.io/pyTreeHole/)和单元测试，欢迎使用！

之后大概这个项目会暂时搁置吧，除非有新的需求提出来，当然我最可能会用这个包写点别的有意思的小项目，依然欢迎大家来提 issue 和 PR！

---

## 10 月 25 日更新

刚发了 `1.1.0` 版本，总算加上了异步支持（打一开始就打算加的，但是一直觉得功能没完善没必要写），现在可以用 `asyncio` 来异步地使用这个包了，函数参数和返回值都是一样的，只是在调用的时候需要加上 `async` 和 `await`，具体可以看[文档](https://teddyhuang-00.github.io/pyTreeHole/)。

顺便研究了下 `pyproject.toml`，以前觉得麻烦，现在看来其实没啥可玩的，能设置的东西很少，就随便加了点链接跳转到更新日志和文档，如果以后有空开个坑专门介绍如何用最少的包和设置来写一个很基础的 Python 包。
