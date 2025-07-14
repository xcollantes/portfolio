/** Analytics tracking specifically for articles. */

import { useRouter } from "next/router"
import { useEffect, useState, useRef } from "react"
import { sendGAEvent } from "@next/third-parties/google"

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
    // Track initial article view
    sendGAEvent("article_view", {
      article_id: articleId,
      article_title: articleTitle,
      article_type: articleType,
    })

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

      // Send final analytics data on unmount
      const timeSpentSeconds = Math.round((Date.now() - startTimeRef.current) / 1000)

      sendGAEvent("article_engagement", {
        article_id: articleId,
        article_title: articleTitle,
        article_type: articleType,
        time_spent_seconds: timeSpentSeconds,
        max_scroll_percentage: maxScrollPercentage,
      })
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