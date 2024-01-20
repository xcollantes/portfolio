/** Prevent Search Engine crawlers from reaching site with simple CAPTCHA. */

import { useState } from "react"
import { Button, Stack, Tooltip, Typography } from "@mui/material"
import HelpIcon from "@mui/icons-material/Help"
import { clickCheck } from "../storage/click_check"

export default function ClickCheck() {
  const [showWhyMsg, setShowWhyMsg] = useState<boolean>(false)

  const whyMsg: string =
    "Simple solution to prevent scraping by search engines and bots."

  return (
    <>
      <Stack alignItems={"center"}>
        <Stack spacing={4} alignItems={"center"}>
          <Button variant="contained" onClick={() => clickCheck()}>
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
