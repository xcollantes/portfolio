/** Prevent Search Engine crawlers from reaching site with simple CAPTCHA. */

import { useEffect, useState } from "react"
import { NextRouter, useRouter } from "next/router"
import { Button, Stack, Tooltip, Typography } from "@mui/material"
import HelpIcon from "@mui/icons-material/Help"
import { Url } from "next/dist/shared/lib/router/router"

export default function Verify() {
  const router: NextRouter = useRouter()

  const [showWhyMsg, setShowWhyMsg] = useState<boolean>(false)
  const [intendedUrl, setIntendedUrl] = useState<Url>()

  useEffect(() => {

    // Only process if router is ready and intended URL exists
    if (!router.isReady || !router.query.intended) {
      return
    }

    try {
      const intendedUrlString = router.query.intended as string
      const verifiedUrl = new URL(intendedUrlString)
      verifiedUrl.searchParams.set("verified", "true")
      setIntendedUrl(verifiedUrl)
    } catch (error) {
      console.error("Invalid intended URL:", router.query.intended, error)
      // Fallback to home page if URL is invalid
      const fallbackUrl = new URL("/", window.location.origin)
      fallbackUrl.searchParams.set("verified", "true")
      setIntendedUrl(fallbackUrl)
    }

  }, [router.isReady, router.query.intended])

  const whyMsg: string =
    "Simple solution to prevent scraping by search engines and bots."

  return (
    <>
      <Stack alignItems={"center"}>
        <Stack spacing={4} alignItems={"center"}>
          <Button
            variant="contained"
            onClick={() => intendedUrl && router.push(intendedUrl)}
          >
            Prove you are human
          </Button>
          <Tooltip title={whyMsg} onClick={() => setShowWhyMsg(!showWhyMsg)}>
            <HelpIcon fontSize="small" sx={{ tp: 10 }} />
          </Tooltip>
        </Stack>

        {showWhyMsg && (
          <Typography variant="body1" sx={{ mt: 10 }}>
            {whyMsg}
          </Typography>
        )}
      </Stack>
    </>
  )
}
