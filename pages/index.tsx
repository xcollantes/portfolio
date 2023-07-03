/** Home page. */

import {
  Box,
  Stack,
  Theme,
  Typography,
  styled,
  useMediaQuery,
  useTheme,
} from "@mui/material"
import Grid from "@mui/material/Unstable_Grid2"
import GitHubIcon from "@mui/icons-material/GitHub"
import LinkedInIcon from "@mui/icons-material/LinkedIn"
import ShareIcon from "@mui/icons-material/Share"
import LongCard from "../components/LongCard"
import Link from "next/link"
import { MaterialLink } from "../components/MaterialLink"

export default function Page() {
  const theme: Theme = useTheme()
  const item = (
    <Box>
      <LongCard
        title="Ransomeware project"
        description="Creating my homemade randomware muahahah Crazy? I Was Crazy Once. They Locked Me In A Room. A Rubber Room. A Rubber Room With Rats. And Rats Make Me Crazy.Crazy? I Was Crazy Once. They Locked Me In A Room. A Rubber Room. A Rubber Room With Rats. And Rats Make Me Crazy.Crazy? I Was Crazy Once. They Locked Me In A Room. A Rubber Room. A Rubber Room With Rats. And Rats Make Me Crazy."
        imagePath=""
      />
    </Box>
  )

  const namePosition = useMediaQuery(theme.breakpoints.down("sm"))
    ? { position: "static" }
    : { position: "fixed" }

  console.log("POSITION: ", namePosition)
  return (
    <>
      <Grid container spacing={2}>
        <Grid xs={12} sm={5}>
          <Box sx={{ m: 4, position: "fixed" }}>
            <Box sx={{ position: "absolute", right: -500 }}>
              <Typography variant="h1" align="right">
                Xavier Collantes
              </Typography>
              <Typography variant="h2" align="right">
                Software engineer
              </Typography>
              <Box
                display="flex"
                justifyContent="flex-end"
                columnGap={2}
                sx={{ py: 3 }}
              >
                <Link href={`${process.env.NEXT_PUBLIC_LINKEDIN_URL}`}>
                  <LinkedInIcon fontSize="large" />
                </Link>
                <Link href={`${process.env.NEXT_PUBLIC_GITHUB_URL}`}>
                  <GitHubIcon fontSize="large" />
                </Link>
                <Link href={`${process.env.NEXT_PUBLIC_GITHUB_URL}`}>
                  <ShareIcon fontSize="large" />
                </Link>
              </Box>
            </Box>
          </Box>
        </Grid>

        <Grid xs={12} sm={7}>
          <Stack direction="column" spacing={2} alignItems="stretch">
            {item}
            {item}
            {item}
            {item}
            {item}
            {item}
            {item}
            {item}
            {item}
            {item}
            {item}
            {item}
            {/* Debug */}
          </Stack>
        </Grid>
      </Grid>
    </>
  )
}
