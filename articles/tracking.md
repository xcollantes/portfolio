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

> Without user metrics, we are blind. Without it, we leave the fate of our
> world to chance.

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

There are a lot of tools for tracking user metrics, but here are some of the
most popular ones:

- [Google Analytics](https://analytics.google.com/)
- [Mixpanel](https://mixpanel.com/)
- [Amplitude](https://amplitude.com/)
- [Heap](https://heap.io/)
- [PostHog](https://posthog.com/)
- [Segment](https://segment.com/)

## Testing Methods

1. Create account on the provider.
2. Add the required API code and add it to this portfolio site.
3. Build Vercel deployment in development so it is completely separate from the
   production site at https://xaviercollantes.dev.
4. Click around to generate metrics.

## Concepts

Let us first dive into concepts found in many of the providers to give us an
understanding of the tools.

## UTM Tags

Urchin Tracking Module (UTM) is a tagging system for tracking clicks and other
user actions on sites. First created by Urchin Software which [Google bought in
2005](https://web.archive.org/web/20161109140133/http://www.siliconbeat.com/entries/2005/03/28/google_buying_web_analytics_company.html)
and turned into [Google Analytics](https://analytics.google.com/).

UTM tags are used by many tools to track user actions on sites.

It works by adding UTM parameters to a URL so analytics tools can attribute
where traffic came from.

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

## Cookies

Cookies are small data files stored on a user's device by a website. They enable
persistent tracking across sessions and provide user identification without
requiring login.

**Pros:**

- Persistent tracking across browser sessions
- No user login required
- Widely supported by all analytics platforms
- Can store custom user preferences and data

**Cons:**

- Privacy concerns and regulation compliance (GDPR, CCPA)
- Users can disable or delete cookies
- Third-party cookie blocking by browsers
- Limited storage capacity

## Google Analytics

The most widely used web analytics platform. Free tier provides comprehensive
website traffic analysis, user behavior tracking, and conversion metrics.

### Pricing and scale

**Free version:** 500k monthly sessions, 2-14 months data retention, 25 event
parameters

**GA360 enterprise:** $50,000+ annually for 25M monthly events, real-time data
processing, extended retention

2025 major updates include AI-powered Generated Insights (April 2025), Property
Syncing for enterprise users (June 2025), and enhanced consent management.
google The platform processes data for 14.8 million websites with 41% growth in
GA4 connections this year.

**Best for:** Organizations handling 100k+ monthly sessions requiring

**Pros:**

- Free tier use good for most users
- Plenty of YouTube starter and walkthrough videos
- The most customizable of options on this list

**Cons:**

- Not the most user friendly interface; there's a reason so many YouTube videos
  are made on it
- Need to spend time to understand how to use it

## Mixpanel

Event-based analytics platform focused on user actions and product analytics.
Tracks specific user interactions rather than just page views.

**Pros:**

- Granular event tracking and user journey analysis
- Advanced cohort analysis and retention metrics
- Real-time data processing
- Powerful segmentation capabilities

**Cons:**

- More expensive than Google Analytics
- Steeper learning curve for implementation
- Requires more technical setup
- Limited web analytics compared to product analytics

## Vercel Analytics

Great if you are already using Vercel to deploy your project.

The more simple solution on this list because all you have to do is npm import a
dependency and that's the and only add a few lines of code.

**Pros:**

- Least amount of effort to setup
- Simple setup for Vercel-hosted sites
- Focuses on Core Web Vitals and performance metrics

**Cons:**

- Primarily designed for Vercel ecosystem
- Less detailed user behavior analysis; only can see web vitals and performance
  metrics

## Amplitude

Product analytics platform specializing in user behavior analysis and product
optimization. Strong focus on user journey mapping and retention analysis.

**Pros:**

- Advanced behavioral analytics and user path analysis
- Excellent cohort and retention reporting
- Machine learning-powered insights
- Strong mobile app analytics

**Cons:**

- Expensive for high-volume applications
- Complex setup requiring technical expertise
- Overkill for simple website analytics needs
- Steep learning curve for non-technical users

## PostHog

Open-source product analytics platform with self-hosting options. Combines
analytics, feature flags, and session recordings.

**Pros:**

- Open-source with self-hosting option
- Combines multiple tools (analytics, feature flags, recordings)
- Privacy-focused with data control
- Strong developer-focused features

**Cons:**

- Self-hosting requires infrastructure management
- Smaller community compared to established platforms
- May require more technical resources
- Feature set still evolving

## Segment

Customer data platform that collects, cleans, and routes user data to multiple
analytics tools. Acts as a data pipeline rather than an analytics tool itself.

**Pros:**

- Single implementation sends data to multiple tools
- Data standardization and cleaning capabilities
- Strong developer tools and APIs
- Vendor flexibility - easily switch analytics providers

**Cons:**

- Additional layer adds complexity and cost
- Not an analytics tool itself - requires other platforms
- Can introduce data latency
- Overkill for single analytics tool usage

## Further Reading

https://support.google.com/analytics/answer/9164320?hl=en

https://www.pemavor.com/google-analytics-4-review-whats-new-and-how-to-use-it-for-your-business/
