---
title: 'Episode 2: From Installation to Your First Conversation'
excerpt: 'If this is your first time using OpenClaw, this guide takes you from Node 22 and a model API key all the way to your first real conversation. The goal is not theory. It is to tell you what to do at each step.'
date: '2026-03-08 10:00'
category: 'tools'
readTime: 8
slug: 'openclaw-first-conversation'
---

If this is your first time using OpenClaw, this article only does one thing:

**It takes you from zero installation to your first real conversation.**

Do not start with Feishu, Telegram, Skills, or automation.  
Start by getting the first path to work.

---

## If you only want the fastest path, read this first

On day one, do this in order:

1. confirm Node is `v22` or newer
2. prepare one working model API key
3. install OpenClaw
4. run `openclaw onboard --install-daemon`
5. inside the wizard, choose:
   `Yes -> QuickStart -> your model provider -> paste the API key -> keep the suggested default model -> Skip channel for now -> Configure skills now = Yes -> extra API keys = No -> Hooks = Skip for now or session-memory only -> Hatch in TUI`
6. send `Hi` once in the current entry point and get the first reply
7. if you prefer the browser, then run `openclaw dashboard`

If you can get that one valid reply, everything after that becomes easier.

---

## Before you start, prepare these three things

- a computer with internet access
- Node.js 22 or newer
- one working large-model API key

For operating systems, the safest default choices are:

- `macOS`: easiest
- `Linux`: also solid
- `Windows`: use `WSL2` first instead of trying to do everything in raw `CMD / PowerShell`

---

## Step 1: Check your Node version first

Run:

```bash
node --version
```

As long as the output is `v22.x.x` or newer, keep going.

If Node is missing:

macOS:

```bash
brew install node
```

Windows (WSL2) / Linux:

```bash
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.7/install.sh | bash
nvm install 22
nvm use 22
```

If package installs frequently time out on a mainland China network, switch your npm registry first:

```bash
npm config set registry https://registry.npmmirror.com
```

---

## Step 2: Do not overthink models on day one

For the first installation, the goal is not "pick the strongest model on earth."

The goal is:

**get OpenClaw to return the first stable reply.**

Use this priority order:

| Priority | Best for | Recommendation |
| --- | --- | --- |
| `Moonshot AI (Kimi K2.5)` | People in mainland China who want the smoothest first run | The default day-one recommendation |
| The provider you already pay for | People who already have working Anthropic, OpenAI, Google, GLM, MiniMax, or similar access | Use the provider you already have credits for |
| People still benchmarking | People who want to compare everything before starting | Stop. The first model that gives you a stable reply is the best model for today |

There are three reasons `Kimi` is listed first here:

- onboarding currently exposes `Moonshot AI (Kimi K2.5)` directly
- Moonshot currently has a dedicated `Kimi Code API` path
- for a mainland-China-first setup, that path is often simpler

If you already have reliable Anthropic, OpenAI, Google, or another provider key, do not switch providers just because this article recommends one.  
On day one, stability matters more than perfection.

---

## Step 3: Install OpenClaw

If Node 22 is already ready, install OpenClaw directly:

```bash
npm install -g openclaw@latest
```

Then confirm the command exists:

```bash
openclaw --version
```

If this still says `command not found`, do not assume OpenClaw itself is broken.  
It is usually just a `PATH` issue with npm global binaries.

---

## Step 4: Run the onboarding wizard

Run:

```bash
openclaw onboard --install-daemon
```

This is the most important step in the whole first-run flow.  
You do not need to invent a config from scratch. You just need to choose the key options correctly.

---

## Step 5: What to choose in the wizard

### 1. Security prompt: choose Yes

OpenClaw will first warn you that it has local execution capability and real risk.  
On a first-run setup, choose `Yes`.

![Security prompt and QuickStart entry](/posts/openclaw-first-conversation/security-and-quickstart.png)

### 2. Onboarding mode: choose QuickStart

Do not choose `Manual` on day one.  
`QuickStart` gives you a safer default path.

### 3. Provider: choose the provider whose API key you already have

If you do not already have a preferred provider, the easiest first example is:

`Moonshot AI (Kimi K2.5)`

![Provider selection in onboarding](/posts/openclaw-first-conversation/provider-selection.png)

### 4. Auth method: follow the provider-specific path

If you choose `Kimi`, onboarding currently shows:

`Kimi Code API key (subscription)`

Then it asks you to paste your API key.

If you still need the key, get it from the Kimi Code console first.

![Copy the Kimi API key from the console](/posts/openclaw-first-conversation/copy-kimi-api-key.png)

### 5. Default model: keep the suggested value

If onboarding has already suggested something like `kimi-coding/k2p5`, do not manually tune it on the first pass.

