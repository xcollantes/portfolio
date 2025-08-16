/** Applies to all pages. */

import { init } from "@amplitude/analytics-browser"
import { Container, CssBaseline } from "@mui/material"
import { GoogleAnalytics } from "@next/third-parties/google"
import { GoogleTagManager } from '@next/third-parties/google'
import { Analytics } from "@vercel/analytics/next"
import { SessionProvider } from "next-auth/react"
import { AppProps } from "next/app"
import Head from "next/head"
import { useRouter } from "next/router"
import { useEffect, useRef, useState } from "react"
import { trackNavigation, trackPageView, trackTimeOnPage } from "../components/AnalyticsUtils"
import { extractUTMParameters, storeUTMParameters, hasUTMParameters } from "../utils/utmUtils"
import { sendGAEvent } from "@next/third-parties/google"
import { GADebugger } from "../components/GADebugger"
import { LoadingOverlay } from "../components/LoadingOverlay"
import { MOTD } from "../components/MsgOfDay"
import Navbar from "../components/Navbar"
import { Toast } from "../components/Toast"
import { AmplitudeContextProvider } from "../contexts/amplitudeContext"
import { ColorModeProvider } from "../contexts/colorMode"
import { SelectFilterTagContextProvider } from "../contexts/selectFilterTag"
import { ToastProvider } from "../contexts/toastContext"
import "../css/global.css"
import { base } from "../themes/theme"
import { getSiteConfig } from "../config/siteConfig"
import Script from "next/script"

const GOOGLE_ANALYTICS_ID: string = process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID || '';

