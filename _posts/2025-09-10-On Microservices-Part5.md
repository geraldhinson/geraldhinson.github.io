---
layout: post
title: On Microservices (Chapter 5 - Journal Reader Services)
date: 2025-09-10 12:00:00
description: The third of four service types
tags: leadershipy technologyy
categories: actual-posty
thumbnail: assets/img/TheMegVsContainerShip.jpeg
---
### 3 of 4 - Query Services
<br>
For reference, the 4 service types were:

- Noun
- Query
- Journal Reader
- Verb

This chapter will examine the second.

<b>— Query Services —</b>

Given the radical simplification of noun services, the obvious next type of service to discuss is the query service.

So, if all of the filtered GET logic has been unceremoniously ripped out of noun services, where does it go? Obviously, it is needed. And, I mentioned in the last chapter it was relocated.

The query service was the destination.

But, it didn't just get relocated. It was also refactored into a completely different form - a better form. Change can be a good thing! So, don't be like those Sweeney haters, all 12% of them. 

<a href="/assets/img/Sweeney.jpeg" data-lightbox="QueriesService"><img src="/assets/img/Sweeney.jpeg" width="30%" height="30%" /></a>

Like Sweeney's ad, this particular change hails back to the era of bell bottom jeans and relational database gateways. (I bet you didn't expect to see Sweeney in a microservices write-up! LOL. I couldn't resist. Maybe I should find a way to use "Cracker Barrel" too.)

The query service is a write-once-and-reuse service (or library) that can be instantiated as many times as are useful in (or across) orgs. 

>The realization reached by the journaled microservice architecture team was this: 
><br><br>
>— There is rarely a need for custom database query logic to live in app code, nor for it to be executed on the same servers servicing OLTP traffic. This logic is a prime candidate to be relocated, standardized (read: written once), and driven via configured mappings. Savings all around!

At a high level, the query service is dead simple: It accepts HTTP GET calls in familiar URL form and replies with JSON results.

(NOTE: I refer to JSON throughout this writeup because of its current popularity. But the patterns discussed here work equally well with any other representation and serialization strategy.)

Let's examine this in more detail to see what is going on <i>'under the hood'</i>.

A typical call to a query service might look like:  

<b> https://[hostname]/v1/queries/employees/getEmployeesByBranchId?branchId=4bcc85f2-8a2d-4a6b-be4f-b2293b4fd295</b>

The corresponding HTTP response? A JSON array containing the employees referenced by the branchId. Something along these lines:

```
[
  {
    "id": "EMP001",
    "firstName": "John",
    "lastName": "Doe",
    "position": "Software Engineer",
    "department": "Engineering",
    "email": "john.doe@example.com"
  },
  {
    "id": "EMP002",
    "firstName": "Jane",
    "lastName": "Smith",
    "position": "Project Manager",
    "department": "Operations",
    "email": "jane.smith@example.com"
  },
  {
    "id": "EMP003",
    "firstName": "Peter",
    "lastName": "Jones",
    "position": "UX Designer",
    "department": "Design",
    "email": "peter.jones@example.com"
  }
]
```

Internal to the query service are:

- a ‘canned’ (read: predefined) set of queries / stored-procs that are mapped to the API-exposed (ie. URL-form) queries

- Generic logic to:
  — Do plan creation (and parameter binding) on query service startup
  — Llsten for incoming queries
  — Query execution with URL-to-SQL parameter substitution (SQL-injection safe! Secured. Parameter counts and type validated)
  — Writing of responses with conversion of DB results into JSON responses
  - Monitor query execution times with appropriate logging/notifications for excessive execution times
<br><br>
Centralizing queries to a service of this nature has numerous attendant benefits:

- HUGE time saved through the elimination of writing/maintaining custom DB code spanning many services

- Provisioning for read workloads (no writes) can be quite beneficial. Ops love!
  - Query services can (sometimes even) be instantiated to read from DB replicas that have less load and which never interfere with OLTP traffic - like taking orders from customers.

- Query Services can be leveraged in cloud or on-prem, etc. or to enable calls between.

