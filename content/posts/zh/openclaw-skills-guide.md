---
title: '第 5 集：给 OpenClaw 装上技能'
excerpt: '前四集解决了安装、对话、渠道和助手化，这一集开始讲 OpenClaw 最像“可成长系统”的部分：Skills。先知道 skill 是什么、去哪里装、第一批装什么、怎么自己写一个，再补上技能投毒这堂安全课。'
date: '2026-03-08 13:00'
category: 'tools'
readTime: 12
slug: 'openclaw-skills-guide'
---

到了这一集，OpenClaw 已经不只是“能聊天”了。

它能碰文件、能跑脚本、能查网页、能开浏览器，也能进飞书。  
但这时候你很快会遇到一个新问题：

**为什么有些任务它一遍就会，有些任务你每次都得重新教？**

答案通常就是两个字：

**技能。**

OpenClaw 之所以开始像一个可以持续成长的系统，而不是一个每次都要重新解释的 AI，对很多人来说，转折点就发生在这里。

这一篇只做四件事：

1. 讲清楚 skill 到底是什么
2. 讲清楚现在去哪里找 skill
3. 讲清楚第一批最值得装什么
4. 讲清楚怎么自己写一个简单 skill

最后再补一件必须讲清楚的事：

**skill 不是“看见就装”的糖果，它也是供应链风险。**

---

## 先搞清楚：Skill 不是插件，也不是一句 Prompt

OpenClaw 官方 Skills 文档和 ClawHub 的 `skill-format` 文档，给了一个很清楚的定义：

**一个 skill 本质上就是一个目录，里面至少有一个 `SKILL.md`，可以再带一些辅助文本文件。**

这件事很重要，因为它决定了 skill 的位置。

它不是：

- 一个遥远的“云功能”
- 一句临时 prompt
- 一个必须编译的复杂插件

它更像是：

- 一份可以复用的方法说明书
- 一组让助手知道“这类任务该怎么做”的规则
- 一个可以被本地安装、查看、更新、发布的文本包

这也是为什么 skill 比“纯 prompt 收藏夹”更有用。

prompt 常常只能解决一次性表达问题。  
skill 解决的是“以后再遇到同类任务，要不要每次重新教一遍”的问题。

---

## 现在去哪里找 Skill

对 2026 年 3 月的 OpenClaw 生态来说，最稳的两个入口是官方自己的：

| 入口 | 用途 |
| --- | --- |
| `openclaw/clawhub` | 官方公开技能注册表，负责发布、搜索、安装、版本化 |
| `openclaw/skills` | 官方归档仓库，保存 ClawHub 上的各版本技能历史 |

ClawHub 的 README 写得很直白：它是公开的 skill registry，支持：

- 搜索
- inspect
- install
- publish
- sync

对应的 CLI 也是同一套思路：

```bash
clawhub search github
clawhub inspect github
clawhub install github
clawhub list
clawhub update --all
```

如果你是新手，最重要的不是一下子装很多，而是养成这个顺序：

1. `search`
2. `inspect`
3. 看 `SKILL.md`
4. 看依赖和环境变量
5. 再决定要不要 `install`

不要把 skill 当成“应用商店一键安装包”。  
正确理解更接近：**它是你允许进入本地工作流的一段操作知识。**

---

## 第一批最值得看的 Skill，不要贪多

这部分我没有拍脑袋推荐。

我直接参考了 **2026 年 3 月 8 日** ClawHub 官方 API 返回的安装量和下载量靠前技能，给新手整理了第一批更值得优先看的方向。

### 第一批推荐装的，不是“最酷”的，而是“最常复用”的

| Skill | 为什么值得先看 | 适合谁 |
| --- | --- | --- |
| `summarize` | 总结 URL、PDF、图片、音频、YouTube，很适合日常资料整理 | 几乎所有人 |
| `github` | 用 `gh` 处理 issue、PR、run、api，开发者高频 | 开发者 |
| `gog` | 直接接 Gmail、Calendar、Drive、Docs、Sheets | 日常工作流重 Google 的人 |
| `tavily-search` | 给研究型任务更稳的搜索入口 | 经常做资料检索的人 |
| `agent-browser` | 浏览器自动化能力打包得更完整 | 经常做网页操作的人 |
| `find-skills` | 当你不知道该装什么时，让 OpenClaw 先帮你找 skill | 所有人 |
| `weather` | 很简单，但很适合拿来理解“技能如何接外部服务” | 新手练手 |
| `notion` | 让 OpenClaw 进入 Notion 工作流 | Notion 重度用户 |

你会发现这里面没有什么“炫技神技”。

原因很简单：

新手第一批 skill 的目标，不是证明 AI 多厉害。  
而是让 OpenClaw 尽快覆盖你最常重复的 20% 任务。

如果你现在不知道先装哪个，最稳的顺序是：

1. `summarize`
2. `github` 或 `gog`
3. `tavily-search`
4. `agent-browser`

也就是说：

**先补资料处理，再补你的主工作流，再补研究和浏览器。**

---

## 安装一个 Skill，正确动作是什么

第一次装，不要急着一把梭。

最推荐的动作是：

### 第一步：先搜

```bash
clawhub search summarize
```

### 第二步：先 inspect，不要先 install

```bash
clawhub inspect summarize
```

