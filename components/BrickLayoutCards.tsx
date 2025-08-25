/**
 * Text-less brick layout cards.
 *
 * Columns change based on screen size.
*/

import { Box, Typography } from "@mui/material"
import { useEffect, useMemo, useState } from "react"
import { filterDataConfig } from "../article_configs/filters_config"
import { MetadataType } from "../article_configs/process_articles"
import {
  SelectFilterTagContextType,
  useSelectedFilterTagContext,
} from "../contexts/selectFilterTag"
import { MaterialLink } from "./MaterialLink"

export interface BrickLayoutCardsProps {
  metadata: MetadataType[]
}

export default function BrickLayoutCards({ metadata }: BrickLayoutCardsProps) {
  const [selected, setSelected] = useState<MetadataType[]>(metadata)
  const { selectedTags, setSelectedTags }: SelectFilterTagContextType =
    useSelectedFilterTagContext()

  useMemo(() => {
    if (
      selectedTags.length <= 0 ||
      selectedTags.length >= filterDataConfig.length
    ) {
      setSelected(metadata)
    } else {
      setSelected(
        metadata.filter((card: MetadataType) =>
          card.tagIds?.some((cardTag: string) => selectedTags.includes(cardTag))
        )
      )
    }

    if (selectedTags.length >= filterDataConfig.length) {
      setSelectedTags([])
    }
  }, [selectedTags])

  return (
    <Box
      sx={{
        columns: {
          xs: 1,
          sm: 2,
          md: 3,
          lg: 4,
        },
        columnGap: "12px",
        mb: 10,
      }}
    >
      {selected.map((card: MetadataType, index: number) => (
        <BrickCard key={card.cardPageLink} card={card} index={index} />
      ))}
    </Box>
  )
}

interface BrickCardProps {
  card: MetadataType
  index: number
}

function BrickCard({ card, index }: BrickCardProps) {
  const [imageLoaded, setImageLoaded] = useState(false)

  const heights = [200, 250, 300, 180, 220, 280, 320, 160, 240, 290, 270, 190, 310, 230]
  const height = heights[index % heights.length]

  useEffect(() => {
    if (card.imagePath) {
      const img = new Image()
      img.onload = () => {
        setImageLoaded(true)
      }
      img.onerror = () => setImageLoaded(false)
      img.src = card.imagePath
    }
  }, [card.imagePath])

  return (
    <Box
      component={MaterialLink}
      to={card.cardPageLink}
      sx={{
        position: "relative",
        display: "inline-block",
        width: "100%",
        height: height,
        borderRadius: 2,
        overflow: "hidden",
        cursor: "pointer",
        textDecoration: "none",
        backgroundImage: imageLoaded ? `url(${card.imagePath})` : "none",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundColor: imageLoaded ? "transparent" : "grey.300",
        transition: "transform 0.2s ease-in-out",
        breakInside: "avoid",
        "&:hover": {
          transform: "scale(1.02)",
          "& .hover-overlay": {
            opacity: 1,
          },
        },
      }}
    >
      <Box
        className="hover-overlay"
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: "rgba(0, 0, 0, 0.7)",
          opacity: 0,
          transition: "opacity 0.3s ease-in-out",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          padding: 2,
          textAlign: "center",
        }}
      >
        <Typography
          variant="h6"
          sx={{
            color: "white",
            fontWeight: "bold",
            mb: 1,
            fontSize: { xs: "0.9rem", sm: "1rem", md: "1.1rem" },
            lineHeight: 1.2,
          }}
        >
          {card.title}
        </Typography>
        <Typography
          variant="body2"
          sx={{
            color: "rgba(255, 255, 255, 0.9)",
            fontSize: { xs: "0.75rem", sm: "0.8rem", md: "0.85rem" },
            lineHeight: 1.3,
            overflow: "hidden",
            display: "-webkit-box",
            WebkitLineClamp: 4,
            WebkitBoxOrient: "vertical",
          }}
        >
          {card.cardDescription}
        </Typography>
      </Box>
    </Box>
  )
}