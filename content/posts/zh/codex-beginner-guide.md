---
title: '第一次用 Codex，别乱点：一篇讲清 Chat、Work、Plan、Goal 和第三方模型'
excerpt: '从 Chat、Work 和 Codex 的入口选择开始，带你完成安装登录、第一次安全任务、Plan 与 Goal、Project 与 Worktree，并在最后了解如何通过 CC-Switch 接入 DeepSeek 或 Kimi。'
date: '2026-07-17'
category: 'tools'
readTime: 18
slug: 'codex-beginner-guide'
---

![ChatGPT Chat 与 Work 桌面端、移动端界面](/posts/codex-beginner-guide/codex-first-safe-workflow-cover.png)

打开新版 ChatGPT App 后，第一件事不是把所有按钮认一遍。

你真正需要先判断的是：

**这次工作，应该从 Chat、Work，还是 Codex 开始？**

这个入口选对以后，任务、项目、模型、Plan、Goal 才会各自回到正确的位置。  
入口没理顺，后面装再多插件、换再多模型，也只是把界面变得更复杂。

所以这篇教程不追求把每个功能都讲深。

它只带你完成三个结果：

1. 把 ChatGPT App 装好，完成第一次登录
2. 知道聊天、任务、项目和 Git Worktree 分别在解决什么
3. 如果环境受限，最后有使用 CC-Switch 接入  DeepSeek 或 Kimi 的教程

等这三条链路都通了，你就已经不是“看见按钮会点”，而是真的知道 Codex 该怎么用。

> 本文以 2026 年 7 月 17 日编写时为准。当前 Codex 更新很快，如果你的按钮位置与名称略有不同，以你的界面为准。

---

## 一、ChatGPT App 到底是什么

现在下载到电脑上的，不再是一款单独叫“Codex”的软件。

它已经合进统一的 **ChatGPT** 软件里。

打开以后，你会看到三个主要入口：

| 入口    | 它主要负责什么                |
| ----- | ---------------------- |
| Chat  | 普通聊天、问答和短内容            |
| Work  | 研究、分析并制作可审阅的成品         |
| Codex | 进入本地项目，处理文件、命令、代码和 Git |

![最新版 ChatGPT 首页界面](/posts/codex-beginner-guide/chatgpt-home-ui.png)

这里先不要急着比较谁更强。

这三个入口会共享一部分 Agent 能力，真正不同的是它们的工作方式和权限。  

在第四节会专门讲怎么选入口，你现在只需要再分清三个层次：

- ChatGPT App 是你使用的软件
- GPT-5.6，或 DeepSeek、Kimi 提供的模型，负责处理请求
- 聊天或任务，是你这一次交给 AI 的具体工作

ChatGPT 是 Agent 工具，既不是模型，也不是任务。

> 什么是 Agent 工具？
> ......

---

## 二、网页端、ChatGPT App 和 Codex Cloud，分别解决什么

这三个名字不在同一层。

- ChatGPT 网页端和 ChatGPT App，是你进入 ChatGPT 的两种界面
- Codex Cloud，是 Codex 任务的一种远程运行环境

所以 **Codex Cloud 不是第三个聊天客户端**。

它更像一台由 OpenAI 管理、专门替你运行 Codex 任务的远程工作机。

![ChatGPT 网页端、本地 Codex 与 Codex Cloud 对比](/posts/codex-beginner-guide/codex-runtime-comparison-handdrawn.png)

ChatGPT Work 和 Codex Cloud 都可能在云端运行，但不是同一种任务。

Work 面向研究和成品制作，Codex Cloud 会围绕源码仓库准备开发环境、检出代码并返回 diff。

同样，打开 ChatGPT App 也不代表任务一定在本机运行。

选择 Local 或 Worktree，任务才在本机。选择 Cloud，运行位置仍然在云端。

Codex Cloud 的运行过程可以压成五步：

1. 连接 GitHub 仓库，并配置 Cloud environment
2. 选择一条分支或一个 commit
3. Codex 创建隔离容器并检出仓库
4. 它在容器中运行命令、修改代码和执行检查
5. 完成后返回说明与 diff，你可以继续追问或创建 PR

