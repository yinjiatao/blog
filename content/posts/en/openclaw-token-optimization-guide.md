---
title: 'The OpenClaw Token Savings Playbook: Cut 60-95% Off Your Bill Across Nine Levers'
excerpt: 'You are not just paying for OpenClaw''s answers. More often, you are paying for tool schema, config injection, bloated history, and cache misses. This guide breaks down the nine levers that actually matter, in priority order, so you know what to change first.'
date: '2026-03-08'
category: 'tools'
readTime: 18
slug: 'openclaw-token-optimization-guide'
---

In GitHub Discussion #1949, one user summed up the problem in a single line:

> "I am burning through $$$ even having dropped down to Haiku."

Around the same time, GitHub Issue #21999 documented a first call with **166,669 input tokens and only 29 output tokens**.

Those two examples do not prove that "models are too expensive." They point to something more important:

**You are not just paying for answers. You are paying a context tax.**

In OpenClaw, runaway bills are usually not caused by asking too many hard questions. They are caused by repeatedly sending too much baggage into the model: tool schemas, Skill descriptions, workspace bootstrap files, conversation history, tool output, heartbeat context, and full prompt rewrites after cache misses.

This article does one thing: **it breaks OpenClaw token cost into parts, so you know which levers are worth touching first.**

Start with the conclusion.

If you only change four things right now, the priority order is this:

| Priority | Action | Why it comes first |
| --- | --- | --- |
| P0 | Change the default model from "too luxurious" to tiered usage | This is the most direct cost lever |
| P0 | Move Heartbeat config to the correct path and shrink `HEARTBEAT.md` | A lot of background cost hides here |
| P1 | Trim SOUL / AGENTS / TOOLS / Skill descriptions | These are charged again on every call |
| P1 | Manage session history and isolate large-output tasks | History and tool output make every later round more expensive |

If your setup is heavy, with many background tasks, many tools, and long sessions, **cutting 60-95% off the bill is not unrealistic**. If your setup is already light, the drop will be smaller, but you can still remove the most wasteful spend.

---

## 1. Before you switch models, understand what you are actually paying for

OpenClaw's official docs define "Context" very plainly: **anything the model receives counts toward the context window.** Not just your messages and the model's replies, but also system prompts, Skill metadata, tool schemas, workspace files, tool results, attachments, and even provider-side wrappers you do not directly see.

This matters because many users interpret their bill as "question cost." In practice, the biggest cost in OpenClaw is often "carry cost."

Issue #21999 provides a representative breakdown. In that investigation, the first prompt was estimated roughly like this:

| Cost source | Estimated size |
| --- | --- |
| Hardcoded system prompt sections | About 3,000 tokens |
| Skills prompt | About 7,500 tokens |
| Workspace bootstrap files | About 37,500 tokens |
| Tool JSON schemas | About 15,000-20,000 tokens |
| Gateway config schema | About 25,000+ tokens |
| The user's actual message | About 100-250 tokens |

And that was only the first round. It did not yet include long-session history or accumulated tool output.

The official OpenClaw docs also show a sample `/context detail` output where, even with only 12 Skills, the Skill list alone was already **about 546 tokens**, while tool schemas reached **about 7,997 tokens**. That leads to a very simple conclusion:

**A lot of money is not being spent on "thinking." It is being spent on "carrying."**

So measure your bill structure before you optimize it. The commands most worth enabling first are:

```text
/status
/context list
/context detail
/usage tokens
/usage full
/compact
```

If you also want to inspect session bloat on disk, check the session files directly:

```bash
du -h ~/.openclaw/agents/*/sessions/*.jsonl | sort -h
```

Do not start by changing config based on instinct. Measure first. Then cut.

---

## 2. Lever one: model tiering is still the highest-leverage move

As of **March 8, 2026**, Anthropic's official pricing docs list these standard input prices:

| Model | Input price |
| --- | --- |
| Claude Opus 4.6 | $5 / MTok |
| Claude Sonnet 4.6 | $3 / MTok |
| Claude Haiku 4.5 | $1 / MTok |
| Claude Haiku 3.5 | $0.8 / MTok |

If your request exceeds 200K input tokens, Anthropic also moves Sonnet 4.6 and Opus 4.6 into more expensive long-context pricing. Sonnet goes from **$3 to $6 / MTok**. Opus goes from **$5 to $10 / MTok**.

That is why model selection is not a style preference. It is a structural cost decision.

The stable approach is not "switch everything to the cheapest model." It is **tier the model by task type**:

