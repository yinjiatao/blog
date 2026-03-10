---
title: '第 2 集：从安装到第一次对话'
excerpt: '如果这是你第一次接触 OpenClaw，这篇文章带你从 Node 22、模型 API Key、初始化向导，一路走到第一次有效对话。重点不是讲原理，而是告诉你每一步该怎么做。'
date: '2026-03-08 10:00'
category: 'tools'
readTime: 8
slug: 'openclaw-first-conversation'
---

如果这是你第一次接触 OpenClaw，这一篇只做一件事：

**让你从零安装，一路走到第一次有效对话。**

先不要接飞书、Telegram、企业微信，也不要上来就研究 Skills、Hooks 和自动化。  
先把第一条链路跑通。

---

## 如果你只想最快跑通，先看这一段

第一次安装时，按这个顺序做：

1. 确认 Node 是 `v22` 或更高
2. 准备一个可用的模型 API Key
3. 安装 OpenClaw
4. 运行 `openclaw onboard --install-daemon`
5. 在向导里依次选：
   `Yes -> QuickStart -> 你的模型厂商 -> 粘贴 API Key -> 保留默认模型 -> Skip channel for now -> Configure skills now = Yes -> 额外 API Key 全部 No -> Hooks 先 Skip 或只开 session-memory -> Hatch in TUI`
6. 在当前入口里先发一句 `Hi`，拿到第一条回复
7. 如果你更习惯浏览器，再执行 `openclaw dashboard`

只要先拿到这一次有效对话，后面再接渠道、装插件、改配置，都会简单很多。

---

## 开始之前，先准备这三样

- 一台能联网的电脑
- Node.js 22 或更高版本
- 一个可用的大模型 API Key

操作系统选择建议如下：

- `macOS`：最省心
- `Linux`：也很稳
- `Windows`：优先用 `WSL2`，不要一上来就在原生 `CMD / PowerShell` 里折腾

---

## 第 1 步：先确认 Node 版本

打开终端，执行：

```bash
node --version
```

只要输出是 `v22.x.x` 或更高，就可以继续。

如果没有安装：

macOS：

```bash
brew install node
```

Windows（WSL2）/ Linux：

```bash
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.7/install.sh | bash
nvm install 22
nvm use 22
```

如果你在国内网络环境里安装 npm 包经常超时，可以先切换镜像源：

```bash
npm config set registry https://registry.npmmirror.com
```

---

## 第 2 步：模型不要纠结太久，先选一个最容易跑通的

第一次安装时，模型的目标不是“全网最强”，而是：

**先让 OpenClaw 稳定返回第一条回复。**

优先顺序可以这样看：

| 推荐顺序 | 适合谁 | 建议 |
| --- | --- | --- |
| `Moonshot AI (Kimi K2.5)` | 在国内网络环境里，希望最快跑通 | 作为第一次安装的默认推荐 |
| 你已经有稳定额度的厂商 | 已经在用 Anthropic、OpenAI、Google、GLM、MiniMax 等 | 直接选你已经有 Key 的那家 |
| 还在比较模型的人 | 想先研究哪家最强 | 先停下，能返回第一条消息的那个就是今天最好的模型 |

把 `Kimi` 放在前面的原因有三个：

- 当前 onboarding 已经直接支持 `Moonshot AI (Kimi K2.5)`
- Moonshot 官方现在也有单独的 `Kimi Code API` 路径
- 对第一次安装来说，这条链路在国内通常更顺

如果你已经有 Anthropic、OpenAI、Google 或其他平台的稳定 API Key，就不用为了“推荐模型”切换供应商。  
**第一篇入门教程里，稳定比完美重要。**

---

## 第 3 步：安装 OpenClaw

如果你已经准备好了 Node 22，直接安装：

```bash
npm install -g openclaw@latest
```

装完以后，先确认命令存在：

```bash
openclaw --version
```

如果这里还提示 `command not found`，先别急着怀疑 OpenClaw 本身。  
大概率只是 npm 的全局安装路径还没进 `PATH`。

---

## 第 4 步：运行初始化向导

执行：

```bash
openclaw onboard --install-daemon
```

这是第一次安装里最重要的一步。  
你不需要自己猜配置，只需要按顺序把关键选项选对。

---

## 第 5 步：向导里每一步怎么选

### 1. 安全确认：选 Yes

OpenClaw 会先提示它具备本地执行能力，存在固有风险。  
第一次安装时，这里直接选 `Yes`。

![安全确认和 QuickStart 入口](/posts/openclaw-first-conversation/security-and-quickstart.png)

### 2. Onboarding mode：选 QuickStart

第一次不要选 `Manual`。  
`QuickStart` 会给你一套更稳的默认值，先把第一条链路跑通。

### 3. Provider：优先选你已经准备好 API Key 的厂商

如果你还没有既定的模型厂商，第一次可以直接选：

`Moonshot AI (Kimi K2.5)`

![选择模型厂商](/posts/openclaw-first-conversation/provider-selection.png)

### 4. Auth method：按厂商对应路径走

如果你选的是 `Kimi`，向导里会出现：

`Kimi Code API key (subscription)`

然后它会要求你粘贴 API Key。

如果你还没拿到 Key，可以去 Kimi Code 控制台创建并复制。

![从 Kimi 控制台复制 API Key](/posts/openclaw-first-conversation/copy-kimi-api-key.png)

### 5. Default model：第一次直接保留建议值

如果当前向导已经给你配好了 `kimi-coding/k2p5` 这类默认模型，第一次不要手动改。

