/** Social media links. */

import { Box } from "@mui/material"
import Link from "next/link"
import LinkedInIcon from "@mui/icons-material/LinkedIn"
import GitHubIcon from "@mui/icons-material/GitHub"
import ShareIcon from "@mui/icons-material/Share"

export default function SocialMedia() {
  return (
    <Box display="flex" justifyContent="flex-end" columnGap={2} sx={{ py: 3 }}>
      <Link href={`${process.env.NEXT_PUBLIC_LINKEDIN_URL}`}>
        <LinkedInIcon sx={{ fontSize: "large", color: "secondary" }} />
      </Link>
      <Link href={`${process.env.NEXT_PUBLIC_GITHUB_URL}`}>
        <GitHubIcon sx={{ fontSize: "large", color: "secondary" }} />
      </Link>
      <Link href={`${process.env.NEXT_PUBLIC_GITHUB_URL}`}>
        <ShareIcon sx={{ fontSize: "large", color: "secondary" }} />
      </Link>
    </Box>
  )
}
