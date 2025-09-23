---
layout: post
title: On Microservices (Chapter 1 - Bad Raps versus Facts)
date: 2025-09-10 12:00:00
description: A bit of pushback where needed
tags: technology
categories: actual-posts
thumbnail: assets/img/TheMegVsContainerShip.jpeg
---

### Microservices get a bad rap sometimes

I see many posts on LinkedIn, etc. advocating against the use of microservices to build apps. 

Common objections include:
- too complex to build - avoid until needed, if ever
- too factored/granular - wastes time building completely separate apps repeatedly
- too wasteful of resources
- too complex to debug given network communication
- too much latency when calling between
- too slow when called by front-ends
- too complex to monitor/keep running
- etc.

The usual recommendation is to build a "monolith" instead because they are viewed as immune to the cons above. Further (extreme/irrational) arguments include, <b><i>"Stop trying to be Netflix. You don't need their level of complexity with 100s or 1000s of microservices. Trying to replicate that without their army will cause you to fail. You can always rewrite it someday if need be."</i></b>

I see this viewpoint from venture capitalists & engineers alike. For sure, there have been some failures.

But, for those who have lived on both sides of the monoliths/microservices pendulum swing, <b><i>the "wisdom" to build monoliths can sound pretty hollow.</i></b>

Often heard from them: <b><i>"Yeah, you'll regret that."</i></b>

> To be clear, these are not uninformed opinions. 

I'm referring specifically to <b><i>those who wrote a lot of the old monoliths</i></b> - and who later did the heavy lifting required to <b><i>convert those same monoliths to microservices</i></b>.

These folks have experience (scars) from both sides of the app design pendulum and, in my experience, react to the "sound reasoning" to <b>start with monoliths by unilaterally ignoring it.</b>

Why?

> Because the pros for microservices are compelling, especially if the cons above are avoidable.

To help illuminate, here is some real data on those objections from 2 companies I've helped:

<b>1. Responses to clients too slow </b>
 - Facts on processing time:
   - Microservices (Updates 4-5 ms, Reads 2-3 ms)
   - Monolith equivalent (Updates & Reads: Always > 100 ms. Average 250-500ms)
<br><br>
    Note: The microservice numbers reported here were for Amazon's Aurora Postgres implementation. The Aurora MySQL numbers were ~5ms slower for both reads and writes. All of the times above measure the time elapsed between the receipt of an http request to the http response written, including the roundtrip to/from the database.
<br><br>
   (Ok, chill out, you monolithians. I see you raging. My point here is more about how fast microservices can be than how slow those monoiths were. That said, while I'm **sure** that your monolith is much better, monolith app timings like this are hardly unusual findings in my experience.)
<br><br>

<b>2. Too much latency calling between microservices </b>
 - Facts: 
   - Average network time consumed <= 1ms
<br><br>

<b> 3. Too difficult to write / Too granular </b>
 - Facts: 
   - We found it trivial to automate both code-gen & provisioning of the common code found in microservices - things like logic for initialization, routing, persistence, authn/authz, database table scripts, etc. <b>What remained was the app-logic that has to be implemented regardless of app architecture chosen.</b> And, while GenAI can make this even more trivial today, prior to that even low-tech scripts doing keyword substitutions were quite effective.
   - <b>Most microservices contain code they should not.</b> Primary offenders: ORMs shredding JSON into tables & code written to perform queries on the same. Time spent writing this code (especially the queries) in microservice logic is usually a waste of time. This is significant given that <b>50-75% of most microservices consist of exactly this sort of code.</b>
<br><br>

<b> 4. Too complex to monitor/debug </b>
 - Facts:
   - Monitoring a piece of code that does exactly one thing is simpler for everyone. Basic logging, mgmt endpoints (echo/health), library network calls - most built via codegen - simplify this a ton.
<br><br>

As usual a bit of engineering diligence can do wonders for testing "common knowledge". 

In my next few posts, I'll explore an approach to microservices that several companies have leveraged to great success. It is essentially a case study that many of you will likely find of great interest.

[Continue to Chapter 2](/blog/2025/On-Microservices-Part2/)

(A monolith nearing end-of-life. Even Jason Statham could not save it.)\
<a href="/assets/img/TheMegVsContainerShip.jpeg" data-lightbox="Meg"><img src="/assets/img/TheMegVsContainerShip.jpeg" width="65%" height="65%" /></a>
