---
title: 'OpenClaw 省 Token 实战手册：九个维度，账单砍掉 60–95%'
excerpt: '你不是只在为 OpenClaw 的回答付费，更多时候，你在为工具 schema、配置注入、历史上下文和缓存失效付费。本文把真正值钱的九个杠杆按优先级拆开，告诉你先改什么最省。'
date: '2026-03-08'
category: 'tools'
readTime: 18
slug: 'openclaw-token-optimization-guide'
---

GitHub Discussion #1949 里，有用户一句话把问题讲透了：

> “I am burning through $$$ even having dropped down to Haiku.”

同一时期，GitHub Issue #21999 记录了一次首轮调用：**166,669 个输入 token，输出只有 29 个**。

这两个现象说明的不是“模型太贵”，而是另一件更关键的事：

**你不是只在为回答付费。你在为整段上下文税付费。**

在 OpenClaw 里，账单失控通常不是因为你问了太多难题，而是因为系统把太多本不该反复携带的东西，每次都一起送进模型：工具 schema、Skills 描述、工作区配置、历史对话、工具输出、心跳上下文、缓存失效后的整段重写。

这篇文章只做一件事：**把 OpenClaw 的 Token 成本拆开，让你知道先动哪几个杠杆最值。**

先讲结论。

如果你现在只做四件事，优先顺序是这样的：

| 优先级 | 动作 | 为什么先做 |
| --- | --- | --- |
| P0 | 把默认模型从“过度豪华”改成分级使用 | 这是最直接的成本杠杆 |
| P0 | 把 Heartbeat 配置迁到正确路径，并把 HEARTBEAT.md 变小 | 很多背景开销就藏在这里 |
| P1 | 瘦身 SOUL / AGENTS / TOOLS / Skills 描述 | 这些东西每次调用都在重复收费 |
| P1 | 管理会话历史，隔离大输出任务 | 历史和工具结果会把后续每一轮都拖贵 |

如果你的部署比较重，背景任务多、工具多、会话长，**账单降 60–95% 并不夸张**。如果你本来就很轻量，降幅不会这么大，但也通常能把最浪费的部分清掉。

---

## 一、先别急着换模型，先看清你到底在为什么付钱

OpenClaw 官方文档对 “Context” 的定义很直白：**凡是模型收到的东西，都算进上下文窗口。** 不只是你的消息和模型的回复，还包括系统提示、Skills 元数据、工具 schema、工作区文件、工具结果、附件、甚至 provider 自己看不见的包装层。

这件事的重要性在于，很多用户把账单理解成“提问成本”。实际上，OpenClaw 的大头通常是“携带成本”。

Issue #21999 给出过一次很有代表性的拆解。那次调查里，首轮 prompt 的估算结构大致是这样：

| 成本来源 | 估算量级 |
| --- | --- |
| 硬编码系统提示各段 | 约 3,000 token |
| Skills prompt | 约 7,500 token |
| 工作区 bootstrap 文件 | 约 37,500 token |
| 工具 JSON schema | 约 15,000–20,000 token |
| gateway config schema | 约 25,000+ token |
| 用户消息本身 | 约 100–250 token |

这还只是“第一轮”，还没算长会话的历史和工具输出。

更麻烦的是，OpenClaw 官方文档的示例 `/context detail` 输出里，哪怕只有 12 个 Skills，系统提示里那份 Skills 列表也已经有 **约 546 token**；工具 schema 还能轻松到 **约 7,997 token**。这说明一个事实：

**很多钱不是烧在“思考”，而是烧在“携带”。**

先把自己的账单结构看清楚，再谈优化。最值得先开的几个命令是：

```text
/status
/context list
/context detail
/usage tokens
/usage full
/compact
```

如果你想看磁盘侧的会话膨胀，也可以直接查 session 文件：

```bash
du -h ~/.openclaw/agents/*/sessions/*.jsonl | sort -h
```

不要一上来凭感觉改配置。先量，再动刀。

