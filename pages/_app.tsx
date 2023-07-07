/** Applies to all pages. */

import Head from "next/head"
import { Container, CssBaseline } from "@mui/material"
import { ColorModeProvider } from "../contexts/colorMode"

import { base } from "../themes/theme"
import "../css/global.css"
import { SelectFilterTagContextProvider } from "../contexts/selectFilterTag"
import { MOTD } from "../components/motd"

export default function App({ Component, pageProps }) {
  console.log(MOTD)

  return (
    <ColorModeProvider theme={base}>
      <Head>
        <style>
          @import
          url('https://fonts.googleapis.com/css2?family=Carter+One&family=Geologica:wght@600&family=Hanuman:wght@700&family=Koulen&family=Montserrat+Subrayada&family=Montserrat:wght@700&family=Permanent+Marker&family=Tilt+Warp&display=swap');
          @import
          url('https://fonts.googleapis.com/css2?family=IBM+Plex+Sans+Arabic:wght@600&family=Outfit:wght@300&family=Plus+Jakarta+Sans:wght@700&family=Quicksand&display=swap');
        </style>

        <link rel="icon" href="/image/logo/favicon.ico" />
        <meta
          name="description"
          content="Career works and personal projects of Xavier Collantes."
        />
        <meta
          name="keywords"
          content="resume,portfolio,career,projects,xavier,collantes"
        />
        <meta name="og:title" content="Xavier Collantes" />

        <title>Xavier Collantes</title>
      </Head>

      <CssBaseline />
      <Container sx={{ mt: 4 }} maxWidth="xl">
        <SelectFilterTagContextProvider>
          <Component {...pageProps} />
        </SelectFilterTagContextProvider>
      </Container>
    </ColorModeProvider>
  )
}
