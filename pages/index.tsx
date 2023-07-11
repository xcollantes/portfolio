/** Home page. */

import { Box, Theme, Typography, useMediaQuery, useTheme } from "@mui/material"
import Grid from "@mui/material/Unstable_Grid2"
import FilterBar from "../components/FilterBar"
import DarkModeSwitch from "../components/DarkMode"
import SocialMedia from "../components/SocialMedia"
import ExperienceCards from "../components/ExperienceCards"
import { NextRouter, useRouter } from "next/router"
import {
  SelectFilterTagContextType,
  useSelectedFilterTagContext,
} from "../contexts/selectFilterTag"
import { FilterDataType, filterData } from "../experience_cards_data/filterData"
import { useMemo } from "react"

export default function Page() {
  const router: NextRouter = useRouter()
  const theme: Theme = useTheme()

  const namePositionContainer = useMediaQuery(theme.breakpoints.down(1290))
    ? { position: "static" }
    : { position: "fixed" }

  const namePositionChild = useMediaQuery(theme.breakpoints.down(1290))
    ? { position: "static" }
    : { position: "absolute" }

  const { selectedTags, setSelectedTags }: SelectFilterTagContextType =
    useSelectedFilterTagContext()

  useMemo(() => {
    // Filter based on CGI args. Example: `?f=python,interests`.
    if (router.query.f) {
      const splitFilter = router.query.f.toString().split(",")
      const availableFilters: string[] = filterData.map(
        (filter: FilterDataType) => filter.tagId
      )

      const cleanTags: string[] = []
      splitFilter.forEach((filter: string) => {
        const cleanedFilter: string = filter.trim()

        // Clean input and use input if tag exists as a filter tag.
        if (availableFilters.includes(cleanedFilter)) {
          cleanTags.push(cleanedFilter)
        }
        setSelectedTags([...selectedTags, ...cleanTags])
      })
    }
  }, [router])

  return (
    <>
      <Grid container spacing={2}>
        <Grid xs={12} sm={5}>
          <Box sx={{ m: 4, ...namePositionContainer }}>
            <Box sx={{ ...namePositionChild, right: -500 }}>
              <DarkModeSwitch />
              <Typography
                variant="h1"
                sx={{
                  [theme.breakpoints.down(1290)]: { fontSize: 75 },
                  [theme.breakpoints.down("sm")]: { fontSize: 50 },
                }}
                align="right"
              >
                Xavier Collantes
              </Typography>
              <Typography variant="subtitle1" align="right">
                Software engineer
              </Typography>
              <SocialMedia />
              <Box sx={{ mt: 8 }}>
                <FilterBar />
              </Box>
            </Box>
          </Box>
        </Grid>
        <Grid xs={12} sm={7}>
          <ExperienceCards />
        </Grid>
      </Grid>
    </>
  )
}
