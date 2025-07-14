# Google Analytics Implementation Guide

This document outlines the Google Analytics implementation in the portfolio website to track user visits, page views, and engagement metrics.

## Implementation Overview

Google Analytics 4 is implemented using the `@next/third-parties/google` library, which provides optimized components for Google Analytics integration.

### Core Setup

The Google Analytics tracking code is initialized in `_app.tsx` using:

```tsx
<GoogleAnalytics gaId="G-HB7D403D67" />
```

## Tracked Metrics

The following metrics are tracked across the website:

### 1. Page Views

- **What**: Records when a user visits any page
- **When**: On initial page load and subsequent route changes
- **Implementation**:
  - Uses the router's `routeChangeComplete` event in `_app.tsx`
  - Sends page path, title, and full URL

### 2. Page Time Spent

- **What**: Records how long a user spends on each page
- **When**: When navigating away from a page or closing the site
- **Implementation**:
  - Measures time between page load and navigation/exit
  - Uses `trackTimeOnPage` utility in `AnalyticsUtils.ts`

### 3. Article Engagement

- **What**: Tracks how users interact with article content
- **When**: During article viewing
- **Implementation**:
  - `ArticleAnalytics.tsx` component added to article pages
  - Tracks initial view, scroll depth, and total reading time

### 4. Navigation Patterns

- **What**: Records how users navigate between pages
- **When**: On page transitions
- **Implementation**:
  - Captures source and destination pages using `trackNavigation`

### 5. Recommendation Interactions

- **What**: Tracks interaction with recommendation entries
- **When**: When expanding/collapsing recommendations or sharing links
- **Implementation**:
  - In `recs.tsx`, records actions like expand, collapse, and share
  - Captures which recommendations are most viewed

## Analytics Utility Functions

Custom utility functions are available in `components/AnalyticsUtils.ts`:

- `trackPageView`: Records page views
- `trackUserInteraction`: Records user interactions with UI elements
- `trackNavigation`: Records navigation between pages
- `trackTimeOnPage`: Records time spent on pages

## Sending Custom Events

To track additional interactions, use the utility functions:

```tsx
// Import the utility
import { trackUserInteraction } from "../components/AnalyticsUtils"

// Track an interaction
trackUserInteraction("button_click", "download_resume", "button")
```

## Viewing Analytics Data

Access your Google Analytics data:

1. Go to the [Google Analytics dashboard](https://analytics.google.com/)
2. Navigate to "Reports" in the sidebar
3. View default reports or create custom ones for specific metrics

## Event Types Reference

### Standard Events

- `page_view`: Page visits
- `navigation`: User moving between pages
- `engagement`: Time on page, scroll depth
- `user_interaction`: UI element interactions

### Custom Events

- `article_view`: Article page loads
- `article_engagement`: Article reading metrics
- `recommendations_page_view`: Recommendations page loads

## Future Enhancements

Potential areas to expand analytics coverage:

1. Track external link clicks
2. Track file downloads
3. Add conversion tracking for key actions
4. Implement enhanced e-commerce tracking if applicable

## Maintenance

When adding new pages or features:

1. Consider what user interactions should be tracked
2. Use the appropriate utility functions to track them
3. Follow established patterns for consistency

## Resources

- [Google Analytics 4 Documentation](https://developers.google.com/analytics)
- [@next/third-parties Documentation](https://nextjs.org/docs/app/guides/third-party-libraries)