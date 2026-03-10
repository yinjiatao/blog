---
title: 'Episode 3: Go Deeper with OpenClaw by Connecting It to Feishu'
excerpt: 'Once your first conversation works, the next upgrade is not more theory. It is putting OpenClaw into the place you already talk every day. The fastest path is to send this guide plus your App ID and App Secret to OpenClaw first.'
date: '2026-03-08 11:00'
category: 'tools'
readTime: 10
slug: 'openclaw-feishu-integration-guide'
---

If you can already talk to OpenClaw in the browser, the fastest way to connect Feishu is not to hand-edit config.

**The fastest path is to send this guide plus your `App ID` and `App Secret` to OpenClaw first, and let it handle the OpenClaw-side setup and Gateway restart for you.**

The screenshots in this article come from the Chinese Feishu console, so some labels may differ if your UI language is English.

```text
Please help me connect Feishu by following this guide.

Here are my Feishu credentials:
App ID: cli_xxx
App Secret: xxx

Please:
1. Check whether this environment already supports Feishu
2. Install the Feishu plugin if support is missing
3. Configure the Feishu channel
4. Restart the Gateway
5. Tell me what I still need to click manually in the Feishu developer console
6. If pairing is required later, tell me the exact command
```

> **Important**
> Only send these credentials to your own OpenClaw.
> Do not post them in a group chat, do not send them to a third-party bot, and do not paste them into a public document.

If you want to do the setup manually, follow the steps below.

---

## Current guidance

Based on the latest official material available on **March 8, 2026**, this guide has four key points:

- OpenClaw's official docs still maintain Feishu as a separate channel page, but if your current install already shows `Feishu` in `openclaw onboard` or `openclaw channels add`, you do not need to fight the plugin step again.
- If `Feishu` is not available in your current environment, install it with:

```bash
openclaw plugins install @openclaw/feishu
```

- Event delivery should now use **long connection mode**, then add `im.message.receive_v1`.
- Direct messages usually default to `dmPolicy: "pairing"`, so getting a pairing code on the first message is normal.

---

## Before you start

Make sure these two things are already true:

- you can already talk to OpenClaw in the browser
- you can log into the Feishu developer console and create a self-built app

If either one is missing, stop here and fix that first.

---

## The full manual path

If you want to do the setup yourself, the order is:

1. create a Feishu self-built app
2. add bot capability
3. import the minimum permission set
4. copy the `App ID` and `App Secret`
5. hand the credentials to OpenClaw, or run `openclaw channels add`
6. confirm the Gateway is running
7. enable long-connection event delivery
8. publish the app
9. send the first message and finish pairing

If you keep that order, the first run usually works.

---

## Step 1: Create a self-built Feishu app

Open the Feishu developer console:

