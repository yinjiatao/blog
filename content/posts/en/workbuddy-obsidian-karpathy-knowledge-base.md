---
title: 'I Built a Karpathy-Style Knowledge Base with WorkBuddy + Obsidian, So Knowledge Can Compound'
excerpt: 'This article shows how to use WorkBuddy and Obsidian, inspired by Andrej Karpathy’s LLM Wiki idea, to connect collection, distillation, querying, maintenance, and automation into a personal knowledge base that keeps accumulating.'
date: '2026-07-06'
category: 'tools'
readTime: 9
slug: 'workbuddy-obsidian-karpathy-knowledge-base'
---

![A Karpathy-style knowledge base built with WorkBuddy and Obsidian](/posts/workbuddy-obsidian-karpathy-knowledge-base/20260706-workbuddy-obsidian-karpathy-cover.webp)

When was the last time you took notes with real care?

Meeting minutes and documents written just to get something over the line do not count. I mean the kind of notes where you write carefully, afraid you might miss something.

My guess is that many people have the same answer I do: high school.

Over the years at work, I have written ten times more material than I ever wrote in high school notebooks, but I know those are not the same thing.

In high school, you took notes seriously because an exam was waiting for you. Every knowledge point had a destination. It would meet you again on some test paper.

After you start working, learning is usually for **solving the problem in front of you**.

Once the problem is solved, you leave a mark in your mind: I have handled this kind of thing before. The next time a similar problem appears, you follow that mark back to a vague impression, then search everything again.

After ten years, you have accumulated a pile of marks.

That is why people sometimes say: **some people do not have ten years of experience. They have used one year of experience for ten years.**

But this is not your fault.

Taking notes is easy. Maintaining them is brutal.

Archiving, organizing, and connecting old and new knowledge are boring, time-consuming tasks. The return may not appear for years. Anyone would give up.

**I am no exception.**

## You Only Have 24 Coins Each Day

I have always used a very simple model to understand time.

Each person has 24 coins per day. One coin is one hour.

You have to pay 8 coins for sleep and 4 coins for daily life and relationships. If you only need 8 coins to earn your living costs, congratulations. You still have 4 coins left to use freely.

Most people spend those 4 coins on short videos or games, and they disappear quickly.

Tomorrow repeats the same loop. The account balance is always zero.

If you want tomorrow’s version of yourself to be worth more than today’s, one of those coins has to stop being consumed and start being invested.

**A knowledge base rewrites exactly this ledger.**

Put 1 coin into it every day. Store the good articles you read and the useful ideas that come to you. From that moment, it starts to **earn interest**.

What you store today may support you with principal and interest three months later when you **write a proposal**, six months later when you **make a decision**, or one year later when you **submit a promotion case**.

It can also help you “save money.”

Looking up information, organizing materials, and digging through old documents are **repetitive tasks** that used to take your coins. Now AI can finish them in minutes and save you at least 1 coin per day.

That 1 coin is new principal created out of thin air.

The most important step is to reinvest the coin you saved. Invest 1 coin, save 1 coin. Then invest 2 coins and save even more. The moment the **flywheel** starts turning is the moment your growth begins.

![The 24-coin time model](/posts/workbuddy-obsidian-karpathy-knowledge-base/20260706-24-coins-theory.webp)

This is the **knowledge bank**.

Every piece of knowledge you deposit can generate **compound interest**. Build it, and you move from being **someone who uses AI** to being **someone who owns AI assets**.

## Why Would It Compound?

Before we start building, we need to answer one question: why would a knowledge base compound, while the way you use AI today would not?

Look at two scenarios.

In the first scenario, you drop an industry report into AI, ask a few questions, get a few good answers, and close the window. Next week, when you remember the report, you have to upload it again and ask again. AI rereads your file from the beginning every time and forgets it after answering. Even if you ask one hundred times, the accumulated value it leaves behind for you is still zero.

In the second scenario, you store the same report in your knowledge base. After reading it, AI archives the key points under the right entries. If it finds a conflict with an article you stored last month, it marks the conflict. If it confirms a judgment you made six months ago, it adds a citation. The next material you add goes through the same process again. Your knowledge base becomes a Wikipedia that serves only you. Every time you store a new material, the whole encyclopedia updates.

The first starts from zero every time. The second keeps increasing in value on top of yesterday.

That is the difference between consumption and compounding.

If this is so useful, why did people not do it before?

Of course some people did. But entering materials, archiving them, and building cross-references are all complicated. **The value is hard to see with the naked eye**, and very few people can push through the first three months.

AI, however, is naturally suited to this work.

It does not get tired, and it does not complain about boredom. Compared with doing it yourself, the cost is close to zero.

When the cost of maintaining a knowledge base is far lower than the value it creates, this is the kind of work that becomes hard not to do.

