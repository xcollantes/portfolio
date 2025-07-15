/** Applies to all pages. */

import { Container, CssBaseline } from "@mui/material"
import { GoogleAnalytics } from "@next/third-parties/google"
import { Analytics } from "@vercel/analytics/next"
import { SessionProvider } from "next-auth/react"
import { AppProps } from "next/app"
import Head from "next/head"
import { useRouter } from "next/router"
import { useEffect, useRef, useState } from "react"
import { trackNavigation, trackPageView, trackTimeOnPage } from "../components/AnalyticsUtils"
import { LoadingOverlay } from "../components/LoadingOverlay"
import { MOTD } from "../components/MsgOfDay"
import Navbar from "../components/Navbar"
import { Toast } from "../components/Toast"
import { ColorModeProvider } from "../contexts/colorMode"
import { SelectFilterTagContextProvider } from "../contexts/selectFilterTag"
import { ToastProvider } from "../contexts/toastContext"
import "../css/global.css"
import { base } from "../themes/theme"

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
      // Track page view for the new page
      trackPageView(url)
    }

    const handleRouteChangeError = () => {
      setLoading(false)
    }

    // Track initial page load
    if (typeof window !== "undefined") {
      const currentUrl = window.location.pathname + window.location.search
      previousPathRef.current = currentUrl
      trackPageView(currentUrl)
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

  useEffect(() => {
    const handleRouteChange = (url: string) => {
      // Send page view event to Google Analytics
      window.gtag('config', 'G-HB7D403D67', {
        page_path: url,
      });
    };

    router.events.on('routeChangeComplete', handleRouteChange);
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange);
    };
  }, [router.events]);

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
              name="description"
              content="Career works of Xavier Collantes."
            />
            <meta
              name="keywords"
              content="resume,consulting,ai,llm,google,portfolio,career,projects,xavier,collantes"
            />
            <meta name="og:title" content="Xavier Collantes" />
            <meta name="og:image" content="/preview_image/front.jpeg" />

            <GoogleAnalytics gaId="G-HB7D403D67" />

            <title>Xavier Collantes</title>
          </Head>

          <CssBaseline />

          {/* Loading overlay */}
          <LoadingOverlay loading={loading} />

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
            </SelectFilterTagContextProvider>
          </Container>
        </ToastProvider>
      </ColorModeProvider>
    </SessionProvider>
  )
}
