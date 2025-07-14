/** Share button component that copies URL on desktop and opens share menu on mobile. */

import ShareIcon from "@mui/icons-material/Share"
import { IconButton, Tooltip, useTheme } from "@mui/material"
import { useRef, useState } from "react"

interface ShareButtonProps {
  url?: string
  title?: string
  sx?: any
}

export default function ShareButton({ url, title, sx }: ShareButtonProps) {
  const theme = useTheme()
  const [tooltipOpen, setTooltipOpen] = useState(false)
  const [tooltipText, setTooltipText] = useState("Share")
  const textAreaRef = useRef<HTMLTextAreaElement>(null)

  // Fallback clipboard method using document.execCommand
  const fallbackCopyTextToClipboard = (text: string): boolean => {
    if (!textAreaRef.current) return false;

    const textArea = textAreaRef.current;
    textArea.value = text;
    textArea.focus();
    textArea.select();

    try {
      const successful = document.execCommand('copy');
      return successful;
    } catch (err) {
      console.error('Fallback: Oops, unable to copy', err);
      return false;
    }
  };

  const copyToClipboard = async (text: string): Promise<boolean> => {
    if (!navigator.clipboard) {
      return fallbackCopyTextToClipboard(text);
    }

    try {
      await navigator.clipboard.writeText(text);
      return true;
    } catch (err) {
      console.error('Could not copy text: ', err);
      return fallbackCopyTextToClipboard(text);
    }
  };

  const handleShare = async () => {
    // Use current URL if none provided
    const shareUrl = url || window.location.href
    const shareTitle = title || document.title

    // Check if Web Share API is supported (mostly on mobile devices)
    if (navigator.share) {
      try {
        await navigator.share({
          title: shareTitle,
          url: shareUrl,
        })
      } catch (error) {
        console.error("Error sharing:", error)
      }
    } else {
      // On desktop, copy to clipboard
      const success = await copyToClipboard(shareUrl);

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
  }

  return (
    <>
      <textarea
        ref={textAreaRef}
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
        disableFocusListener
        disableHoverListener
        disableTouchListener
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