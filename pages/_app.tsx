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
import Script from "next/script"

const GOOGLE_ANALYTICS_ID: string = process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID || '';

console.log("STAGE: ", process.env.NODE_ENV)

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps) {
  console.log(MOTD)
  const router = useRouter()
  const isHomePage = router.pathname === "/"
  const [loading, setLoading] = useState(false)

  // Track time spent on page
  const pageLoadTimeRef = useRef<number>(Date.now())
  const previousPathRef = useRef<string>("")

  // Track page views and time spent when route changes
  useEffect(() => {
    const handleRouteChangeStart = (url: string) => {
      setLoading(true)
      const currentPath = router.pathname
      // Record time spent on the previous page before navigating
      const timeSpentSeconds = Math.round((Date.now() - pageLoadTimeRef.current) / 1000)

      if (previousPathRef.current) {
        trackTimeOnPage(previousPathRef.current, timeSpentSeconds)
        trackNavigation(previousPathRef.current, url)
      }

      previousPathRef.current = currentPath
    }

    const handleRouteChangeComplete = (url: string) => {
      setLoading(false)
      // Reset timer for the new page
      pageLoadTimeRef.current = Date.now()
      // Track page view for the new page - delay to ensure GA is loaded
      setTimeout(() => trackPageView(url), 100)
    }

    const handleRouteChangeError = () => {
      setLoading(false)
    }

    // Track initial page load - delay to ensure GA is loaded
    if (typeof window !== "undefined") {
      const currentUrl = window.location.pathname + window.location.search
      previousPathRef.current = currentUrl
      setTimeout(() => trackPageView(currentUrl), 500)
    }

    // Track route changes
    router.events.on("routeChangeStart", handleRouteChangeStart)
    router.events.on("routeChangeComplete", handleRouteChangeComplete)
    router.events.on("routeChangeError", handleRouteChangeError)

    // Cleanup event listeners and track time when component unmounts
    return () => {
      router.events.off("routeChangeStart", handleRouteChangeStart)
      router.events.off("routeChangeComplete", handleRouteChangeComplete)
      router.events.off("routeChangeError", handleRouteChangeError)

      // Track time spent on final page when user leaves the site
      const finalTimeSpent = Math.round((Date.now() - pageLoadTimeRef.current) / 1000)
      if (previousPathRef.current) {
        trackTimeOnPage(previousPathRef.current, finalTimeSpent)
      }
    }
  }, [router])

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
              content="Career works of Xavier Collantes."
            />
            <meta
              name="keywords"
              content="resume,consulting,ai,llm,google,portfolio,career,projects,xavier,collantes"
            />

            {/* Open Graph meta tags for social sharing */}
            <meta key="og:type" property="og:type" content="website" />
            <meta key="og:url" property="og:url" content="https://xaviercollantes.dev" />
            <meta key="og:title" property="og:title" content="Xavier Collantes" />
            <meta key="og:description" property="og:description" content="Career works of Xavier Collantes, Software Engineer, AI specialist, and technical leader with experience at Google and startups." />
            <meta key="og:image" property="og:image" content="https://xaviercollantes.dev/preview_image/front.webp" />
            <meta key="og:image:width" property="og:image:width" content="1200" />
            <meta key="og:image:height" property="og:image:height" content="630" />
            <meta key="og:image:alt" property="og:image:alt" content="Xavier Collantes" />
            <meta key="og:site_name" property="og:site_name" content="Xavier Collantes" />

            {/* Twitter Card meta tags */}
            <meta key="twitter:card" name="twitter:card" content="summary_large_image" />
            <meta key="twitter:title" name="twitter:title" content="Xavier Collantes" />
            <meta key="twitter:description" name="twitter:description" content="Career works of Xavier Collantes, Software Engineer, AI specialist, and technical leader with experience at Google and startups." />
            <meta key="twitter:image" name="twitter:image" content="https://xaviercollantes.dev/preview_image/front.webp" />
            <meta key="twitter:image:alt" name="twitter:image:alt" content="Xavier Collantes" />

            {/* Search Engine Optimization */}
            <link rel="sitemap" type="application/xml" href="/sitemap.xml" />

            <GoogleAnalytics gaId={GOOGLE_ANALYTICS_ID} />
            
            {/* Enhanced GA4 Configuration */}
            <script dangerouslySetInnerHTML={{
              __html: `
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                
                gtag('config', '${GOOGLE_ANALYTICS_ID}', {
                  page_title: document.title,
                  page_location: window.location.href,
                  debug_mode: ${process.env.NODE_ENV === 'development'},
                  send_page_view: true,
                  enhanced_measurement: {
                    scrolls: true,
                    outbound_clicks: true,
                    site_search: true,
                    video_engagement: true,
                    file_downloads: true
                  },
                  allow_ad_personalization_signals: false,
                  anonymize_ip: true,
                  custom_map: {
                    'custom_parameter_1': 'utm_source',
                    'custom_parameter_2': 'utm_medium',
                    'custom_parameter_3': 'utm_campaign'
                  }
                });
              `
            }} />

            <Script src="https://scripts.simpleanalyticscdn.com/latest.js" />

            <Script src="https://metricsloop.com/pixel/ZhNVupdLu2xSZ41u" />

            <title key="title">Xavier Collantes</title>
          </Head>

          <CssBaseline />

          {/* Loading overlay */}
          <LoadingOverlay loading={loading} />

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
