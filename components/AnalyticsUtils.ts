/** Utility functions for Google Analytics tracking. */

import { sendGAEvent } from "@next/third-parties/google"

// Debug mode - set to true to enable console logging
const DEBUG_GA = process.env.NODE_ENV === 'development'

const logDebug = (eventName: string, parameters: any) => {
  if (DEBUG_GA) {
    console.log(`🔍 GA4 Event: ${eventName}`, parameters)
  }
}

/**
 * Track a page view in Google Analytics.
 * @param url The page URL to track
 * @param title The page title
 */
export const trackPageView = (url: string, title?: string) => {
  const parameters = {
    page_path: url,
    page_title: title || (typeof document !== 'undefined' ? document.title : 'Unknown'),
    page_location: typeof window !== 'undefined' ? window.location.href : url,
  }
  
  logDebug('page_view', parameters)
  sendGAEvent("page_view", parameters)
}

/**
 * Track user interaction with a specific element.
 * Uses standard GA4 'select_content' event for better compatibility.
 * @param action The action type (e.g., 'click', 'submit')
 * @param label Descriptive label for the interaction
 * @param category Optional category for grouping events
 */
export const trackUserInteraction = (
  action: string,
  label: string,
  category: string = "user_interaction"
) => {
  const parameters = {
    content_type: category,
    content_id: label,
    custom_action: action,
  }
  
  logDebug('select_content', parameters)
  sendGAEvent("select_content", parameters)
}

/**
 * Track navigation between pages.
 * Uses standard GA4 'page_view' with custom parameters.
 * @param from The starting page
 * @param to The destination page
 */
export const trackNavigation = (from: string, to: string) => {
  const parameters = {
    page_path: to,
    page_location: typeof window !== 'undefined' ? window.location.href : to,
    previous_page: from,
    event_category: 'navigation',
  }
  
  logDebug('navigation', parameters)
  sendGAEvent("page_view", parameters)
}

/**
 * Track time spent on a page when user leaves.
 * Uses standard GA4 'user_engagement' event.
 * @param pageUrl The page URL
 * @param timeInSeconds Time spent in seconds
 */
export const trackTimeOnPage = (pageUrl: string, timeInSeconds: number) => {
  // Only track if user spent meaningful time (more than 5 seconds)
  if (timeInSeconds < 5) return
  
  const parameters = {
    engagement_time_msec: timeInSeconds * 1000, // GA4 expects milliseconds
    page_path: pageUrl,
  }
  
  logDebug('user_engagement', parameters)
  sendGAEvent("user_engagement", parameters)
}