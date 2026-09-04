---
layout: ../../layouts/PostLayout.astro
title: Stability & Predictability
date: 2026-08-04 12:00:00
description: Often understated 'features'
tags: leadership technology
categories: actual-posts
thumbnail: /assets/img/WeakSupports.webp
---
I've been thinking about the value of stability and predictability of late.

Years ago, <b>I worked for a company that (naively) wandered into the field of reputation mgmt</b> with a focus on helping avoid/clean up social media posts that might cause professional damage to one's career. To this end, the team released a feature that was trained to detect and warn about posts that included images containing nudity. 

I'll forego addressing the myriad red flags that pursuing this business should have set off to, instead, address a specific product/technology miss: <b>They did *not* own their own AI models; they just used Google's image recognition.</b>

Then the inevitable happened: Google updated its image recognition training. The sadly hilarious result? 

Shortly after that update, the reputation mgmt product was written up in a widely read software publication for false positive notifications <b>identifying pics of family pets as 'nudity'</b>. 

>"Don't rub that pup's belly! It may torpedo your career!" LOL.

<a href="/assets/img/DogNudity.jpeg"> <img src="/assets/img/DogNudity.jpeg" width="20%" height="20%" /></a>

Fast forward to today's software (your company's software) that leverages LLMs for critical functionality. Even if you have done immense diligence to reduce issues with inconsistent or unpredictable responses, <b>what happens if (read: when) the model you are calling changes? All bets are off, that's what.</b>

And, this is likely a risk in ways that your team may not have intuited. For example:
- are you aware that running the exact same model on different hardware (hello scheduled machine upgrades!) can change the model's behavior and responses?

This is true of cloud-hosted models but also affects your local or personally hosted models that benefit from company-specific training and configurations designed to increase the consistency of their responses.

(Especially) For automation, <b>there is tremendous value in owning models that you have trained, that you host, AND that are *never* allowed to change</b> (including their hosting!) unless done as part of your own release process.

Smart engineers have applied this same sort of discipline to software libraries for decades, both open source and proprietary. So, it should come as no surprise that it is even more important now, with modern AI systems capable of vastly more functionality than traditional libraries.

>Stability and predictability are **brand-protection** features. 
>
>Your customers want them. Your business needs them.

Sometimes the boring part is the most important part.

Be bold, but be smart too.
