---
title: '第 1 集：初识 OpenClaw'
excerpt: '第一次搜 OpenClaw，常常会同时看到 Clawd、Moltbot、clawdbot。先把名字、定位、能力边界和最值得期待的能力讲清楚，再决定你要不要继续装它。'
date: '2026-03-08 09:00'
category: 'tools'
readTime: 9
slug: 'openclaw-introduction'
---

如果你第一次看到 OpenClaw，很容易先被名字绕晕。

你在一篇帖子里看到 `OpenClaw`，在另一条讨论里又看到 `Moltbot`，再往下翻，甚至还会冒出 `clawdbot` 和 `Clawd`。然后你会开始怀疑：这些到底是不是同一个东西？

先给结论：

**是同一条产品线。你现在应该优先搜索 `OpenClaw`，但旧资料里仍然会出现 `Moltbot`、`clawdbot` 和 `Clawd`。**

这一篇就做四件事：

1. 先把名字理顺
2. 讲清楚 OpenClaw 到底是什么
3. 讲清楚它为什么不是普通聊天机器人
4. 讲清楚它能做什么，不能替你做什么

如果你读完以后觉得“这就是我想要的那类 AI”，再去看下一篇安装教程，效率会高很多。

---

## 先把名字理顺，不然你搜资料会越来越乱

根据 OpenClaw 官方 lore 页面，以及 `clawdbot`、`moltbot`、`openclaw` 几个 GitHub release 页面能看到的历史，最简单的理解方式是这张表：

| 你会看到的名字 | 现在该怎么理解 |
| --- | --- |
| `OpenClaw` | 当前官方项目名，也是现在最该用的搜索关键词 |
| `Moltbot` | 2026 年 1 月改名过程里的中间名字，旧 release、旧帖子里还会出现 |
| `clawdbot` | 更早期的仓库 / 发布名，搜索旧问题时还会碰到 |
| `Clawd` | 社区 lore 里的龙虾角色名，更像助手人格或吉祥物，不是当前正式产品名 |

如果你只记一条搜索建议，记这个：

**搜最新资料用 `OpenClaw`；搜历史问题时，把 `OpenClaw + Moltbot + clawdbot` 一起搜。**

这会直接减少你一半的信息混乱。

---

## OpenClaw 到底是什么

如果把官方 FAQ、架构文档和工具文档放在一起看，一个更准确的心智模型是：

**OpenClaw 不是另一个聊天网页，而是一个运行在你自己设备上的个人 AI 助手控制面。**

官方 FAQ 里有两个很关键的说法：

- OpenClaw 是一个运行在你自己设备上的 personal AI assistant
- Gateway 是 always-on control plane，assistant 才是你真正使用的产品形态

这两个说法合在一起，意思就很清楚了：

你真正得到的，不只是一个“大模型聊天窗口”，而是一套长期在线的助手系统。  
模型负责推理，Gateway 负责把对话、工具、渠道、记忆、定时任务这些东西接起来。

所以 OpenClaw 的正确打开方式，不是把它当“本地版 ChatGPT”。

更接近的理解是：

- 你可以在终端、浏览器，或者聊天软件里找到它
- 它可以调用工具做事，不只是回文本
- 它有会话、工作区、记忆和自动化能力
- 它的行为边界由你自己的配置、权限和技能来决定

---

## 为什么它不是普通聊天机器人

普通聊天机器人当然也能回答问题。

但 OpenClaw 之所以被很多人当成“助手框架”而不是“聊天机器人”，关键不在模型，而在它周围那一层能力。

可以直接对比着看：

| 普通聊天机器人 | OpenClaw |
| --- | --- |
| 主要活在一个网页或 App 对话框里 | 可以活在终端、Control UI 和多种聊天渠道里 |
| 大多数时候等你来问 | 可以结合 heartbeat 和 cron 做持续、定时、主动的工作 |
| 重点是“回答你” | 重点是“理解你想做什么，然后调用工具去做” |
| 对话通常就是主要载体 | 工作区、记忆文件、技能、插件、渠道同样重要 |
| 你更像是在“使用一个产品” | 你更像是在“养一个有工具和规则的助手” |