- Relocation of app queries to a common focal point (read: gateway) enables DB experts to review all queries for proper indexing/performance. NOTE: I'd recommend keeping the defined queries and URL-mappings in GitHub-managed files (versus putting them into a DB table). It is more secure and provides for both review and history/audit.

- Provides a central, bird’s eye view of how data is being used by apps

- Is typically simpler than GraphQL and <b>often eliminates the need for GraphQL entirely</b>


Adding new (query) functionality for filtered GETs to the query service can be as simple as:

<b>Step 1 - Create the underlying query </b> 
- Create the query and/or stored proc that will be used to retrieve the data. Check plan generation details for it against a production-populated table (ie. a table with ‘real’ rows of content vs one mostly empty. Otherwise, the plan generated may surprise you!) Test run it to ensure it is safe/performant. 

This is where to leverage your DB experts, if not for creation, then definitely for review.

<b>Step 2 - Map the new, underlying query so it can be used </b> 
- Define a new query service exposed query mapping (URL-to-SQL) with any associated parameters that must be passed to execute it. This is typically done in a resource file that is part of a given query service’s project. I’ve also seen this broken into separate files - one for public queries and another for secured queries.

A simplistic mapping for the URL example above might look like this (please don’t use “select * ” in a real system - ha):

```
  {
    "enabled": true,
    "serviceName": “employees”,
    "methodName": "getEmployeesByBranchId",
    "query": "select * from Employees where branchId = {branchId}”,
    "queryParameters": [
      {
        "name": “branchId”,
        "type": "STRING"
      }
    ]
  },
```

(For reference, here is the matching URL call that matches the mapping just defined (copied from above):
 
<b> https://[hostname]/v1/queries/employees/getEmployeesByBranchId?branchId=4bcc85f2-8a2d-4a6b-be4f-b2293b4fd295</b>

)

Such an entry simply serves to enable translation from an incoming URL to the underlying SQL call that will get executed. The “select” shown above could just as easily have been a call to a stored procedure defined in the relational DB.

<a href="/assets/img/NounWithQueryService.png" data-lightbox="QueriesService"><img src="/assets/img/NounWithQueryService.png" width="100%" height="100%" /></a>

Summary:

The query service is a small, reusable piece of code that eliminates the need to write app-level DB code for retrieving app data. Leveraging the query service pattern enables building apps far more quickly - and makes them safer. 

In my experience, building this service usually takes about 2 weeks, and then it is reused with minor changes only for the next several years spanning apps and teams. In my teams, it has also become a powerful tutorial for up-and-coming junior engineers seeking to understand the nuances of writing database code that is both fast and safe.

<b><i>I’ve seen app code size reduced by > 50% using this pattern. Now multiply that by however many apps your org builds/maintains?</i></b>

<b>That is some serious ROI</b>. When was the last time you had the opportunity to invest 2 weeks (heck, make it a month!) of one good developer’s time for such an enormous return on investment?

To quote that little goblin who hangs out in Booty Bay in World of Warcraft: Time is money, friend!
<a href="/assets/img/TimeIsMoneyFriend.jpeg" data-lightbox="QueriesService"><img src="/assets/img/TimeIsMoneyFriend.jpeg" width="30%" height="30%" /></a>

Our Next chapter explores the Journal Reader Service.

See you there!

