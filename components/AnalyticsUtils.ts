/** Utility functions for Google Analytics tracking. */

import { sendGAEvent } from "@next/third-parties/google"

/**
 * Track a page view in Google Analytics.
 * @param url The page URL to track
 * @param title The page title
 */
export const trackPageView = (url: string, title?: string) => {
  sendGAEvent("page_view", {
    page_path: url,
    page_title: title || document.title,
    page_location: window.location.href,
  })
}

/**
 * Track user interaction with a specific element.
 * @param action The action type (e.g., 'click', 'submit')
 * @param label Descriptive label for the interaction
 * @param category Optional category for grouping events
 */
export const trackUserInteraction = (
  action: string,
  label: string,
  category: string = "user_interaction"
) => {
  sendGAEvent("user_interaction", {
    action,
    label,
    category,
  })
}

/**
 * Track navigation between pages.
 * @param from The starting page
 * @param to The destination page
 */
export const trackNavigation = (from: string, to: string) => {
  sendGAEvent("navigation", {
    from_page: from,
    to_page: to,
  })
}

/**
 * Track time spent on a page when user leaves.
 * @param pageUrl The page URL
 * @param timeInSeconds Time spent in seconds
 */
export const trackTimeOnPage = (pageUrl: string, timeInSeconds: number) => {
  sendGAEvent("engagement", {
    page_url: pageUrl,
    time_on_page: timeInSeconds,
    metric: "time_on_page",
  })
}