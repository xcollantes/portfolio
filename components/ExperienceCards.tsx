/** Panel with list of cards. */

import { useState, useMemo, useEffect } from "react"
import {
  SelectFilterTagContextType,
  useSelectedFilterTagContext,
} from "../contexts/selectFilterTag"
import { Stack, Typography } from "@mui/material"
import LongCard from "./LongCard"
import { filterDataConfig } from "../article_configs/filters_config"
import FadeCustom from "./Fade"
import { MetadataType } from "../article_configs/process_articles"

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
    // https://github.com/xcollantes/portfolio/issues/74
    //@ts-ignore
    const split = Object.groupBy(selected, (e: MetadataType) => e.articleType)
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
    <Stack direction="column" spacing={2} alignItems="stretch">
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
    </Stack>
  )
}
