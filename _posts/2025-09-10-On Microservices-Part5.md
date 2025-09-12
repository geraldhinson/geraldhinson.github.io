---
layout: post
title: On Microservices (Chapter 5 - Journal Reader Services)
date: 2025-09-10 12:00:00
description: The third of four service types
tags: leadership technology
categories: actual-posts
thumbnail: assets/img/TheMegVsContainerShip.jpeg
---
### 3 of 4 - Journal Reader Services
<br>
For reference, the 4 service types were:

- Noun
- Query
- Journal Reader
- Verb


<b>— Journal Reader Service (with a "Push" vs "Pull" semantics prologue first) —</b>

So far we have: 
- changed noun services to journaled services and removed costly-to-write (and injection prone) custom DB code from them
- replaced the remaining DB writes in those nouns with a standard resource library that handles all DB calls and also implements optimistic locking. 
- relocated the DB query logic previously existing in the noun services to a query service that replaces custom app query code with a data-driven, config approach.

<b>But, how does the data get from the noun services to the underlying data lakes/ponds that the query service pulls from?<b>

This scenario (and a few others) brings us to the realm of the Journal Reader service.

But prior to discussing the specifics of that service, <b>let’s zoom out and first talk about tight / loose couplings between different apps or parts of an app.</b>

A common mistake made in app design is to use ‘push’ when the model should be ‘pull’. This happens in lots of different types of apps, but to illustrate, I’ll (again) pick on commerce systems.

The problematic pattern typically manifests as such:

- a customer submits an order with payment to a commerce system
- the order contains multiple customer-purchased products and/or services. 
  - If the customer was building their own company the order might contain things like a domain, an SSL certificate, a website, a business line, etc., each of which are likely provisioned by downstream (from commerce) product teams
- the commerce system calls each of the downstream product teams on an API provided by that team to kick off customer provisioning in each

This is a “push” model.

There are problems with this. 

Specifically:
- <b>Errors flow in the wrong direction.</b>
  If a downstream system is down, throws an exception, etc. The error flows back to the caller, in this case, the commerce system, which is almost guaranteed to NOT be able to resolve the issue.

- <b>Push processing can be flow-controlled</b> by slow/failing/completely-down downstream systems. 
  
  Let's take the "a downstream system is up but running slowly". This is the classic <b>“no one is allowed to move faster than the slowest kid in the class”</b> problem. 
  
  The commerce system **really** wants to finish calling all of the downstream product teams for the order it's processing (so it can be done with it). And, it is <b>not receiving an error or a timeout from the poor-performing</b> downstream product-team system that is being called along with all of the others that are working fine. 
  
  <b>RESULT? Classic flow-control. Overall throughput slows down</b>, likely not keeping up with orders placed, customers awaiting access to products, etc.

<a href="/assets/img/Teamwork.jpg" data-lightbox="PullVsPush"><img src="/assets/img/Teamwork.jpg" width="60%" height="60%" /></a>

The real issue is that *push* is a tight-coupled construct.

> Said differently, there is a big difference between "this must happen" and "this must happen right now".

For example, in a commerce system, while we **do** block completing an order until payment is confirmed, there is no need to block order completion (including responding to the customer) on the creation of a subscription that will be used to bill customers later. Is it necessary for the subscription to be created? Absolutely. Must it happen while the customer is awaiting purchase confirmation? Definitely not.

<b>“Push”</b> is usually *only* used for actions that must be done in a tight-coupled fashion. 

- I'm not letting you (see this movie, have this burger, etc.) until I've successfully received your payment. We both want the exchange to happen now or you get no movie/burger and I get no money. <b>(The mutual exchange is both important and urgent.)</b>

<b>“Pull”</b> is usually a better model to use for loose-coupled activity. 

- Because you have used our airline for n trips/miles, you can now book a future trip to somewhere for free/at-a-discount. I don't need to book the free trip at the exact time I accrue enough points, but I definitely want to be able to use them. <b>(The mutual exchange is important but not urgent.)</b>

Keep in mind "Pull" doesn't mean actions need to occur slowly. It just means that actions that should not be held up unnecessariliy, aren't. It is also a commitment to NOT put dependencies where they don't belong, even if they seem fast and harmless now. They **will** bite you. The only question is when. 

Have you ever heard this or an equivalent? <b>"What do you mean we can't sell anything right now because the ads system is down? Who decided this depedency was acceptable? Have you lost your minds?"</b> I have.

> Upon reading the commerce system push example above, some will think, <b>“Of course, and that’s why we use [insert favorite queuing or pub/sub system here].</b>

Not so fast.

Those systems usually come with some of the disadvantages already mentioned earlier in this series:
- differing (and usually lower quality) backup/restore, failover, monitoring, etc. compared to databases
- additional licensing / operational costs
- additional education for engineering staff for building / deploying / debugging using them
- some of them even create their own issues with your choice of more flow-control or out-of-order delivery of related updates
  - Have you ever gotten an update request for a resource that was already deleted, because something went awry with the update? Perhaps there was a problem with it and it got dumped into a dead-letter queue? Then, because queuing sysems treat all messages as atomic (ie. independent) the delete msg showed up, was processed, and screwed up the system.
- Also, on queuing:
  -   Do you need to a new queue every time a new product or team is added to the mix? What if the other team doesn't read from the queue fast enough? Does the queue live in their data center or mine? 
  
<b>This gets messy fast. And, it is completely avoidable.<b>

Part of the epiphany had by the MSFT commerce architecture team (see earlier posts) was that they could avoid both the push pain AND the disadvantages (complexity, cost, less reliability, etc.) that come with adding queuing/pubsub systems to the app mix. 

So how did they do it?

<b>Via the combination of those journaled updates added to the noun services (which we want for other reasons including customer history, auditing, and more), along with the addition of the Journal Reader service that leverages them. </b>

The Journal Reader takes loose-coupled, pull semantics to a new level (and will likely empower you to start uninstalling some things - more on that later).

So, with that context fresh in our minds, let's proceed to actually examine the Journal Reader service in our next chapter.

(Albert never actually said this, but he was right. :) )\
<a href="/assets/img/ChangeThinkingEinstein.jpeg" data-lightbox="PullVsPush"><img src="/assets/img/ChangeThinkingEinstein.jpeg" width="50%" height="50%" /></a>

[Onward! Progress! (Click here)](/blog/2025/On-Microservices-Part6/)


TODO: add pic showing flow-control