So now is the best time to start **taking notes seriously** again.

## Where Did This Idea Come From?

![Karpathy’s LLM Wiki idea](/posts/workbuddy-obsidian-karpathy-knowledge-base/20260706-karpathy-llm-wiki-method.webp)

This method is inspired by Andrej Karpathy’s LLM Wiki idea. Let AI take on the most tedious parts of a knowledge base, while you do the most interesting parts.

Following that idea, I use Obsidian for visualization and reading, and WorkBuddy for execution. I turned it into a **knowledge system** that fits my own daily use.

If you want to see the result directly, send `llm-wiki` to my WeChat official account to get the full workflow materials.

**But I would rather you finish reading this article first.**

Most similar tutorials give you a shortcut. You take it, use it for two days, and may never look at it again.

Because that is someone else’s **knowledge system**.

I want to give you a reason to begin, plus a way to communicate with AI at each step, so you can turn it into something that belongs only to you.

After all, **the best system is the one that fits you.**

### Initialize the Project

First, create a new vault in Obsidian.

![Create a new vault in Obsidian](/posts/workbuddy-obsidian-karpathy-knowledge-base/20260706-obsidian-create-vault.webp)

Then open `WorkBuddy`, create a new conversation, and choose the vault folder you just created as the workspace.

![Choose the Obsidian vault folder in WorkBuddy](/posts/workbuddy-obsidian-karpathy-knowledge-base/20260706-workbuddy-session-setup.webp)

Now both sides are watching the same set of files. Obsidian is responsible for reading and viewing. WorkBuddy is responsible for doing the work.

> To prevent AI from accidentally deleting your content, I recommend managing this knowledge base project with Git, so you can roll back whenever something goes wrong.

### Write the AGENTS.md File

AGENTS.md is the soul of the whole knowledge base. Every time WorkBuddy starts a task, it loads this file first and then works according to the rules inside it.

It needs to make four things clear.

First, the goal.

Build a **knowledge system** around the goal of **letting knowledge compound**. The system gradually turns incoming **raw resources** into persistent, auditable, interlinked **knowledge assets**, so every deposit and every question can leave something behind.

Second, the division of labor.

You provide materials, choose directions, make judgments, and make the final calls. AI handles the tedious work: collection, organization, distillation, and inspection.

Third, the territory.

The project root only contains rule, index, and log files. Collected and stored materials go into the **raw resource layer**. Distilled knowledge goes into the **knowledge asset layer**.

Fourth, the rules.

It should define naming, links, and source formats; how to handle conflicts and outdated content; where the boundaries are for storage, distillation, querying, maintenance, and inspection; and what checks must pass before delivery.

![AGENTS.md manages the knowledge base project structure](/posts/workbuddy-obsidian-karpathy-knowledge-base/20260706-agents-project-structure.webp)

But do not copy my file directly. Let AI interview you first:

```markdown
I want to build a personal knowledge base based on Andrej Karpathy’s [llm-wiki](https://gist.github.com/karpathy/442a6bf555914893e9891c11519de94f) idea.

Before we start, please interview me first: my profession, fields I care about, what I am working on, and what I want to accumulate over the next year. Ask only one question at a time, and make the questions connected to each other. Each question should include options I can choose from, and I can also answer based on my actual situation. Ask at most 10 questions.

Then, generate a draft AGENTS.md based on my answers and create the directory skeleton.
```

The communication trick is **asking only one question at a time**. If you introduce yourself in five hundred words at once, AI can only grab the surface. When you force it to ask follow-up questions, it can uncover needs that even you may not have noticed.

After ten rounds, you will get a **rules** file that fits your real situation better, along with an automatically created skeleton. When new needs appear later, adjust it gradually and let it grow with you.

### Collection and Storage

There are two ways to feed a knowledge base: automatic collection and manual storage.

The manual route is good for scattered reading on your computer. Install an Obsidian Web Clipper browser extension. When you see a good article, click once, and the webpage becomes Markdown content copied to your clipboard.

![Obsidian Web Clipper browser extension](/posts/workbuddy-obsidian-karpathy-knowledge-base/20260706-obsidian-web-clipper.webp)

The collection route is handled by WorkBuddy.

Send it a link directly. It will follow the rules in AGENTS.md, fetch the data, organize it into structured content, complete the source and time fields, and register it in the index.

![WorkBuddy collects linked content according to rules](/posts/workbuddy-obsidian-karpathy-knowledge-base/20260706-workbuddy-agent-collect.webp)

The tricky part is that links come from all kinds of sources. Videos, podcasts, and Xiaohongshu all have their own quirks. You can use CLI tools for those platforms, existing open-source collection solutions, or your own RPA scripts.