你在这里重点看三样东西：

- 这个 skill 的描述到底是不是你要的
- 它需要哪些环境变量
- 它依赖哪些外部二进制

ClawHub 的 skill-format 文档明确规定，skill 可以在 frontmatter 里声明：

- `requires.env`
- `requires.bins`
- `requires.anyBins`
- `requires.config`
- `install`

这意味着一个好的 skill，不只是“能用”，还会明确告诉你它要什么。

### 第三步：确认没问题，再 install

```bash
clawhub install summarize
```

### 第四步：装完以后，不是立刻信任，而是先试一个最小任务

比如：

```text
用 summarize skill 帮我总结这个 PDF，只输出 5 条要点。
```

或者：

```text
用 github skill 帮我看这个仓库当前 open 的 PR，先只列标题和状态。
```

**最小任务** 是关键。  
它能让你先确认 skill 的能力边界，而不是一上来就把它扔进生产任务。

---

## 自己写一个简单 Skill，其实没有那么难

如果你已经用过几次 ClawHub，你会很快发现一件事：

很多时候你想要的，不是“社区里有没有人写过”，而是“我能不能把自己常做的动作固化下来”。

这就是你开始写第一个 skill 的时机。

最简单的练手 skill，不要一上来接 API。  
先写一个**只组织已有工具**的 skill。

例如，你可以在当前工作区建一个目录：

```bash
mkdir -p skills/daily-brief
```

然后写一个最小的 `SKILL.md`：

```md
---
name: daily-brief
description: 用于整理当天工作区里的 Markdown、日志和待办，生成一份简报
version: 1.0.0
---

# Daily Brief

当用户要求生成日报、工作简报或今日总结时：

1. 先读取工作区内当天新增或修改过的 Markdown 文件
2. 如有 logs 目录，提取过去 24 小时的关键变化
3. 把结果整理成三段：
   - 今天完成了什么
   - 还卡着什么
   - 明天最值得优先推进什么

如果信息不够，明确说缺什么，不要编造。
```

这个 skill 的价值不在于“复杂”。  
它的价值在于：

- 以后你不必每次都重新教“日报应该怎么写”
- OpenClaw 会把这类任务识别成一个固定模式
- 你可以继续往里面加辅助文件，让它越来越稳

如果你要再往前走一步，就开始补 frontmatter 的 runtime metadata，例如：

```yaml
metadata:
  openclaw:
    requires:
      bins:
        - rg
```

这能让 skill 的依赖更清楚，也更容易过 ClawHub 的分析和审查。

---

## 真正的分水岭：不要把 Skill 当作“无害文本”

这一节必须讲。

OpenClaw 官方自己的 `openclaw/skills` 归档仓库 README 里，直接写了一句很重的话：

这个归档仓库里**可能保留可疑或恶意技能**，官方建议优先从站点端下载，并把归档仓库视为历史档案，而不是默认可信源。

这其实已经把问题说透了。

Skill 不是普通文章，不是普通提示词。  
它会：

- 影响模型行为
- 引入依赖
- 使用环境变量
- 触发外部命令或流程

换句话说，skill 也是供应链。

而只要是供应链，就存在投毒风险。

ClawHub 当前已经有一套安全和审核机制：

- GitHub age gate
- report / auto-hide
- suspicious filter
- structured moderation
- static scan result

这很好，但它不等于“你可以不看就装”。

真正该做的是：

1. 只从官方站点或可信来源安装
2. 先 `inspect`，再 `install`
3. 先读 `SKILL.md`
4. 看 frontmatter 里要求的 env、bins、config
5. 第一次只跑最小任务
6. 高权限 skill 一律放到更严格的隔离环境里

如果你想把这部分一次看透，直接接着看你的安全文章：

[保姆级教程：8 步配置 OpenClaw，让 AI 助手安全又可控](/zh/articles/openclaw-security-guide)

---

## 这一集你最该带走的，不是“装了多少 Skill”，而是方法

总结成一句话：

**Skill 的价值，不在于数量，而在于它有没有把你会反复遇到的任务，变成 OpenClaw 可以稳定复用的能力。**

所以更好的做法不是：

- 一口气装 20 个
- 看见热门就装
- 不 inspect 就 install

而是：

1. 先装 2-4 个高复用技能
2. 先把 ClawHub 的 search / inspect / install 流程养熟
3. 再把自己最常重复的一类任务，写成第一个本地 skill

当你能做到这一步，OpenClaw 就不只是“你装了很多功能”。

它开始变成：

**你自己的工作方法，正在被系统化。**

下一集，就从这里继续：

**从用户到共建者。**

## 参考依据

- [OpenClaw Skills](https://docs.openclaw.ai/skills)
- [ClawHub README](https://github.com/openclaw/clawhub)
- [ClawHub Skill Format](https://github.com/openclaw/clawhub/blob/main/docs/skill-format.md)
- [ClawHub CLI](https://github.com/openclaw/clawhub/blob/main/docs/cli.md)
- [ClawHub Security](https://github.com/openclaw/clawhub/blob/main/docs/security.md)
- [ClawHub Skills API (installsAllTime)](https://clawhub.ai/api/v1/skills?limit=10&sort=installsAllTime)
- [OpenClaw Skills Archive README](https://github.com/openclaw/skills)