---

## 二、维度一：模型分级，永远是最高杠杆

截至 **2026 年 3 月 8 日**，Anthropic 官方文档里的标准输入价是：

| 模型 | 输入价 |
| --- | --- |
| Claude Opus 4.6 | $5 / MTok |
| Claude Sonnet 4.6 | $3 / MTok |
| Claude Haiku 4.5 | $1 / MTok |
| Claude Haiku 3.5 | $0.8 / MTok |

如果你的请求超过 200K 输入 token，Anthropic 对 Sonnet 4.6 和 Opus 4.6 还会进入更贵的 long context 计价。Sonnet 从 **$3 涨到 $6 / MTok**，Opus 从 **$5 涨到 $10 / MTok**。

这就是为什么模型选择不是一个“偏好问题”，而是结构性成本问题。

最稳的做法不是“全局切便宜”，而是**按任务分级**：

| 任务类型 | 推荐模型 |
| --- | --- |
| 背景巡检、状态检查、格式化、轻量问答 | Haiku 或其他低价模型 |
| 写作、代码、日常分析 | Sonnet |
| 复杂推理、关键决策、一次性高价值问题 | Opus |

你真正需要避免的，不是用 Opus，而是**让 Opus 做不配用 Opus 的工作**。

一个实用配置是：

```json
{
  "agents": {
    "defaults": {
      "model": {
        "primary": "anthropic/claude-sonnet-4-6",
        "fallbacks": ["anthropic/claude-haiku-3.5"]
      },
      "subagents": {
        "model": "anthropic/claude-haiku-3.5"
      }
    }
  }
}
```

会话里也别死守一个模型。长会话压缩前，先切便宜模型：

```text
/model anthropic/claude-haiku-3.5
/compact
/model anthropic/claude-sonnet-4-6
```

如果你只记一句话，记这个：

**Opus 应该是特种兵，不应该是门卫。**

---

## 三、维度二：配置文件瘦身，你省的是“每一轮的固定税”

OpenClaw 文档已经把自动注入的工作区文件写得很清楚了。默认会进 prompt 的包括：

- `AGENTS.md`
- `SOUL.md`
- `TOOLS.md`
- `IDENTITY.md`
- `USER.md`
- `HEARTBEAT.md`
- `BOOTSTRAP.md`
- 顶层 `MEMORY.md` 或 `memory.md`（如果存在）

并且有两个默认上限：

- `agents.defaults.bootstrapMaxChars = 20000`
- `agents.defaults.bootstrapTotalMaxChars = 150000`

这意味着什么？

意味着你写在这些文件里的每一段“看起来很完整”的说明，都是在反复征税。不是今天写一次花一次，是**每次调用都在花**。

所以这里的原则非常简单：

### 1. 把“人格”留在 SOUL，把“操作步骤”赶出 SOUL

SOUL.md 负责身份、边界、判断标准。
不要把操作手册、流程 checklist、长模板也塞进去。

### 2. AGENTS.md 只保留经常触发的规则

“永远会影响行为”的规则留下。
“偶尔才会用到的操作说明”移走。

### 3. TOOLS.md 只写高频约束，不写工具百科

很多人把 TOOLS.md 写成一份内部 wiki。
这很完整，但也很贵。

### 4. 顶层 memory 留长期事实，临时笔记放 `memory/*.md`

OpenClaw 的 token docs 明确写了：**`memory/*.md` 是按需通过 memory tools 读取，不是自动注入。**
这意味着临时项目笔记、阶段性记录、每日工作痕迹，应该尽量放在 `memory/` 子目录，而不是顶层长期记忆文件里。

如果你不知道从哪下手，最简单的办法是直接看 `/context detail`。它会告诉你每个文件实际注入了多少。先把最大的两个文件砍小，效果通常立刻可见。

---

## 四、维度三：Skills 精简，别让“挂着不用”的东西持续收费

OpenClaw 官方文档对 Skills 的描述非常关键：

