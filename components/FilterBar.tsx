/** Group of buttons used to filter cards. */

import { Box } from "@mui/material"
import FilterButton from "./FilterButton"
import { FilterDataType, filterData } from "../blog_utils/filters"

interface FilterBarPropType {
  disabled?: boolean
}

export default function FilterBar({ disabled }: FilterBarPropType) {
  let key: number = 0
  return (
    <Box sx={{ display: "flex", flexWrap: "wrap", justifyContent: "end" }}>
      {filterData.map((filter: FilterDataType) => (
        <FilterButton
          displayText={filter.displayText}
          tagId={filter.tagId}
          key={key++}
          disabledBtn={disabled}
        />
      ))}
    </Box>
  )
}
