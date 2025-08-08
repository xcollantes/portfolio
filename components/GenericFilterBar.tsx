/** Generic filter bar component that can work with different filter configurations. */

import FilterAltIcon from "@mui/icons-material/FilterAlt"
import { Box, Stack } from "@mui/material"
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
}

export default function GenericFilterBar({
  filterConfig,
  disabled = false,
  iconTooltip = "Filter"
}: GenericFilterBarProps) {
  const toast = useToastNotification()

  const handleFilterIconClick = () => {
    toast.info(iconTooltip)
  }

  let key: number = 0
  return (
    <Stack direction={"row"} alignItems={"center"} spacing={1}>
      <FilterAltIcon color={"disabled"} onClick={handleFilterIconClick} />
      <Box sx={{ display: "flex", flexWrap: "wrap", justifyContent: "start" }}>
        {filterConfig.map((filter: GenericFilterConfigType) => (
          <FilterButton
            displayText={filter.displayText}
            tagId={filter.tagId}
            key={key++}
            disabledBtn={disabled}
          />
        ))}
      </Box>
    </Stack>
  )
}