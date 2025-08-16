/** Share button component with social media sharing options. */

import ContentCopyIcon from "@mui/icons-material/ContentCopy"
import FacebookIcon from "@mui/icons-material/Facebook"
import LinkedInIcon from "@mui/icons-material/LinkedIn"
import ShareIcon from "@mui/icons-material/Share"
import {
  IconButton,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem, SvgIcon, Tooltip,
  Typography,
  useMediaQuery,
  useTheme
} from "@mui/material"
import { useState } from "react"
import { useToastNotification } from "../hooks/useToastNotification"

// Custom X icon component to replace Twitter icon.
const XIcon = (props: any) => (
  <SvgIcon {...props} viewBox="0 0 24 24">
    <path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z" />
  </SvgIcon>
)

interface ShareButtonProps {
  shareUrl: string
  title?: string
  description?: string
  source?: string // UTM source - identifies which page the share was from
  sx?: any
}

interface ShareOption {
  name: string
  icon: React.ReactNode
  action: () => void
}

export default function ShareButton({ title, description, sx, shareUrl, source }: ShareButtonProps) {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'))
  const toast = useToastNotification()
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const open = Boolean(anchorEl)

  // Helper function to add UTM parameters to the share URL
  const createUtmUrl = (medium: string): string => {
    if (!shareUrl) {
      return window.location.href
    }
    
    try {
      const url = new URL(shareUrl)
      if (source) {
        url.searchParams.set('utm_source', source)
      }
      url.searchParams.set('utm_medium', medium)
      url.searchParams.set('utm_campaign', 'social_share')
      return url.toString()
    } catch (error) {
      console.error('Invalid shareUrl:', shareUrl, error)
      return window.location.href
    }
  }

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    // On mobile with native share support, use native sharing directly
    if (isMobile && 'share' in navigator) {
      handleNativeShare()
      return
    }

    // Otherwise, show the share menu
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const copyToClipboard = async (text: string): Promise<boolean> => {
    try {
      await navigator.clipboard.writeText(text)
      console.log("Copied to clipboard: ", text)
      return true
    } catch (err) {
      console.error("Could not copy text: ", err)
      return false
    }
  }

  const handleCopyToClipboard = async () => {
    const urlWithUtm = createUtmUrl('link_copy')
    const success = await copyToClipboard(urlWithUtm)
    if (success) {
      toast.success("Link copied to clipboard")
    } else {
      toast.error("Failed to copy link")
    }
    handleClose()
  }

  const shareToFacebook = () => {
    const urlWithUtm = createUtmUrl('facebook')
    const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(urlWithUtm)}`
    window.open(facebookUrl, '_blank', 'width=600,height=400')
    handleClose()
  }

  const shareToLinkedIn = () => {
    const urlWithUtm = createUtmUrl('linkedin')
    const linkedInUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(urlWithUtm)}`
    window.open(linkedInUrl, '_blank', 'width=600,height=400')
    handleClose()
  }

  const shareToX = () => {
    const shareTitle = title || document.title
    const urlWithUtm = createUtmUrl('twitter')
    const xUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(urlWithUtm)}&text=${encodeURIComponent(shareTitle)}`
    window.open(xUrl, '_blank', 'width=600,height=400')
    handleClose()
  }

  const handleNativeShare = async () => {
    const shareTitle = title || document.title
    const shareText = description || shareTitle
    const urlWithUtm = createUtmUrl('native_share')

    try {
      await navigator.share({
        title: shareTitle,
        text: shareText,
        url: urlWithUtm,
      })
      toast.success("Shared successfully")
    } catch (error) {
      console.error("Error sharing:", error)
      // Fall back to copy to clipboard
      const success = await copyToClipboard(urlWithUtm)
      if (success) {
        toast.success("Link copied to clipboard")
      } else {
        toast.error("Failed to copy link")
      }
    }
  }

  const shareOptions: ShareOption[] = [
    {
      name: "Facebook",
      icon: <FacebookIcon sx={{ color: "#1877F2" }} />,
      action: shareToFacebook
    },
    {
      name: "LinkedIn",
      icon: <LinkedInIcon sx={{ color: "#0A66C2" }} />,
      action: shareToLinkedIn
    },
    {
      name: "X (Twitter)",
      icon: <XIcon sx={{ color: "#000000" }} />,
      action: shareToX
    },
    {
      name: "Copy Link",
      icon: <ContentCopyIcon />,
      action: handleCopyToClipboard
    }
  ]

  return (
    <>
      <Tooltip title="Share">
        <IconButton
          onClick={handleClick}
          size="large"
          aria-controls={open ? 'share-menu' : undefined}
          aria-haspopup="true"
          aria-expanded={open ? 'true' : undefined}
        >
          <ShareIcon
            sx={sx || { fontSize: 35, color: theme.palette.secondary.main }}
          />
        </IconButton>
      </Tooltip>

      <Menu
        id="share-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'share-button',
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
        sx={{
          '& .MuiPaper-root': {
            minWidth: 160,
            boxShadow: theme.shadows[8],
          },
        }}
      >
        {shareOptions.map((option) => (
          <MenuItem
            key={option.name}
            onClick={option.action}
            sx={{
              py: 1.5,
              '&:hover': {
                backgroundColor: theme.palette.action.hover,
              }
            }}
          >
            <ListItemIcon sx={{ mr: 2 }}>
              {option.icon}
            </ListItemIcon>
            <ListItemText>
              <Typography variant="body2" sx={{ fontWeight: 500 }}>
                {option.name}
              </Typography>
            </ListItemText>
          </MenuItem>
        ))}
      </Menu>
    </>
  )
}