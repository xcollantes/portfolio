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
    const verifiedUrl = new URL(router.query.intended as string)
    verifiedUrl.searchParams.set("verified", "true")

    setIntendedUrl(verifiedUrl)
  }, [router.isReady])

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
