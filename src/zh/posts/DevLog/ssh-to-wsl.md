---
title: 如何 SSH 到 WSL2
icon: material-symbols:article
date: 2021-10-01
category:
  - DevLog
tag:
  - VPN
  - ZeroTier
  - SSH
  - WSL2
  - Powershell
  - frp
sticky: false
star: false
---

不打算继续使用微信公众号了，所以就把[这篇文章](https://mp.weixin.qq.com/s/CQSpSnRMwaNw5E0cmTL4Nw)迁了过来。

## 本文背景

> 以及一些碎碎念

这个号从注册到现在都快周岁了，因为没怎么活动过中间甚至被冻结了，所以想着来发点东西（证明一下有这个号的存在）。

这篇文章也可以说是蓄谋已久了，起因是我本人特别喜欢 WSL2，写代码记笔记跑程序都在 WSL2 里；但苦于笔记本带去上课时这么用太费电，台式机在宿舍里又搬不走，于是尝试了各种办法用笔记本连到台式机上。

其间我尝试过用 ZeroTier（后面也会有用到）+ 远程桌面的方案（也是很长一段时间内我的解决方案），在校园网良好的环境下效果还算不错，但是一旦两台电脑物理距离一远、网络经由的路由次数一多，甚至是校园网时不时波动一下，对远程桌面来说都是毁灭性打击，动则延迟高达数秒，极度影响使用，背后的原因咱待会儿会说到。

::: info TL;DR

实在是忍不了啦！我需要的是**不受网络约束**，**随时随地稳定高速**的台式机性能，并且最好**耗电量小**，而不是臃肿的图形界面！

:::

所以就想着如果能把 WSL2 当作一台服务器，直接 `ssh` 连过去就好了。如果你也有类似的痛点或者需求，可以花个十分钟看完这篇文章（当然嫌我话痨的话也能直接跳到最后看教程，那里会尽量避免废话），然后花上十分钟配置一下，你也能感受到我现在的快乐。当然了，我就一非专业的摸鱼佬，如果文章有任何问题或者您觉得“就这点破事儿也值得发一篇？”，还请您轻喷。

## 基本思路

> ZeroTier 组网，直接 ssh！

WSL2 和前代最大的区别就在于 2 代用了 Hyper-V 内核，和 1 代用兼容层的做法相比，更接近于一台没有图形界面（也不好说，毕竟 WSLg 正式版也差不多该发布了）的虚拟机，这就导致了 WSL2 需要使用虚拟网卡来让村通网，因此引入了一系列网络相关的问题，基本和虚拟机能遇上的一样儿一样儿，比如 IP 地址与宿主机不共享、宿主机与虚拟机互相访问 localhost 存在一定障碍（这点基本被工程师们解决了，谢天谢地）等等，如果需要使用 SSH 的话，必需要直面这个问题。

其次还是网速受限的问题，不过从我用远程桌面的那段经验看来，ZeroTier 组的虚拟局域网还是非常好用的。简单来说，这个跨平台的软件会在启动时访问一个非常强大的“行星根服务器”，然后找到所在虚拟局域网下的其他机器的地址，然后根据这个地址自动建立一条最近的 P2P 通讯路线，其后的机器间通讯不需要再经由行星根服务器，保证数据的尽可能高速流转与安全，而且整个过程完全自动，如果感兴趣的话可以参考 [ZeroTier 官网](https://www.zerotier.com/)和 [ZeroTier 文档](https://docs.zerotier.com/)。其实用这个就基本上解决组网的问题了。

我一开始把问题想复杂了，觉得得把 Windows 宿主机作为跳板机，得先 `ssh` 到宿主机上，再在 Windows 和 WSL2 里面部署 `frp` 服务来转发端口，把访问 Windows 的鬼子引到村里来，于是折腾了半天。后来拍脑袋一想，“不对啊，都在一个局域网了还不能直接连？”，结果您猜怎么着，确实不需要 `frp` 了！不过我也会在最后讲讲怎么整 `frp`，万一有别的用呢，谁也不好说是不。废话有点多了，下面直接开整！

## 基本教程

> 组建虚拟局域网与基本连接

::: tip

在开始前请先检查一下 WSL2 是否能正常联网，最好也检查一下访问 GitHub 是否存在困难。

:::

### 安装 ssh 服务

进入 WSL2，根据你的系统所用的包管理器，安装上 `openssh-server`，我用的是 Debian，所以只能确保基于 Debian 的发行版没有问题

::: code-tabs#sys

@tab Debian / Ubuntu / kali / Mint

```sh
sudo apt install openssh-server
```

@tab Redhat / Fedora / Centos

```sh
sudo yum install openssh-server
```

@tab 其他

```sh
## 善用 Google 自求多福.jpg
```

:::

### 测试 ssh 服务

安装完之后可以启动一下 `ssh` 服务进行测试

```sh
## 启动 ssh 服务
sudo service ssh start
# Starting OpenBSD Secure Shell server: sshd.

## 查看服务运行情况
sudo service ssh status
# sshd is running.
```

### 注册 ZeroTier 服务

然后是 ZeroTier，首先去 [ZeroTier 官网](https://www.zerotier.com/)注册个账号先，点击右上角“Sign Up”，也可以选择使用谷歌/微软/Github 账号

<BrowserMockup>
  <img src="/assets/images/ZeroTier-home.png" alt="ZeroTier 首页" />
</BrowserMockup>

### 新建 VPN

新建的账户会跳转到管理页面，就像下面这样空空的，让它快点热闹起来就点一点“Create A Network”

<BrowserMockup>
  <img src="/assets/images/ZeroTier-central.png" alt="ZeroTier 登陆页面" />
</BrowserMockup>

### 获取 Network ID

不错，有了蹦出来一个新家伙了，我们可以点进去看看，然后别忘了复制下来“Network ID”，待会儿要用（这里我的是 `d3ecf5726d8400e9`），网页也先别关，留着要用

<BrowserMockup>
  <img src="/assets/images/ZeroTier-network.png" alt="ZeroTier 创建网络" />
</BrowserMockup>

### 安装 ZeroTier 客户端

可以看到网络中成员还是空的，因为我们还需要安装相应的客户端来接入它，可以[从这儿下载](https://www.zerotier.com/download/)，我就主要讲讲 WSL2 这儿的，别的平台就靠你自己搞定了，原理都是大同小异的。

::: code-tabs#sys

@tab Debian / Ubuntu / kali / Mint

```sh
# 使用包管理器
curl -s 'https://raw.githubusercontent.com/zerotier/ZeroTierOne/master/doc/contact%40zerotier.com.gpg' | \
gpg --import && \
if z=$(curl -s 'https://install.zerotier.com/' | gpg); \
then echo "$z" | sudo bash; \
fi

sudo apt update
sudo apt install zerotier-one
```

@tab Redhat / Fedora / Centos

```sh
# 使用包管理器
curl -s 'https://raw.githubusercontent.com/zerotier/ZeroTierOne/master/doc/contact%40zerotier.com.gpg' | \
gpg --import && \
if z=$(curl -s 'https://install.zerotier.com/' | gpg); \
then echo "$z" | sudo bash; \
fi

sudo yum update
sudo yum install zerotier-one
```

@tab 其他

```sh
curl -s https://install.zerotier.com | \
sudo bash
```

:::

### 加入 ZeroTier VPN

安装完之后两句命令行就能加入这个网络啦，其他平台带 GUI 的客户端也同理，点击“Join Network”，粘进去之前复制的 Network ID 就行，建议一次一个平台得来，以区分虚拟局域网中的 IP

```sh
## 加入 ZeroTier 网络
zerotier-cli join [Network ID]
# zerotier-cli join af78bf9436bc4421

## 启动 zerotier 服务
service zerotier-one start
```

### 管理 VPN 成员

如果 WSL2 中或者其他客户端都正确配置好了的话，回到刚才的网页，应该可以看到成员一栏下面应该多了若干个节点了，像这样把它们第一列的勾选框都勾上，表示允许加入这个局域网，勾上之后就成功组建局域网啦，记得一个一个来，区分出 WSL2 的 IP <Badge text="图上没被码掉的 IP" type="tip" />，我们待会儿 `ssh` 连接还需要用到 IP

<BrowserMockup>
  <img src="/assets/images/ZeroTier-management.png" alt="ZeroTier 管理网络" />
</BrowserMockup>

### 检查 MTU 值

是不是觉得到这里就大功告成了？你大可以试试现在去根据这个 IP 来连接一下，大概率就算连上了也没法用，这与 ZeroTier 的默认 MTU 值有关，相关解释的话可以看[这篇很不错的教程](https://www.cloudflare.com/zh-cn/learning/network-layer/what-is-mtu/)。总的来说，我们还需要让 ZeroTier 虚拟交换机的 MTU 值和虚拟网卡的值相匹配，我们可以用 `ifconfig` 指令查看 WSL2 虚拟网卡设置的 MTU 值

::: code-tabs

@tab Windows

```ps
## 查看 MTU 值等信息
ifconfig
```

:::

### 调整 MTU 值

不出意外的话输出中会有三个设备，一个是 `eth0` 也就是虚拟网卡设备，其 MTU 值是 1280（如果有不同以你自己为准，这个是上限），其次是 `lo` 表示本地连接，可以不用管，最后一个名字 z 打头而且很长的就是 ZeroTier 创建的虚拟交换机，MTU 默认值在 2800，为了保证 `ssh` 等连接稳定可用不丢包，可以考虑将 MTU 值设在 1240 左右。个人认为实际体验上差别不大，就设为了 1200

::: code-tabs

@tab Windows

```ps
## 限制 MTU 大小
ifconfig z********* mtu 1200
```

:::

### 测试连通性

到这里为止就能用啦！可以在另一台机子上敲下 `ssh` 命令试试了，我用的是 Windows 自带的 `openssh` 工具，Mac 等平台也可以用自带的 `ssh`，都应该没问题

```sh
## SSH 连接到 WSL2
ssh [user]@[vlan_IP]
```

::: info

如果不行的话也不要着急，大概率是 Windows 防火墙限制，我们很快就会解决这个问题

:::

## 其他配置

> 开机自启与 frp

顺利的话，到现在为止你已经能在另一台电脑上 ssh 到 WSL2 里了，开心吗？敢重启一下电脑不？这些都没了还开心么？所以赶紧接着搞个开机自启的脚本来帮我们完成这个工作。

### 开机自启

在 Windows 中找个合适的地方新建一个 Powershell 脚本文件，就叫“WSL2vlan.ps1”好了，在里面写上如下内容

```ps{9}
## 首先启动Zerotier服务
wsl.exe -u root "service" "zerotier-one" "start"
## 去除已有的名为 WSL 的防火墙规则
Remove-NetFireWallRule -DisplayName "WSL"
## 新增名为 WSL 的防火墙规则，允许任意出入
New-NetFirewallRule -DisplayName "WSL" -Direction Inbound  -InterfaceAlias "vEthernet (WSL)"  -Action Allow
New-NetFirewallRule -DisplayName "WSL" -Direction Outbound -InterfaceAlias "vEthernet (WSL)" -Action Allow
## 将 MTU 值重设为合理值
wsl.exe -u root "ifconfig" "z*********" "mtu" "1200"
## 查看各网络相关设备状况
wsl.exe -u root "ifconfig"
## 启动 SSH 服务
wsl.exe -u root "service" "ssh" "start"
```

::: tip

这一步中的 `z*********` 是你的 ZeroTier 虚拟交换机的名字，可以在 `ifconfig` 中查看，与前文中的 `z*********` 一致

:::

### frp 转发

如果有需要 `frp` 的话，可以首先在上面的文件中最后加上一行。`frp` 具体原理和配置等等已经有很多优秀的资源了，比如[这篇](https://oneforalone.github.io/misc/frp.html)，我在这里就不赘述了。这里简单讲下如何搭配本教程使用，首先在前面的 Powershell 脚本中加上

```ps
## 在最后启动 frp 客户端
wsl.exe -u root --cd ~ "wsl2/path/to/frpc" "-c" "wsl2/path/to/frpc.ini"
```

我们同样还需要一个脚本来配置 Windows 作服务器端，下载安装照例略，脚本如下，取名直观点就叫“frps.ps1”

```ps
## 7000 是 frp 使用的默认通讯端口
Remove-NetFireWallRule -DisplayName "ALLOW TCP PORT 7000"
New-NetFirewallRule -DisplayName "ALLOW TCP PORT 7000" -Direction Inbound -Profile Any -Action Allow -LocalPort 7000 -Protocol TCP
New-NetFirewallRule -DisplayName "ALLOW TCP PORT 7000" -Direction Outbound -Profile Any -Action Allow -LocalPort 7000 -Protocol TCP
## 以转发 ssh 的 22 端口为例，设立防火墙规则
Remove-NetFireWallRule -DisplayName "ALLOW PORT 22"
New-NetFirewallRule -DisplayName "ALLOW PORT 22" -Direction Inbound -Profile Any -Action Allow -LocalPort 22 -Protocol TCP
New-NetFirewallRule -DisplayName "ALLOW PORT 22" -Direction Outbound -Profile Any -Action Allow -LocalPort 22 -Protocol TCP
## 最后启动 frp 的服务器端
windows\path\to\frps.exe -c windows\path\to\frps.ini
```

完成之后我们再写一个“master.ps1”来控制这些启动的环节

```ps
## 如果配置了 frp 的话
## 最好先允许启动服务器端的脚本
Start-Process -WindowStyle Minimized -FilePath path\to\frps.ps1
## 最小化窗口运行
Start-Process -WindowStyle Minimized -FilePath path\to\WSL2vlan.ps1
```

::: warning

以上脚本启动的最小化窗口请勿关闭，否则会导致服务终止

如果担心手滑也可以将 `Minimized` 改为 `Hidden`

:::

基本大功告成，我只要把“master.ps1”的快捷方式加到启动目录就行，按下 <kbd>Windows <FontIcon icon="ant-design:windows-filled" /></kbd>+<kbd>R</kbd>，在如下窗口中输入 `shell:startup`，回车，就能跳转到启动目录啦，把快捷方式丢进去就行，即使重启再多次电脑，即使电脑开机后没解锁过，我们也能 `ssh` 连上 WSL2 啦！

::: tip 如果有多个 WSL2 发行版怎么办？

不需要一个个配置！WSL2 的虚拟网卡等设备是互通的，意味着即便只在 Debian 下跑上了 `zerotier`，另一边 Ubuntu 也能用上这个虚拟局域网

:::

::: tip 担心端口冲突？

可以手动编辑 `/etc/ssh/sshd_config` 中 ssh 的默认端口来避免混淆

:::
