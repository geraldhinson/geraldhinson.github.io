---
layout: post
title: On Microservices (Chapter 2 - An origin story)
date: 2025-09-10 12:00:00
description: The origin of "Journaled Microservices"
tags: leadership technology
categories: actual-posts
thumbnail: assets/img/TheMegVsContainerShip.jpeg
---
### A microservice origin story
<br>
Everyone likes a good story, right? Especially a true one.

So, let start this discussion reexamining microservices with a story - But, WARNING, this is a true story that may cause you to reconsider how you build apps, as it did me. 

Several years ago, a group of MSFT veterans was commissioned to solve the mess that commerce had grown into at MSFT - <b> all 16 systems.</b>

As we all know, tactical systems built quickly to solve short-term problems (then hacked to death to deal with different scenarios and edge cases) can get out of hand. This case was no different. The <b><i>internal commerce systems had become a costly, confusing mess for both employees and customers alike.</i></b> It needed fixing and fast.

Everyone agreed on the problem - less so was any confidence it would be solved. But, to the surprise of most, a few short years later, the commissioned team’s goal to <b><i>reduce all 16 into a single, universal store was completed.</i></b>

> It was a huge success - and it was completed in far less time than most believed possible.

<b><i>Let’s talk about why that happened, because it was no accident.</i></b>

A primary reason for the success was the thoughtful approach taken by their architecture team.

Rather than jumping straight to building, they began with a series of meetings focused on sharing lessons learned spanning their collective experiences building apps. Some key observations were:

<b>1. Most apps were built on a mix of:</b>
- pub/sub systems
- msg queuing
- multiple DB technologies spanning SQL, No-SQL/DocumentDBs, etc.
- transformation pipelines doing ETL
- lightweight Cloud Functions
- larger standalone/containerized services running in orchestration
- and more
<br><br>
(and that’s just a subset of the backend stack)

<b>2. Monitoring, Scaling, Redundancy/Failover semantics, Backup/Restore granularity (& speed), Transactional semantics, etc. differed greatly across the leveraged products.</b>
- Many present shared stories of recovering from crashes, failovers, and the like, wherein the numerous, differing semantics had limited scale and/or required painful data reconciliation/recovery times.
<br><br>

<b>3. Databases were easily best-of-class in terms of most of the attributes from 2) above.</b> 
- Another aspect significantly better for databases was the attention/expertise devoted to provisioning & monitoring them by OPS (and dev) teams. (Interestingly, it was also noted that having more than one type of DB could still result in LCD/mixed semantics pain.)
<br><br>

<b>4. Team education for design/code/debug of apps spanning the typical (read: complicated) mix of tech was both costly & ineffective at producing quality apps. Things were just too complicated.</b>
<br><br>

<b>5. In the case of microservice (or adjacent) based approaches, many services that began as simple "nouns (resources)" would quickly become dominated by query logic</b> 
- Adding support for "filtered GETs" changed significantly how the underlying DB performed, scaled, etc. 
- Even worse, not only was the creation/maintenance of this code costly, it was consistently a favorite attack vector for hackers exploiting sql injection type attacks.
<br><br>

Overall, the team shared great dissatisfaction with the state of app complexity, reliability, and scale. 

From this forest-level evaluation sprang the questions: 
- <b>“Does it really have to be this bad?”</b>
- <b>“Can this be simplified?"</b>
 
Also noteworthy was the question:
- <b>“Are there fundamental primitives or patterns that could simplify building apps?"</b>

After several weeks of deep thought, they emerged, convened the broader team, and shared the following (paraphrased): 

>"We spent the last few weeks discussing, in depth, every app our collective group has ever built. To our surprise, we've had an epiphany, which seems to be a massive simplification.\
<br>
>It appears that *all* of those apps could have been built out of 4 basic types of services.\
<br>
>We have created templates for each that we would like you to use exclusively for now.\
>Honestly, we think we are likely wrong in our belief that apps can be distilled into only these 4 types. So, when you find a missed requirement, report back so we can grow the model."

The outcome?

- No one found a need for a 5th type
- They replaced the morass of products that differed in terms of scale, failover, backup/restore, monitoring with services that persisted data in relational DBs
- Loose/tight-coupled patterns became more natural
- Team education became simple and the resultant quality was undeniable
- Big cost savings resulted (both operational and licensing)

Sometimes the problem is less of a problem than how we are thinking about the problem.

So, what were the four services? [Proceed to chapter 3!](/blog/2025/On-Microservices-Part3/)


<a href="/assets/img/einstein-quote.jpg" data-lightbox="Meg"><img src="/assets/img/einstein-quote.jpg" width="65%" height="65%" /></a>