![保留当前默认模型](/posts/openclaw-first-conversation/model-selection-kimi-k2p5.png)

第一次安装的目标是先接通，不是先调参。

### 6. Channel：先选 Skip for now

第一次安装时，遇到飞书、Telegram、WhatsApp 这类渠道选项，直接跳过。

![首次安装先跳过渠道](/posts/openclaw-first-conversation/skip-channel-for-now.png)

原因很简单：

- 渠道接入会引入更多变量
- 排错范围会瞬间变大
- 你现在更应该先证明 OpenClaw 本体已经能正常工作

### 7. Skills：选 Yes，但缺依赖时可以先跳过

当向导问 `Configure skills now?` 时，可以选 `Yes`。

![首次安装配置 Skills](/posts/openclaw-first-conversation/configure-skills.png)

但如果后面进入 “Install missing skill dependencies” 这一步，你只是想先跑通最小闭环，那么可以先 `Skip for now`。

### 8. 额外 API Key：第一次全部选 No

Notion、OpenAI 生图、Whisper、ElevenLabs 这类额外 API，第一次都先跳过。

![首次安装先跳过额外 API Key](/posts/openclaw-first-conversation/skip-extra-api-keys.png)

这些都不是第一轮必须品。

### 9. Hooks：先 Skip，或者只开 session-memory

如果你完全不想多想，第一次直接 `Skip for now`。  
如果你想留一个相对安全的默认值，只开 `session-memory` 也可以。

![Hooks 先跳过，或只开 session-memory](/posts/openclaw-first-conversation/hooks-session-memory.png)

### 10. Hatch：选 Hatch in TUI

第一次安装更稳的做法是：

**先选 `Hatch in TUI (recommended)`**

![首次启动先选 Hatch in TUI](/posts/openclaw-first-conversation/hatch-in-tui.png)

因为它能先把 Agent 在当前终端里直接唤起来，减少 Web UI、浏览器 token、端口访问这些额外变量。

---

## 第 6 步：完成第一次对话

当向导结束并进入聊天界面后，先不要急着测工具。

第一次只发一句最简单的话，例如：

```text
Hi
```

或者：

```text
你好，请先帮我完成基础初始化。
```

如果你现在就在 TUI 里，就先在这里发出去。只要它能返回一条正常回复，说明这条链路已经基本通了。

如果你愿意，也可以补一段非常短的初始化说明，比如：

```text
我的工作语言是中文，时区是北京时间。回答问题时先给结论，再给步骤。
```

但第一次不需要把“人格设定”写得很长。

---

## 第 7 步：如果你更习惯浏览器，再补这一项

现在再执行：

```bash
openclaw dashboard
```

第一次优先使用这条命令给你的链接，不要手动去猜本地地址。

如果你看到 `unauthorized`，重新执行一次 `openclaw dashboard`，然后使用它给你的 token 链接。

如果你想继续确认 Web UI 也可用，再进入浏览器后发一条最简单的测试消息，例如：

```text
你好，帮我确认你已经正常工作。
```

这一步不是必须的。只要你已经在 TUI 或浏览器里拿到一条完整回复，这篇文章的目标就完成了。

---

## 怎样算你已经跑通了

满足下面这些条件，就可以算通过：

- Node 已经是 `v22` 或更高
- OpenClaw 已安装完成
- `openclaw onboard --install-daemon` 已走完
- 向导里的模型和认证已配置完成
- TUI 或浏览器里已经完成第一轮有效对话

如果你已经在任意一个入口里完成了第一轮有效对话，这一篇的核心目标就已经达成。

---

## 如果没跑通，按这个顺序排错

### 1. 先看整体状态

```bash
openclaw status
```

### 2. 再看 Gateway

```bash
openclaw gateway status
```

### 3. 看实时日志

```bash
openclaw logs --follow
```

### 4. 跑一次诊断

```bash
openclaw doctor
```

### 5. 如果端口被占用，先处理 18789

```bash
lsof -i :18789
```

如果确认被别的进程占用，再考虑关掉它，或者换一个端口。

### 6. 如果 `openclaw` 命令找不到，检查 PATH

```bash
npm prefix -g
```

看一下 npm 的全局安装路径是不是已经加进了你的 `~/.zshrc` 或 `~/.bashrc`。

---

## 为什么这篇先不纠结入口

因为对第一次安装来说，真正困难的不是“选 TUI 还是浏览器”，而是：

- 模型和 API Key 到底通不通
- Gateway 到底有没有真的起来
- Web UI 的 token、端口、浏览器状态会不会额外干扰判断

更稳的顺序是：

**先在当前最简单的入口里拿到第一条回复。当前向导里，这个入口通常是 TUI。**

浏览器入口可以稍后再确认。这样排错范围最小。

---

## 下一步学什么

这篇完成以后，你最适合继续学的是这些：

1. 第一个渠道怎么接
2. 模型怎么换，什么时候该换
3. 哪些 Skills 值得第一批安装
4. 哪些设置属于“先别碰”，哪些适合第二阶段再配

第一篇先求通。第二篇再求强。

---

## 参考链接

- [OpenClaw Installer](https://openclaw.cc/install/installer)
- [OpenClaw Wizard](https://openclaw.cc/start/wizard)
- [OpenClaw Dashboard](https://openclaw.cc/web/dashboard)
- [OpenClaw Troubleshooting](https://openclaw.cc/en/help/troubleshooting.html)
- [Moonshot Kimi API 文档](https://platform.moonshot.cn/docs/api)
