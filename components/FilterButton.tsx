/** Selector for user to filter. */

import { Button } from "@mui/material"
import {
  SelectFilterTagContextType,
  useSelectedFilterTagContext,
} from "../contexts/selectFilterTag"
import { useMemo, useState } from "react"
import { useRouter } from "next/router"

interface FilterButtonPropsType {
  displayText: string
  tagId: string
  disabledBtn?: boolean
}

export default function FilterButton({
  displayText,
  tagId,
  disabledBtn = false,
}: FilterButtonPropsType) {
  const { selectedTags, setSelectedTags }: SelectFilterTagContextType =
    useSelectedFilterTagContext()
  const [disabled, setDisabled] = useState<boolean>(false)
  const router = useRouter()

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
    
    // Remove recId from URL when filters change to prevent filter conflicts
    if (router.query.recId) {
      const { recId, ...queryWithoutRecId } = router.query
      router.push({
        pathname: router.pathname,
        query: queryWithoutRecId,
      }, undefined, { shallow: true })
    }
  }

  return (
    <Button
      variant={disabled ? "outlined" : "contained"}
      onClick={handleClick}
      id={tagId}
      sx={{ m: 1 }}
      key={tagId}
      disabled={disabledBtn}
    >
      {displayText}
    </Button>
  )
}
