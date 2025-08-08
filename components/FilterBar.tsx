/** Group of buttons used to filter cards. */

import { filterDataConfig } from "../article_configs/filters_config"
import GenericFilterBar from "./GenericFilterBar"

interface FilterBarPropType {
  disabled?: boolean
}

export default function FilterBar({ disabled }: FilterBarPropType) {
  return (
    <GenericFilterBar
      filterConfig={filterDataConfig}
      disabled={disabled}
      iconTooltip="Filter by topic"
    />
  )
}
