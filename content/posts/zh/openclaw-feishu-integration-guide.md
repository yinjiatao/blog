---
title: '第 3 集：如何和 OpenClaw 深入对话，先把它接入飞书'
excerpt: '如果你已经完成第一次对话，下一步最自然的升级不是研究原理，而是把 OpenClaw 接进你每天都在用的飞书里。最快的方法，是把这篇教程和 App ID、App Secret 直接发给它。'
date: '2026-03-08 11:00'
category: 'tools'
readTime: 10
slug: 'openclaw-feishu-integration-guide'
---

如果你已经能在浏览器里和 OpenClaw 正常对话，接入飞书最快的方法不是手动改配置。

**最快的方法，是先把这篇文章和你的 `App ID`、`App Secret` 直接发给 OpenClaw，让它先帮你完成 OpenClaw 侧的配置和 Gateway 重启。**

```text
请按这篇教程帮我接入飞书。

下面是我的飞书凭证：
App ID: cli_xxx
App Secret: xxx

请你：
1. 检查当前环境是否已经支持 Feishu
2. 如果缺少 Feishu 支持，补装对应插件
3. 帮我配置飞书频道
4. 重启 Gateway
5. 告诉我接下来在飞书开放平台里还需要手动点击哪些地方
6. 如果后面需要配对，也直接告诉我命令
```

> **注意**
> 这组凭证只发给你自己的 OpenClaw。
> 不要发到群里，不要发给第三方机器人，也不要贴到公开文档里。

如果你想自己一步一步手动完成，再继续看下面的步骤。

---

## 当前版本要点

按 **2026 年 3 月 8 日** 能查到的最新官方资料，这篇教程有四个关键点：

- OpenClaw 官方文档当前仍把 Feishu 当作独立渠道文档维护，但如果你当前安装里的 `openclaw onboard` 或 `openclaw channels add` 已经能直接看到 `Feishu`，就不用再额外折腾插件安装。
- 如果当前环境里看不到 `Feishu` 选项，再执行：

```bash
openclaw plugins install @openclaw/feishu
```

- 事件订阅这一步，当前推荐的是 **使用长连接接收事件**，然后添加 `im.message.receive_v1`。
- 私聊默认通常走 `dmPolicy: "pairing"`，第一次发消息后收到配对码是正常现象。

---

## 开始前先确认两件事

- 你已经能在浏览器里和 OpenClaw 正常对话
- 你能登录飞书开放平台，并有权限创建企业自建应用

如果这两件事还没完成，先不要往下走。

---

## 手动接入的完整路径

手动做一遍，顺序是这样的：

1. 在飞书开放平台创建企业自建应用
2. 给应用添加机器人能力
3. 批量导入最小权限
4. 拿到 `App ID` 和 `App Secret`
5. 把凭证交给 OpenClaw，或自己执行 `openclaw channels add`
6. 确认 Gateway 正在运行
7. 在飞书里打开事件订阅，使用长连接
8. 发布应用
9. 在飞书里发第一条消息，完成配对

只要按这个顺序做，第一次通常就能跑通。

---

## 第 1 步：创建企业自建应用

打开飞书开放平台：

