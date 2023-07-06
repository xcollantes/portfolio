/** Selector for user to filter. */

import { Button } from "@mui/material"
import {
  SelectFilterTagContextType,
  useSelectedFilterTagContext,
} from "../contexts/selectFilterTag"
import { useMemo, useState } from "react"

interface FilterButtonPropsType {
  displayText: string
  tagId: string
}

export default function FilterButton({
  displayText,
  tagId,
}: FilterButtonPropsType) {
  const { selectedTags, setSelectedTags }: SelectFilterTagContextType =
    useSelectedFilterTagContext()
  const [disabled, setDisabled] = useState<boolean>(false)

  useMemo(() => {
    if (selectedTags.length <= 0 || selectedTags.includes(tagId)) {
      setDisabled(false)
    } else {
      setDisabled(true)
    }
  }, [selectedTags])

  const addSelectedTag = (tagId: string) => {
    setSelectedTags([...selectedTags, tagId])
  }

  const removeSelectedTag = (removeTagId: string) => {
    setSelectedTags(
      selectedTags.filter(
        (selectedTagId: string) => selectedTagId !== removeTagId
      )
    )
  }

  const handleClick = () => {
    if (selectedTags.includes(tagId)) {
      removeSelectedTag(tagId)
    } else {
      addSelectedTag(tagId)
    }
  }

  return (
    <Button
      variant={disabled ? "outlined" : "contained"}
      onClick={handleClick}
      id={tagId}
      sx={{ m: 1 }}
      key={tagId}
    >
      {displayText}
    </Button>
  )
}