| Task type | Recommended model |
| --- | --- |
| Background checks, status checks, formatting, lightweight Q&A | Haiku or another low-cost model |
| Writing, coding, routine analysis | Sonnet |
| Deep reasoning, critical decisions, one-off high-value tasks | Opus |

What you really want to avoid is not using Opus. It is **using Opus for work that does not deserve Opus**.

A practical config looks like this:

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

And do not lock yourself to one model per session. Before compacting a long session, switch down:

```text
/model anthropic/claude-haiku-3.5
/compact
/model anthropic/claude-sonnet-4-6
```

If you remember one line, remember this:

**Opus should be your special forces unit, not your front desk.**

---

## 3. Lever two: trimming config files saves you a fixed tax on every round

The OpenClaw docs are explicit about which workspace files are injected automatically. By default, the prompt can include:

- `AGENTS.md`
- `SOUL.md`
- `TOOLS.md`
- `IDENTITY.md`
- `USER.md`
- `HEARTBEAT.md`
- `BOOTSTRAP.md`
- Top-level `MEMORY.md` or `memory.md`, if present

There are also two default limits:

- `agents.defaults.bootstrapMaxChars = 20000`
- `agents.defaults.bootstrapTotalMaxChars = 150000`

What does that mean?

It means every paragraph you put into those files because it "looks complete" becomes a recurring tax. You are not paying once when you write it. You are paying **every time the model is called**.

So the principles here are simple:

### 1. Keep personality in SOUL, push procedures out of SOUL

SOUL.md should define identity, boundaries, and judgment standards.
It should not become an operations manual full of checklists and long templates.

### 2. AGENTS.md should keep only the rules that trigger often

Rules that shape behavior every day belong there.
Low-frequency instructions should move elsewhere.

### 3. TOOLS.md should contain high-frequency constraints, not a tool encyclopedia

Many people turn TOOLS.md into an internal wiki.
That makes it complete, but it also makes it expensive.

### 4. Keep long-term facts at the top level, move temporary notes into `memory/*.md`

OpenClaw's token docs explicitly state that **`memory/*.md` is read on demand through memory tools, not injected automatically**.
That means temporary project notes, short-lived records, and daily work traces should live under `memory/`, not in the top-level long-term memory file.

If you do not know where to start, the easiest move is to inspect `/context detail`. It will tell you exactly how much each file is injecting. Cut the largest two first and you will usually feel the result immediately.

---

## 4. Lever three: trim Skills so rarely used tools do not keep charging rent

The OpenClaw docs make one critical point about Skills:

**The system prompt injects the Skill metadata list by default, not the full instructions. The full `SKILL.md` is loaded on demand when needed.**

That means two things are true at the same time:

First, Skills are not as expensive as many people think.
Second, Skills are not as cheap as many people think.

Where does the cost come from? From **count and description length**.
As long as a Skill appears in the list, it becomes part of the system prompt on every round.

The OpenClaw token docs even say it directly: **Keep skill descriptions short**.

So the optimization here is not "stop using Skills." It is "stop treating every Skill like a permanent resident."

### What to do

1. Keep the high-frequency Skills that the model truly needs to know automatically.
2. Move low-frequency, heavy-explanation Skills to manual invocation.
3. Shorten descriptions so they only explain trigger conditions, not the entire operating manual.

For low-frequency heavy Skills, you can use:

```yaml
---
name: my-heavy-skill
description: Rarely used, invoke manually.
disable-model-invocation: true
---
```

That field is officially supported. With `true`, the Skill still works, but it no longer enters the model prompt automatically.

If you are not sure which Skills to cut, do not guess.
Look at per-skill entry size in `/context detail`. Trim the fat ones first. Remove the cold ones next.

---

## 5. Lever four: if you do not manage history, every later round pays for every earlier round

The OpenClaw context docs are clear: context does not only contain ordinary chat history. It also contains tool results, attachments, compaction summaries, and pruning artifacts. In other words, **a session does not just grow as "messages." It grows as a pile of things you have already forgotten but the model is still forced to carry.**

That is why session management is not optional polish. It is the second main track of cost control.

### Start with these three moves

#### 1. Use `/compact` once the session gets long

```text
/model anthropic/claude-haiku-3.5
/compact
/model anthropic/claude-sonnet-4-6
```

The official docs also list `/compact` as one of the most direct relief valves. Compaction is not about preserving everything perfectly. It is about **turning old history from full-text billing into summary billing**.

#### 2. Turn on daily reset

The session docs are explicit: daily reset uses the gateway's local time, with a default reset point of **4:00 AM**. You can configure it directly:

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

