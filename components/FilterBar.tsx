/** Group of buttons used to filter cards. */

import { Box, Stack } from "@mui/material"
import FilterButton from "./FilterButton"
import {
  FilterDataConfigType,
  filterDataConfig,
} from "../article_configs/filters_config"
import FilterAltIcon from "@mui/icons-material/FilterAlt"

interface FilterBarPropType {
  disabled?: boolean
}

export default function FilterBar({ disabled }: FilterBarPropType) {
  let key: number = 0
  return (
    <Stack direction={"row"} alignItems={"center"} spacing={1}>
      <FilterAltIcon color={"disabled"} />
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
