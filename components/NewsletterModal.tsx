/** Modal component that shows newsletter signup after user stays on page for 10+ seconds */

import CloseIcon from "@mui/icons-material/Close"
import {
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  useMediaQuery,
  useTheme,
} from "@mui/material"
import { useEffect, useState } from "react"
import NewsletterSignup from "./NewsletterSignup"

interface NewsletterModalProps {
  /** Whether to show the modal automatically after delay */
  autoShow?: boolean
  /** Delay in seconds before showing modal (default: 10) */
  delaySeconds?: number
  /** Callback when modal is closed */
  onClose?: () => void
}

export default function NewsletterModal({
  autoShow = true,
  delaySeconds = 10,
  onClose
}: NewsletterModalProps) {
  const [open, setOpen] = useState(false)
  const [hasShown, setHasShown] = useState(false)
  const theme = useTheme()
  const fullScreen = false // Never full screen

  // Clear localStorage for testing (temporary)
  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem("newsletter-modal-dismissed")
      localStorage.removeItem("newsletter-subscribed")
      console.log("Cleared newsletter localStorage items")
    }
  }, [])

  useEffect(() => {
    console.log("NewsletterModal useEffect triggered", { autoShow, hasShown, delaySeconds })

    if (!autoShow || hasShown) {
      console.log("Modal blocked: autoShow =", autoShow, "hasShown =", hasShown)
      return
    }

    // Check if user has already subscribed or dismissed modal today
    const today = new Date().toDateString()
    const lastDismissed = localStorage.getItem("newsletter-modal-dismissed")
    const hasSubscribed = localStorage.getItem("newsletter-subscribed")

    console.log("Modal localStorage check:", {
      today,
      lastDismissed,
      hasSubscribed,
      shouldBlock: lastDismissed === today || hasSubscribed === "true"
    })

    if (lastDismissed === today || hasSubscribed === "true") {
      console.log("Modal blocked by localStorage")
      return
    }

    console.log(`Setting timer for ${delaySeconds} seconds`)
    const timer = setTimeout(() => {
      console.log("Timer fired - showing modal")
      setOpen(true)
      setHasShown(true)
    }, delaySeconds * 1000)

    return () => {
      console.log("Cleaning up timer")
      clearTimeout(timer)
    }
  }, [autoShow, delaySeconds, hasShown])

  const handleClose = () => {
    setOpen(false)

    // Remember that user dismissed modal today
    const today = new Date().toDateString()
    localStorage.setItem("newsletter-modal-dismissed", today)

    onClose?.()
  }

  const handleSubscriptionSuccess = () => {
    // Mark as subscribed so modal doesn't show again
    localStorage.setItem("newsletter-subscribed", "true")
    setOpen(false)
  }

  console.log("NewsletterModal render:", { open, hasShown, autoShow })

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      fullScreen={fullScreen}
      maxWidth="sm"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: 2,
          m: 2,
          backgroundColor: "background",
        },
      }}
    >
      <DialogTitle
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          pb: 1,
        }}
      >
        Subscribe to my newsletter
        <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={{
            color: "inherit",
          }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <DialogContent
        sx={{
          pt: 0,
          '& .MuiPaper-root': {
            backgroundColor: 'background',
            boxShadow: 'none !important',
          }
        }}
      >
        <NewsletterSignup
          variant="compact"
          title=""
          subtitle="Get notified when I publish new articles and insights. No spam, unsubscribe anytime."
          onSubscriptionSuccess={handleSubscriptionSuccess}
        />
      </DialogContent>
    </Dialog>
  )
}