[https://open.feishu.cn/app](https://open.feishu.cn/app)

Then:

1. click "Create self-built app"
2. enter the app name and description
3. finish creation and open the app details page

![Create a Feishu self-built app](/posts/openclaw-feishu-integration-guide/create-app-dialog.jpeg)

---

## Step 2: Add bot capability

In the left menu, go to:

**Add capability -> Bot**

Then enable the bot capability.

![Add bot capability to the Feishu app](/posts/openclaw-feishu-integration-guide/add-bot-capability.png)

Without this, the app will not actually work as a chat bot.

---

## Step 3: Import the minimum permission set

Go to:

**Permission management**

Then click:

**Import / export permissions in batch**

![Feishu permission management page](/posts/openclaw-feishu-integration-guide/permissions-page.jpeg)

![Batch import Feishu permissions](/posts/openclaw-feishu-integration-guide/batch-import-permissions.jpeg)

Paste this minimum permission JSON:

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

Then:

1. format the JSON
2. continue
3. confirm the new permissions
4. apply to enable them
5. if Feishu shows a confirmation dialog, confirm it

![Confirm imported Feishu permissions](/posts/openclaw-feishu-integration-guide/permissions-json.png)

If your only goal right now is to get chat working, this set is enough.

---

## Step 4: Copy the App ID and App Secret

Open:

**Credentials & Basic Info**

Copy these two values:

- `App ID`
- `App Secret`

OpenClaw will use them to connect to Feishu.

---

## Step 5: Give the credentials to OpenClaw

Use the least painful method first.

### Option 1: Send them to OpenClaw directly

If you can already talk to OpenClaw in the browser, send the `App ID` and `App Secret` to it and let it configure the Feishu channel plus restart the Gateway.

For beginners, this is usually the best option.

### Option 2: Run `channels add` yourself

If you prefer to handle it manually, run:

```bash
openclaw channels add
```

Then choose `Feishu` and enter:

- `App ID`
- `App Secret`

If `Feishu` does not appear there at all, install the plugin first:

```bash
openclaw plugins install @openclaw/feishu
```

> **Note**
> If you have not finished the initial setup wizard yet, you can also run `openclaw onboard` again and configure Feishu in the Channels step.

---

## Step 6: Confirm the Gateway is running

Do not skip this.

Run:

```bash
openclaw gateway status
```

If it is not running yet, restart it:

```bash
openclaw gateway restart
```

If the OpenClaw side is not alive, Feishu event setup often fails later.

---

## Step 7: Enable event delivery with long connection

Back in the Feishu developer console, go to:

**Development config -> Events and callbacks**

Now do two things:

1. choose **long connection** as the event delivery mode
2. add the event `im.message.receive_v1`

![Feishu events and callbacks page](/posts/openclaw-feishu-integration-guide/events-page.png)

Click the button to add an event:

![Add the message event](/posts/openclaw-feishu-integration-guide/add-event-button.png)

Then select the incoming message event:

![Select im.message.receive_v1](/posts/openclaw-feishu-integration-guide/select-message-event.png)

This is the step most people break by doing things out of order:

- OpenClaw side not configured yet
- Gateway not running
- permissions not approved yet

Keep the order intact.

---

## Step 8: Publish the app

You are almost done. The last platform step is to **publish the app**.

Go to:

**App release -> Version management and release**

![Feishu release page](/posts/openclaw-feishu-integration-guide/release-page.png)

Then:

1. click "Create version"
2. enter a version number
3. write a short release note
4. save and publish

![Create a Feishu app version](/posts/openclaw-feishu-integration-guide/create-version-form.png)

If your company requires approval, follow the prompts there.

---

## Step 9: Send the first message and finish pairing

Now go back to Feishu, search for the bot you just created, and send the simplest possible message, for example:

```text
Hi, please confirm that the connection is working.
```

![Search for the bot in Feishu](/posts/openclaw-feishu-integration-guide/search-bot.png)

If the first direct message returns a pairing prompt, that is normal:

![Pairing prompt in Feishu](/posts/openclaw-feishu-integration-guide/pairing-message.png)

Run:

```bash
openclaw pairing list feishu
openclaw pairing approve feishu <pairing-code>
```

After approval, send one more message in Feishu and it should work normally.

---

## What counts as success

You can treat the setup as successful once all of these are true:

- the Feishu app exists
- bot capability is enabled
- the minimum permissions were imported and approved
- `App ID` and `App Secret` are configured in OpenClaw
- the Gateway is running
- event delivery is set to long connection and includes `im.message.receive_v1`
- the app has been published
- you completed one valid conversation in Feishu

If the last item has not happened yet, you are not done.

---

## If messages do not arrive, check these five things first

### 1. Is the Gateway still running?

```bash
openclaw gateway status
```

### 2. What do the live logs say?

```bash
openclaw logs --follow
```

### 3. Is the event setup correct?

Confirm both:

- event delivery mode is long connection
- `im.message.receive_v1` is present

### 4. Did you actually publish the app?

Many people do everything else and stop here.

### 5. Did you approve the pairing request?

If the first DM pairing was not approved, the bot will not respond normally.

---

## Optional: extra permissions for docs, wiki, drive, and tasks

If you later want OpenClaw to do more than chat, you can add extra permissions for Feishu docs, wiki, drive, and tasks.

### Read-only set

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

### Read-write set

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

On the first setup pass, you do not need to enable all of this.

---

## Optional: if you hit repeated pairing

This warning belongs at the end as a fallback note, not in the middle of the main setup path.

Based on the compatibility note, the trigger condition was:

- `OpenClaw 2026.2.26`
- `Feishu` plugin `0.1.13`

The symptom was repeated pairing requests in direct messages, while group chats were usually unaffected.

![Repeated pairing workaround note](/posts/openclaw-feishu-integration-guide/repeat-pairing-workaround.png)

If you really hit that issue, you can send this to OpenClaw:

```text
I am hitting repeated Feishu DM pairing. Please add the current user's open_id to channels.feishu.allowFrom and temporarily change dmPolicy to allowlist.
```

---

## Why this article starts with action instead of theory

Because the most common Feishu setup failures are not conceptual. They are ordering mistakes.

Typical examples:

- opening event delivery before OpenClaw is configured
- trying to save long connection before the Gateway is running
- testing in Feishu before the app is published
- assuming the bot is broken when pairing just was not approved yet

This article is built to get you one concrete result first:

**a real working conversation between Feishu and OpenClaw**

---

## Sources

- [OpenClaw Feishu channel docs](https://openclaw.cc/en/channels/feishu)
- [OpenClaw chat channels overview](https://openclaw.cc/en/essentials/chat-channels)
- [OpenClaw installer](https://openclaw.cc/en/install/installer)
- [OpenClaw wizard](https://openclaw.cc/en/start/wizard)
- [OpenClaw CLI reference](https://openclaw.cc/en/cli/)
- [Feishu developer console](https://open.feishu.cn/app)
