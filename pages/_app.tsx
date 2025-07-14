/** Applies to all pages. */

import { Container, CssBaseline } from "@mui/material"
import { GoogleAnalytics } from "@next/third-parties/google"
import { SessionProvider } from "next-auth/react"
import { AppProps } from "next/app"
import Head from "next/head"
import { useRouter } from "next/router"
import { MOTD } from "../components/MsgOfDay"
import Navbar from "../components/Navbar"
import { Toast } from "../components/Toast"
import { ColorModeProvider } from "../contexts/colorMode"
import { SelectFilterTagContextProvider } from "../contexts/selectFilterTag"
import { ToastProvider } from "../contexts/toastContext"
import "../css/global.css"
import { base } from "../themes/theme"
import { Analytics } from "@vercel/analytics/next"

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps) {
  console.log(MOTD)
  const router = useRouter()
  const isHomePage = router.pathname === "/"

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
              content="resume,portfolio,career,projects,xavier,collantes"
            />
            <meta name="og:title" content="Xavier Collantes" />
            <meta name="og:image" content="/preview_image/front.jpeg" />

            <GoogleAnalytics gaId="G-HB7D403D67" />

            <title>Xavier Collantes</title>
          </Head>

          <CssBaseline />

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
              <GoogleAnalytics gaId="G-HB7D403D67" />
              <Analytics />
            </SelectFilterTagContextProvider>
          </Container>
        </ToastProvider>
      </ColorModeProvider>
    </SessionProvider>
  )
}
