/** Home page. */

import { Box, Theme, Typography, useMediaQuery, useTheme } from "@mui/material"
import Grid from "@mui/material/Unstable_Grid2"
import FilterBar from "../components/FilterBar"
import DarkModeSwitch from "../components/DarkMode"
import SocialMedia from "../components/SocialMedia"
import ExperienceCards from "../components/ExperienceCards"

export default function Page() {
  const theme: Theme = useTheme()

  const namePositionContainer = useMediaQuery(theme.breakpoints.down(1290))
    ? { position: "static" }
    : { position: "fixed" }

  const namePositionChild = useMediaQuery(theme.breakpoints.down(1290))
    ? { position: "static" }
    : { position: "absolute" }

  return (
    <>
      <Grid container spacing={2}>
        <Grid xs={12} sm={5}>
          <Box sx={{ m: 4, ...namePositionContainer }}>
            <Box sx={{ ...namePositionChild, right: -500 }}>
              <DarkModeSwitch />
              <Typography variant="h1" align="right">
                Xavier Collantes
              </Typography>
              <Typography variant="h2" align="right">
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