————
(Part #5 - Microservices)

Continuing the 4 service types discussion:

- Noun
- Query
- Journal Reader
- Verb

— Journal Reader Services —

So far we’ve changed noun services to journaled services and removed costly-to-write (and injection prone) custom DB code from them. We’ve replaced the remaining DB writes in those nouns with a standard resource library that handles that and also implements optimistic locking. And, the removed DB query logic was replaced with a query service that replaces custom app code with a data-driven, config approach.

But, how does the data get from the noun services to the underlying data lakes/ponds that the query service pulls from?

This scenario (and a few others) brings us to the realm of the Journal Reader service.

But prior to discussing that specific scenario, let’s zoom out and first talk about tight / loose couplings between different apps or parts of an app.

A common mistake made in app design is to use ‘push’ when the model should be ‘pull’. This happens in lots of different types of apps, but to illustrate, I’ll pick on commerce systems.

The problematic pattern typically manifests as such:

- a customer submits an order with payment to a commerce system
- the order contains multiple products / services (e.g. a domain, an SSL certificate, a website, a business line, etc.) each of which are provided by downstream product teams
- the commerce system calls the downstream systems on an API to kick off customer provisioning in each

This is a “push” model.

There are problems with this. Specifically:
- Errors flow in the wrong direction. 
  If a downstream system is down, throws an exception, etc. The error flows back to the caller, in this case, the commerce system, which is almost guaranteed to NOT be able to resolve the issue.

- Push processing can be flow-controlled by slow/failing/completely-down downstream systems. This is the classic “no one is allowed to move faster than the slowest kid in the class” problem.

Said differently, *push* is a tight-coupled pattern that should usually be reserved for communicating with services controlled and maintained by a single group. And, even within this smaller, more controlled context, it is still a bad idea to use “push” for communication between loosely-coupled app logic. For example, in a commerce system, while we *do* block completing an order until payment is confirmed, there is no need to order completion on the creation of a subscription (which is used to bill later).

“Push” is a great match for tight-coupled logic. “Pull” is usually better for loose-coupled activity. 

Upon reading this, some will think, “of course, and that’s why we use [insert favorite queuing or pub/sub system here].

Not so fast.

Those systems usually come with some of the disadvantages already mentioned earlier in this series:
- differing (and usually lower quality) backup/restore, failover, monitoring, etc. compared to databases
- additional licensing / operational costs
- additional education for engineering staff for building / deploying / debugging using them
- some of them even create their own issues with your choice of more flow-control or out-of-order delivery of related updates

Part of the epiphany had by the MSFT commerce architecture team (see earlier posts) was that they could avoid both the push pain AND the complexities/disadvantages that come with adding queuing/pubsub systems to the app mix. 

The combination of those journaled updates added to the noun services, along with the addition of the Journal Reader service that leverages them, is how they achieved this.

(word limit - con't in Part #6)
(need image)

————
(Part #6 - Microservices)

Continuing the 4 service types discussion:

- Noun
- Query
- Journal Reader
- Verb

— Journal Reader Services (cont.) —

At a high level, the Journal Reader service does this:

The PULL
- calls a noun service with a simple GET call to retrieve any entries appended to that noun’s journal table that are yet unprocessed (by this journal reader). Some crucial points here:
— Every Journal Reader manages (persists) its own highest, last-read entry from a noun’s ournal. 
— This is easy to do because the journal tables include a monotonically increasing integer column that is incremented by the database on insert.
— The PULL (aka GET call) requests a batch of entries starting with the last processed entry as known by the Journal Reader (ie. itself)

The PROCESSING
- for each new entry retrieved (remember these are literally just the full, versioned JSON resulting from each update made to a given resource owned by a noun serivce), the Journal Reader makes a call to a list of pre-configured Journal Reader Processors
— Journal Reader processors are simple callable routines that expose a common API used by the journal reader to hand them a journaled entry. Their job is simple: process the entry successfully or return an error / exception for any entry they cannot
— Journal Reader processors are commonly used to call other downstream services, populate data lakes/ponds, etc.
— (A lower-level detail) Journal Reader processors run in a set of n (configured number) tasks that are spawned by the Journal Reader. Journaled resource entries being processed are divided up between the tasks using a consistent hashing algorithm to ensure that all updates for a given resource are processed in order.
—When all entries have been processed, the Journal Reader clock is transactionally updated to be the highest ‘clock’ processed so that the next PULL can begin.

The STRUCTURED FAILURE PROCESSING
- for any entry not processed successfully by a journal reader processor, the Journal Reader will insert the same into a ‘Quarantined’ table preserving all of: the unprocessed journal entry, the processor that failed to process it, and the error returned (ie. why it failed) by that processor. But, this is not a typical (lame) dead-letter queue like many modern queuing systems support:
— Any subsequent journal entry sharing the same id of a resource currently in the Quarantined table will also be placed into the Quaratined table to prevent processing later versions of a resource out-of-order.
— The Journal Reader has a separate background thread(s) that retries (ie. calls the failing journal reader processor again) entries currently in the Quarantined table on the assumption that the problem causing the error will be resolved. 

Some will now say “that sounds like lambda or [insert favorite cloud function here].

Keep reading to see why you, like us, may end up strongly preferring this model over lambdas and the like.

(word limit - con't in Part #7)
(need image)
————

————
(Part #7 - Microservices)

Continuing the 4 service types discussion:

- Noun
- Query
- Journal Reader
- Verb

— Journal Reader Services (cont.) —

[from the previous post]

Some may say, “this journal reader / journal reader processor model sounds just like lambdas or [insert favorite cloud function here].

But, upon examination, the journal reader models offers a lot more in terms of benefits:

- The quarantine error recording & recovery semantic is stronger

- The preservation of the order of updates to a resource is significant

- Each downstream or loose-coupled system is now pulling at its own pace (both batch size and timeouts) while maintaining its own ‘clock’ for what they have processed so far from a noun’s journal. 
— Customer product provisioners, as mentioned earlier, will typically be aggressive to ensure the customer’s product is available immediately after purchase
— Populators of data lakes that do not require up-to-second data, can be less aggressive and even process the journal off-hours when compute costs are cheaper.

- Journal Readers can be used to pass data across cloud boundaries and/or on-prem data centers. Hybrid cloud, anyone? 

- Loose-coupled systems using journal readers can now be taken down for maintenance without forcing flow-control issues upstream, like were seen in the ‘push’ architecture model

- Again, all persistence is still wholly contained in a relational database model. 
— Simple backup/restore/failover/monitoring is still maintained 
— Ops expertise/dev team expertise and licensing are all cheaper
— Less moving parts means overall up-times are better.

The combination of Noun services having journals along with n loose-coupled Journal Readers pulling from those journals at their own pace to either call other services or populate data lakes/ponds that in turn have query services installed in front of them listening for and answering queries issued from… 

Are you seeing it? This simple pattern is quite powerful. 

Tight-coupled services just call each other directly to accomplish a shared goal.
— Example: Front-end calls the Orders noun to make a purchase. Orders calls Billing which calls Payments to charge a credit card. We block the front-end until the money is taken. Tight-coupled calls.

Loose-coupled services leverage Journal Readers to pull from Journals. Those pulling should pull at their own pace, maintain their own context (pulled-so-far), and (yea, verily) never affect others who are also pulling.
— Example: An Orders Journal Reader pulls from the Orders service’s journal. For every new order created that has successfully been billed (ie. funded), the Orders Journal Reader calls the Subscription Service (another noun service) to POST (ie. create) a new subscription. The subscription created is used to drive ongoing billing. That same Orders Journal Reader might also call an Entitlements Service (noun) to create a new Entitlement that indicates a customer is authorized to use a product. Other journal readers in downstream product teams likely pull from either the Orders service journal or the Entitlements service journal to know when they need to provision the products they support for the same customer. And so on. 

—(ADVANCED NOTE: a Journal Reader can just as happily pull journaled entries from a limited view of a noun’s journal that is (e.g.) accessible via a query service. I’ll just sneak that little tidbit in here for those paying close attention. After all, the Journal Reader logic is just doing a GET to whatever service its config indicates it should call. Tthat configured service just needs to return journaled entries in order. It doesn’t technically have to be pulling from a noun service directly. It can be any service that returns the right payload in the right order. This flexibility is great for limiting access when needed and for other scenarios, too. We can discuss more directly if anyone so desires.) 

Here’s a nice realization to enjoy: We found that the mix of these simple services eradicated our need for both pub/sub and queuing systems. And, the cloud functions? Those worked better as Journal Reader processors. 

Part of the magic found in the journaled services architecture was their realization: We know we are going to have relational databases in the mix. That is a given. How far can we push *only* having those vs all of these other systems that raise both complexity and risk of downtime? 

The answer, as it turns out, is still “pretty dang far”.

(word limit - con't in Part #8)
(need image)
————
(Part #8 - Microservices)

Continuing the 4 service types discussion:

- Noun
- Query
- Journal Reader
- Verb

— Verb Services —

The last of the 4 service types yet to be discussed is Verb Services.

Verb services mostly exist to expose simplified APIs. Here is an example from the world of commerce (I’m keep illustrating using commerce because that domain is so familiar to most.):

Let’s say you have all of:
- a product catalog (what you sell with pricing rules)
- a recommendation system (creates up-sell/cross-sell recommendations for customers based on purchase history, where they live, etc.) 
- a discount system (creates discounts for buyers based on loyalty plan memberships, etc.)

It is common to make each of these into separate services that can be used standalone. It can also be wise to establish differing SLAs (service level agreements) for each. For example, perhaps the product catalog and the discount system must ALWAYS be available to enable sales. But your business might not be willing to block potential sales just because the recommendation system is down or slow. 

Having a verb service sitting in front of all three can be simplifying, a la:

1) It offers a single API for front-end apps to call that intercedes with the 3 services behind it to produce a single result containing a fully priced and discounted offer, along with an optional set of recommendations for up/cross selling as well.
2) The verb service does the fanout calling of the background services in whatever order makes sense.
3) The verb service knows how to combine the results into a nicely formatted response for the front-end caller
4) The verb service knows that it does not have to wait for the recommendations response if, for some reason, that response is slow
5) None of the backend services called by the verb service need to call each other or even know the others exist.
6) It is faster and simpler to do the multiple calls from a verb service than from the front-end

Verb services can also be used to coordinate updates spanning multiple backend services. A version of this is a verb service offering a single interface that, when called, makes multiple backend calls to do related updates..

This pattern can be extended to add protections not found in backend systems (e.g. legacy code). 

For example, a verb service could expose an API that offers idempotent updates (double call protection) in front of multiple services that do not implement idempotency. A contrived example to illustrate this might be a debit in one system followed by a credit in another. Having a verb service sitting between a caller and multiple backends that need to be updated in sync, and which helps prevent mismatched updates, can reduce system headaches in a big way.

Another common use of verb services is to build API (or protocol) translators that bridge between disparate systems. The world of B2B APIs often requires such.

And, that’s pretty much the extent of verb services. Very useful, but also simple.

It also completes the discussion of the four type of services in the Journaled Microservice architecture.

But before I summarize:

Have you noticed that the entire journaled services model requires *absolutely nothing* that is only available from cloud vendors? 

Being cloud-agnostic is empowering for *your* company, not the rich cloud vendors. Perhaps this is why none of them offer something this simple? LOL. I’m no conspiracy theorist, but it should be clear by now that the journaled microservice model helps you spend less money on cloud services and avoids lock-in with any particular cloud vendor or usage of the cloud at all.  Want to run it all in your on-prem data center? Go for it.

This cloud-agnosticism goal was not a concern for the original MSFT team (since they had Azure), but for many of us who subsequently used it outside of MSFT, it definitely was a goal, and staying true to that goal has been highly empowering.

I've run entire apps composed of multiple services built using the journaled services model on a laptop. For testing, I've configured services spanning my laptop, on-prem, and cloud services (all working together). The point is that *you* have control to do whatever makes sense for you.

Ok, now for that summary.

(word limit - con't in Part #9)
(need image)
————

————
(Part #10 - Microservices)

Epilogue!

I began this discussion with a couple of goals: 1) to challenge how microservices are often characterized and (mis)understood and 2) to describe the journaled microservices pattern given its unique power, flexibility, and simplicity. 

Early on, I compared microservices along numerous axes to a couple of monoliths I have helped replace with microservices. In both of those two cases, the monoliths were much harder to understand, update, maintain, and monitor. And they were slower.

My point was less about monoliths (chill out, monolithians) and more to dissuade drawing conclusions based on misplaced assumptions about microservices. Microservice systems can be simpler and faster to build, and they can also be faster for many scenarios. 

Thoughts to consider:
- Have you considered that a call to a well-written microservice should compare favorably in terms of request/response time to a call between your app and a database? If it doesn’t, someone probably did a bad job building it.

- Have you also considered how CPU-expensive all of the ORM serialization/shredding logic is? 
—When every (PUT/POST) object write is updating multiple tables (and associated indexes) and every (GET) object read invokes the inverse logic required to reconstitute the same object from those same tables&indexes, with corresponding joins; this is an expensive use of your most costly, must-stay-up, OLTP hosting machines. 
— Add to that any filtered GET query logic running on those very same machines because it got jammed into the same app logic. Monoliths have enough trouble scaling up already. Why make it worse?
— The journaled nouns write to two tables on a write, read from one table on a GET. And they offload filtered queries to designated (and often far cheaper) machines that don’t burn your precious OLTP CPU at all.

- The MSFT commerce team worried a lot about scale because in their world, those infamous Super-Bowl Sunday load spikes were not just theoretical. It was, in part, failures from such that made them so passionate about NOT having to deal with multi-product failovers/backups/restores. Differing policies and semantics spanning products had resulted in out-of-sync data and/or long restore times - and, even then, manual cleanup was usually required.
— In that context, using only a relational DB in the journaled service model was a very attractive simplification
— But they also needed to confirm that the journaled microservice model could scale. To that end, they load tested their new model app in excess of 800 updates (PUT/POST) per second, which was more than 3x the highest load anyone had ever seen from a Super Bowl type of spike.

After pushing a bit of real-world truth about microservices, I then retold the journaled microservices origin story. This story has been shared many times in the past verbally, but to my knowledge, it has never been written down for broader consumption.

That story is about a group of experienced, open-minded engineers who dared to ask hard questions about common practices in building applications, and to creatively consider alternatives - always a good thing. 

I didn’t spend much time discussing the background of that team. 

But the fact that it was composed of engineers with backgrounds spanning building databases, operating systems, compilers, and distributed computing frameworks - in addition to a wealth of experience building distributed apps using all of the same - contributed to their willingness to question as well as to their epiphany for the journaled microservices architecture. (Personal anecdote: I was invited to join my friends/colleagues on that same team, but after 20+ years focused on distributed computing frameworks and databases, I was more enamored with building games for kids at the time. We all had fun. No regrets!)

Over the years, the journaled microservice architecture spread across several companies as engineers from the original team went their separate ways. The “I can’t believe it’s this simple” epiphany by that original architecture team - that four simple primitives could be used to build almost any application - has stood the test of time well.

Some nice evolution has occurred as well. What began as patterns and templates in that MSFT commerce team has evolved a lot since. (Having exorcised (mostly) my game-dev demons by then, I did get to help with that!) 

I shared a coffee with a brilliant friend from that original team a while back (who was also in my dev team that built reliable messaging into the SQL Server prior. Hi, Ivan!). One of his most poignant comments over coffee that day was, “The biggest mistake we made was in not standardizing the patterns into implementations for everyone to share.”

I had repeated that mistake once myself - particularly on the Journal Reader. Per his warning and our mutual pain, libraries and default implementations were created in subsequent instantiations. Much of what I have written about here is based on those implementations, including:

1) The resource library used by noun services to handle all DB calls accessing the ‘resource’ and ‘journal’ tables. Two versions of this library have implemented optimistic locking. One even added sophisticated support for idempotency.

