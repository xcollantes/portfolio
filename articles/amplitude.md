---
title: User Metrics With Amplitude And NextJS
cardDescription: Quick guide for getting started with Amplitude and NextJS.
cardPageLink: /articles/amplitude
imagePath: /assets/images/amplitude/heat.gif
articleType: BLOG
author: Xavier Collantes
dateWritten: 2025-08-11
tagIds:
  - amplitude
  - metrics
  - analytics
  - webdev
  - bi
  - user
---

<div style="display: flex; justify-content: center; gap: 20px;">
  <img src="/assets/images/amplitude/amplogo.svg" alt="Amplitude logo" priority="true" />
  <img src="/assets/images/amplitude/new-next.webp" alt="NextJS logo" />
</div>

## Why Are User Analytics Important?

At Google and a couple of the startups I was at, it was extremely important to
understand user metrics because you have to be user focused on every step of
things you build.

To be user focused, you have to ask questions like: what does the user do? What
works with the user? What does not work with the user?

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

## What is Amplitude?

Amplitude is a platform for collecting, analyzing, and acting on user behavior
data.

![Amplitude logo](/assets/images/amplitude/amplitude.gif)

I chose Amplitude because of its simplicity over Google Analytics and its free
features over other competitors like [Umami](https://umami.is/) and
[PostHog](https://posthog.com/).

I found the documentation lacking for NextJS, so I had to dig through the
code to determine how to track events.

## Cool Features

[Autocapture](https://amplitude.com/docs/sdks/analytics/browser/browser-sdk-2#autocapture):
Automatically capture user interactions and page views with a few lines of code.

[Unlimited feature flags](https://amplitude.com/docs/feature-flags/feature-flags-overview):
Create and manage feature flags for your application on Free plan.

[Data retention for 1 year](https://amplitude.com/docs/data-retention/data-retention-overview):
Retain data for 1 year on Free plan. Compared to [Umami's 6
months](https://umami.is/pricing) on Free tier.

[Heatmaps](https://amplitude.com/docs/session-replay/heatmaps): Visualize user
interactions and page views with a heatmap. Available
with the Pro plan.

![Heatmap](/assets/images/amplitude/heat.gif)

## How to Get Started with Amplitude with NextJS

Create an account on [Amplitude](https://amplitude.com/).

Create a new project.

Add the Amplitude script to your website.

For most frameworks, you can use the Amplitude script to track events. There
is a great guide by
[ianduhamel](https://medium.com/@ianduhamel/how-to-implement-amplitude-in-next-js-a-3-step-guide-6803c44ca862)
on how to implement Amplitude in NextJS but I found an easier way with
Amplitude's new
[Autocapture](https://amplitude.com/docs/sdks/analytics/browser/browser-sdk-2#autocapture)
feature.

Here's all you need to do to get started:

In the `_app.tsx` file, add the following code:

```ts
// Specify this in the .env.local file.
const AMPLITUDE_API_KEY = process.env.NEXT_PUBLIC_AMPLITUDE_API_KEY

useEffect(() => {
  init(AMPLITUDE_API_KEY, undefined, {
    autocapture: true,
  })
}, [])
```

You should now be able to see the events in the Amplitude dashboard.

## Further Reading

[How to Implement Amplitude in NextJS: A 3-Step Guide](https://medium.com/@ianduhamel/how-to-implement-amplitude-in-next-js-a-3-step-guide-6803c44ca862)

[Amplitude Docs](https://amplitude.com/docs/sdks/analytics/browser/browser-sdk-2#track-file-downloads)
