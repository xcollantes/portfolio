/** Analytics tracking specifically for articles. */

import { useRouter } from "next/router"
import { useEffect, useState, useRef } from "react"
import { sendGAEvent } from "@next/third-parties/google"
import { extractUTMParameters, storeUTMParameters, getCurrentUTMParameters } from "../utils/utmUtils"

// Debug mode - set to true to enable console logging
const DEBUG_GA = process.env.NODE_ENV === 'development'

const logDebug = (eventName: string, parameters: any) => {
  if (DEBUG_GA) {
    console.log(`🔍 Article GA4 Event: ${eventName}`, parameters)
  }
}

interface ArticleAnalyticsProps {
  articleId: string
  articleTitle: string
  articleType: string
}

/**
 * Component that tracks article-specific analytics.
 * Tracks:
 * - Article views
 * - Scroll depth
 * - Reading time
 *
 * Place this component at the top of article pages.
 */
export default function ArticleAnalytics({
  articleId,
  articleTitle,
  articleType,
}: ArticleAnalyticsProps) {
  const router = useRouter()
  const startTimeRef = useRef<number>(Date.now())
  const [maxScrollPercentage, setMaxScrollPercentage] = useState<number>(0)

  // Track article view and scroll depth
  useEffect(() => {
    // Extract and store UTM parameters if present
    const utmParams = extractUTMParameters()
    if (Object.keys(utmParams).length > 0) {
      storeUTMParameters(utmParams)
    }

    // Get all UTM parameters (current + stored)
    const allUtmParams = getCurrentUTMParameters()

    // Track initial article view using standard GA4 event with UTM context
    const viewParameters = {
      content_type: 'article',
      content_id: articleId,
      content_title: articleTitle,
      article_type: articleType,
      ...allUtmParams, // Include UTM parameters in the event
    }
    
    logDebug('view_item', viewParameters)
    sendGAEvent("view_item", viewParameters)

    // If UTM parameters are present, send a specific UTM tracking event
    if (Object.keys(allUtmParams).length > 0) {
      const utmTrackingParameters = {
        event_category: 'utm_tracking',
        content_id: articleId,
        content_title: articleTitle,
        ...allUtmParams,
      }
      
      logDebug('utm_page_view', utmTrackingParameters)
      sendGAEvent("utm_page_view", utmTrackingParameters)
    }

    // Track scroll depth
    const handleScroll = () => {
      if (typeof window !== "undefined") {
        const windowHeight = window.innerHeight
        const documentHeight = document.documentElement.scrollHeight
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop

        // Calculate scroll percentage (0-100)
        const scrollPercentage = Math.round(
          (scrollTop / (documentHeight - windowHeight)) * 100
        )

        // Update max scroll percentage if greater than previous
        if (scrollPercentage > maxScrollPercentage) {
          setMaxScrollPercentage(scrollPercentage)
        }
      }
    }

    window.addEventListener("scroll", handleScroll)

    // Cleanup
    return () => {
      window.removeEventListener("scroll", handleScroll)

      // Send final analytics data on unmount using standard GA4 event
      const timeSpentSeconds = Math.round((Date.now() - startTimeRef.current) / 1000)

      // Only track if user spent meaningful time (more than 10 seconds)
      if (timeSpentSeconds >= 10) {
        const engagementParameters = {
          content_type: 'article',
          content_id: articleId,
          engagement_time_msec: timeSpentSeconds * 1000, // GA4 expects milliseconds
          scroll_depth: maxScrollPercentage,
          article_type: articleType,
        }
        
        logDebug('user_engagement', engagementParameters)
        sendGAEvent("user_engagement", engagementParameters)
      }
    }
  }, [articleId, articleTitle, articleType])

  // Reset on route change
  useEffect(() => {
    startTimeRef.current = Date.now()
    setMaxScrollPercentage(0)
  }, [router.asPath])

  // This component doesn't render anything visible
  return null
}