2) The query service library that implements support for translating simple REST GETs with URLs into relational DB calls with JSON responses. The first stored the canned queries and mapping in a DB table. The second replaced that with a simple resource file, versioned via Github checkins, and pushed to prod via modern CI/CD. I strongly prefer the latter.

3) The journal reader library that implements loose-coupled pull semantics while maintaining its own ‘clock’, quarantine/retry, and with support for spreading the work (to process the journaled entries) across n tasks using consistent hashing to guarantee resource updates are processed in order. 

(Other innovations not discussed here exist in the wild as well. Examples include: a batch scheduler that runs jobs based on multiple, pre-defined conditions having been met, a full B2C chat product, etc.. Be creative!)

Hopefully, this missive, er, discussion has intrigued or inspired you to consider possibilities. Things like:

- It is possible to build sophisticated, scalable applications from simple primitives.
- It is possible to build sophisticated, scalable applications that are cloud agnostic (or cloud-free).
- It is possible to build sophisticated, scalable applications using zero (or very few) licensed technologies.
- It is possible to build sophisticated, scalable applications from microservices just as quickly (sometimes more quickly) as using other approaches.

The primary predictor of success for building apps can, in my experience, be distilled to whether those building the apps know the answers to simple questions like:

- Do you know what the nouns are in your system? 
- Do you know what actions will be done to the nouns? 
- Do you know the actors and the minimal nouns/actions surface area that they need to use?
(Wait, are we saying that great apps should be based on well-defined, simple primitives too? Yep.)

