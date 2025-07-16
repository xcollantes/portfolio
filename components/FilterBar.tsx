/** Group of buttons used to filter cards. */

import FilterAltIcon from "@mui/icons-material/FilterAlt"
import { Box, Stack } from "@mui/material"
import {
  FilterDataConfigType,
  filterDataConfig,
} from "../article_configs/filters_config"
import { useToastNotification } from "../hooks/useToastNotification"
import FilterButton from "./FilterButton"

interface FilterBarPropType {
  disabled?: boolean
}

export default function FilterBar({ disabled }: FilterBarPropType) {
  const toast = useToastNotification()

  const handleFilterIconClick = () => {
    toast.info("Filter by topic")
  }

  let key: number = 0
  return (
    <Stack direction={"row"} alignItems={"center"} spacing={1}>
      <FilterAltIcon color={"disabled"} onClick={handleFilterIconClick} />
      <Box sx={{ display: "flex", flexWrap: "wrap", justifyContent: "start" }}>
        {filterDataConfig.map((filter: FilterDataConfigType) => (
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