**系统提示里默认注入的是 Skills 的元数据列表，不是完整指令。完整 `SKILL.md` 会在需要时按需读取。**

这意味着两件事同时成立：

第一，Skills 没你想的那么贵。
第二，Skills 也没你想的那么便宜。

贵在什么地方？贵在**数量和描述长度**。
因为只要它出现在列表里，它就会成为每一轮系统提示的一部分。

OpenClaw 的 token docs 甚至直接建议：**Keep skill descriptions short**。

所以这里的优化方法不是“别用 Skills”，而是“别把所有 Skills 都当成常驻居民”。

### 该怎么做

1. 把真正高频、模型需要自动知道的 Skills 留在常驻列表里。
2. 把低频、重说明、你愿意手动触发的 Skills 改成只用户调用。
3. 把 description 写短，只保留触发条件，不要把整套说明压进前言。

对于低频重技能，可以直接用：

```yaml
---
name: my-heavy-skill
description: Rarely used, invoke manually.
disable-model-invocation: true
---
```

这个字段是官方 docs 明确支持的。设为 `true` 后，Skill 仍然可用，但不会再进模型 prompt。

如果你不知道哪些 Skills 该砍，不要靠感觉。
先看 `/context detail` 里的 per-skill entry size。胖的先动，冷的先下。

---

## 五、维度四：会话管理，不做历史治理，后面每一轮都在替前面还债

OpenClaw 的 context docs 说得很清楚：上下文里不仅有普通对话，还有工具调用结果、附件、compaction summary 和 pruning artifacts。也就是说，**会话不是只会增长“聊天记录”，它还会增长一堆你已经忘了，但模型每轮还得带着走的东西。**

所以会话管理不是锦上添花，它是第二条主线。

### 先做这三件事

#### 1. 会话长了就 `/compact`

```text
/model anthropic/claude-haiku-3.5
/compact
/model anthropic/claude-sonnet-4-6
```

OpenClaw 官方 docs 也把 `/compact` 列成了最直接的减压手段之一。压缩不是完美保留历史，它是**把旧历史从逐字计费改成摘要计费**。

#### 2. 开启 daily reset

Session docs 写得很明确：daily reset 默认参考网关本地时间，默认点位是 **4:00 AM**。你可以显式配置：

```json
{
  "session": {
    "reset": {
      "mode": "daily",
      "atHour": 4,
      "idleMinutes": 120
    }
  }
}
```

这个配置的意义，不是“每天清零很优雅”，而是**防止长生命周期会话把任何后台任务都拖成慢性失血**。

#### 3. 用 pruning 管工具输出，不要只盯着聊天文本

OpenClaw 的 `agents.defaults.contextPruning` 专门就是为了裁掉旧工具结果的。它不会改磁盘上的 JSONL 历史，但会在真正发给模型前，把历史里的旧工具结果缩掉。

如果你的 Agent 常看日志、扫目录、抓网页、读长文件，这个比你反复改 prompt 省得多。

---

## 六、维度五：Heartbeat 和 Cron，不要把两种机制混成一种

这一部分最容易被旧帖子误导，所以先讲最新结论。

### 先纠正一个 2026 年初很常见的误区

2026 年 2 月有人提了 Issue #30894，看起来像是“`heartbeat.model` 不生效”。
但到 **2026 年 3 月 4 日**，合并的 PR #32706 给出的结论更准确：

**很多用户其实把 `heartbeat` 写在了顶层配置路径。这个路径本来就无效，只是过去被静默忽略了。**

也就是说，如果你用的是这种写法：

```yaml
heartbeat:
  model: anthropic/claude-haiku-3.5
```

那问题不是 Heartbeat 机制本身坏了，而是**配置根本没被正确读取**。

现在应该用的路径是：

- `agents.defaults.heartbeat`
- 或 `agents.list[].heartbeat`

这是一个非常重要的修正。因为它改变了结论：

**不是所有人都应该用 Cron 替代 Heartbeat。你应该先把 Heartbeat 配对地方。**

