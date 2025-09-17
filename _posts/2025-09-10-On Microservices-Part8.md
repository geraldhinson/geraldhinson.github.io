---
layout: post
title: On Microservices (Chapter 8 - Epilogue)
date: 2025-09-10 12:00:00
description: Summing it all up!
tags: leadership technology
categories: actual-posts
thumbnail: assets/img/TheMegVsContainerShip.jpeg
---
### Epilogue
<br>
I began this discussion with a couple of goals: 
1. to challenge how microservices are often characterized and (mis)understood
2. to describe the journaled microservices pattern given its unique power, flexibility, and simplicity 

Early on, I compared microservices along numerous axes to a couple of monoliths I have helped companies replace with microservices. In both of those two cases, the monoliths were much harder to understand, update, maintain, and monitor. And they were slower.

My point was less about monoliths (chill out, monolithians) and more to dissuade drawing conclusions based on misplaced assumptions about microservices. Microservice systems can be simpler and faster to build, and they can also be more performant for many scenarios. 

<b>Thoughts to ponder on performance:</b>
<br>
Have you considered that a call to a well-written microservice should compare favorably in terms of request/response time to a call between your app and a database? In my experience, <b>many assume that the DB (database)calls are much faster</b>. If that is always the case, then you are dealing with a poorly written microservice or framework.

Have you also considered how CPU-expensive all of the ORM (or equivalent custom DB code) serialization/shredding logic is? I routinely see the noun objects 'shredded' across numerous tables in most apps I review.
- When every (PUT/POST) object write is updating multiple tables (and associated indexes) and every (GET) object read invokes the inverse logic required to reconstitute the same object from those same tables & indexes - with corresponding joins - <b>this is (often) an expensive use of your most costly, must-stay-up, OLTP (Online Transaction Processing) hosting machines.</b> You usually need to <b>look no further than this to find why many apps have such slow timings</b> as I shared in chapter 1.
- Add to that any filtered GET query logic running on those very same machines because it got jammed into the same app logic. Monoliths (which tend to be scale-up vs scale-out systems) have enough trouble running out of headroom already. Why make it worse by burning your precious CPU cycles on such?
- In contrast, the journaled nouns write to two tables on a write, read from one table on a GET. And they offload filtered queries to the query service running on designated (and often cheaper) machines that don’t burn your precious OLTP CPU cycles at all.

No app architecture is perfect, but, at times, I wish for a few of these to hand out to those who prefer to spout perf platitudes vs use engineering thought in decision making.

<a href="/assets/img/WisdomChasingYou.png" data-lightbox="epilogue"><img src="/assets/img/WisdomChasingYou.png" width="30%" height="30%" /></a>

The Microsoft commerce team worried a lot about scale because in their world, those infamous Super Bowl Sunday load spikes were not just theoretical. 
- They had scars from app scaling failures under load. They knew from experience that all of those differing backup/restore/failover policies and semantics spanning the mix of DBs, Queuing, Pub/Sub, etc. products would result in out-of-sync data and/or long restore times - <b>in other words, even with them, significant manual cleanup was usually required.</b>
  - In that context, using only a relational DB in the journaled service model was a very attractive simplification. It meant failovers would keep data in sync, backup/restores would be more granular and faster, and monitoring would be greatly simplifed.
  <br>

- But before ditching all of those, they also needed to confirm that the journaled microservice model could actually scale. 
  - To that end, they load tested the journaled microservice model in excess of 800 updates (PUT/POST) per second. This was more than 3x the highest load anyone had ever seen from a Super Bowl type of spike.

  Predictably, the model outperformed their other, previous app architectures.

This additional anecdote on perf is a bit more of the journaled microservices origin story I told in Chapter 2. I share it here because it is an interesting case study that, to my knowledge, has never been written down for broader consumption. They were a group of experienced, open-minded engineers who dared to ask hard questions about common practices in building applications, and to creatively consider alternatives - always a good thing.

Their backgrounds spanned: 
- databases
- operating systems
- compilers
- distributed computing frameworks
- and apps using all of the above (both at Microsoft and prior)

>No doubt this diversity contributed to their willingness to reexamine and question, as well as to their epiphany for the journaled microservices architecture. (Which is a bit of a lesson in itself on team staffing. Fresh perspectives mixed with diverse experiences can be a powerful combination.)

(A personal anecdote: I almost joined my numerous friends/colleagues on that same team, but after 20+ years focused on distributed computing frameworks and databases, I was more enamored with building games for kids at the time. We all had fun. No regrets!)

**Evolution Since**
<br>
Over the years, the journaled microservice architecture has spread across several companies as engineers from the original team went their separate ways. <b>The “I can’t believe it’s this simple” epiphany shared by that original architecture team - <i>that four simple primitives could be used to build almost any application </i> - has stood the test of time well.</b>

