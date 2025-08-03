/** Card with project summary. */

import { Box, Button, Card, CardContent, Typography } from "@mui/material"
import { useState, useEffect } from "react"
import { MaterialLink } from "./MaterialLink"

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
