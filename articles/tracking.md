---
title: "User Analytics: Without It, We Leave Our Fate to Chance."
author: Xavier Collantes
cardDescription: Essential tools for tracking user behavior and metrics.
cardPageLink: /articles/tracking
imagePath: /assets/images/tracking/tracking.webp
articleType: BLOG
tagIds:
  - tracking
  - metrics
  - data-science
  - analytics
  - data
  - business
  - bi
---

## Why Are User Analytics Important?

At Google and a couple of the startups I was at, it was extremely important to
understand user metrics because you have to be user focused on every step of
things you build.

To be user focused, you have to ask questions like, what does the user do? What
works with the user? What doesn't work with the user?

> Without user metrics, we are blind.
> Without it, we leave the fate of our world to chance.

## Common Questions To Ask

As part of user focus, these are the common questions to start to ask:

- How many users are using the product?
- How long are users using the product?
- What features are users using? Which do they not use?
- Where are users coming from?
- Which platforms do users use? iOS, Android, Web, MacOS, Windows, etc.

Once the answers are obtained from these questions, it will be clear on next
steps to increase user engagement or product usage.

## What Are The Tools For Tracking User Metrics?

There are a lot of tools for tracking user metrics, but here are some of the most
popular ones:

- [Google Analytics](https://analytics.google.com/)
- [Mixpanel](https://mixpanel.com/)
- [Amplitude](https://amplitude.com/)
- [Heap](https://heap.io/)
- [PostHog](https://posthog.com/)
- [Segment](https://segment.com/)

## Concepts

Let us first dive into concepts found in many of the providers to give us an
understanding of the tools.

### UTM Tags

Urchin Tracking Module (UTM) is a tagging system for tracking clicks and other
user actions on sites. First created by Urchin Software which [Google bought in
2005](https://web.archive.org/web/20161109140133/http://www.siliconbeat.com/entries/2005/03/28/google_buying_web_analytics_company.html)
and turned into [Google Analytics](https://analytics.google.com/).

UTM tags are used by many tools to track user actions on sites.

It works by adding UTM parameters to a URL so analytics tools can attribute where
traffic came from.

```html
https://somewebsite.com?utm_source=google&utm_medium=cpc&utm_campaign=campaign1
```

Main UTM parameters:

- utm_source: Where the traffic is from (platform, referrer)
  - google, twitter
- utm_medium: Marketing channel
  - social, email
- utm_campaign: Name of the marketing campaign
  - launch, summer_sale
- utm_term: Search query
  - ai consulting, technology, shirts
- utm_content: Content of the link
  - banner1, sidebar_link

When a visitor clicks the link, these parameters get passed into analytics tools
so you can see which marketing channels are effective.

**Pros:**

- Simple to implement: Add to URL links
- Many platforms support UTM tracking
- User does not have to log in to track their actions

**Cons:**

- Does not show what users do after clicking the link or for how long
- Users could remove the tags in the URL
- Makes URLs long and unsightly

### Cookies

Cookies are small data files that are stored on a user's device by a website.
