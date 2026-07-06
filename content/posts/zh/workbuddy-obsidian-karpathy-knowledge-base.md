---
title: '我用 WorkBuddy + Obsidian 搭建 Karpathy 同款知识库，让知识产生复利'
excerpt: '这篇文章讲如何用 WorkBuddy 和 Obsidian，按照 Andrej Karpathy 的 LLM Wiki 思路，把采集、提炼、查询、维护和自动化串成一套能持续积累的个人知识库。'
date: '2026-07-06'
category: 'tools'
readTime: 9
slug: 'workbuddy-obsidian-karpathy-knowledge-base'
---

![WorkBuddy + Obsidian 搭建 Karpathy 同款知识库](/posts/workbuddy-obsidian-karpathy-knowledge-base/20260706-workbuddy-obsidian-karpathy-cover.webp)

你上次用心做笔记，是什么时候？

会议纪要和应付差事的文档不算。我说的是那种一笔一划、生怕漏掉什么的笔记。

我猜很多人的答案和我一样，是高中。

工作这些年，我写过的材料摞起来比高中笔记厚十倍，但我心里清楚，那不是一回事。

高中时你认真记笔记，是因为有一场考试在等你。每个知识点都有去处，它们会在某张试卷上和你重逢。

工作之后，学习只为**解决眼前的问题**。

问题解决了，你在心里打上一个记号：这类事我处理过了。下次遇到类似的问题，凭记号找回一点点印象，然后还要再重新查一遍。

十年下来，你攒了一堆记号。

这也是为什么有人会说：**有些人不是有了十年经验，而是把一年的经验用了十年。**

但这不怪你。

笔记记下来容易，维护起来要命。

归档、整理、把新旧知识串起来，这活儿枯燥费时，回报又要几年后才见到，换谁都会放弃。

**我也不例外。**

## 你每天只有 24 枚硬币

我一直在用一个很简单的模型理解时间。

每个人每天都有 24 枚硬币，1 枚就是 1 个小时。

你必须支付 8 枚给睡眠，4 枚给生活和处理人际关系，如果你只需要 8 枚就能换回生活成本，那么恭喜你，还剩 4 枚供你自由支配。

大多数人的这 4 枚，刷视频、打游戏，一下就花完了。

明天又重新来一遍，账户余额永远是零。

想让明天的自己比今天更值钱，必须得让其中 1 枚停止消费，开始投资。

**知识库改写的正是这本账。**

每天拿 1 枚投进去，把读到的好文章、冒出来的好想法存进去，它从此开始**计息**。

你今天存的东西，会在三个月后**写方案**时、半年后**做决策**时、一年后**提交晋升**时，连本带利地**托举**你。

它还会反过来帮你“省钱”。

查资料、整理素材、翻旧文档，这些**重复劳动**本来要抢走你的硬币，现在 AI 几分钟搞定，每天至少能帮你省回 1 枚。

这 1 枚，就是凭空多出来的本金。

最关键的一步，是把省出来的这 1 枚再投回去。你投 1 枚，省回 1 枚。再投 2 枚，省回更多。当**飞轮**转起来的那一刻，就是你增长的开始。

![24 枚硬币时间模型](/posts/workbuddy-obsidian-karpathy-knowledge-base/20260706-24-coins-theory.webp)

这就是**知识银行**。

存进去的每一条知识都会产生**复利**，搭好它，你就从**使用 AI 的人**变成了**拥有 AI 资产的人**。

## 凭什么会产生复利？

动手之前得先回答一个问题：凭什么说知识库会产生复利，而你现在用 AI 的方式不会？

看两个场景。

场景一，你把一份行业报告丢给 AI，问了几个问题，得到几个不错的回答，关掉窗口。下周想起这份报告，只能重新上传、重新提问。AI 每次都把你的文件从头翻一遍，答完就忘。你问了一百次，它替你留下的积累仍然是零。

场景二，你把同一份报告存进知识库。AI 读完，把要点归档到对应条目。发现它和你上个月存的一篇文章观点冲突，标注出来。发现它印证了你半年前的一个判断，补上一条引用。下一份材料进来，这个场景再次走一遍。你的知识库像一座只为你服务的维基百科，每存一份材料，整座百科都更新一次。

前者每次从零开始，后者在昨天的基础上持续升值。

这就是消费和复利的差别。

这么好的东西，为什么以前没人这么干？

当然有人干过，但是录入、归档、交叉引用这些工作太繁杂，**产生的价值肉眼难辨**，能坚持熬过三个月的人寥寥无几。

而 AI 天生就适合干这个。

不知疲倦，也不嫌枯燥。相比于你亲自来做，它的成本近乎为零。

当维护一个知识库的成本远低于它产生的价值时，这门生意想不做都难。

所以，现在就是重新**认真记笔记**的最好时机。

