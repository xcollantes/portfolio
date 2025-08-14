/** Utility functions for Google Analytics and Amplitude tracking. */

import { sendGAEvent } from "@next/third-parties/google"
import { track } from "@amplitude/analytics-browser"
import { getEnvironmentContext, shouldTrackAnalytics } from "./EnvironmentUtils"

// Debug mode - set to true to enable console logging
const DEBUG_GA = process.env.NODE_ENV === 'development'

const logDebug = (eventName: string, parameters: any) => {
  if (DEBUG_GA) {
    console.log(`🔍 GA4 Event: ${eventName}`, parameters)
  }
}

/**
 * Check if Google Analytics is properly initialized
 */
const isGAInitialized = (): boolean => {
  if (typeof window === 'undefined') return false
  
  // Check if gtag is available globally
  const hasGtag = typeof window.gtag !== 'undefined'
  
  // Check if GA dataLayer exists and has been configured
  const hasDataLayer = window.dataLayer && Array.isArray(window.dataLayer) && window.dataLayer.length > 0
  
  // Check if GA config has been set (look for config command in dataLayer)
  const hasConfig = hasDataLayer && window.dataLayer.some(item => 
    Array.isArray(item) && item[0] === 'config'
  )
  
  return hasGtag && hasDataLayer && hasConfig
}

/**
 * Wait for GA to be initialized with retry mechanism
 */
const waitForGA = (callback: () => void, maxRetries: number = 10, delay: number = 100): void => {
  if (isGAInitialized()) {
    callback()
    return
  }
  
  if (maxRetries <= 0) {
    if (DEBUG_GA) {
      console.log('🔍 GA: Max retries reached, skipping event')
    }
    return
  }
  
  setTimeout(() => {
    waitForGA(callback, maxRetries - 1, delay)
  }, delay)
}

/**
 * Track a page view in Google Analytics.
 * @param url The page URL to track
 * @param title The page title
 */
export const trackPageView = (url: string, title?: string) => {
  if (!isGAInitialized()) {
    logDebug('page_view', 'GA not initialized, skipping event')
    return
  }

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
  if (!isGAInitialized()) {
    logDebug('select_content', 'GA not initialized, skipping event')
    return
  }

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
  if (!isGAInitialized()) {
    logDebug('navigation', 'GA not initialized, skipping event')
    return
  }

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
  
  if (!isGAInitialized()) {
    logDebug('user_engagement', 'GA not initialized, skipping event')
    return
  }
  
  const parameters = {
    engagement_time_msec: timeInSeconds * 1000, // GA4 expects milliseconds
    page_path: pageUrl,
  }
  
  logDebug('user_engagement', parameters)
  sendGAEvent("user_engagement", parameters)
}

// Amplitude-specific tracking functions

/**
 * Track Amplitude event with automatic environment context.
 * @param eventName Name of the event
 * @param eventProperties Additional properties for the event
 */
export const trackAmplitudeEvent = (eventName: string, eventProperties: any = {}) => {
  if (!shouldTrackAnalytics()) {
    console.log(`Amplitude tracking skipped for event: ${eventName} (environment filter)`)
    return
  }

  const environmentContext = getEnvironmentContext()
  const enrichedProperties = {
    ...eventProperties,
    ...environmentContext
  }

  track(eventName, enrichedProperties)
  
  if (process.env.NODE_ENV === 'development') {
    console.log(`🎯 Amplitude Event: ${eventName}`, enrichedProperties)
  }
}

/**
 * Track page view in Amplitude with environment context.
 * @param url The page URL
 * @param title The page title
 */
export const trackAmplitudePageView = (url: string, title?: string) => {
  trackAmplitudeEvent('Page View', {
    page_path: url,
    page_title: title || (typeof document !== 'undefined' ? document.title : 'Unknown'),
    page_location: typeof window !== 'undefined' ? window.location.href : url,
  })
}

/**
 * Track user interaction in Amplitude with environment context.
 * @param action The action type (e.g., 'click', 'submit')
 * @param element Element that was interacted with
 * @param category Optional category for grouping events
 */
export const trackAmplitudeInteraction = (
  action: string,
  element: string,
  category: string = "user_interaction"
) => {
  trackAmplitudeEvent('User Interaction', {
    action,
    element,
    category,
  })
}

/**
 * Track article engagement in Amplitude.
 * @param articleId The article identifier
 * @param action The engagement action (e.g., 'view', 'share', 'time_spent')
 * @param value Optional numeric value (e.g., time in seconds)
 */
export const trackArticleEngagement = (
  articleId: string,
  action: string,
  value?: number
) => {
  trackAmplitudeEvent('Article Engagement', {
    article_id: articleId,
    action,
    ...(value !== undefined && { value }),
  })
}