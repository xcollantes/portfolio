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
import showCatFact from "../components/CatFacts"
import DarkModeSwitch from "../components/DarkMode"
import ExperienceCards from "../components/ExperienceCards"
import ExperienceCardsPlaceholder from "../components/ExperienceCardsPlaceholder"
import FilterBar from "../components/FilterBar"
import HiddenPreviewImage from "../components/HiddenPreviewImage"
import LongPressWrapper from "../components/LongPressWrapper"
import RecommendationSlides from "../components/RecommendationSlides"
import SocialMedia from "../components/SocialMedia"
import {
  SelectFilterTagContextType,
  useSelectedFilterTagContext,
} from "../contexts/selectFilterTag"
import { getRecommendationData } from "../recommendation_configs/process_recommendations"
import { RecommendationRawType } from "../recommendation_configs/RecommendationTypes"
import { DarkModeClassNames } from "../hooks/useDarkMode"

const oneLiner: string = process.env.NEXT_PUBLIC_ONE_LINER || ""

/**
 * Runs at build time to statically generate preview cards.
 */
export async function getStaticProps(): Promise<
  GetStaticPropsResult<{
    metadataProps: MetadataType[]
    recommendationsProp: RecommendationRawType[]
  }>
> {
  // Article preview cards.
  const articleMetadata: string[] = await getHeaderMetadata()
  const metadata: MetadataType[] = articleMetadata.map(
    (unparsedMetadata: string) => JSON.parse(unparsedMetadata)
  )

  // Recommendation slides feature.
  const recommendationData: RecommendationRawType[] = await getRecommendationData()

  return {
    props: { metadataProps: metadata, recommendationsProp: recommendationData },
  }
}

interface IndexPropTypes {
  metadataProps: MetadataType[]
  recommendationsProp: RecommendationRawType[]
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

      {/* Hidden image for RCS preview workaround when OG tags aren't respected. */}
      <HiddenPreviewImage />

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

              <LongPressWrapper elementName="Xavier Collantes" onLongPress={showCatFact}>
                <Typography
                  variant="h1"
                  className={DarkModeClassNames.textPrimary}
                  sx={{
                    [theme.breakpoints.down(1290)]: { fontSize: 75 },
                    [theme.breakpoints.down("sm")]: { fontSize: 50 },
                  }}
                  align="right"
                >
                  Xavier Collantes
                </Typography>
              </LongPressWrapper>

              {oneLiner && (
                <Typography variant="subtitle1" className={DarkModeClassNames.textSecondary} align="right">
                  {oneLiner}
                </Typography>
              )}

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
          {isUserSignedIn(session) ? (
            <ExperienceCards metadata={props.metadataProps} useBackgroundImages={true} />
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

              <ExperienceCardsPlaceholder useBackgroundImages={true} />
            </>
          )}
        </Grid>
      </Grid>
    </>
  )
}