## 这套思路从哪里来？

![Karpathy 的 LLM Wiki 思路](/posts/workbuddy-obsidian-karpathy-knowledge-base/20260706-karpathy-llm-wiki-method.webp)

这套方法受到 Andrej Karpathy 的 LLM Wiki 构想启发。让 AI 承受知识库最繁杂的部分，而你做其中最有意思的部分。

我照着这个思路，用 Obsidian 做可视化和阅读，用 WorkBuddy 做执行，把它改成了一套适合自己日常使用的**知识系统**。

如果你想直接看成果，在公众号发送 `llm-wiki` 领全流程资料。

**但我更希望你把这篇文章看完。**

同类教程都在给你一条捷径。你拿来就用，用个两天可能一辈子都不会再瞅一眼。

因为那是别人的**知识系统**。

我想给你一个开始的理由，和每一步同 AI 沟通的方法，好让你把它改成只属于你的样子。

毕竟，**只有适合自己的，才是最好的。**

### 初始化项目

首先在 Obsidian 里新建一个仓库。

![在 Obsidian 里新建仓库](/posts/workbuddy-obsidian-karpathy-knowledge-base/20260706-obsidian-create-vault.webp)

再打开 `WorkBuddy` 新建一个会话，工作空间选择刚刚创建的仓库文件夹。

![在 WorkBuddy 里选择 Obsidian 仓库目录](/posts/workbuddy-obsidian-karpathy-knowledge-base/20260706-workbuddy-session-setup.webp)

这样两边都盯着同一堆文件，Obsidian 负责看，WorkBuddy 负责干活。

> 为了避免 AI 误删你的内容，建议用 Git 管理这个知识库项目，出了问题随时回滚。

### 编写 AGENTS.md 文件

AGENTS.md 是整个知识库的灵魂。WorkBuddy 每次启动任务，都会先加载这份文件，再按里面的规矩干活。

它要写清四类事。

一是目标。

围绕**让知识产生复利**这一目标来构建**知识系统**。它会把不断流入的**原始资源**逐步提炼成持久化、可审计、相互链接的**知识资产**，让每一次存入和每一次提问都能沉淀下来。

二是分工。

你负责提供材料、选方向、做判断和最终拍板，AI 负责采集、整理、提炼、巡检这些繁琐工作。

三是地盘。

项目的根目录中只放规则、索引和日志文件。将采集、存入的素材放进**原始资源层**，将提炼后的知识存进**知识资产层**。

四是规矩。

命名、链接、来源怎么写，冲突和过时内容怎么处理，存入、提炼、查询、维护和巡检四类任务的边界在哪，交付前要过哪些自查。

![AGENTS.md 管理知识库项目结构](/posts/workbuddy-obsidian-karpathy-knowledge-base/20260706-agents-project-structure.webp)

不过别照抄我的文件。先让 AI 采访你：

```markdown
我要根据 Andrej Karpathy 的 [llm-wiki](https://gist.github.com/karpathy/442a6bf555914893e9891c11519de94f) 思路搭建个人知识库。

动手之前，请先采访我：我的职业、关注的领域、正在做的事、未来一年想积累什么。一次只问一个问题，问题之间相互关联。每个问题要有选项供我选择，我也可以根据我的实际情况回答，最多提 10 个问题。

然后，再根据我的回答生成 AGENTS.md 草案，并搭出目录骨架。
```

沟通技巧在**一次只问一个问题**。你一口气自我介绍五百字，AI 只能抓到表面。而逼它追问，它才挖得出你自己都没意识到的需求。

十个回合之后，你会得到一份更贴合你实际需求的**规则**文件，和一副自动搭好的骨架。后面有新的需求，再慢慢调整，让它与你共同成长。

### 采集与存入

向知识库投喂有两条路，自动采集和手动存入。

手动这条路适合电脑上的零星阅读。装一个 Obsidian Web Clipper 浏览器插件，看到好文章点一下，网页就变成 Markdown 格式的内容复制到剪切板里。

![Obsidian Web Clipper 浏览器插件](/posts/workbuddy-obsidian-karpathy-knowledge-base/20260706-obsidian-web-clipper.webp)

采集这条路交给 WorkBuddy 执行。

把链接直接丢给它，它会按 AGENTS.md 的规则抓取数据、整理成结构化内容、补全来源和时间，再登记进索引。

![WorkBuddy 按规则采集链接内容](/posts/workbuddy-obsidian-karpathy-knowledge-base/20260706-workbuddy-agent-collect.webp)

麻烦的是链接来源五花八门，视频、播客、小红书各有各的脾气。你可以使用这些平台的 CLI 工具、开源的现成采集方案，或者自己写 RPA 脚本。

你只需要遵循一条原则：只收高质量的内容，宁缺毋滥。原始材料的质量决定整个知识库的质量，错误的内容会导致在对话时得到错误的回复。

