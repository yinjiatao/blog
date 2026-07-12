---
title: 'What Claude Fable 5 Reveals About the Gap Between Top Engineers and Everyone Else Using AI'
excerpt: 'Why can top engineers get great results from just a few sentences, while you can write a long prompt and still not get what you want? The gap is not prompt length. It is how quickly you can turn unknown unknowns into known knowns.'
date: '2026-07-12'
category: 'tools'
readTime: 6
slug: 'fable-5-ai-unknowns'
---

![Fable 5: Why Top Engineers Get Better Results from AI](/posts/fable-5-ai-unknowns/fable-5-ai-unknowns-cover-en.png)

Have you run into this, too?

You have a brilliant idea. You hand it to AI, it works hard, and the final result leaves you disappointed.

The frustrating part is not that it got everything wrong.

It may have done a pretty good job.

It is just—

**not the thing you wanted.**

For a while, I kept asking myself:

**Was my prompt still not good enough?**

The internet is full of elaborate prompts, after all.

Give the model a world-class-expert persona, thirty years of experience, dozens of specialist skills, and a whole workflow to follow.

I have written plenty of prompts like that this year.

**They can make the output more consistent, but not necessarily better.**

**Sometimes they feel like reins that force an idea toward a standard answer.**

That used to frustrate me deeply.

Where, exactly, was the problem?

Then I read a post from the Claude Code team: [“A Field Guide to Claude Fable: Finding Your Unknowns.”](https://claude.com/blog/a-field-guide-to-claude-fable-finding-your-unknowns)

It gave me a different answer:

**Maybe the problem is not me, or AI.**

## From Unknown Unknowns to Known Knowns

The author uses a useful metaphor.

Your prompts, Skills, and background context are a **map**.

The code, users, situations, and real-world constraints that need to be handled are the **territory** beneath it.

No map ever covers the territory completely.

The gap between the two is made of unknowns.

When AI runs into a question you never clarified, it has to decide based on its best guess of what you want.

One slightly off decision may not look like much.

**But stack up dozens of them and you get a result that is “not wrong, but not what I wanted.”**

The guide breaks these unknowns into four kinds.

![The four quadrants of knowns and unknowns, from the Claude Fable guide](/posts/fable-5-ai-unknowns/known-unknowns.png)

- **Known knowns** are things you know and can clearly tell AI.
- **Known unknowns** are questions you know are still open.
- **Unknown knowns** are judgments you already carry, but cannot yet put into words.
- **Unknown unknowns** are questions you have not even noticed exist.

This is not just a taxonomy. It is a path:

> **from unknown unknowns to known knowns.**

First you notice that there is a question. Then you clarify it piece by piece. Only then do you start executing.

![A four-step journey from unknown unknowns to known knowns](/posts/fable-5-ai-unknowns/unknowns-journey-en.png)

It also explains why the conversation is shifting away from “stuffing prompts” and toward relying on the model’s underlying ability.

As models get smarter, we do not need to teach them every single step.

But being able to solve **how** does not mean a model knows **what** to solve.

Suppose you only tell AI:

> Write sales copy for my product.

No matter how capable the model is, it does not know:

- what the product’s real advantage is;
- who the buyer is;
- what problem that person is struggling with;
- how you want them to feel afterward, or what action you want them to take.

If you have not thought through those things, making AI role-play as the world’s best copywriter will not help much.

Turn it around: clarify those questions, and even without an elaborate role or skill setup, the model can usually do good work.

**The most useful prompt has never been the longest one.**

It only needs the information that **would change the outcome**.

## The Gap Is Not Raw Ability

At this point, you might think:

Top engineers already know so much more. How could an ordinary person ever compete?

But the real difference the author noticed is not that they already know every answer.

It is that they assume this by default:

**there is probably something here that I do not know yet.**

**Most people get an idea and immediately ask AI to execute it.**

**Top engineers investigate, ask questions, and build a prototype before they decide how to execute.**

They do not have fewer unknowns because they are magically omniscient.

They expose the unknowns earlier.

![Two routes for using AI: immediate execution versus clarify first, then execute](/posts/fable-5-ai-unknowns/execution-paths-en.png)

That made me realize something:

the gap between me and a top engineer may not be ability.

More often, it is that I do not yet understand the problem well enough.

That is actually good news.

**Ability is hard to improve overnight.**

**Understanding can grow, one question, observation, and feedback loop at a time.**

You do not need to become an expert first.

You only need to admit:

**I may not have thought this through yet.**

## Take One Step Back

We are used to asking AI for answers.

But if I do not even know what my real question is, asking for an answer does not help.

At that point, AI can interview us instead.

Start with a short questionnaire to lay out what you can already express.

Then have it ask just one question at a time, slowly uncovering the vague, contradictory, and hard-to-describe parts of your thinking.

You do not need to arrive with a complete specification.

You only need to give it a fuzzy starting point.

![An English prompt for an AI questionnaire and interview](/posts/fable-5-ai-unknowns/interview-prompt-en.png)

## One Last Thought

The next time I have a great idea, I will not throw it at AI and ask it to start building immediately.

**I will step back first.**

I will let it use a questionnaire and an interview to surface the ideas I have not noticed yet.

**What truly separates people in how they use AI is not who knows a secret incantation.**

**It is who can turn “I do not know” into “here is what we should do next” more quickly.**

## A Small Bonus

Thanks for reading this far.

I packaged this questionnaire, interview pattern, and a few thinking methods I use often into an open-source Skill called [`thinking-methodology`](https://github.com/yinjiatao/skills).

You can ask your AI to install it:

```text
Please install the thinking-methodology skill from yinjiatao/skills locally and use it.
```

If it helps, that would make me very happy.

If it does not fit the way you work, please leave a comment and tell me why.

We can keep improving it together.