这不是官方文档里的原句，而是把 FAQ、Memory、Heartbeat、Cron、Tools 这些文档放在一起之后，一个更适合新手的总结。

所以如果你问一句：

**OpenClaw 和普通聊天机器人最大的区别是什么？**

最短的答案是：

**普通聊天机器人主要负责“说”，OpenClaw 还负责“做”。**

---

## 它现在能做什么

对新手来说，不需要一上来研究所有架构。  
先知道它能帮你做哪几类事情就够了。

### 1. 它可以出现在你已经在用的聊天入口里

官方 chat channels 文档列出的入口，已经覆盖了大量日常沟通场景，例如：

- WhatsApp
- Telegram
- Discord
- Slack
- Signal
- IRC
- Google Chat
- Feishu
- Mattermost
- BlueBubbles / iMessage 相关方案

这意味着你不一定非得打开一个新网页，才能找到你的 AI。

你完全可以把它放进你原本就在使用的沟通环境里。

### 2. 它可以直接动你的文件、终端和浏览器

这也是 OpenClaw 最容易让新手眼前一亮的地方。

官方工具文档显示，OpenClaw 有一等工具能力来处理：

- `browser`
- `canvas`
- `nodes`
- `cron`

同时，在常见的编码 / 助手场景里，它还会带上文件系统、运行时、会话、记忆、图片等工具组。

翻成白话就是：

- 你可以让它读文件、写文件、整理目录
- 你可以让它执行脚本和命令
- 你可以让它打开浏览器做页面操作
- 你可以让它把一段工作流程拆成多个步骤来跑

这就是为什么很多人第一次真正用上 OpenClaw 后，会觉得它更像“能干活的助手”，而不是“更会聊天的 AI”。

### 3. 它的记忆不是漂在模型里的，而是落在磁盘上的

官方 memory 文档把这一点写得很清楚：

**OpenClaw 的 memory 本质上是工作区里的 Markdown 文件。**

默认会有两层：

- `memory/YYYY-MM-DD.md`：日常记录
- `MEMORY.md`：长期记忆

这件事非常重要，因为它改变了你对“AI 记住你”的理解。

它不是神秘地“自己记住了”。  
它是通过工作区文件，把真正值得留下来的信息写到了磁盘上。

这比纯聊天历史更可控，也更适合长期协作。

### 4. 它可以被唤醒，也可以自己按节奏运行

官方 Heartbeat 和 Cron 文档，给了 OpenClaw 和普通聊天机器人的另一个核心分界线。

Heartbeat 负责周期性检查主会话里有没有值得你注意的事。  
Cron 负责“几点做什么”“多久做一次”这类调度。

翻成更直白的话，就是：

- 它不一定非要等你发消息，才开始工作
- 你可以让它每隔一段时间做一次检查
- 你可以让它在固定时间跑一次任务
- 你可以让它把结果回推到聊天渠道里

这才有了“助手”的味道。

### 5. 它可以继续长能力，因为它有 Skills 和 Plugins

OpenClaw 的技能文档把 Skills 定义得很直接：

**Skill 是一个带 `SKILL.md` 的目录，用来教助手如何使用工具完成某类工作。**

同时，Plugins 则是更底层的扩展模块，可以提供新命令、新工具和新的 Gateway 能力。

所以你后面看到的很多“它居然还能做这个”的能力，往往不是凭空长出来的，而是：

- 核心工具提供基础动作
- Skills 教它怎么把这些动作组织起来
- Plugins 给它补上核心之外的新能力

这也是为什么 OpenClaw 更像一个可生长的系统，而不是一个固定功能的 AI 应用。

---

## 它不能替你做什么

讲完能力，边界也要讲清楚。

