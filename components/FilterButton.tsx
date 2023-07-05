/** Selector for user to filter. */

import { Button } from "@mui/material"

interface FilterButtonPropsType {
  text: string
}

export default function FilterButton({ text }: FilterButtonPropsType) {
  return (
    <Button variant="contained" sx={{ m: 1 }}>
      {text}
    </Button>
  )
}