Some nice evolution has occurred as well. <b>What began as patterns and templates in that Microsoft commerce team has evolved a lot since.</b> (Having exorcised (mostly) my game-dev demons by then, I did get to help with that!) 

I shared a coffee with a brilliant friend from that original team a couple of years ago (who was also in my dev team that built reliable messaging into the SQL Server prior. Hi, Ivan!). One of his most poignant comments over coffee that day was, <b>“The biggest mistake we made was in not standardizing the patterns into implementations for everyone to share.”</b>

I had repeated that mistake once myself - particularly on the Journal Reader. <b>Per his warning and our mutual pain, libraries and default implementations were created in subsequent instantiations.</b> Much of what I have written about here has made its way into those implementations, including:

  1. A resource library used by noun services to handle all DB calls accessing the ‘resource’ and ‘journal’ tables. Three versions of this library (Java, C#, Go) have implemented optimistic locking. One even added sophisticated support for idempotency.

  2. A query service library that implements support for translating simple REST GETs with URLs into relational DB calls with JSON responses. The first stored the canned queries and mapping in a DB table. Subsequent builds replaced that with a simple resource file, versioned via Github checkins and pushed to prod via modern CI/CD. I strongly prefer the latter.

  3. A journal reader library that implements loose-coupled pull semantics while maintaining its own ‘clock’, quarantine/retry, and with support for spreading the work (to process the journaled entries) across n tasks using consistent hashing to guarantee resource updates are processed in order.
  
  All of the above have included support for JWTs (JSON Web Tokens) and Authn/Authz logic that leveraged them. 

(Other innovations not discussed here exist in the wild as well. Examples include: <b>1) a batch scheduler that runs jobs based on multiple, pre-defined conditions having been met 2) a full B2C chat product</b> and more. Be creative!)

Hopefully, this ~~missive~~ discussion has intrigued or inspired you to consider possibilities. Things like:

- It is possible to build sophisticated, scalable applications from simple primitives.
- It is possible to build sophisticated, scalable applications that are cloud agnostic (or cloud-free).
- It is possible to build sophisticated, scalable applications using zero (or very few) licensed technologies.
- It is possible to build sophisticated, scalable applications from microservices just as quickly (sometimes more quickly) as using other approaches.

To those who would claim that building microservices is too hard or too much of a tax, I would say this:

  The primary predictor of success for building apps can, in my experience, be distilled to whether those building the apps know the answers to simple questions like:

  - Do you know what the nouns are in your system? 
  - Do you know what actions will be done to the nouns? 
  - Do you know the actors and the minimal nouns/actions surface area that they need to use?
  <br>
  (Wait, are we saying that great apps should be based on well-defined, simple app primitives too? Yep. Nothing better predicts failure than jumping to code BEFORE knowing those answers, regardless of app architecture chosen.)

  Skipping those basics yields results on par with this guy.
  <br>
<a href="/assets/img/CrystalBallPredictions.jpg" data-lightbox="epilogue"><img src="/assets/img/CrystalBallPredictions.jpg" width="30%" height="30%" /></a>

  Want to raise your chances at success even more? Know these answers too:
  - Do you know where failures fail back to in your system? And, how recovery occurs at those points? 
    - Does your design formalize this? Or, are you just hoping for the best?

<b>Basics still matter and, SURPRISE!, taking the time to determine those same answers doesn't just save time. It brilliantly enables the creation of microservice-based applications.</b>

BIG BONUS: By pursuing this simple path up front, <b>you will likely *not* be required to undertake a painful rewrite to address scale issues just as your company is hitting its stride.</b> If you’re lucky, your competitors were less wise.

All that said, <b>if you are currently facing such a rewrite</b>, whether of your own doing or one you inherited, <b>consider incrementally replacing legacy functionality with calls to journaled microservices</b> that implement modern functionality. And, stay true to principles like: <b>“It is OK for old to call new, but new should NOT call old.”</b> Such principles will avoid the weeping and gnashing of teeth that accompanies the loss of a single source of truth.

This sort of <b>RIPieces strategy has been used by many</b> who have gone before to replace systems that needed to keep running while being rewritten. <b> RIPieces is FAR less dangerous</b> than trying to flash cut from legacy to new in one fell swoop. The road of computing is littered with roadkill of that nature.

Don't be this guy!
<br>
<a href="/assets/img/OpossumAndTruck.png" data-lightbox="epilogue"><img src="/assets/img/OpossumAndTruck.png" width="30%" height="30%" /></a>

OK, enough rambling about microservices and fun frameworks!

Thank you for coming along for this reading extravaganza!

> If the world of computing I have described herein appeals to you, but still feels a bit out of reach for you or for those you employ OR if you would like a jump-start, feel free to reach out. Perhaps I can help. 

As always, <b>I can be reached via my blog email - geraldthusfar at [that well-known email service from Google].</b> 

Blessings and happy computing, folks!

[Return to top-level](/blog/)

-Gerald (thus far)