### 正确理解 Heartbeat

官方 docs 对 Heartbeat 的定义是：

- 它是**周期性的 main session agent turn**
- 默认每 30 分钟运行一次
- 它会把 `HEARTBEAT.md` 当成小型 checklist
- 它支持 `activeHours`
- 它支持 `lightContext`
- 它支持 `ackMaxChars`
- 如果 `HEARTBEAT.md` 实际上是空的，OpenClaw 会直接跳过这次调用，省掉 API 成本

这意味着 Heartbeat 适合做什么？

适合做**轻量、持续、主会话相关的检查**。
比如：回顾待办、看有没有遗漏 follow-up、白天做一次轻提醒。

不适合做什么？

不适合做**重计算、长输出、固定时间表的大任务**。
那是 Cron，尤其是 isolated Cron 的工作。

### Heartbeat 的正确省钱姿势

第一，保持 `HEARTBEAT.md` 很短。
官方 docs 原话就是：**Keep it tiny**。

第二，打开 `lightContext`，只保留 `HEARTBEAT.md`。

第三，用 `activeHours` 限制时间窗口，避免夜里空跑。

第四，用 `ackMaxChars` 避免“其实没事，但还是发一堆客套话”。

一个合理配置是：

```json
{
  "agents": {
    "defaults": {
      "heartbeat": {
        "every": "55m",
        "lightContext": true,
        "activeHours": {
          "start": "08:00",
          "end": "23:00"
        },
        "ackMaxChars": 300,
        "prompt": "Read HEARTBEAT.md if it exists. Follow it strictly. If nothing needs attention, reply HEARTBEAT_OK."
      }
    }
  }
}
```

如果你的 `HEARTBEAT.md` 根本没什么内容，甚至可以故意让它保持空白或只留标题，这样 OpenClaw 会直接跳过心跳调用。

### 什么时候该用 Cron

OpenClaw docs 对 Cron 的定义也很清楚：

- 它是网关调度器
- 可以 main session 执行
- 也可以 isolated 执行
- isolated job 每次都是新 session id
- 默认有 `cron.sessionRetention: 24h`
- 默认会裁 run log

所以凡是满足下面任意一条的任务，都更适合 Cron：

- 有明确时间表
- 不需要 main session 连续上下文
- 输出可能很大
- 失败与否需要独立排查
- 你希望它和日常聊天上下文彻底隔离

例如：

```bash
openclaw cron add \
  --name "Morning brief" \
  --cron "0 7 * * *" \
  --tz "Asia/Shanghai" \
  --session isolated \
  --message "Summarize overnight updates." \
  --announce
```

一句话总结这一节：

**Heartbeat 负责轻量主会话巡航，Cron 负责定时和隔离任务。别让一个机制替另一个机制背锅。**

---

## 七、维度六：多 Agent 分级配置，不同工作负载不要吃同一套默认值

OpenClaw 官方 docs 提到，`agents.defaults.contextTokens` 会作为上下文窗口的 cap 来参与 pruning 和 compaction 策略。换句话说，**上下文窗口不是越大越好，而是要跟任务类型匹配。**

监控型 Agent、写作型 Agent、开发型 Agent，根本不是一种动物。

| Agent 类型 | 模型建议 | contextTokens 思路 |
| --- | --- | --- |
| 监控 / 提醒 / 情报汇总 | Haiku 或其他低价模型 | 尽量小，够用就行 |
| 写作 / 内容整理 / 常规分析 | Sonnet | 中等窗口 |
| 代码 / 长文档分析 / 深度任务 | Sonnet 或 Opus | 只在需要时拉高 |

如果你全局给所有 Agent 一样的 `contextTokens`，结果通常只有两个：

- 轻任务拿了不需要的预算
- 重任务还是不够用

一个实用示意是：