You only need to follow one principle: collect only high-quality content. Better to miss something than to pollute the base. The quality of raw materials determines the quality of the whole knowledge base. Wrong content will lead to wrong answers in later conversations.

After collection or storage finishes, you can also ask AI to produce a report for you.

![WorkBuddy generates a recent content summary](/posts/workbuddy-obsidian-karpathy-knowledge-base/20260706-workbuddy-weekly-content-summary.webp)

### Distillation

After collection or storage, we can enter the distillation stage.

![Knowledge system distillation result](/posts/workbuddy-obsidian-karpathy-knowledge-base/20260706-knowledge-system-refinement.webp)

In daily use, one sentence is enough:

> Distill the recently added content.

WorkBuddy will follow the rules written in AGENTS.md, read the newly added **raw materials** in the **knowledge base**, distill the corresponding **knowledge points**, and create an **asset** page for each **knowledge point**.

You do not need to worry that these files are scattered and unsupported. They will connect to each other through Obsidian backlinks.

After you store a dozen or so pieces of content, open Obsidian’s graph view. You will see knowledge forming a network, and that network is woven through every collection, storage, and distillation you run.

![Obsidian graph view](/posts/workbuddy-obsidian-karpathy-knowledge-base/20260706-obsidian-graph-view.webp)

### Querying

After storing your first material, you can start asking WorkBuddy related questions. It will answer by synthesizing the knowledge you have accumulated in the **knowledge base**.

> Help me summarize Karpathy’s LLM Wiki building method.

![WorkBuddy queries Karpathy’s LLM Wiki building method](/posts/workbuddy-obsidian-karpathy-knowledge-base/20260706-workbuddy-query-karpathy.webp)

WorkBuddy will progressively load relevant content according to the rules in AGENTS.md. It first reads the **index** file, locks onto relevant knowledge pages, and then reads those pages in detail. Only when necessary will it load **raw resources**. It will not load the entire knowledge base from the beginning.

![Query rules in AGENTS.md](/posts/workbuddy-obsidian-karpathy-knowledge-base/20260706-agents-query-rules.webp)

For high-value judgments generated in conversation, AI marks them as candidate content. You should be able to write them back into **knowledge assets** at any time, so the whole system can grow with you.

### Maintenance and Inspection

AI will inevitably make mistakes during use. If broken links, duplicate concept pages, mismatched citations, and old conclusions quietly overturned by new materials are left alone, the knowledge base will become more chaotic over time and eventually unusable.

You can start a new conversation in WorkBuddy:

> Maintain the knowledge base.

![WorkBuddy knowledge base maintenance result](/posts/workbuddy-obsidian-karpathy-knowledge-base/20260706-workbuddy-maintenance-result.webp)

You can also use WorkBuddy scheduled tasks to run health checks every so often.

![WorkBuddy scheduled task setup](/posts/workbuddy-obsidian-karpathy-knowledge-base/20260706-workbuddy-automation-task-setup.webp)

This is the most complicated part of the whole workflow. Fortunately, AI can help you finish it.

### Automation

Every step above can be handed to WorkBuddy scheduled tasks.

I set up three loops:

1. Collect the day’s trending topics into the base every evening.
2. Every morning, combine the accumulated knowledge in the base with yesterday’s trends and generate three topic candidates.
3. Run an inspection every Sunday.

![WorkBuddy automation task list](/posts/workbuddy-obsidian-karpathy-knowledge-base/20260706-workbuddy-automation-list.webp)

**While you are asleep, it can keep working for you. When you wake up, the content you are most interested in is already in front of you.**

![WorkBuddy automation task result](/posts/workbuddy-obsidian-karpathy-knowledge-base/20260706-workbuddy-automation-result.webp)

## The Final Form of a Knowledge Base

Finally, let’s talk about something beyond the operations.

People say that in the AI era, the moat is a person’s knowledge reserve. I agree, but I understand **reserve** differently from the traditional view.

In the traditional view, **depth** overwhelms everything. Dig one deep well, and you can live off it for a lifetime.

But now AI can raise your depth in any field at a very low cost. Depth is still important, but for **ordinary people**, spreading out breadth first and then letting AI fill in depth is the fastest path to differentiation.

## Closing

This article ends here, but I want to leave you with one action.

The article you just read today can be the first material your knowledge base accepts.

Do not just bookmark it.

Articles in a bookmark folder are no different from the marks you used to leave in your mind.

Initialize the project now. Let AI interview you, write the first version of AGENTS.md, and then collect this article into the base.

Do not try to get everything right in one step. Pick one small topic first. Run the whole workflow of collection, distillation, querying, and inspection. Then expand it slowly.

In July, I will go deep on “AI + self-media,” publishing one practical tutorial each week, plus a few longer essays with my own reflections.

How can **knowledge** keep compounding? We will keep talking about it.