![Codex Cloud Environment 页面](/posts/codex-beginner-guide/chatgpt-codex-cloud-environment-page.png)

这也意味着，Codex Cloud 的起点是已连接仓库里的分支或 commit。  

只存在于你电脑、还没有同步到仓库的文件，不会自动出现在云端任务里。

Cloud environment 可以配置依赖、工具、环境变量和 setup script。setup 阶段可以联网安装依赖。

Agent 阶段默认关闭网络，确实需要时再为环境开启。

第一次怎么选？

- 只聊天或做在线研究：ChatGPT 网页端
- 需要直接碰本地文件、命令和 Git：ChatGPT App
- 仓库已经连接 GitHub，想让任务远程或并行运行：Codex Cloud

还有一个边界要讲清楚：**使用 ChatGPT 软件不等于使用了本地模型**。

本地 Codex 能操作电脑文件，但模型请求通常仍然会发给当前服务商。

浏览器或桌面操作能力也需要对应的 Browser / Computer Use 功能可用并已启用，并受套餐、地区和工作区设置影响。

---

## 三、下载、安装和登录，先把官方链路跑通

第一次安装最容易走错的，不是安装按钮。

而是一上来就改模型、装插件、接第三方 API。  
最后出错时，你根本不知道问题在官方登录、Codex 配置，还是第三方路由。

更稳的顺序是：

1. 从官方地址下载
2. 用 ChatGPT 账号登录
3. 跑通一条只读任务
4. 最后再改配置

### 第 1 步：从官方页面下载

