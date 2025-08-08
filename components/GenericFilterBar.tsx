/** Generic filter bar component that can work with different filter configurations. */

import FilterAltIcon from "@mui/icons-material/FilterAlt"
import { Box, Stack } from "@mui/material"
import { ReactNode } from "react"
import { useToastNotification } from "../hooks/useToastNotification"
import FilterButton from "./FilterButton"

export interface GenericFilterConfigType {
  displayText: string
  tagId: string
}

interface GenericFilterBarProps {
  filterConfig: GenericFilterConfigType[]
  disabled?: boolean
  iconTooltip?: string
  rightContent?: ReactNode
}

export default function GenericFilterBar({
  filterConfig,
  disabled = false,
  iconTooltip = "Filter",
  rightContent
}: GenericFilterBarProps) {
  const toast = useToastNotification()

  const handleFilterIconClick = () => {
    toast.info(iconTooltip)
  }

  let key: number = 0
  return (
    <Stack direction={"row"} alignItems={"center"} spacing={1} sx={{ width: "100%" }}>
      <FilterAltIcon color={"disabled"} onClick={handleFilterIconClick} />
      <Box sx={{ display: "flex", flexWrap: "wrap", justifyContent: "start", flex: 1 }}>
        {filterConfig.map((filter: GenericFilterConfigType) => (
          <FilterButton
            displayText={filter.displayText}
            tagId={filter.tagId}
            key={key++}
            disabledBtn={disabled}
          />
        ))}
      </Box>
      {rightContent && (
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          {rightContent}
        </Box>
      )}
    </Stack>
  )
}