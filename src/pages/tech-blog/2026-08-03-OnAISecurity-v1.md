---
layout: ../../layouts/PostLayout.astro
title: On AI Security
date: 2026-08-02 12:00:00
description: A lot has happened!
tags: leadership technology
categories: actual-posts
thumbnail: /assets/img/AISecurity.jpg
---

I have several things to share on the AI security front. 

>First, this warning on the overall problem of securing that modern AI agent you may have running in your production mix of technology:

(Click the image to read the LinkedIn Article)

<a href="https://lnkd.in/gxwTVqkZ"> <img src="/assets/img/LLMAttackSurface.jpeg" width="35%" height="35%" /></a>

The article (summarized) makes the point that, unlike traditional apps that have very specific APIs that must be secured, LLMs are not similarly limited. <b>I cannot stress enough how much this needs to be internalized</b>

I remember well the man-years we SQL Server folks put into locking down specifically-purposed APIs against attack/abuse such as buffer overflows, SQL injections back in the 2000s - This was work specifically designed to ensure that those APIs (and REST APIs since then) were indeed a finite surface that could not be used in ways not explicitly intended.

LLMs throw that diligence away.

If the famous quote, "With great power comes great responsibility." is true, then who is being responsible?

Were you hoping that those shipping the 'frontier' models would keep you safe? Think again.

>Second, a bit of verbiage to reduce a bit of the hype anxiety around the recent "OpenAI's AI hacks HuggingFace" headlines.

OpenAI basically bragged about how powerful their cool AI was to be able to break out of their company's security and access the internet to then successfully hack the company HuggingFace. But, if you bothered to read the report you likely saw that:

- OpenAI (actually the company they hired to do the test) also gave the AI a task that it could *not* solve without accessing resources outside of the sandbox it was running in AND disabled the security that would normally keep the AI secured inside the sandbox.

- Despite some sophisticated fake-outs done by the AI to confuse those analyzing the breach after it got past the HuggingFace initial defenses, the initial penetration was essentially the result of malicious code injection. This is not some new magical form of hacking created by the AI.

Per my comments above, injection-based attacks are one of the most common style of attacks and also continue to be an Achilles' heel for LLM-based AI in particular, be that the model itself or surrounding data (and pipelines) used to config/run it.

<a href="/assets/img/calmdown.gif"> <img src="/assets/img/calmdown.gif" width="20%" height="20%" /></a>

>Third, a follow-up summary that may raise your anxiety back up a bit on that same hacking event.

Ok, this report was genuinely interesting in terms of the raw resourcefulness AI can exhibit in pursuit of a goal. It is common for those trying to dispel concerns around modern, LLM-based AI to say things like 'Calm down. AI is just a best-next token predictor. Nothing more." And, while that message is, in fact, true. I don't think it captures the level of capabilities that can fit within that description.

For a great example of that, check out this article from Nicholas Thompson, CEO of The Atlantic. He intro'ed it with these words:

<b><i>The details about the OpenAI-Hugging Face agent hack have gotten even weirder. Two after-action reports have been published and almost every detail is bizarre. The agents were both absolutely brilliant (they figured out how to communicate with each other by changing the names on files!) and utterly foolish (the whole goal was to find something that didn't exist.) I don't think you can read the reports and not be a little worried about what rogue systems are going to do in the next year or two.</b></i>

(click image to read)\
<a href="https://www.linkedin.com/posts/nicholasxthompson_the-most-interesting-thing-in-tech-the-details-activity-7500692481269739520-J1Z0/"> <img src="/assets/img/NicholasThompsonAI.png" width="50%" height="50%" /></a>
