/** Terms and Privacy links component. */

import { Box, Link } from "@mui/material"
import { useRouter } from "next/router"

interface TermsPrivacyLinksProps {
  gap?: number
  justifyContent?: string
  pt?: number
}

export default function TermsPrivacyLinks({ 
  gap = 2, 
  justifyContent = "center",
  pt = 0
}: TermsPrivacyLinksProps) {
  const router = useRouter()

  return (
    <Box sx={{ display: "flex", gap, justifyContent, pt }}>
      <Link
        component="button"
        variant="body2"
        sx={{ color: 'text.secondary', cursor: 'pointer' }}
        onClick={() => router.push("/terms")}
      >
        Terms
      </Link>
      <Link
        component="button"
        variant="body2"
        sx={{ color: 'text.secondary', cursor: 'pointer' }}
        onClick={() => router.push("/privacy")}
      >
        Privacy
      </Link>
    </Box>
  )
}