For extra points, I might add:
- Do you know where failures fail back to in your system? And, how recovery occurs at those points? 
- Does your design formalize this? Or, are you just hoping for the best?

Basics still matter and, surprise, knowing those same answers brilliantly enables the creation of a microservice-based application.

BIG Bonus: By pursuing this simple path up front, you will likely *not* be required to undertake a painful rewrite to address scale issues just as your company is hitting its stride. If you’re lucky, your competitors were less wise.

That said, without doubt, many of you are currently facing such a rewrite and were likely brought on board to deal with it. (Almost all of my roles have included such a challenge), If that describes your reality, consider incrementally replacing legacy functionality with calls to microservices that do a modern equivalent. And, stay true to principles like: “It is OK for old to call new, but new should NOT call old.” 

This sort of RIPieces strategy has been used by many who have gone before you to replace systems that needed to keep running while being rewritten. Busting up a legacy monolith into microservices will likely serve you well. And, it is FAR less dangerous than trying to flash cut from legacy to new in one fell swoop. The history of computing is littered with failures that took that approach.

Thank you for coming along for this reading extravaganza!

If the world of computing I have described herein appeals to you, but still feels a bit out of reach for you or for those you employ, feel free to reach out. Perhaps I can help. 

As always, I can be reached via my blog email - geraldthusfar at [that well-known email service from Google]. 

