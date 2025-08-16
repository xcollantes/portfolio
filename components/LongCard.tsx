/** Card with project summary. */

import { Box, Button, Card, CardContent, Typography } from "@mui/material"
import { useState, useEffect } from "react"
import { MaterialLink } from "./MaterialLink"
import { isBlogOnlyMode } from "../config/siteConfig"

export interface LongCardType {
  title: string
  cardDescription: string
  cardPageLink: string
  cardButtonText?: string
  imagePath: string
  disabled?: boolean
  useBackgroundImage?: boolean
}

export default function LongCard({
  title,
  cardDescription,
  cardPageLink,
  cardButtonText = "See more",
  imagePath = "",
  disabled = false,
  useBackgroundImage = false,
}: LongCardType) {
  const [imageLoaded, setImageLoaded] = useState(false)
  const titleStyle = disabled ? "blurMedium" : ""
  const descStyle = disabled ? "blurHeavy" : ""

  /**
   * Preload image to detect errors.
   * If image is not loaded, act as if it is not a background image.
   */
  useEffect(() => {
    if (useBackgroundImage && imagePath) {
      const img = new Image()
      img.onload = () => setImageLoaded(true)
      img.onerror = () => setImageLoaded(false)
      img.src = imagePath

      // Reset state when imagePath changes.
      setImageLoaded(false)
    } else {
      setImageLoaded(false)
    }
  }, [imagePath, useBackgroundImage])

  const cardStyles = useBackgroundImage && imagePath && imageLoaded
    ? {
      px: 0.5,
      backgroundImage: `url(${imagePath})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
      position: 'relative',
      '&::before': {
        content: '""',
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.65)', // Darker overlay
        zIndex: 1,
      }
    }
    : { px: 0.5 }

  /**
   * Different styles for background image and not.
   */
  const contentStyles = useBackgroundImage && imagePath && imageLoaded
    ? {
      position: 'relative',
      zIndex: 2,
      color: 'white',
    }
    : {}

  // Magazine-style layout for blog mode
  if (isBlogOnlyMode()) {
    return (
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: 'column', md: 'row' },
          gap: { xs: 3, md: 4 },
          alignItems: "flex-start",
          mb: 6,
          '&:hover .image-card': {
            transform: 'scale(1.02)',
            transition: 'transform 0.2s ease-in-out'
          }
        }}
        className={titleStyle}
      >
        {/* Image Card */}
        <Card
          className="image-card"
          raised
          sx={{
            flex: { xs: 'none', md: '0 0 400px' },
            width: { xs: '100%', md: '400px' },
            height: { xs: 200, md: 280 },
            borderRadius: 2,
            overflow: 'hidden',
            transition: 'transform 0.2s ease-in-out',
            backgroundImage: imagePath && imageLoaded ? `url(${imagePath})` : 'none',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            backgroundColor: imagePath && imageLoaded ? 'transparent' : 'grey.200',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          {(!imagePath || !imageLoaded) && (
            <Typography variant="body2" color="text.secondary">
              No image available
            </Typography>
          )}
        </Card>

        {/* Content Area */}
        <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', gap: { xs: 1.5, md: 2 } }}>

          <Typography
            variant="h3"
            className={descStyle}
            sx={{
              fontWeight: 'bold',
              fontSize: { xs: 20, sm: 24, md: 32 },
              lineHeight: 1.2,
              mb: 1
            }}
          >
            {title}
          </Typography>

          <Typography
            variant="body1"
            sx={{
              color: 'text.secondary',
              fontSize: { xs: 14, md: 16 },
              lineHeight: 1.6,
              mb: 2
            }}
          >
            {cardDescription}
          </Typography>

          <Button
            variant="outlined"
            sx={{
              alignSelf: 'flex-start',
              textTransform: "none",
              borderRadius: 2,
              px: 3,
              py: 1,
              fontSize: { xs: 14, md: 16 }
            }}
            component={MaterialLink}
            to={cardPageLink}
            disabled={disabled}
          >
            {cardButtonText}
          </Button>
        </Box>
      </Box>
    )
  }

  // Original card layout for portfolio mode
  return (
    <Card raised sx={cardStyles} className={titleStyle}>
      <CardContent sx={contentStyles}>
        <Typography variant="h4" className={descStyle} sx={{ fontWeight: 'bold' }}>
          {title}
        </Typography>
        <Typography variant="body1" sx={{ mt: 2, fontWeight: 'medium' }}>
          {cardDescription}
        </Typography>
        <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
          <Button
            variant="contained"
            sx={{ mt: 2 }}
            component={MaterialLink}
            to={cardPageLink}
            disabled={disabled}
          >
            {cardButtonText}
          </Button>
        </Box>
      </CardContent>
    </Card>
  )
}