The point of this config is not that "a daily reset looks elegant." The point is **preventing long-lived sessions from turning every background task into chronic cost bleed**.

#### 3. Use pruning for tool output, not just for chat text

`agents.defaults.contextPruning` exists specifically to shrink old tool results. It does not rewrite the JSONL history on disk, but it can remove old tool payload before the prompt is actually sent to the model.

If your Agent reads logs, scans directories, fetches web pages, or loads long files, this usually saves more than endlessly tweaking the prompt.

---

## 6. Lever five: do not confuse Heartbeat with Cron

This is the part most likely to be distorted by older posts, so start with the current conclusion.

### First, correct a common misunderstanding from early 2026

In February 2026, users opened Issue #30894 because it looked like `heartbeat.model` was not working.
But by **March 4, 2026**, the merged PR #32706 made the situation clearer:

**Many users had placed `heartbeat` at the top-level config path. That path was invalid all along; it had simply been ignored silently in older behavior.**

So if your config looked like this:

```yaml
heartbeat:
  model: anthropic/claude-haiku-3.5
```

the issue was not necessarily that Heartbeat itself was broken. The issue was that **the config was never being read correctly**.

The correct paths are:

- `agents.defaults.heartbeat`
- or `agents.list[].heartbeat`

That is an important correction, because it changes the conclusion:

**Not everyone should replace Heartbeat with Cron. First make sure Heartbeat is configured in the right place.**

### What Heartbeat actually is

The official docs define Heartbeat like this:

- It is a **periodic main-session agent turn**
- It runs every 30 minutes by default
- It treats `HEARTBEAT.md` like a small checklist
- It supports `activeHours`
- It supports `lightContext`
- It supports `ackMaxChars`
- If `HEARTBEAT.md` is effectively empty, OpenClaw can skip the call entirely and save API cost

So what is Heartbeat good for?

It is good for **lightweight, ongoing, main-session-aware checks**.
For example: reviewing pending tasks, spotting missed follow-ups, or sending a light daytime reminder.

What is it not good for?

It is not a good fit for **heavy computation, large output, or rigidly scheduled large tasks**.
That is Cron's job, especially isolated Cron.

### The right way to make Heartbeat cheaper

First, keep `HEARTBEAT.md` short.
The docs say it plainly: **Keep it tiny**.

Second, enable `lightContext` so only `HEARTBEAT.md` is loaded.

Third, use `activeHours` so it does not run pointlessly overnight.

Fourth, use `ackMaxChars` so it does not waste tokens on polite filler when nothing is happening.

A reasonable config looks like this:

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

If your `HEARTBEAT.md` barely contains anything, you can even keep it blank or close to blank. OpenClaw can then skip the heartbeat call entirely.

### When Cron is the better choice

The OpenClaw docs are also very clear about Cron:

- It is the gateway scheduler
- It can run in the main session
- It can also run as isolated jobs
- Isolated jobs get a fresh session id every time
- `cron.sessionRetention` defaults to `24h`
- Run logs are pruned by default

So any task that matches one of the following is a better fit for Cron:

- It has a fixed schedule
- It does not need ongoing main-session context
- Its output may be large
- Its success and failure should be debugged independently
- You want it fully isolated from your normal chat history

For example:

```bash
openclaw cron add \
  --name "Morning brief" \
  --cron "0 7 * * *" \
  --tz "Asia/Shanghai" \
  --session isolated \
  --message "Summarize overnight updates." \
  --announce
```

One-sentence summary:

**Heartbeat handles lightweight main-session patrol. Cron handles scheduling and isolation. Do not force one mechanism to carry the other's job.**

---

## 7. Lever six: tier agents by workload instead of feeding them one default budget

The official docs note that `agents.defaults.contextTokens` acts as the cap for pruning and compaction strategies. In other words, **a larger context window is not automatically better. It needs to match the workload.**

A monitoring Agent, a writing Agent, and a development Agent are not the same animal.

| Agent type | Model suggestion | Context strategy |
| --- | --- | --- |
| Monitoring / reminders / intel summaries | Haiku or another low-cost model | Keep it small; only as large as needed |
| Writing / content organization / routine analysis | Sonnet | Medium window |
| Code / long-document analysis / deeper tasks | Sonnet or Opus | Raise only when needed |

If you give every Agent the same global `contextTokens`, two things usually happen:

- Light tasks receive budget they do not need
- Heavy tasks still do not get enough

A practical sketch looks like this:

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

The exact numbers are not the point.
The point is this:

**You should configure Agents around workload cost structure, not around aesthetic symmetry.**

---

## 8. Lever seven: prompt cache is not a toggle, it is a stability problem

