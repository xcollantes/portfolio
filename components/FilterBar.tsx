import { Box, Button, Stack } from "@mui/material"
import FilterButton from "./FilterButton"

export default function FilterBar() {
  return (
    <Box sx={{ display: "flex", flexWrap: "wrap" }}>
      <FilterButton text="Python" />
      <FilterButton text="Python" />
      <FilterButton text="Python" />
      <FilterButton text="Python" />
      <FilterButton text="Python" />
      <FilterButton text="Python" />
    </Box>
  )
}