Blessings and happy computing, folks!

-Gerald

(word limit - con't in Part #10)
(need image)
————



————
Points not made yet:
- consistent hashing to spread load while maintaining resource processing ordere in the journal reader

- talk about serialization and point out that with this model the serialization, writes (both tables and indexes), transactions is greatly reduced when just storing JSon in a column. And this is often more expensive than serialization to send a message to another service… and.. when your latency to service is the same as the latency to your DB… and you have LESS work going on due to the elimination of ORM serialization, multi-table writes, multi-table joins, index updates… OK, now what is more expensive?

- basing all persistence on a simple relational DB model provided best-case semantics for failover, backup/restore, monitoring, etc. It also made running all or partial systems on-prem or even on local, dev machines doable. And, it played to the strengths of OPS teams - both their priorities and their expertise. Not to mention it simplified the lives of OPS teams as well.
— plus it’s almost a given that you will have a relational DB in the mix, so being able to start there vs adding an additional model that may not be needed is simplifying and cheaper

- Loose-coupled systems should Pull and maintain their own context.

- Push is tight-coupled:
  - errors flow the wrong direction - to the wrong team
  - flow-control happens - when working never faster than slowest kid in the class. when not working, down system can prevent delivery to all others

- Microservice benefits:
— perfect for incremental replacement of legacy systems (RIPieces strategy)
— simple code base with narrow focus simpler to:
—— maintain, scale, monitor, version, update independently, allow cooperative coding, host in separate locations (cloud / on-prem)

- What are the nouns? What are the actions? Who are the Actors? What is the minimal surface area that each need to interact with?

- Optimistic locking

- doing controlled writes via the resource library  and ‘shredded’ writes in a journal reader processor reduces the dangers of SQL injection

- Where do failures get caught? What is the recovery mechanism? How easy is it to use/build? 
— Idempotency in journal processors. Idempotency in services. 

Two other interesting built-in facets of these services were:
- support for optimistic locking
- support for idempotent calls
While incredibly useful, discussion of both of these can wait.




-Gerald (thus far)
