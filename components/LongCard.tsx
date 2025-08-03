/** Card with project summary. */

import { Box, Button, Card, CardContent, Typography } from "@mui/material"
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
  const titleStyle = disabled ? "blurMedium" : ""
  const descStyle = disabled ? "blurHeavy" : ""

  const cardStyles = useBackgroundImage && imagePath
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
          backgroundColor: 'rgba(128, 128, 128, 0.7)', // Grayish overlay
          zIndex: 1,
        }
      }
    : { px: 0.5 }

  const contentStyles = useBackgroundImage && imagePath
    ? {
        position: 'relative',
        zIndex: 2,
        color: 'white',
      }
    : {}

  const buttonStyles = useBackgroundImage && imagePath
    ? {
        mt: 2,
        backgroundColor: 'rgba(255, 255, 255, 0.9)',
        color: 'black',
        '&:hover': {
          backgroundColor: 'rgba(255, 255, 255, 1)',
        }
      }
    : { mt: 2 }

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
            sx={buttonStyles}
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
