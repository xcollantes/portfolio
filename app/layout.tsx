/** Applies to all pages within this directory. */

"use client"

import { base } from "../themes/theme"
import { Container, CssBaseline } from "@mui/material"
import { ColorModeProvider } from "../contexts/colorMode"
import Head from "next/head"
import HeaderMetadata from "./header"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Xavier Collantes",
  description: "",
  referrer: "origin-when-cross-origin",
  keywords: ["Next.js", "React", "JavaScript"],
  authors: [{ name: "Xavier", url: "https://nextjs.org" }],
  colorScheme: "dark",
  creator: "Xavier Collantes",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <ColorModeProvider theme={base}>
        {/* <Head>
          <link rel="icon" href="/image/logo/favicon.ico" />
          <meta
            name="description"
            content={process.env.NEXT_PUBLIC_WEBSITE_DESCRIPTION}
          />
          <meta name="keywords" content={process.env.WEBSITE_TAGS} />
          <meta name="og:title" content="Xavier Collantes" />
          <title>Xavier Collantes</title>
        </Head> */}

        {/* <HeaderMetadata /> */}

        <CssBaseline />
        <Container>
          <body>{children}</body>
        </Container>
      </ColorModeProvider>
    </>
  )
}
