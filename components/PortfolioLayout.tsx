/**
 * Portfolio layout component - the original layout design.
 */

import { Box, Button, Theme, Typography, useMediaQuery, useTheme } from "@mui/material"
import Grid from "@mui/material/Unstable_Grid2"
import { useSession } from "next-auth/react"
import { NextRouter, useRouter } from "next/router"
import { useMemo } from "react"
import {
  FilterDataConfigType,
  filterDataConfig,
} from "../article_configs/filters_config"
import { MetadataType } from "../article_configs/process_articles"
import { RecommendationRawType } from "../recommendation_configs/RecommendationTypes"
import AuthButton from "./AuthButton"
import { isUserSignedIn } from "./AuthUtils"
import showCatFact from "./CatFacts"
import DarkModeSwitch from "./DarkMode"
import ExperienceCards from "./ExperienceCards"
import ExperienceCardsPlaceholder from "./ExperienceCardsPlaceholder"
import FilterBar from "./FilterBar"
import HiddenPreviewImage from "./HiddenPreviewImage"
import LongPressWrapper from "./LongPressWrapper"
import { MaterialLink } from "./MaterialLink"
import RecommendationSlides from "./RecommendationSlides"
import SocialMedia from "./SocialMedia"
import {
  SelectFilterTagContextType,
  useSelectedFilterTagContext,
} from "../contexts/selectFilterTag"

const oneLiner: string = process.env.NEXT_PUBLIC_ONE_LINER || ""

interface PortfolioLayoutProps {
  metadataProps: MetadataType[]
  recommendationsProp: RecommendationRawType[]
}

export default function PortfolioLayout({
  metadataProps,
  recommendationsProp
}: PortfolioLayoutProps) {
  const { data: session } = useSession()
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
                <Typography variant="subtitle1" align="right">
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
                  pb: 12,
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
                    recommendationData={recommendationsProp}
                  />
                  <Box sx={{ mt: 2, width: "100%" }}>
                    <Button
                      component={MaterialLink}
                      to="/recs"
                      variant="contained"
                      fullWidth
                      sx={{
                        background: "linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)",
                        boxShadow: "0 3px 5px 2px rgba(33, 203, 243, .3)",
                        color: "white",
                        fontWeight: "bold",
                        py: 1.5,
                        transition: "all 0.3s ease-in-out",
                        "&:hover": {
                          background: "linear-gradient(45deg, #1976D2 30%, #0288D1 90%)",
                          boxShadow: "0 6px 10px 4px rgba(33, 203, 243, .4)",
                          transform: "translateY(-2px)",
                        },
                      }}
                    >
                      View recommendations
                    </Button>
                  </Box>
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
            <ExperienceCards metadata={metadataProps} useBackgroundImages={true} />
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