Anthropic's official pricing docs make the value of prompt caching very clear: it pays off when you repeatedly reuse a large processed prompt.
For Sonnet 4.6, the base input price is **$3 / MTok**, while a cache hit is **$0.30 / MTok**.
That is roughly **10% cost**.

That sounds attractive. The problem is that caching is not something you "turn on and get for free." You have to **preserve a reusable prefix**.

The OpenClaw docs also call out two important points:

- Cache only matters inside the TTL
- Heartbeat can be scheduled slightly under TTL to help keep the cache warm

For example:

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

If your model cache TTL is one hour, then a lightweight heartbeat every 55 minutes can theoretically keep that prompt warm enough to avoid a full rewrite.

But there is a more important warning here.

Issue #20894 documented a serious regression: because every `message_id` was being injected into the system prompt, Anthropic's prefix-based prompt cache effectively stopped working, and production `cache_write` costs increased by **about 80-170x**.

Whether that specific issue still affects your build depends on the version you are running.
But the lesson is hard and clear:

**Cache is not magic. Any volatile metadata that changes the system prompt prefix can destroy most of the economic benefit.**

So do not stop at "enable caching."
You also need to:

1. Keep config file prefixes stable
2. Avoid frequent edits to bootstrap files
3. Avoid injecting fast-changing metadata into the system prefix
4. Verify cache read / cache write in Anthropic Console or OpenClaw usage logs instead of trusting your intuition

---

## 9. Lever eight: do not let the model carry your logs

The OpenClaw context docs highlight something many people miss:

**Tools have two layers of cost.**

The first layer is the tool list text.
The second layer is the tool schema JSON. Even when you do not see it displayed as plain text, it still counts toward context.

That means "many tools" already creates a baseline cost.
But the bigger trap is often not tool count. It is **tool result volume**.

For example:

- Massive terminal output
- Full directory trees
- Entire web page bodies
- Long log excerpts
- Large OCR payloads from screenshots

Once those are left in the session, they start making every later round more expensive.

There are three high-value moves here:

### 1. Isolate large-output tasks first

The docs explain that sub-agents use `promptMode=minimal`, and **only inject `AGENTS.md` and `TOOLS.md`**, not `SOUL.md`, `IDENTITY.md`, `USER.md`, `HEARTBEAT.md`, and the rest of the full package.

That makes them a strong fit for large-output tasks:

```text
/subagents spawn main "Scan ~/projects and list files larger than 100MB"
/subagents spawn main "Summarize the last 24 hours of logs in 10 lines"
```

That way the main session keeps the conclusion, not the landfill.

### 2. Lower image size in screenshot-heavy OCR workflows

The OpenClaw token docs directly recommend lowering `agents.defaults.imageMaxDimensionPx` in screenshot-heavy sessions to reduce vision tokens and payload size.

```json
{
  "agents": {
    "defaults": {
      "imageMaxDimensionPx": 800
    }
  }
}
```

### 3. Measure schema before you start banning tools

In Discussion #1949, one user cut tools from 15 down to 9 and still saw a first prompt around **136K+** tokens, with almost no meaningful drop.

That does not mean tool limits are useless.
It means you should not blindly assume "fewer tools" automatically means "much cheaper."

Look at `/context detail` first. Find the schemas that are actually large. Then decide what to cut.

---

## 10. Lever nine: local models are not a myth, but they are an advanced option

The OpenClaw docs are pragmatic about local models:

- They are viable
- They can reduce direct API cost to zero
- But OpenClaw expects large context windows and strong resistance to prompt injection
- Smaller models, smaller VRAM, and aggressive quantization can all increase risk and latency

So what are local models good for?

Good fits:

- Lightweight summarization
- Heartbeat-style checks
- Simple formatting
- Private but low-risk draft work

What are they not good for?

They are not a great fit for moving all critical work over in one shot.

The sensible use of local models is **to absorb low-value, repetitive, high-tolerance calls**, not to gamble your most important long-context work on them.

If you want to go this route, the most stable pattern is hybrid:

- Keep cloud models as your main default
- Push low-value tasks to local models
- Keep a fallback path to Sonnet or Opus

That is not ideology.
It is an engineering tradeoff.

---

## 11. Where to start: a one-week rollout order

If you are going to act today, do not spread your effort evenly. Cut in this order.

### Day 1: inspect bill structure

1. Run `/status`
2. Run `/context detail`
3. Turn on `/usage tokens` or `/usage full`
4. Check session file sizes

This does not save money yet, but it stops you from spending effort in the wrong direction.

