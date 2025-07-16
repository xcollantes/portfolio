/** Panel with list of cards. */

import { KeyboardArrowUp } from "@mui/icons-material"
import { Box, Button, Stack, Typography } from "@mui/material"
import { useEffect, useMemo, useState } from "react"
import { filterDataConfig } from "../article_configs/filters_config"
import { MetadataType } from "../article_configs/process_articles"
import {
  SelectFilterTagContextType,
  useSelectedFilterTagContext,
} from "../contexts/selectFilterTag"
import FadeCustom from "./Fade"
import groupBy from "./GroupBy"
import LongCard from "./LongCard"

export interface ExperienceCardsPropType {
  metadata: MetadataType[]
}

export default function ExperienceCards({ metadata }: ExperienceCardsPropType) {
  const [selected, setSelected] = useState<MetadataType[]>(metadata)
  const { selectedTags, setSelectedTags }: SelectFilterTagContextType =
    useSelectedFilterTagContext()

  const [workExps, setWorkExps] = useState<MetadataType[]>()
  const [blogs, setBlogs] = useState<MetadataType[]>()

  useMemo(() => {
    // If all filters or no filters selected, show all cards
    if (
      selectedTags.length <= 0 ||
      selectedTags.length >= filterDataConfig.length
    ) {
      setSelected(metadata) // Render all cards
    } else {
      setSelected(
        metadata.filter((card: MetadataType) =>
          card.tagIds.some((cardTag: string) => selectedTags.includes(cardTag))
        )
      )
    }

    if (selectedTags.length >= filterDataConfig.length) {
      setSelectedTags([])
    }
  }, [selectedTags])

  useEffect(() => {
    const split = groupBy(selected, "articleType")

    // `@ts-ignore` will not work on Safari: https://github.com/xcollantes/portfolio/issues/74
    // const split = Object.groupBy(selected, (e: MetadataType) => e.articleType)

    setWorkExps(split.WORKEXP)
    setBlogs(split.BLOG)
  }, [selected])

  const header = (text: string) => (
    <Typography variant="subtitle2">{text}</Typography>
  )
  const renderCard = (card: MetadataType) => (
    <FadeCustom key={key}>
      <div>
        <LongCard
          title={card.title}
          cardDescription={card.cardDescription}
          cardPageLink={card.cardPageLink}
          cardButtonText={card.cardButtonText}
          imagePath={card.imagePath}
          key={key++}
        />
      </div>
    </FadeCustom>
  )

  let key: number = 0
  return (
    <Stack direction="column" spacing={2} alignItems="stretch" sx={{ mb: 40 }}>
      {workExps && header("Work experiences")}
      {workExps &&
        workExps.map((card: MetadataType) => {
          return renderCard(card)
        })}

      {blogs && header("Blogs")}
      {blogs &&
        blogs.map((card: MetadataType) => {
          return renderCard(card)
        })}

      {/* Button at the end of articles */}
      <Stack direction="column" spacing={2} alignItems="center" sx={{ my: 8 }}>
        <Box sx={{ display: "flex", justifyContent: "center", my: 3 }}>
          <Button
            variant="contained"
            size="large"
            startIcon={<KeyboardArrowUp />}
            sx={{
              px: 4,
              py: 1.5,
              borderRadius: 2,
              textTransform: "none",
              fontSize: "16px",
              minWidth: "200px",
            }}
            onClick={() => {
              window.scrollTo({ top: 0, behavior: "smooth" })
            }}
          >
          </Button>
        </Box>
        <Box sx={{ display: "flex", justifyContent: "center", my: 3 }}>
          <Button
            variant="outlined"
            size="large"
            sx={{
              px: 4,
              py: 1.5,
              borderRadius: 2,
              textTransform: "none",
              fontSize: "16px",
              minWidth: "200px",
            }}
            onClick={() => {
              window.scrollTo({ top: 0, behavior: "smooth" })
            }}
          >
            (Not so) Hidden Easter Eggs
          </Button>
        </Box>
      </Stack>
    </Stack>
  )
}
