/** Home page. */

import { Box, Theme, Typography, useMediaQuery, useTheme } from "@mui/material"
import Grid from "@mui/material/Unstable_Grid2"
import { useSession } from "next-auth/react"
import FilterBar from "../components/FilterBar"
import DarkModeSwitch from "../components/DarkMode"
import SocialMedia from "../components/SocialMedia"
import ExperienceCards from "../components/ExperienceCards"
import { NextRouter, useRouter } from "next/router"
import {
  SelectFilterTagContextType,
  useSelectedFilterTagContext,
} from "../contexts/selectFilterTag"
import {
  FilterDataConfigType,
  filterDataConfig,
} from "../article_configs/filters_config"
import { useMemo } from "react"
import { GetStaticPropsResult } from "next"
import {
  MetadataType,
  getHeaderMetadata,
} from "../article_configs/process_articles"
import AuthButton from "../components/AuthButton"
import ExperienceCardsPlaceholder from "../components/ExperienceCardsPlaceholder"
import { isUserSignedIn } from "../components/AuthUtils"

/**
 * Runs at build time to statically generate preview cards.
 */
export async function getStaticProps(): Promise<
  GetStaticPropsResult<{ metadata: MetadataType[] }>
> {
  const articleMetadata: string[] = await getHeaderMetadata()
  const metadata: MetadataType[] = articleMetadata.map(
    (unparsedMetadata: string) => JSON.parse(unparsedMetadata)
  )

  return { props: { metadata: metadata } }
}

interface IndexPropTypes {
  metadata: MetadataType[]
}

export default function Page(props: IndexPropTypes) {
  const { data: session, status } = useSession()

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
      const availableFilters: string[] = filterDataConfig.map(
        (filter: FilterDataConfigType) => filter.tagId
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
      <Grid container>
        <Grid xs={12} sm={5}>
          <Box sx={{ m: 4, ...namePositionContainer }}>
            <Box sx={{ ...namePositionChild, right: -500 }}>
              <Box
                sx={{
                  [theme.breakpoints.down("sm")]: {
                    display: "flex",
                    justifyContent: "end",
                    alignItems: "end",
                  },
                  mb: 4,
                  mt: -4,
                }}
              >
                <DarkModeSwitch />
              </Box>
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
                <FilterBar disabled={!isUserSignedIn(session)} />
              </Box>
            </Box>
          </Box>
        </Grid>
        <Grid xs={12} sm={7}>
          {isUserSignedIn(session) ? (
            <ExperienceCards metadata={props.metadata} />
          ) : (
            <>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  position: "relative",
                  top: "10%",
                }}
              >
                <Box
                  sx={{
                    zIndex: 10000000,
                  }}
                >
                  {process.env.NEXT_PUBLIC_AUTH_USERS === "true" && (
                    <AuthButton />
                  )}
                </Box>
              </Box>

              <ExperienceCardsPlaceholder />
            </>
          )}
        </Grid>
      </Grid>
    </>
  )
}