```json
{
  "agents": {
    "defaults": {
      "model": { "primary": "anthropic/claude-sonnet-4-6" },
      "contextTokens": 50000
    },
    "list": [
      {
        "id": "ops",
        "model": { "primary": "anthropic/claude-haiku-3.5" },
        "contextTokens": 20000
      },
      {
        "id": "writer",
        "model": { "primary": "anthropic/claude-sonnet-4-6" },
        "contextTokens": 40000
      },
      {
        "id": "coder",
        "model": { "primary": "anthropic/claude-sonnet-4-6" },
        "contextTokens": 100000
      }
    ]
  }
}
```

重点不在这些具体数字。重点在于：

**你应该按任务成本结构来配置 Agent，而不是按审美来配置 Agent。**

---

## 八、维度七：Prompt Cache，省钱不是“开关”，而是“前缀稳定性”

Anthropic 官方 pricing docs 写得很明白：Prompt caching 的价值，在于重复使用大段已处理 prompt。
对 Sonnet 4.6 来说，基础输入价是 **$3 / MTok**，cache hit 是 **$0.30 / MTok**。
也就是大约 **10% 成本**。

这很诱人。问题是，缓存不是你“开了就有”，而是你得**保住可复用前缀**。

OpenClaw docs 也明确提到两个关键点：

- cache TTL 内才有意义
- 心跳可以用略小于 TTL 的间隔，帮你维持缓存温度

例如：

```json
{
  "agents": {
    "defaults": {
      "models": {
        "anthropic/claude-sonnet-4-6": {
          "params": { "cacheRetention": "long" }
        }
      },
      "contextPruning": {
        "mode": "cache-ttl",
        "ttl": "1h"
      }
    }
  }
}
```

如果你的模型 cache TTL 是 1 小时，55 分钟一次的轻量心跳，理论上就能帮助你避免整段 prompt 冷掉后重新写入。

但这里有一个更重要的提醒。

Issue #20894 记录过一次严重回归：由于每条消息的 `message_id` 被注入进 system prompt，Anthropic 基于前缀的 prompt cache 几乎完全失效，生产环境里 `cache_write` 成本出现了 **约 80–170 倍** 的增幅。

这个问题本身是否还影响你当前版本，要看你实际运行的 build。
但它给出的教训非常硬：

**缓存不是玄学。任何会改变 system prompt 前缀的易变元数据，都会把缓存收益打穿。**

所以别只会“开 caching”。
你更应该做的是：

1. 保持配置文件前缀稳定
2. 不要频繁改 bootstrap 文件
3. 避免把每轮都变化的元数据塞进系统前缀
4. 用 Anthropic Console 或 OpenClaw usage 日志验证 cache read / cache write，而不是凭感觉相信它在省钱

---

## 九、维度八：工具调用和大输出，不要让模型替你背日志

OpenClaw 的 context docs 专门提醒了一件很多人会忽略的事：

**工具有两层成本。**

第一层是工具列表文字。
第二层是工具 schema JSON。后者即使不以普通文本展示，也照样算进 context。

这意味着“多工具”本身就有基线开销。
但更大的坑往往不是工具数量，而是**工具结果体积**。

例如：

- 大段终端输出
- 整个目录树
- 全量网页正文
- 超长日志片段
- 大尺寸截图 OCR

这些东西一旦被留在会话里，就会开始拖贵后面的每一轮。

这里有三个高价值动作：

### 1. 大输出任务优先隔离

OpenClaw docs 说明，sub-agent 使用 `promptMode=minimal`，并且**只注入 `AGENTS.md` 和 `TOOLS.md`**，不会带 `SOUL.md`、`IDENTITY.md`、`USER.md`、`HEARTBEAT.md` 等那一整包上下文。

这非常适合大输出任务：

```text
/subagents spawn main "扫描 ~/projects，列出超过 100MB 的文件"
/subagents spawn main "汇总过去 24 小时的日志，给我一个 10 行摘要"
```

这样主会话里留下的是结论，不是垃圾场。

### 2. 截图重、OCR 重的场景，把图片尺寸往下压

