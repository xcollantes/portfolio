/** Applies to all pages. */

import Head from "next/head"
import { Container, CssBaseline } from "@mui/material"
import { GoogleAnalytics } from "@next/third-parties/google"
import { ColorModeProvider } from "../contexts/colorMode"
import { SessionProvider } from "next-auth/react"

import { base } from "../themes/theme"
import "../css/global.css"
import { SelectFilterTagContextProvider } from "../contexts/selectFilterTag"
import { MOTD } from "../components/MsgOfDay"
import { AppProps } from "next/app"

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps) {
  console.log(MOTD)

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
        <Container sx={{ mt: 4 }} maxWidth="xl">
          <SelectFilterTagContextProvider>
            <Component {...pageProps} />
            <GoogleAnalytics gaId="G-HB7D403D67" />
          </SelectFilterTagContextProvider>
        </Container>
      </ColorModeProvider>
    </SessionProvider>
  )
}
