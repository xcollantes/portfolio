/** Panel with list of cards. */

import { useState, useMemo } from "react"
import {
  SelectFilterTagContextType,
  useSelectedFilterTagContext,
} from "../contexts/selectFilterTag"
import { Fade, Stack } from "@mui/material"
import LongCard from "./LongCard"
import {
  CardContentType,
  experienceCardsData,
} from "../experience_cards_data/cardData"
import { filterData } from "../experience_cards_data/filterData"
import FadeCustom from "./Fade"

export default function ExperienceCards() {
  const [selected, setSelected] =
    useState<CardContentType[]>(experienceCardsData)
  const { selectedTags, setSelectedTags }: SelectFilterTagContextType =
    useSelectedFilterTagContext()

  useMemo(() => {
    if (selectedTags.length <= 0 || selectedTags.length >= filterData.length) {
      setSelected(experienceCardsData) // Render all cards
    } else {
      setSelected(
        experienceCardsData.filter((card: CardContentType) =>
          card.tagIds.some((cardTag: string) => selectedTags.includes(cardTag))
        )
      )
    }

    if (selectedTags.length >= filterData.length) {
      setSelectedTags([])
    }
  }, [selectedTags])

  let key: number = 0
  return (
    <Stack direction="column" spacing={2} alignItems="stretch">
      {selected.map((card: CardContentType) => (
        <FadeCustom key={key}>
          <LongCard
            title={card.title}
            description={card.description}
            pageLink={card.pageLink}
            imagePath={card.imagePath}
            key={key++}
          />
        </FadeCustom>
      ))}
    </Stack>
  )
}