OpenClaw token docs 直接建议：对截图密集型会话，可以下调 `agents.defaults.imageMaxDimensionPx` 来减少 vision token 和 payload。

```json
{
  "agents": {
    "defaults": {
      "imageMaxDimensionPx": 800
    }
  }
}
```

### 3. 限制工具之前，先量 schema

Discussion #1949 里有用户把工具从 15 个减到 9 个，但第一条消息的 prompt 依然在 **136K+** 左右，几乎没变化。

这不是说工具限制没用。
而是说你不能盲目相信“少几个工具就一定省很多”。

先看 `/context detail`，找出真正大的 schema，再决定要不要裁。

---

## 十、维度九：本地模型不是神话，是高级选项

OpenClaw 官方 docs 对本地模型的态度其实很务实：

- 本地模型可行
- 成本可以做到 0
- 但 OpenClaw 期待的是大上下文和强抗注入能力
- 小模型、小显存、过度量化模型，风险和延迟都可能更高

这意味着本地模型适合什么？

适合：

- 轻量摘要
- 心跳类检查
- 简单格式整理
- 私密但低风险的草稿任务

不适合什么？

不适合把所有关键工作一把梭都迁过去。

本地模型真正合理的用法，是**把低价值、重复性、容错高的调用吃掉**，而不是在最关键的长上下文工作上赌稳定性。

如果你想走这条路，最稳的是 hybrid：

- 默认还是云端主力模型
- 低价值任务交给本地模型
- 保留 fallback 到 Sonnet / Opus

这不是意识形态问题。
这是工程取舍。

---

## 十一、从哪里开始：7步就能落地的执行顺序

如果你今天就要动手，不要平均用力。按这个顺序下刀。

### Step 1：先看账单结构

1. 运行 `/status`
2. 运行 `/context detail`
3. 开 `/usage tokens` 或 `/usage full`
4. 查一下 session 文件体积

这一步不省钱，但能防止你在错误方向上努力。

### Step 2：做模型分级

1. 把默认主模型降到 Sonnet
2. 给轻任务和 sub-agent 配 Haiku
3. 把 Opus 留给明确的高价值任务

### Step 3：清 bootstrap

1. 砍 SOUL
2. 砍 AGENTS
3. 砍 TOOLS
4. 把临时记忆迁到 `memory/*.md`

### Step 4：清 Skills

1. 删掉不常用的
2. 缩短 description
3. 对冷技能加 `disable-model-invocation: true`

### Step 5：收拾 Heartbeat

1. 检查你是不是用了错误的顶层 `heartbeat` 路径
2. 把配置迁到 `agents.defaults.heartbeat`
3. 开 `lightContext`
4. 限制 `activeHours`
5. 把 `HEARTBEAT.md` 缩成真正的 checklist

### Step 6：做会话治理

1. 把 `/compact` 养成习惯
2. 配 daily reset
3. 开启 context pruning
4. 把大输出任务转给 sub-agent 或 isolated cron

### Step 7：再看一次账单

1. 看 `/usage`
2. 看 Anthropic cache read / write
3. 看 `/context detail`
4. 看哪些 session 还在膨胀

按照流程走完之后，你就能知道自己省掉的是“真成本”，还是只是在配置文件里做样子。

---

## 十二、最后一句话：省 Token 不是节俭，是在恢复系统的因果关系

很多人把这件事理解成“省钱技巧”。

不够准确。

它真正做的，是把系统的因果关系重新摆正：

- 简单任务，用简单模型
- 低频规则，不要每轮注入
- 背景巡检，不要拖着主会话跑
- 旧历史，该压缩就压缩
- 能缓存的前缀，不要每轮都改
- 大输出，不要让主会话长期背着

当这些关系理顺之后，账单会降。
更重要的是，系统也会更稳。

这两件事通常一起发生。

所以不要再只问：“还有没有更便宜的模型？”

先问这个问题：

**你现在付的每一笔 Token，真的都在替你工作吗？**