如果这一步不讲，新手最容易把 OpenClaw 想成“万能 AI 员工”，然后在第一天就失望。

### 1. 它不是零配置魔法

你仍然需要：

- 安装环境
- 模型或 API Key
- 基础权限
- 至少一个能跑通的入口

OpenClaw 的强大，很大一部分来自“可配置”。  
而可配置，天然就意味着它不可能像一个纯托管聊天产品那样零成本上手。

### 2. 它不是默认安全的

如果你给了它太大的权限，它就真的能做很多事。  
这很爽，也很危险。

OpenClaw 官方文档本身就长期强调 sandbox、tool policy、pairing、gateway auth 这些安全层。  
所以正确的理解不是“它很安全”，而是：

**它给了你控制边界的能力，但边界需要你自己设。**

### 3. 它不是“你想都不用想，它就会自己进化”

记忆、心跳、定时任务、技能，这些都能让它越来越像助手。  
但前提是你有意识地给它规则、工作区、技能和目标。

OpenClaw 很适合和人一起迭代。  
它不等于“买回来就自动变成数字员工”。

### 4. 它也不一定适合所有人

如果你现在只想做这些事：

- 问几个问题
- 写几段文案
- 查几个资料
- 偶尔让 AI 帮你润色

那一个普通聊天产品，往往已经够用了。

OpenClaw 更适合下面这类人：

- 想让 AI 长期留在自己的工作流里
- 想让 AI 接触文件、脚本、浏览器和渠道
- 想让 AI 记住上下文，而不是每次重开一局
- 想让 AI 不只回答，还要帮忙执行

---

## 你现在最值得记住的，不是命令，而是这个判断标准

如果你还在犹豫要不要继续学 OpenClaw，用这 4 句话判断就够了：

1. 如果你只需要聊天，普通聊天机器人更省事。
2. 如果你想让 AI 长期驻留在自己的环境里，OpenClaw 更值得学。
3. 如果你想让 AI 真正碰文件、脚本、浏览器和聊天渠道，OpenClaw 才开始显出价值。
4. 如果你愿意给它规则、边界和工作流，它会越来越像助手；如果你不愿意，它就只会像一个更麻烦的聊天窗口。

---

## 下一步怎么学

这一篇读完以后，不要立刻跳去折腾高级能力。

最合理的顺序是：

1. 先看 [第 2 集：从安装到第一次对话](/zh/articles/openclaw-first-conversation)
2. 先把第一条链路跑通
3. 再去学后面的深入对话、技能、记忆和自动化

对第一次接触 OpenClaw 的人来说，最重要的不是“知道它所有功能”，而是先建立一个正确心智模型：

**它不是普通聊天机器人。它是一套你可以慢慢养成型的个人 AI 助手系统。**

## 参考依据

- [OpenClaw Lore](https://docs.openclaw.ai/start/lore)
- [OpenClaw FAQ](https://docs.openclaw.ai/start/faq/)
- [OpenClaw Docs Directory](https://docs.openclaw.ai/start/docs-directory)
- [OpenClaw Chat Channels](https://docs.openclaw.ai/channels/index)
- [OpenClaw Tools](https://docs.openclaw.ai/tools)
- [OpenClaw Memory](https://docs.openclaw.ai/concepts/memory)
- [OpenClaw Heartbeat](https://docs.openclaw.ai/gateway/heartbeat)
- [OpenClaw Cron Jobs](https://docs.openclaw.ai/cron/)
- [OpenClaw Skills](https://docs.openclaw.ai/skills)
- [OpenClaw Plugins](https://docs.openclaw.ai/tools/plugin)
- [GitHub Releases: clawdbot/clawdbot](https://github.com/clawdbot/clawdbot/releases)
- [GitHub Releases: moltbot/moltbot](https://github.com/moltbot/moltbot/releases)
- [GitHub: openclaw/openclaw](https://github.com/openclaw/openclaw)
