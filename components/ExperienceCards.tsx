/** Panel with list of cards. */

import { useEffect, useState, useMemo } from "react"
import {
  SelectFilterTagContextType,
  useSelectedFilterTagContext,
} from "../contexts/selectFilterTag"
import { Stack } from "@mui/material"
import LongCard from "./LongCard"
import {
  CardContentType,
  experienceCardsData,
} from "../experience_cards_data/cardData"
import { filterData } from "../experience_cards_data/filterData"

export default function ExperienceCards() {
  const [selected, setSelected] =
    useState<CardContentType[]>(experienceCardsData)
  const { selectedTags, setSelectedTags }: SelectFilterTagContextType =
    useSelectedFilterTagContext()

  useMemo(() => {
    console.log("SELECTED: ", selectedTags)
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

  return (
    <Stack direction="column" spacing={2} alignItems="stretch">
      {selected.map((card: CardContentType) => (
        <LongCard
          title={card.title}
          description={card.description}
          imagePath={card.imagePath}
        />
      ))}
    </Stack>
  )
}