![Keep the suggested Kimi default model](/posts/openclaw-first-conversation/model-selection-kimi-k2p5.png)

The first installation is about getting connected, not fine-tuning models.

### 6. Channel: choose Skip for now

When onboarding asks about Feishu, Telegram, WhatsApp, or other channels, skip them on day one.

![Skip channels on the first run](/posts/openclaw-first-conversation/skip-channel-for-now.png)

The reason is simple:

- channels add more variables
- debugging becomes much harder
- right now you need to prove that OpenClaw itself works first

### 7. Skills: choose Yes, but skip missing dependencies if needed

When it asks `Configure skills now?`, choosing `Yes` is fine.

![Configure skills during onboarding](/posts/openclaw-first-conversation/configure-skills.png)

But if you reach the "Install missing skill dependencies" screen and your goal is just to get the minimum loop working, you can still `Skip for now`.

### 8. Extra API keys: choose No for all of them

Notion, image generation, Whisper, ElevenLabs, and similar extra keys can all wait.

![Skip extra API keys on day one](/posts/openclaw-first-conversation/skip-extra-api-keys.png)

They are not part of the first proof that OpenClaw works.

### 9. Hooks: skip them, or only enable session-memory

If you want the simplest path, choose `Skip for now`.  
If you want one relatively safe default, enabling only `session-memory` is also reasonable.

![Hooks: skip or keep session-memory only](/posts/openclaw-first-conversation/hooks-session-memory.png)

### 10. Hatch: choose Hatch in TUI

The more reliable first-run choice in the current wizard is:

**`Hatch in TUI (recommended)`**

![Choose Hatch in TUI first](/posts/openclaw-first-conversation/hatch-in-tui.png)

That gets the agent alive inside the current terminal first, which removes extra browser variables while you are still proving the basics.

---

## Step 6: Complete the first conversation

Once onboarding drops you into the chat, do not test tools yet.

Just send something simple:

```text
Hi
```

or:

```text
Hi, please help me finish basic initialization.
```

If you are in TUI right now, send it there first. If it returns one normal reply, that path is basically alive.

If you want, you can add a very short preference note like:

```text
My working language is Chinese. My timezone is Beijing. Give the conclusion first, then the steps.
```

But do not write a giant personality prompt on day one.

---

## Step 7: If you prefer the browser, add this check

Now run:

```bash
openclaw dashboard
```

On first run, use the link from this command instead of guessing the local address.

If you see `unauthorized`, run `openclaw dashboard` again and use the tokenized link it gives you.

If you want to confirm the Web UI path as well, send a very simple message in the browser:

```text
Hi, please confirm that you are working normally.
```

This step is optional. If you get a complete reply in TUI or in the browser, the goal of this article is done.

---

## What counts as success

You can treat the setup as successful once all of these are true:

- Node is `v22` or newer
- OpenClaw is installed
- `openclaw onboard --install-daemon` completed
- model and authentication were configured inside the wizard
- one valid conversation completed in TUI or in the browser

If that last item has happened in either entry point, the core goal of this article is complete.

---

## If it fails, debug in this order

### 1. Check overall status

```bash
openclaw status
```

### 2. Check the Gateway

```bash
openclaw gateway status
```

### 3. Follow the live logs

```bash
openclaw logs --follow
```

### 4. Run diagnostics

```bash
openclaw doctor
```

### 5. If the port is occupied, inspect 18789

```bash
lsof -i :18789
```

If something else is already using it, close that process or move the port.

### 6. If `openclaw` cannot be found, inspect your PATH

```bash
npm prefix -g
```

Then check whether that npm global path is already inside your `~/.zshrc` or `~/.bashrc`.

---

## Why this article does not obsess over the entry point

Because on the first install, the hard part is not "pick TUI or browser."

The hard part is:

- whether the model and API key really work
- whether the Gateway is actually alive
- whether browser auth, port access, and UI state are adding extra confusion

So the new order is:

**get the first real reply in the simplest available entry point. In the current wizard, that entry point is usually TUI**

You can confirm the browser entry afterward. That keeps the debugging surface small.

---

## What to learn next

After this article, the most useful next topics are:

1. how to add the first external channel
2. when to switch models, and why
3. which Skills are worth installing first
4. which settings should wait until phase two

Day one is for making it work.  
The next article is for making it stronger.

---

## References

- [OpenClaw Installer](https://openclaw.cc/en/install/installer)
- [OpenClaw Wizard](https://openclaw.cc/en/start/wizard)
- [OpenClaw Dashboard](https://openclaw.cc/en/web/dashboard)
- [OpenClaw Troubleshooting](https://openclaw.cc/en/help/troubleshooting.html)
- [Moonshot Kimi API docs](https://platform.moonshot.cn/docs/api)