[https://open.feishu.cn/app](https://open.feishu.cn/app)

然后按顺序做：

1. 点击「创建企业自建应用」
2. 填写应用名称和描述
3. 创建完成后进入应用详情页

![创建飞书企业自建应用](/posts/openclaw-feishu-integration-guide/create-app-dialog.jpeg)

---

## 第 2 步：给应用添加机器人能力

进入左侧菜单：

**添加应用能力 -> 机器人**

把机器人能力加上。

![给飞书应用添加机器人能力](/posts/openclaw-feishu-integration-guide/add-bot-capability.png)

这一步做完以后，这个应用才真的能作为机器人收发消息。

---

## 第 3 步：批量导入最小权限

进入左侧菜单：

**权限管理**

然后点击：

**批量导入 / 导出权限**

![飞书权限管理页面](/posts/openclaw-feishu-integration-guide/permissions-page.jpeg)

![批量导入飞书权限](/posts/openclaw-feishu-integration-guide/batch-import-permissions.jpeg)

把下面这段最小权限 JSON 粘进去：

```json
{
  "scopes": {
    "tenant": [
      "aily:file:read",
      "aily:file:write",
      "application:application.app_message_stats.overview:readonly",
      "application:application:self_manage",
      "application:bot.menu:write",
      "contact:user.employee_id:readonly",
      "contact:user.base:readonly",
      "event:ip_list",
      "im:chat.access_event.bot_p2p_chat:read",
      "im:chat.members:bot_access",
      "im:message",
      "im:message.group_at_msg:readonly",
      "im:message.p2p_msg:readonly",
      "im:message:readonly",
      "im:message:send_as_bot",
      "im:message.reactions:read",
      "im:resource"
    ],
    "user": [
      "aily:file:read",
      "aily:file:write",
      "im:chat.access_event.bot_p2p_chat:read"
    ]
  }
}
```

然后按顺序点：

1. 格式化 JSON
2. 下一步
3. 确认新增权限
4. 申请开通
5. 如果弹出「确认开启」，点确认开启

![导入并确认飞书权限](/posts/openclaw-feishu-integration-guide/permissions-json.png)

如果目标只是“先把飞书对话跑起来”，这组权限已经够了。

---

## 第 4 步：拿到 App ID 和 App Secret

进入：

**凭证与基础信息**

把下面这两个值记下来：

- `App ID`
- `App Secret`

接下来 OpenClaw 会用它们去连飞书。

---

## 第 5 步：把凭证交给 OpenClaw

这一步优先用最省事的方法。

### 方法一：直接发给 OpenClaw

如果你已经能在浏览器里和 OpenClaw 对话，直接把 `App ID` 和 `App Secret` 发给它，让它帮你配置飞书频道并重启 Gateway。

这通常是最适合新手的方式。

### 方法二：自己执行 `channels add`

如果你更习惯自己操作，可以执行：

```bash
openclaw channels add
```

然后在交互式提示里选择 `Feishu`，再填入：

- `App ID`
- `App Secret`

如果你在这里根本看不到 `Feishu` 选项，再补装一次插件：

```bash
openclaw plugins install @openclaw/feishu
```

> **补充**
> 如果你还没走完初始向导，也可以重新执行 `openclaw onboard`，在 Channels 阶段直接配置 Feishu。

---

## 第 6 步：确认 Gateway 正在运行

不要跳过这一步。

先执行：

```bash
openclaw gateway status
```

如果你发现 Gateway 还没启动，就先启动或重启它：

```bash
openclaw gateway restart
```

后面飞书里保存长连接订阅时，如果 OpenClaw 这一侧根本没起来，很容易卡住。

---

## 第 7 步：打开事件订阅，使用长连接

回到飞书开放平台，进入左侧菜单：

**开发配置 -> 事件与回调**

你现在要做两件事：

1. 订阅方式选择 **使用长连接接收事件**
2. 添加事件 `im.message.receive_v1`

![飞书事件与回调页面](/posts/openclaw-feishu-integration-guide/events-page.png)

先点击添加事件：

![点击添加消息事件](/posts/openclaw-feishu-integration-guide/add-event-button.png)

然后在弹出的窗口里勾选接收消息事件：

![勾选 im.message.receive_v1](/posts/openclaw-feishu-integration-guide/select-message-event.png)

这一步最容易出错的原因，不是飞书页面难找，而是前面顺序乱了：

- OpenClaw 侧还没配好
- Gateway 没跑起来
- 应用权限没申请完

所以顺序不要改。

---

## 第 8 步：发布应用

前面的配置都做完以后，还差最后一步：**发布应用**。

进入：

**应用发布 -> 版本管理与发布**

![飞书版本管理与发布页面](/posts/openclaw-feishu-integration-guide/release-page.png)

然后按顺序做：

1. 点击「创建版本」
2. 填写版本号
3. 填写更新说明
4. 保存并发布

![创建飞书应用版本](/posts/openclaw-feishu-integration-guide/create-version-form.png)

如果你的企业流程需要审批，就按页面提示走完。

---

## 第 9 步：发第一条消息，完成配对

现在回到飞书，搜索你刚刚创建的机器人名称，然后给它发一条最简单的消息，例如：

```text
你好，帮我确认你已经接入成功。
```

![在飞书里搜索机器人](/posts/openclaw-feishu-integration-guide/search-bot.png)

如果第一次私聊时收到配对提示，这是正常现象：

![飞书里的配对提示](/posts/openclaw-feishu-integration-guide/pairing-message.png)

这时在终端里执行：

```bash
openclaw pairing list feishu
openclaw pairing approve feishu <配对码>
```

批准之后，再回飞书发一次消息，通常就能正常聊起来了。

---

## 怎样算你已经接通了

满足下面这些条件，就可以算跑通：

- 飞书应用已经创建
- 机器人能力已经开启
- 最小权限已经导入并申请开通
- `App ID` 和 `App Secret` 已经配进 OpenClaw
- Gateway 正在运行
- 事件订阅已经切到长连接，并添加了 `im.message.receive_v1`
- 应用已经发布
- 你已经在飞书里完成第一轮有效对话

只要最后一条还没发生，就先别急着说“已经接好了”。

---

## 如果收不到消息，先查这 5 件事

### 1. 先看 Gateway 还在不在

```bash
openclaw gateway status
```

### 2. 看实时日志

```bash
openclaw logs --follow
```

### 3. 检查事件订阅是不是对的

你要确认两件事：

- 订阅方式是“使用长连接接收事件”
- 事件里已经有 `im.message.receive_v1`

### 4. 检查应用是不是已经发布

很多人前面都做完了，最后卡在这一步。

### 5. 检查是不是还没批准配对

私聊首次配对没批准，机器人也不会正常收发。

---

## 补充：如果你想让 OpenClaw 读飞书文档、知识库或任务

如果你后面不只是想“聊天”，还想让它读飞书文档、知识库、网盘或任务，可以再补开这些可选权限。

### 只读权限

```json
{
  "scopes": {
    "tenant": [
      "docx:document:readonly",
      "drive:drive:readonly",
      "wiki:wiki:readonly",
      "bitable:app:readonly",
      "task:task:read",
      "task:tasklist:read",
      "task:comment:read",
      "task:attachment:read"
    ]
  }
}
```

### 读写权限

```json
{
  "scopes": {
    "tenant": [
      "docx:document",
      "docx:document.block:convert",
      "drive:drive",
      "wiki:wiki",
      "bitable:app",
      "task:task:write",
      "task:tasklist:write",
      "task:comment:write",
      "task:attachment:write"
    ]
  }
}
```

第一次接入时，没必要一开始就全开。

---

## 补充：如果你遇到反复配对

这个提醒更适合放在文末作为补充说明，而不是打断第一次接入的主线。

根据兼容性说明，这个问题的触发条件是：

- `OpenClaw 2026.2.26`
- `Feishu` 插件 `0.1.13`

表现是私聊反复要求配对，群聊通常不受影响。

![重复配对问题说明](/posts/openclaw-feishu-integration-guide/repeat-pairing-workaround.png)

如果你真的遇到这个问题，可以把下面这段话直接发给 OpenClaw：

```text
我出现了飞书私聊反复配对的问题，请把当前用户 open_id 加到 channels.feishu.allowFrom，并把 dmPolicy 临时改成 allowlist。
```

---

## 为什么这篇先讲步骤，不先讲原理

因为飞书接入最容易出错的，不是概念不懂，而是顺序错了。

最常见的几种错法是：

- OpenClaw 侧还没配好，就先去开事件订阅
- Gateway 没启动，就去保存长连接
- 应用没发布，就开始在飞书里测消息
- 私聊配对还没批准，就以为机器人坏了

这篇故意先让你照着做，是为了先帮你拿到一个确定性结果：

**飞书里已经能和 OpenClaw 聊起来。**

---

## 参考链接

- [OpenClaw Feishu 渠道文档](https://openclaw.cc/channels/feishu)
- [OpenClaw Chat Channels 总览](https://openclaw.cc/essentials/chat-channels)
- [OpenClaw Installer](https://openclaw.cc/install/installer)
- [OpenClaw Wizard](https://openclaw.cc/start/wizard)
- [OpenClaw CLI 参考](https://openclaw.cc/cli/)
- [飞书开放平台](https://open.feishu.cn/app)
