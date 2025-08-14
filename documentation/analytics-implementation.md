# Google Analytics Implementation Guide

This document outlines the Google Analytics implementation in the portfolio website to track user visits, page views, and engagement metrics.

## 🚨 TROUBLESHOOTING CHECKLIST

If you're not seeing data in GA4, follow this checklist:

### 1. Quick Verification (2 minutes)
- [ ] Visit `/analytics-test` page in development
- [ ] Open browser DevTools → Network tab
- [ ] Click test buttons and look for requests to `google-analytics.com/g/collect`
- [ ] Check GA4 Real-time reports while testing

### 2. Common Issues & Solutions
- **No real-time data**: Wait 5-10 minutes, GA4 can be delayed
- **No historical data**: GA4 takes 24-48 hours to populate reports
- **Development vs Production**: Ensure GA tracking works on both
- **Ad blockers**: Test with ad blockers disabled
- **Console errors**: Check browser console for GA-related errors

### 3. Debug Mode (Development Only)
- Console logs show all GA events with `🔍 GA4 Event:` prefix
- Debug mode is automatically enabled in development environment

## Implementation Overview

Google Analytics 4 is implemented using the `@next/third-parties/google` library, which provides optimized components for Google Analytics integration.

### Core Setup

The Google Analytics tracking code is initialized in `_app.tsx` with enhanced configuration:

```tsx
<GoogleAnalytics 
  gaId="G-HB7D403D67" 
  dataLayerName="dataLayer"
/>

{/* Enhanced GA4 Configuration */}
<script dangerouslySetInnerHTML={{
  __html: `
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    
    gtag('config', 'G-HB7D403D67', {
      page_title: document.title,
      page_location: window.location.href,
      debug_mode: ${process.env.NODE_ENV === 'development'},
      send_page_view: true,
      enhanced_measurement: true,
      allow_ad_personalization_signals: false,
      anonymize_ip: true
    });
  `
}} />
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

### Standard GA4 Events (Recommended)

- `page_view`: Page visits with enhanced parameters
- `user_engagement`: Time on page, engagement metrics
- `select_content`: UI element interactions  
- `view_item`: Article and content views

### Event Parameters

All events now use GA4-compatible parameters:
- `content_type`: Type of content (article, page, etc.)
- `content_id`: Unique identifier
- `engagement_time_msec`: Time in milliseconds
- `page_path`: Current page path
- `scroll_depth`: Percentage scrolled

### Debug Events (Development Only)

- Console logging enabled with `🔍 GA4 Event:` prefix
- Network request monitoring in DevTools

## Future Enhancements

Potential areas to expand analytics coverage:

1. Track external link clicks
2. Track file downloads
3. Add conversion tracking for key actions
4. Implement enhanced e-commerce tracking if applicable

## Maintenance

### When adding new pages or features:

1. Consider what user interactions should be tracked
2. Use the appropriate utility functions to track them
3. Follow established patterns for consistency
4. Test events in development using browser DevTools

### After GA4 is confirmed working:

1. **Remove test files**: Delete `/pages/analytics-test.tsx`
2. **Production testing**: Verify analytics work on live site
3. **Set up alerts**: Configure GA4 alerts for data anomalies

### Regular Checks:

- Monthly: Review GA4 data quality and completeness
- Quarterly: Audit tracked events for relevance
- After deployments: Verify analytics still work correctly

## Resources

- [Google Analytics 4 Documentation](https://developers.google.com/analytics)
- [@next/third-parties Documentation](https://nextjs.org/docs/app/guides/third-party-libraries)