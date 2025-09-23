---
layout: post
title: Pragmatic GenAI
date: 2025-05-10 21:01:00
description: Daily (non-vibe) usage for developers
tags: technology
categories: actual-posts
thumbnail: assets/img/GenAIAssists.jpeg
---

Some pragmatic uses of generative AI for the daily developer:

> Directive:

1. write a comment in your code (WHAT!?! Calm down. You'll survive it.) that describes the code you are about to write by hand.

```
Here's a simple example using VSCode and CoPilot:

 // iterate through string collection __ to find all entries that contain
 // the value "equals" and replace with "="

 (be creative and intentionally ambiguous with the comments to see
 where it succeeds and fails.)

This practice saves copious time typing and you'll learn to write better comments for the code too.
(You comments-are-evil-purists can delete them later.) Thoughtful usage of this technique can
result in separating function from implementation in your codebase and even potentially positioning
for migration to functional languages.
```

2. for recursive routines that famously blow when the stack is exhausted (I ran across this using the collision detection library "Chipmunk" due to IOS changing default resource limits for background threads)

```
 In ChatGPT:
 "Rewrite the following recursive search routine not to use recursion" followed by copy/paste of the recursive code.

 This one required some coaching and pushback on hallucination. The first rewrite met my demands but
  did so by replacing the stack calls with a heap-allocated structure that was also prone to
  growth/allocation problems as well as being wasteful and inefficient. When I pointed out that
  this was not required, ChatGPT then produced a nice loop that required no additional heap
  or stack storage.

  Could I have written (and debugged) this? Yes.

  Could I have done it in < 10 mins as I did with ChatGPT including the arguing? Definitely not.
```

> Teach-AI-by-example:

1. identify a pattern that will be repeated a lot in your code, then do a single iteration that fully utilizes all objects and methods. Lots of examples here spanning network calls, conditional UI, etc.

```
A recent use of this was the addition of tutorial tips to a front-end (Flutter in this case) app.
This was a lot of tedious code including populating 3 state tables with events, messages, UI objects,
code locations as well as calls to the state machine to determine when to show tips and what UI objects
should be active.

But, CoPilot is a great partner!

Once I had a single example in place, CoPilot recognized the pattern and happily generated almost
all of the code every time I added the next.

HUGE time saver.
```

My experience with CoPilot predicting useful code to add while typing in the IDE sans these techniques is optimistically 50% of the time. <b>But, thougtfully partnering with it increases that stat substantially.</b>

One thing I particularly like about teaching CoPilot with patterns is that it encourages (us) developers to fully flesh out a pattern upfront versus putting off features that really should be table stakes for shipping that MVP.

--

Mix the techniques for best effect! Other examples (unit tests, etc.)?

<b>(GenAI is a powerful partner that will make you a better developer. Use it!)</b>

<div class="row mt-3">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid loading="eager" path="assets/img/GenAIAssists.jpeg" class="img-fluid rounded z-depth-1" %}
    </div>
</div>
