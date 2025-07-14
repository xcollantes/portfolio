/** Home page. */

import { Box, Theme, Typography, useMediaQuery, useTheme } from "@mui/material"
import Grid from "@mui/material/Unstable_Grid2"
import { GetStaticPropsResult } from "next"
import { useSession } from "next-auth/react"
import { NextRouter, useRouter } from "next/router"
import { useMemo } from "react"
import {
  FilterDataConfigType,
  filterDataConfig,
} from "../article_configs/filters_config"
import {
  MetadataType,
  getHeaderMetadata,
} from "../article_configs/process_articles"
import AuthButton from "../components/AuthButton"
import { isUserSignedIn } from "../components/AuthUtils"
import DarkModeSwitch from "../components/DarkMode"
import ExperienceCards from "../components/ExperienceCards"
import ExperienceCardsPlaceholder from "../components/ExperienceCardsPlaceholder"
import FilterBar from "../components/FilterBar"
import RecommendationSlides from "../components/RecommendationSlides"
import SocialMedia from "../components/SocialMedia"
import { ToastDemo } from "../components/ToastDemo"
import {
  SelectFilterTagContextType,
  useSelectedFilterTagContext,
} from "../contexts/selectFilterTag"
import { RecommendationType } from "../recommendations/RecommendationType"
import { getRecommendationData } from "../recommendations/process_recommendations"

/**
 * Runs at build time to statically generate preview cards.
 */
export async function getStaticProps(): Promise<
  GetStaticPropsResult<{
    metadataProps: MetadataType[]
    recommendationsProp: RecommendationType[]
  }>
> {
  // Article preview cards.
  const articleMetadata: string[] = await getHeaderMetadata()
  const metadata: MetadataType[] = articleMetadata.map(
    (unparsedMetadata: string) => JSON.parse(unparsedMetadata)
  )

  // Recommendation slides feature.
  const recommendationData: RecommendationType[] = await getRecommendationData()

  return {
    props: { metadataProps: metadata, recommendationsProp: recommendationData },
  }
}

interface IndexPropTypes {
  metadataProps: MetadataType[]
  recommendationsProp: RecommendationType[]
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
        <Grid xs={12} sm={5} sx={{ display: "flex" }}>
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
                Software Engineer
              </Typography>

              <SocialMedia />

              {/*
                Potential for buggy display. Good enough for now.
                https://github.com/xcollantes/portfolio/issues/77
               */}
              <Box
                sx={{
                  justifyContent: "center",
                  position: "relative",
                  display: "flex",
                  mb: 70,
                }}
              >
                <Box
                  sx={{
                    mt: 10,
                    width: "100%",
                    position: "absolute",
                    [theme.breakpoints.down("sm")]: {
                      mt: 0,
                    },
                  }}
                >
                  <RecommendationSlides
                    recommendationData={props.recommendationsProp}
                  />
                </Box>
              </Box>
            </Box>
          </Box>
        </Grid>
        <Grid xs={12} sm={7}>
          <Box sx={{ my: 3 }}>
            <FilterBar disabled={!isUserSignedIn(session)} />
          </Box>
          {isUserSignedIn(session) && <ToastDemo />}
          {isUserSignedIn(session) ? (
            <ExperienceCards metadata={props.metadataProps} />
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
