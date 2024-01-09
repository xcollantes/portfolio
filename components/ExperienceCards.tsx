/** Panel with list of cards. */

import { useState, useMemo } from "react"
import {
  SelectFilterTagContextType,
  useSelectedFilterTagContext,
} from "../contexts/selectFilterTag"
import { Stack } from "@mui/material"
import LongCard from "./LongCard"
import { filterDataConfig } from "../article_configs/filters_config"
import FadeCustom from "./Fade"
import { MetadataType } from "../article_configs/process_blogs"

export interface ExperienceCardsPropType {
  metadata: MetadataType[]
}

export default function ExperienceCards({ metadata }: ExperienceCardsPropType) {
  const [selected, setSelected] = useState<MetadataType[]>(metadata)
  const { selectedTags, setSelectedTags }: SelectFilterTagContextType =
    useSelectedFilterTagContext()

  useMemo(() => {
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

  let key: number = 0
  return (
    <Stack direction="column" spacing={2} alignItems="stretch">
      {selected.map((card: MetadataType) => (
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
      ))}
    </Stack>
  )
}