console.log("STAGE: ", process.env.NODE_ENV)
console.log("GOOGLE_ANALYTICS_ID: ", GOOGLE_ANALYTICS_ID)

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps) {
  console.log(MOTD)
  const router = useRouter()
  const isHomePage = router.pathname === "/"
  const [loading, setLoading] = useState(false)
  const siteConfig = getSiteConfig()

  // Track UTM parameters on app initialization and route changes
  useEffect(() => {
    // Check for UTM parameters on initial load
    if (hasUTMParameters()) {
      const utmParams = extractUTMParameters()
      storeUTMParameters(utmParams)

      // Send UTM tracking event to GA4
      if (GOOGLE_ANALYTICS_ID && Object.keys(utmParams).length > 0) {
        const utmEvent = {
          event_category: 'utm_tracking',
          page_path: router.asPath,
          page_title: document.title,
          ...utmParams,
        }

        console.log('🏷️ Global UTM tracking event:', utmEvent)
        sendGAEvent("utm_app_load", utmEvent)
      }
    }
  }, []) // Run only on initial mount

  // Track route changes for UTM persistence
  useEffect(() => {
    const handleRouteChange = (url: string) => {
      // If this is a new page load with UTM parameters, track it
      if (hasUTMParameters()) {
        const utmParams = extractUTMParameters()
        storeUTMParameters(utmParams)

        if (GOOGLE_ANALYTICS_ID && Object.keys(utmParams).length > 0) {
          const utmEvent = {
            event_category: 'utm_tracking',
            page_path: url,
            ...utmParams,
          }

          console.log('🏷️ Route change UTM tracking:', utmEvent)
          sendGAEvent("utm_route_change", utmEvent)
        }
      }
    }

    router.events.on('routeChangeComplete', handleRouteChange)

    return () => {
      router.events.off('routeChangeComplete', handleRouteChange)
    }
  }, [router])

  // Track time spent on page
  // const pageLoadTimeRef = useRef<number>(Date.now())
  // const previousPathRef = useRef<string>("")

  // Track page views and time spent when route changes
  // useEffect(() => {
  //   const handleRouteChangeStart = (url: string) => {
  //     setLoading(true)
  //     const currentPath = router.pathname
  //     // Record time spent on the previous page before navigating
  //     const timeSpentSeconds = Math.round((Date.now() - pageLoadTimeRef.current) / 1000)

  //     if (previousPathRef.current) {
  //       trackTimeOnPage(previousPathRef.current, timeSpentSeconds)
  //       trackNavigation(previousPathRef.current, url)
  //     }

  //     previousPathRef.current = currentPath
  //   }

  //   const handleRouteChangeComplete = (url: string) => {
  //     setLoading(false)
  //     // Reset timer for the new page
  //     pageLoadTimeRef.current = Date.now()
  //     // Track page view for the new page
  //     trackPageView(url)
  //   }

  //   const handleRouteChangeError = () => {
  //     setLoading(false)
  //   }

  //   // Track initial page load
  //   if (typeof window !== "undefined") {
  //     const currentUrl = window.location.pathname + window.location.search
  //     previousPathRef.current = currentUrl
  //     trackPageView(currentUrl)
  //   }

  //   // Track route changes
  //   router.events.on("routeChangeStart", handleRouteChangeStart)
  //   router.events.on("routeChangeComplete", handleRouteChangeComplete)
  //   router.events.on("routeChangeError", handleRouteChangeError)

  //   // Cleanup event listeners and track time when component unmounts
  //   return () => {
  //     router.events.off("routeChangeStart", handleRouteChangeStart)
  //     router.events.off("routeChangeComplete", handleRouteChangeComplete)
  //     router.events.off("routeChangeError", handleRouteChangeError)

  //     // Track time spent on final page when user leaves the site
  //     const finalTimeSpent = Math.round((Date.now() - pageLoadTimeRef.current) / 1000)
  //     if (previousPathRef.current) {
  //       trackTimeOnPage(previousPathRef.current, finalTimeSpent)
  //     }
  //   }
  // }, [router])

  const navbar = (() => {
    switch (router.pathname) {
      case "/":
        // None.
        return
      case "/recs":
        return <Navbar containerWidth="xl" />
      default:
        return <Navbar containerWidth="md" />
    }
  })();

  return (
    <SessionProvider session={session}>
      <ColorModeProvider theme={base}>
        <ToastProvider>
          <Head>
            <link rel="icon" href="/icons/favicon.ico" />
            <meta
              key="description"
              name="description"
              content={siteConfig.description}
            />
            <meta
              name="keywords"
              content="resume,consulting,ai,llm,google,portfolio,career,projects,xavier,collantes,blog,technical,software,engineering"
            />

            {/* Open Graph meta tags for social sharing */}
            <meta key="og:type" property="og:type" content="website" />
            <meta key="og:url" property="og:url" content={siteConfig.baseUrl} />
            <meta key="og:title" property="og:title" content={siteConfig.title} />
            <meta key="og:description" property="og:description" content={siteConfig.description} />
            <meta key="og:image" property="og:image" content={`${siteConfig.baseUrl}/preview_image/front.webp`} />
            <meta key="og:image:width" property="og:image:width" content="1200" />
            <meta key="og:image:height" property="og:image:height" content="630" />
            <meta key="og:image:alt" property="og:image:alt" content={siteConfig.title} />
            <meta key="og:site_name" property="og:site_name" content={siteConfig.title} />

            {/* Twitter Card meta tags */}
            <meta key="twitter:card" name="twitter:card" content="summary_large_image" />
            <meta key="twitter:title" name="twitter:title" content={siteConfig.title} />
            <meta key="twitter:description" name="twitter:description" content={siteConfig.description} />
            <meta key="twitter:image" name="twitter:image" content={`${siteConfig.baseUrl}/preview_image/front.webp`} />
            <meta key="twitter:image:alt" name="twitter:image:alt" content={siteConfig.title} />

            {/* Search Engine Optimization */}
            <link rel="sitemap" type="application/xml" href="/sitemap.xml" />

            <Script src="https://metricsloop.com/pixel/ZhNVupdLu2xSZ41u" />

            <title key="title">{siteConfig.title}</title>
          </Head>

          <CssBaseline />

          {/* Loading overlay */}
          <LoadingOverlay loading={loading} />

          {/* Google Analytics should be in body, not head */}
          <GoogleAnalytics gaId={GOOGLE_ANALYTICS_ID} />

          <AmplitudeContextProvider>

            {/*
            The navbar is fixed, so we need to account for it when calculating
            the margin top so the page is not covered by the navbar.
          */}
            <Container
              sx={{
                mt: 2,
                pt: !isHomePage ? { xs: 12, sm: 10 } : 0
              }}
              maxWidth="xl"
            >
              <SelectFilterTagContextProvider>
                {navbar}
                <Component {...pageProps} />
                <Toast />
                <Analytics />
                {/* Only show GA Debugger in development */}
                {process.env.NODE_ENV === 'development' && <GADebugger />}
              </SelectFilterTagContextProvider>
            </Container>
          </AmplitudeContextProvider>
        </ToastProvider>
      </ColorModeProvider>
    </SessionProvider>
  )
}
