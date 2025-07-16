/** Social media links. */

import { useTheme } from "@emotion/react"
import GitHubIcon from "@mui/icons-material/GitHub"
import LinkedInIcon from "@mui/icons-material/LinkedIn"
import { Box, IconButton, Theme, createTheme } from "@mui/material"
import Link from "next/link"
import showCatFact from "./CatFacts"
import LongPressWrapper from "./LongPressWrapper"
import ShareButton from "./ShareButton"

export default function SocialMedia() {
  const themeContext = useTheme()
  const theme: Theme = createTheme(themeContext)

  const sx = {
    fontSize: 35,
    color: theme.palette.secondary.main,
    filter: `drop-shadow(0 0 1px ${theme.palette.secondary.light})`
  }

  return (
    <Box display="flex" justifyContent="flex-end" columnGap={2} sx={{ py: 3 }}>
      <Link href={`${process.env.NEXT_PUBLIC_LINKEDIN_URL}`}>
        <IconButton size="large">
          <LinkedInIcon sx={sx} />
        </IconButton>
      </Link>
      <Link href={`${process.env.NEXT_PUBLIC_GITHUB_URL}`}>
        <LongPressWrapper elementName="GitHub icon" onLongPress={showCatFact}>
          <IconButton size="large" sx={{ cursor: "pointer" }}>
            <GitHubIcon sx={sx} />
          </IconButton>
        </LongPressWrapper>
      </Link>
      <ShareButton sx={sx} shareUrl={process.env.NEXT_PUBLIC_SHARE_URL || ""} />
    </Box>
  )
}
