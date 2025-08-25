/** Hook for tracking user metrics and site visits stored in Firestore. */

import { useEffect, useRef } from 'react'
import { useRouter } from 'next/router'

interface UseUserMetricsOptions {
  enabled?: boolean
  logOnMount?: boolean
}

export function useUserMetrics(options: UseUserMetricsOptions = {}) {
  const { enabled = true, logOnMount = true } = options
  const router = useRouter()
  const loggedPaths = useRef(new Set<string>())

  const logVisit = async (pagePath?: string) => {
    if (!enabled) {
      return
    }

    const currentPath = pagePath || router.asPath
    
    // Don't log the same path multiple times per session
    if (loggedPaths.current.has(currentPath)) {
      return
    }

    try {
      const response = await fetch('/api/user-metrics/log-visit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          pagePath: currentPath
        })
      })

      if (response.ok) {
        const data = await response.json()
        console.log('Visit logged:', data.location, 'for path:', currentPath)
        loggedPaths.current.add(currentPath)
      } else {
        console.warn('Failed to log visit:', response.statusText)
      }
    } catch (error) {
      console.warn('Error logging visit:', error)
    }
  }

  useEffect(() => {
    if (logOnMount && enabled) {
      // Log initial page visit
      const timer = setTimeout(() => {
        logVisit()
      }, 100)

      return () => clearTimeout(timer)
    }
  }, [enabled, logOnMount])

  // Track route changes
  useEffect(() => {
    if (!enabled) return

    const handleRouteChange = (url: string) => {
      logVisit(url)
    }

    router.events.on('routeChangeComplete', handleRouteChange)

    return () => {
      router.events.off('routeChangeComplete', handleRouteChange)
    }
  }, [enabled, router.events])

  return { logVisit }
}