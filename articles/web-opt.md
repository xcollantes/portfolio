---
title: NextJS web app optimizations
author: Xavier Collantes
dateWritten: 2024-01-26
cardDescription: Techniques to optimize web applications for NextJS
cardPageLink: "/articles/web-opt"
imagePath: ""
articleType: BLOG
tagIds:
  [
    "typescript",
    "frontend",
    "javascript",
    "react",
    "webdev",
    "design",
    "npm",
    "nextjs",
  ]
---

## Metrics

Large contentful paint - Largest image visible to user when loading a page.

According to the maker of the most popular web application, chances a user will
leave increases 32% when loading of a page goes from 1 second to 3 seconds.

<https://www.thinkwithgoogle.com/marketing-strategies/app-and-mobile/page-load-time-statistics>

Aim to keep your total byte size below 1,600 KiB. This target is based on the
amount of data that can be theoretically downloaded on a 3G connection while
still achieving a Time to Interactive of 10 seconds or less.

<https://developer.chrome.com/docs/lighthouse/performance/total-byte-weight#how-to-reduce-payload-size>

## Chrome Browser DevTools

\# TODO: Lighthouse screenshot

![Image of Lighthouse](/articles/images/web_opt/lighthouse.webp)

### Chrome Devtools: Lighthouse

1. Open Devtools panel
1. Go to Lighthouse
1. Run Analysis

### Chrome Devtools: Performance

1. Open Devtools panel
1. Go to Performance
1. See an analysis of the loading of each page

<https://developer.chrome.com/docs/devtools/network/reference/?utm_source=devtools#timing-explanation>

**Screenshots.**

Capture full size screenshots with the DevTools: Open DevTools > Click on top
right button menu on rendered page > Capture full page screenshot

## NextJS

**NextJS Bundle Analyzer.**

Shows how large the packages are in your deps.

```js
const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: process.env.ANALYZE === "true",
})

/** Listing of domains allows for calls to external source. */
module.exports = withBundleAnalyzer({
  transpilePackages: ["@stripe/firestore-stripe-payments"],
```

## NPM dependencies

**Use depcheck.**

```shell
npm install -g depcheck
npm install -g depcheck typescript
npx depcheck
```

**Use dynamic imports.**

Default NextJS will split code based on components needed for the route.

Use `const BigComponent = dynamic(() => import("../bigcomponent"))` when you
don't need a dependency right away to avoid loading all dependencies.

```js
const ContentForm = dynamic(
  () => import("./components/Content").then((component) => component.Function),
  {
    loading: () => <Loading />,
    ssr: false,
  }
)
```

- Export the non-default component
- Show a loading bar while components load
- Disable Server-side rendering to include only on the client

Dynamic import with ES2020 also works with NextJS: `const Component = (await
import("comp.js")).default`

NOTE: use dynamic importing carefully since there are cases where you don't want
the content to be delayed on loading. For example, a metric used by Google is
LCP which will count the time the largest image becomes renders to the user.

These metrics must not be ignored since a low SEO score from Google means less
likely the page will be showed to users.
