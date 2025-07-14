/** Share button component that copies URL on desktop and opens share menu on mobile. */

import ShareIcon from "@mui/icons-material/Share"
import { IconButton, Tooltip, useMediaQuery, useTheme } from "@mui/material"
import { useState } from "react"

interface ShareButtonProps {
  shareUrl: string
  title?: string
  sx?: any
}

export default function ShareButton({ title, sx, shareUrl }: ShareButtonProps) {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'))
  const [tooltipOpen, setTooltipOpen] = useState<boolean>(false)
  const [tooltipText, setTooltipText] = useState<string>("Share")

  const copyToClipboard = async (text: string): Promise<boolean> => {
    try {
      await navigator.clipboard.writeText(text)
      console.log("Copied to clipboard: ", text)
      return true

    } catch (err) {
      console.error("Could not copy text: ", err)
      return false

    }
  };

  const handleShare = async () => {
    // Use current URL if none provided
    const shareTitle = title || document.title

    // Check if on mobile based on screen size
    if (isMobile && navigator.share) {
      try {
        await navigator.share({
          title: shareTitle,
          url: shareUrl,
        })
        console.log("Shared: ", shareUrl)

      } catch (error) {
        console.error("Error sharing:", error)
        // Fall back to clipboard on mobile if sharing fails
        await handleCopyToClipboard()
      }
    } else {
      // On desktop, copy to clipboard
      await handleCopyToClipboard()
    }
  }

  const handleCopyToClipboard = async () => {
    const success = await copyToClipboard(shareUrl)

    if (success) {
      setTooltipText("Copied!")
    } else {
      setTooltipText("Failed to copy")
    }

    setTooltipOpen(true)

    // Reset tooltip after 2 seconds
    setTimeout(() => {
      setTooltipText("Share")
      setTooltipOpen(false)
    }, 2000)
  }

  return (
    <>
      <textarea
        style={{
          position: 'absolute',
          left: '-9999px',
          top: 0,
          height: 0,
          width: 0,
          opacity: 0
        }}
        aria-hidden="true"
        tabIndex={-1}
      />
      <Tooltip
        title={tooltipText}
        open={tooltipOpen}
      >
        <IconButton onClick={handleShare} size="large">
          <ShareIcon
            sx={sx || { fontSize: 35, color: theme.palette.secondary.main }}
          />
        </IconButton>
      </Tooltip>
    </>
  )
}