采集或存入完成后，你还可以要求 AI 为你出具一份报告。

![WorkBuddy 生成近期内容总结](/posts/workbuddy-obsidian-karpathy-knowledge-base/20260706-workbuddy-weekly-content-summary.webp)

### 提炼

采集或存入完成后，我们就可以进入提炼环节。

![知识系统提炼结果](/posts/workbuddy-obsidian-karpathy-knowledge-base/20260706-knowledge-system-refinement.webp)

日常用起来只需要一句话：

> 提炼近期新增的内容。

WorkBuddy 就会根据 AGENTS.md 写入的规则，阅读**知识库**里新增的**原始资料**，提炼出对应的**知识点**，并为每个**知识点**创建**资产**页面。

你不用担心这些文件散乱没有支撑，它们会通过 Obsidian 双向链接相互关联。

等你存上十几篇内容后，再打开 Obsidian 的关系图谱。你会看到知识连成一片网，而这张网是随你每一次采集、存入、提炼编织起来的。

![Obsidian 关系图谱](/posts/workbuddy-obsidian-karpathy-knowledge-base/20260706-obsidian-graph-view.webp)

### 查询

在你存入第一份素材后，你就可以向 WorkBuddy 提相关问题了。它会根据你在**知识库**中沉淀下来的知识进行综合回答。

> 帮助我梳理 Karpathy 的 LLM Wiki 搭建思路。

![WorkBuddy 查询 Karpathy 的 LLM Wiki 搭建思路](/posts/workbuddy-obsidian-karpathy-knowledge-base/20260706-workbuddy-query-karpathy.webp)

WorkBuddy 会根据 AGENTS.md 的规则采用渐进式加载对应内容。先读取**索引**文件，锁定相关知识页面后，再去细读。在必要时候才加载**原始资源**，不会一上来就加载整个知识库。

![AGENTS.md 中的查询规则](/posts/workbuddy-obsidian-karpathy-knowledge-base/20260706-agents-query-rules.webp)

对于对话中产生的高价值判断，AI 会标记成候选内容。你需要随时都可以回填进**知识资产**里，让整个系统陪你一起成长。

### 维护与巡检

在使用过程中，AI 难免出错。如果断掉的链接、重复的概念页、张冠李戴的引用、被新材料悄悄推翻的旧结论都丢着不管，知识库就会越用越乱，最终无法使用。

你可以在 WorkBuddy 中启动新对话：

> 维护知识库。

![WorkBuddy 维护知识库结果](/posts/workbuddy-obsidian-karpathy-knowledge-base/20260706-workbuddy-maintenance-result.webp)

也可以使用 WorkBuddy 的定时任务，每隔一段时间进行健康检查。

![WorkBuddy 定时任务设置](/posts/workbuddy-obsidian-karpathy-knowledge-base/20260706-workbuddy-automation-task-setup.webp)

这是整个流程里最繁杂的部分，所幸有 AI 帮助你完成。

### 自动化

前面每一步，都能交给 WorkBuddy 的定时任务。

我设了三条循环：

1. 每天晚上把当天热点采集进库；
2. 每天早上结合库里的积累与昨天的热点，生成三条选题候选。
3. 每周日跑一次巡检；

![WorkBuddy 自动化任务列表](/posts/workbuddy-obsidian-karpathy-knowledge-base/20260706-workbuddy-automation-list.webp)

**你睡觉的时候，它能不停为你工作。你醒来时，最感兴趣的内容已经呈到你的面前。**

![WorkBuddy 自动化任务结果](/posts/workbuddy-obsidian-karpathy-knowledge-base/20260706-workbuddy-automation-result.webp)

## 知识库的终极形态

最后，聊点比操作更远的。

都说 AI 时代的护城河是个人知识储备，我同意，但我对**储备**的理解和传统观念不一样。

传统观念里**深度**压倒一切，挖一口深井可以吃一辈子。

可现在 AI 能用极小的代价，把你在任何领域的深度迅速拔高。深度依然重要，但先铺开广度、再让 AI 去补深度，是**普通人**打出差异化最快的一条路。

## 最后

文章到这就结束了，但我想给你留一个动作。

你今天读的这篇文章，可以是你知识库收下的第一份材料。

别只点收藏。

收藏夹里的文章，和你当年打的那些记号没有区别。

现在就去初始化项目，让 AI 采访你，写出第一版 AGENTS.md，然后把这篇文章采集进去。

别追求一步到位。先挑一个小主题，把采集、提炼、查询、巡检整条流程跑通，再慢慢往外扩展。

在 7 月我会深耕“AI + 自媒体”，每周一篇干货教程，外加几篇我自己思考的深度长文。

怎么让**知识**持续产生复利，我们慢慢聊。