只从 [OpenAI 官方桌面版页面](https://chatgpt.com/features/desktop/) 下载。

- macOS：当前要求 macOS 14 或以上，并使用 Apple Silicon M1 或更新芯片
- Windows：从官方页面进入 Windows 安装流程，或从微软应用商店下载

如果电脑里原来装的是旧 Codex App，更新后会迁移到新的 ChatGPT App。OpenAI 也提供了单独的[迁移说明](https://help.openai.com/en/articles/20001276/)。

![ChatGPT 官方下载页](/posts/codex-beginner-guide/chatgpt-download-page.png)

### 第 2 步：完成安装

macOS 按普通 App 的方式安装。  
Windows 跟着安装器走完即可。

第一次启动时，如果系统询问文件夹、通知或其他本地权限，不要机械地全部允许。

先给当前任务真正需要的权限。  
后面确实用到，再补。

### 第 3 步：使用 ChatGPT 账号登录

打开 APP，选择使用 ChatGPT 账号登录。

系统通常会打开浏览器完成授权，然后再回到桌面客户端。

![ChatGPT App 登录页面](/posts/codex-beginner-guide/chatgpt-login-ui.png)

ChatGPT 也支持 OpenAI API Key 登录，但那会进入 API 按量计费，一部分依赖 ChatGPT 账号或工作区的功能也可能不可用。

第一次先用 ChatGPT 账号，最容易排除变量。

### 第 4 步：跑通第一条只读任务

先在 Chat 里发一个简单问题，确认账号可以正常回复。

然后进入 Codex，选择一个不重要的测试文件夹，发：

~~~text
只读取当前文件夹，告诉我里面有哪些文件。
不要修改任何内容。
~~~

怎样算第一条链路已经跑通？

- Chat 能正常回复
- 如果账号已经开放 Codex，Codex 能选择本地文件夹
- 只读任务正常完成
- 文件没有发生意外修改

Work 和 Codex 是否显示，还取决于套餐、地区和工作区设置。看不到 Work，不代表安装失败。

![新建 Codex 项目](/posts/codex-beginner-guide/chatgpt-new-codex-project.png)

这一步成功以后，再继续往下。

---

## 四、Work 和 Codex 怎么选？先看你最后想交付什么

Work 和 Codex 都能读材料、调用工具、生成文件。

所以它们的区别，不在于“谁更聪明”。

而在于你的成果最后落在哪里：

| 你的目标 | 先选什么 |
| --- | --- |
| 快速解释、讨论、写一段短内容 | Chat |
| 做报告、文档、表格、演示文稿或 Site | Work |
| 修改本地文件、运行命令、测试或操作 Git | Codex |

例如：

- “解释一下这份合同里的一个条款”——Chat
- “研究三家产品，做成一份演示文稿”——Work
- “修改这个本地网站，并把测试跑通”——Codex

![最新版 ChatGPT 首页界面](/posts/codex-beginner-guide/chatgpt-home-ui.png)

这不是绝对边界。

桌面版 Work 也可以使用本地文件、浏览器和桌面应用。

Codex 也不只能写代码，它同样可以整理 Markdown、批量处理文件或制作网页。

所以不要背功能清单。

只记这个判断：

**临时问题用 Chat，日常工作用 Work，高度依赖本地目录、命令和 Git 的编码任务用 Codex。**

---

## 五、聊天、任务、项目里的任务，用一个网站就能讲清楚

假设你准备长期维护一个网站。

你会依次遇到四种不同的工作：

1. 想先问“Git 分支是什么意思”——这是聊天
2. 想让 Codex 修改登录页面——这是一条任务
3. 希望后面的任务都能看到网站代码和项目说明——把任务放进项目
4. 想让 Codex 改登录页时，自己继续改首页——这时才需要 Worktree

把这条过程看懂，Chat、Task、Project 和 Worktree 就不会再混在一起。

### 聊天和任务，区别在有没有明确交付

普通 Chat 适合解释、讨论和临时问题。

任务则围绕一个结果运行，例如：

> 修改登录页面，保持现有接口不变，并让相关测试通过。

一条任务最好只负责一个可以验收的结果。

研究、写作和校对如果可以分别验收，就拆成三条任务。  
不要把所有工作都堆进一条越来越长的对话。

### 项目负责共享背景，不负责把任务混在一起

官方没有把“项目任务”定义成一种独立模式。  
更准确的说法是“项目里的任务”。

项目可以共享：

- 上传文件
- 项目说明
- 连接来源
- 本地文件夹

但同一项目里的每条任务，仍然有自己的消息、进度和结果。

所以项目的价值不是“把所有东西放在一起”。

而是让多条相关任务不必重复介绍同一批背景。

### Git 分支和 Worktree，管理的是文件版本

| 名称 | 它负责什么 |
| --- | --- |
| Project | 组织任务和共享上下文 |
| Git branch | 保存代码的一条版本线 |
| Worktree | 同一 Git 仓库的另一份独立 checkout |

**Worktree 不等于分支。**

在 Codex 的 Git 项目里，常见运行位置包括：

- **Local**：直接使用当前项目目录
- **Worktree**：在隔离副本里并行工作
- **Cloud**：在已经配置好的云端环境运行

![Codex 云端、本地、与分支管理](/posts/codex-beginner-guide/chatgpt-codex-local-tree.png)

如果你只有一条任务，用 Local。

如果你还要继续修改当前目录，同时希望 Codex 做另一项改动，再选择 Worktree。

任务完成以后有两条路：

- 想继续留在 Worktree：点击 **Create branch here**，把当前改动变成正式分支
- 想把任务和改动带回 Local：直接使用 **Hand off**

这两条是替代路径，不是先后步骤。

> **进阶提醒**：Codex 创建的 Worktree 默认处于 detached HEAD；同一分支不能同时被两个 Worktree checkout。Worktree 只适用于 Git 仓库，而且电脑需要已经安装 Git。零基础阶段先知道这些限制即可，不需要先学会手动管理 Worktree。

---

## 六、模型先别纠结，第一次保持默认

零基础用户真正需要的，不是背下所有模型档位，而是知道什么时候保持默认，什么时候应该升降。

截至 2026 年 7 月 17 日，最稳的起点是：

**Power 预设，当前对应 GPT-5.6 Sol + Medium reasoning。**

![ChatGPT 模型选择器](/posts/codex-beginner-guide/chatgpt-mode-switch-ui.png)

模型方向可以简单理解成：

| 模型 | 更适合什么 |
| --- | --- |
| Luna | 摘要、分类、格式转换等规则明确的任务 |
| Terra | 日常写作、研究和普通开发 |
| Sol | 复杂方案、重要成品和困难代码 |

推理强度也不用一次学完：

- 简单任务：高（Light）
- 日常默认：中（Medium）
- 多步骤、需要权衡：高（High） 或 极高（Extra High）

界面里的 最高（Max）、极高，更快消耗使用额度（Ultra）、快速模式（Fast mode），都可以等你跑通几条真实任务以后再学。

现在只记一条：简单任务可以降档，日常任务保持默认，明确的复杂任务再换 Sol 或提高推理强度。

---

## 七、同一个旧网站，先 Plan，再 Goal

Plan 和 Goal 最容易被理解成两个“更认真思考”的按钮。

其实它们解决的是两件不同的事：

- Plan：你还没确定怎么做
- Goal：你已经知道结果，要让 Codex 持续推进到验收

用“改造旧网站”这个例子。

### 第一步：目标还模糊，先用 Plan

你只知道想把旧网站改成作品集，但还没决定页面、技术方案和保留范围。

这时输入 `/plan` 选择计划模式：

~~~text
我想把这个网站 [网址] 改成一个作品集。
先检查现有文件，问我必要的问题，给出改造计划和验收标准。
暂时不要修改文件。
~~~

Plan mode 会先调查上下文、提出必要问题并形成方案。

你确认计划以后，再开始修改。  
桌面端也可以使用 Shift+Tab 切换 Plan mode；任务正在执行时，Plan mode 暂时不可用。

### 第二步：方案已经确定，再设 Goal

假设计划已经确认，最终要求是：

- 迁移到 TypeScript
- 保持现有功能
- 不使用 `any`
- 全部测试通过

输入 `/goal` 选择目标模式：

~~~text
把当前项目迁移到 TypeScript，保持现有功能不变，不使用 any，并让全部测试通过。
~~~

Goal 会附着在当前任务上，可以暂停、恢复、编辑或清除。

它也不会自动扩大权限。  

需要访问新文件、网络或外部账号时，Codex 仍然按原有权限处理。

如果任务运行时有新的想法或需求，直接在对话框中输入内容，右下角的暂停会改为发送。发送后默认是 Queue 队列模式，你可以点击**引导（Steer）**立即把消息加入当前上下文。

- Steer 会把消息加入当前正在执行的一轮
- Queue 会把消息留给下一轮

你现在只需要记住：

**需求模糊先 Plan，方案明确而且需要持续做完再 Goal。**

![计划与目标模式](/posts/codex-beginner-guide/chatgpt-goal-plan-mode.png)

---

## 八、插件、技能、站点、自动化，按这个顺序学

这四个功能看起来都像是在“给 ChatGPT 加能力”。

但第一次使用，不要从插件目录开始逛。

更稳的顺序是：

1. 先手工完成一条任务
2. 重复流程稳定后，做成 Skill
3. 需要外部账号和数据时，再装 Plugin
4. 需要交付网站时，用 Sites
5. 手工流程已经跑通，最后再设 Scheduled task

### Skill：把重复方法留下来

Skill 是一套可复用工作流，可以包含说明、模板、参考资料和脚本。

例如“收集数据 → 生成图表 → 写周报”已经重复做了几次，就值得做成 Skill。

Codex 可以自动选择符合任务的 Skill，也可以用 `$技能名` 明确调用。

![技能管理页面](/posts/codex-beginner-guide/chatgpt-skill-manage-ui.png)

Skill 不会自动获得额外权限。  

它需要联网、运行脚本或调用外部工具时，仍然受到对应权限限制。

> 可以通过对话，让 AI 协助你安装、删除技能。

### Plugin：连接外部能力

Plugin 是可安装的能力包，可以包含 Skills、MCP-backed App，或两者兼有。

在 Work 或 Codex 中打开 **Plugins**，安装后新建任务，可以直接描述结果，也可以用 `@` 选择插件。

![插件管理页面](/posts/codex-beginner-guide/chatgpt-plugin-manage-ui.png)

安装 Gmail、Slack 或 Google Drive 插件，不等于已经获得账号权限。  

外部服务仍然需要单独登录，卸载 Plugin，也不一定自动断开连接。

> 可以通过对话，让 AI 协助你安装、连接、或卸载插件。

### 站点：保存版本不等于正式发布

站点（Sites）可以创建、托管和分享网站或 Web App，目前仍是 public beta。

桌面端可以直接打开，网页端可以从 ChatGPT Work 的 **More → Sites** 进入。

只要分清两个动作：

- **Save a version**：保存待检查版本
- **Deploy a version**：正式生成线上地址

每个 Deploy 都是 production deployment。

发布前要检查隐私数据、上传文件、环境变量和分享范围。

![新建站点](/posts/codex-beginner-guide/chatgpt-new-site-ui.png)

### 已安排：最后再交给后台

已安排（Scheduled tasks）会按时间重复执行任务。

本地定时任务运行时，电脑要开机、ChatGPT App 要保持运行，项目也必须能从磁盘访问。  
Git 项目可以使用独立 Worktree。

网页端定时任务可以使用上传文件和连接工具，但不能直接访问电脑上的本地文件夹。

![新建定时任务](/posts/codex-beginner-guide/chatgpt-scheduled-ui.png)

第一次先手工跑通，不要给后台任务不必要的 Full access。

至于 App、Connector 和 MCP，可以先压成一句话：

**你看到的是外部连接和插件，背后的 MCP server 负责提供工具、认证和数据。**

外部操作仍然受到账号权限和相应审批规则限制。

---

## 九、最后再换第三方 API：用 CC-Switch 接 DeepSeek 或 Kimi

这一节放在最后，是因为第三方 API 不应该成为你的第一条 Codex 链路。

先用官方模型跑通，再切第三方。  

这样出错时，你至少知道问题不在安装和项目本身。

截至写这篇教程时，CC-Switch 最新正式版是 v3.17.0。

它是一款第三方开源桌面工具，不属于 OpenAI、DeepSeek 或 Kimi。

### 为什么不能只改一个 API 地址

新版 Codex 与 CC-Switch 当前推荐的路由链路使用 Responses API，而 DeepSeek、Kimi 的常规兼容入口使用 Chat Completions。

CC-Switch 在本机做的是：

![CC-Switch 本地协议转换流程](/posts/codex-beginner-guide/cc-switch-protocol-routing-handdrawn.png)

所以它不只是“保存几把 Key”，还负责协议转换。

接下来按七步做。

### 第 1 步：下载 CC-Switch

只从下面两个入口下载：

- [CC-Switch 官方 GitHub Releases](https://github.com/farion1231/cc-switch/releases)
- [CC-Switch 官网](https://ccswitch.io)

- Windows：下载 `.msi`，也可以选择 Portable `.zip`
- macOS：下载 `.dmg`，或使用 `brew install --cask cc-switch`

![CC-Switch Releases 页面](/posts/codex-beginner-guide/cc-switch-download-page.png)

先打开 ChatGPT App 的 Codex。

### 第 2 步：获取 deepseek API 密钥

分别去对应平台创建：

| Provider | Key 来源 | 推荐起步模型 |
| --- | --- | --- |
| DeepSeek | [DeepSeek API Keys](https://platform.deepseek.com/api_keys) | `deepseek-v4-flash` |
| Kimi 开放平台 | [Kimi API Keys](https://platform.kimi.com/console/api-keys) | `kimi-k2.7-code` |

这里以 deepseek 为例，进入 deepseek 官方 [API keys 管理页面](https://platform.deepseek.com/api_keys)，创建新的 API 密钥。

![Deepseek API keys 管理界面](/posts/codex-beginner-guide/deepseek-api-keys-page.png)

> 创建时需要复制并保存 API key ，否则关闭弹窗后无法再次保存。  
> 不要和其他生产项目共用一把 Key。  

### 第 3 步：添加新的 Deepseek 供应商

在 CC-Switch 的 Codex 页面点击右上角加号。

![添加 openai 供应商](/posts/codex-beginner-guide/cc-switch-add-provider.png)

如果接 DeepSeek：

1. 选择 **DeepSeek** 预设
2. 填入 DeepSeek API Key
3. 保存

![新增 DeepSeek 供应商](/posts/codex-beginner-guide/cc-switch-add-deepseek-provider.png)

如果接 Kimi：

1. 选择 **Kimi**
2. 填入 Kimi 开放平台 API Key
3. 保存

![新增 Kimi 供应商](/posts/codex-beginner-guide/cc-switch-add-kimi-provider.png)

图中使用 **Kimi 开放平台**，不使用 Kimi For Coding。

Kimi 开放平台与 Kimi For Coding 使用不同的 Key 和计费方式，添加时不要选错预设。

### 第 4 步：开启本地路由

点击设置按钮进入设置页面。

![CC Switch 设置按钮](/posts/codex-beginner-guide/cc-switch-setting-button.png)

打开：

1. 路由总开关
2. 路由启用里的 Codex 开关

![CC Swtich 路由页面](/posts/codex-beginner-guide/cc-switch-routing-ui.png)

使用 DeepSeek 或 Kimi 时，CC-Switch 必须保持运行。  

可以放到托盘，但不要完全退出。

### 第 5 步：切换到 deepseek 或 kimi，重启并测试

回到 Provider 列表，在 DeepSeek 或 Kimi 卡片上点击 **启用**。

![切换到 Deepseek](/posts/codex-beginner-guide/cc-swtich-switch-deepseek-provider.png)

然后完整退出并重新打开 ChatGPT App。

第一次只做一个最小测试：

~~~text
读取当前文件夹中的 README，告诉我这个项目是做什么的。
不要修改任何文件。
~~~

这会产生一笔很小的第三方 API 费用。

同时检查：

- 任务是否正常回复
- CC-Switch 当前 Provider 是否正确
- 路由日志是否出现请求
- DeepSeek 或 Kimi 后台是否出现对应使用量

只有四件事都对上，才算真的接通。

### 第 7 步：切换 Provider，以及切回官方

DeepSeek 和 Kimi 之间切换时：

1. 停止当前任务
2. 在 CC-Switch 中 **启用（Enable）** 另一个 **供应商（Provider）**
3. 确认本地路由仍在运行
4. 完整重启 ChatGPT App
5. 再做一次最小测试

切回官方 OpenAI 时：

1. 停止当前任务
2. 关闭 Codex 路由接管
3. 关闭本地路由总开关
4. 启用 **OpenAI Official**
5. 完整重启 ChatGPT App
6. 确认路由日志不再增加第三方请求

到这里，切回官方才算完成。

最后，再讲清楚数据边界。

**本地路由只表示转换程序运行在你的电脑上。**

任务实际使用的提示词、被读取的文件片段和工具结果，仍然会发送给当前选中的 DeepSeek 或 Kimi。  

第三方 API 的费用、数据保留和服务条款，也与 ChatGPT 订阅相互独立。

---

## 你现在最该做的，是跑通一条自己的任务

读完以后，不要继续留在设置页面。

先选一个不重要的文件夹，完成一条只读任务。

然后按这个顺序往前走：

1. 临时问题用 Chat，成品用 Work，本地项目用 Codex
2. 第一次保持 Power + Medium
3. 需求模糊先 Plan，方案明确后再 Goal
4. 真正需要并行修改 Git 项目时，再用 Worktree
5. 同类流程稳定重复以后，再做 Skill 或自动化
6. 官方模型已经跑通，最后再测试第三方 API

真正的入门，不是把所有功能都试过。

而是你已经知道：

**这次工作从哪里开始，怎样算完成，请求最后发给了谁，出现问题又该从哪一层往回查。**