### Day 2: tier the models

1. Drop the default model to Sonnet
2. Put Haiku on lightweight tasks and sub-agents
3. Keep Opus only for explicitly high-value work

### Day 3: trim bootstrap

1. Cut SOUL
2. Cut AGENTS
3. Cut TOOLS
4. Move temporary memory into `memory/*.md`

### Day 4: trim Skills

1. Remove the rarely used ones
2. Shorten descriptions
3. Add `disable-model-invocation: true` to cold Skills

### Day 5: fix Heartbeat

1. Check whether you used the wrong top-level `heartbeat` path
2. Move it to `agents.defaults.heartbeat`
3. Turn on `lightContext`
4. Restrict `activeHours`
5. Shrink `HEARTBEAT.md` into a real checklist

### Day 6: govern the session

1. Make `/compact` a habit
2. Configure daily reset
3. Turn on context pruning
4. Move large-output tasks to sub-agents or isolated cron

### Day 7: inspect the bill again

1. Review `/usage`
2. Review Anthropic cache read / write
3. Review `/context detail`
4. Check which sessions are still bloating

After a week, you will know whether you removed real cost or just rearranged your config cosmetically.

---

## 12. Final point: saving tokens is not about being frugal, it is about restoring causality

Many people think of this as "money-saving tricks."

That is not precise enough.

What this really does is restore the cause-and-effect structure a healthy system should have:

- Simple tasks use simple models
- Low-frequency rules do not get injected every round
- Background patrol does not drag the main session around
- Old history gets compacted when it should
- Cacheable prefixes are not rewritten every round
- Large outputs do not live forever in the main session

Once those relationships are back in place, the bill goes down.
More importantly, the system gets more stable.

Those two things usually happen together.

So stop asking only: "Is there an even cheaper model?"

Ask the more important question:

**Is every token you are paying for actually doing work for you?**

## References and verification

These links are not there so readers can grind through every source. They are there to provide a verifiable evidence surface. The key numbers and claims in this article are grounded mainly in the sources below.

- [Anthropic Pricing](https://platform.claude.com/docs/en/about-claude/pricing): verified the March 8, 2026 input prices for Opus / Sonnet / Haiku, along with prompt caching cache-hit and cache-write pricing.
- [OpenClaw Context Docs](https://docs.openclaw.ai/context/): verified what enters context, and the current usage of `/status`, `/context detail`, `/usage tokens`, and `/compact`.
- [OpenClaw Token Use and Costs](https://docs.openclaw.ai/reference/token-use): verified that `memory/*.md` is loaded on demand, that Skill metadata is injected, and that cache TTL can interact with Heartbeat to keep cache warm.
- [OpenClaw Heartbeat Docs](https://docs.openclaw.ai/gateway/heartbeat): verified `lightContext`, `activeHours`, `ackMaxChars`, and the behavior where an empty `HEARTBEAT.md` can skip the call.
- [OpenClaw Session Docs](https://docs.openclaw.ai/concepts/session): verified the default 4:00 AM daily reset behavior, local-time interpretation, and session lifecycle.
- [OpenClaw Sub-Agents Docs](https://docs.openclaw.ai/tools/subagents) and [System Prompt Docs](https://docs.openclaw.ai/concepts/system-prompt): verified `promptMode=minimal` for sub-agents and the fact that they only inject `AGENTS.md + TOOLS.md`.
- [OpenClaw Skills Docs](https://docs.openclaw.ai/skills): verified that `disable-model-invocation` is officially supported.
- [Issue #21999](https://github.com/openclaw/openclaw/issues/21999): source for the 166,669 input tokens / 29 output tokens example and the prompt structure breakdown.
- [Issue #9828](https://github.com/openclaw/openclaw/issues/9828): shows that config schema injection can itself become a large fixed cost.
- [Issue #20894](https://github.com/openclaw/openclaw/issues/20894): shows how injecting volatile `message_id` values into the system prompt can destroy Anthropic prompt cache economics.
- [Discussion #1949](https://github.com/openclaw/openclaw/discussions/1949): source for the real-world "still burning money even after dropping to Haiku" report and the 136K+ first-prompt community example.
- [Issue #30894](https://github.com/openclaw/openclaw/issues/30894) and [PR #32706](https://github.com/openclaw/openclaw/pull/32706): updated the Heartbeat misconfiguration story; many cases were caused by an invalid top-level `heartbeat` path being silently ignored.
- [OpenClaw Cron Docs](https://docs.openclaw.ai/cron/): verified isolated cron jobs, `cron.sessionRetention`, and run-log pruning behavior.
