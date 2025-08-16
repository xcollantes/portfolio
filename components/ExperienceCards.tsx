/** Panel with list of cards. */

import { KeyboardArrowUp } from "@mui/icons-material"
import { Box, Button, Stack, Typography } from "@mui/material"
import { useRouter } from "next/router"
import { useEffect, useMemo, useState } from "react"
import { filterDataConfig } from "../article_configs/filters_config"
import { MetadataType } from "../article_configs/process_articles"
import {
  SelectFilterTagContextType,
  useSelectedFilterTagContext,
} from "../contexts/selectFilterTag"
import { isBlogOnlyMode } from "../config/siteConfig"
import FadeCustom from "./Fade"
import groupBy from "./GroupBy"
import LongCard from "./LongCard"
import MadeWithHeart from "./MadeWithHeart"
import TermsPrivacyLinks from "./TermsPrivacyLinks"

export interface ExperienceCardsPropType {
  metadata: MetadataType[]
  useBackgroundImages?: boolean
}

export default function ExperienceCards({ metadata, useBackgroundImages = false }: ExperienceCardsPropType) {
  const router = useRouter()
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
          card.tagIds?.some((cardTag: string) => selectedTags.includes(cardTag))
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
  const renderCard = (card: MetadataType, useBackgroundImage: boolean = false) => (
    <FadeCustom key={key}>
      <div>
        <LongCard
          title={card.title}
          cardDescription={card.cardDescription}
          cardPageLink={card.cardPageLink}
          cardButtonText={card.cardButtonText}
          imagePath={card.imagePath}
          useBackgroundImage={useBackgroundImage}
          key={key++}
        />
      </div>
    </FadeCustom>
  )

  let key: number = 0
  return (
    <Stack direction="column" spacing={2} alignItems="stretch" sx={{ mb: 10 }}>
      {/* Show only blogs in blog mode, otherwise show both */}
      {!isBlogOnlyMode() && workExps && header("Work experiences")}
      {!isBlogOnlyMode() && workExps &&
        workExps.map((card: MetadataType) => {
          return renderCard(card, useBackgroundImages)
        })}

      {blogs && !isBlogOnlyMode() && header("Blogs")}
      {blogs &&
        blogs.map((card: MetadataType) => {
          return renderCard(card, useBackgroundImages)
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
            Back to Top
          </Button>
        </Box>
        <Box sx={{ display: "flex", justifyContent: "center", mb: 3 }}>
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
              router.push("/articles/easter-eggs")
            }}
          >
            (Not so) Hidden Easter Eggs
          </Button>
        </Box>

        <Stack sx={{ pt: 30, display: "flex", flexDirection: "column", alignItems: "center", gap: 4 }}>
          <MadeWithHeart />
          <TermsPrivacyLinks />
        </Stack>
      </Stack>
    </Stack>
  )
}
