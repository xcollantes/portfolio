/** Social media links. */

import { Box, Theme, createTheme } from "@mui/material"
import Link from "next/link"
import LinkedInIcon from "@mui/icons-material/LinkedIn"
import GitHubIcon from "@mui/icons-material/GitHub"
import ShareIcon from "@mui/icons-material/Share"
import { useTheme } from "@emotion/react"

export default function SocialMedia() {
  const themeContext = useTheme()
  const theme: Theme = createTheme(themeContext)
  const sx = { fontSize: 35, color: theme.palette.secondary.main }

  return (
    <Box display="flex" justifyContent="flex-end" columnGap={2} sx={{ py: 3 }}>
      <Link href={`${process.env.NEXT_PUBLIC_LINKEDIN_URL}`}>
        <LinkedInIcon sx={sx} />
      </Link>
      <Link href={`${process.env.NEXT_PUBLIC_GITHUB_URL}`}>
        <GitHubIcon sx={sx} />
      </Link>
      <Link href={`${process.env.NEXT_PUBLIC_GITHUB_URL}`}>
        <ShareIcon sx={sx} />
      </Link>
    </Box>
  )
}
