/** Applies to all pages. */

import Head from "next/head"
import { Container, CssBaseline } from "@mui/material"
import { GoogleAnalytics } from "@next/third-parties/google"
import { ColorModeProvider } from "../contexts/colorMode"
import { SessionProvider } from "next-auth/react"
import { useRouter } from "next/router"

import { base } from "../themes/theme"
import "../css/global.css"
import { SelectFilterTagContextProvider } from "../contexts/selectFilterTag"
import { MOTD } from "../components/MsgOfDay"
import { AppProps } from "next/app"
import Navbar from "../components/Navbar"

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps) {
  console.log(MOTD)
  const router = useRouter()
  const isHomePage = router.pathname === "/"

  return (
    <SessionProvider session={session}>
      <ColorModeProvider theme={base}>
        <Head>
          <link rel="icon" href="/icons/favicon.ico" />
          <meta
            name="description"
            content="Career works and personal projects of Xavier Collantes."
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
            {!isHomePage && <Navbar />}
            <Component {...pageProps} />
            <GoogleAnalytics gaId="G-HB7D403D67" />
          </SelectFilterTagContextProvider>
        </Container>
      </ColorModeProvider>
    </SessionProvider>
  )
}
