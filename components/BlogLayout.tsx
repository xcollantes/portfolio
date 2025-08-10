/**
 * Blog-focused layout component for blog-only site mode.
 */

import { Box, Container, Theme, Typography, useTheme } from "@mui/material"
import Grid from "@mui/material/Unstable_Grid2"
import { NextRouter, useRouter } from "next/router"
import { useMemo } from "react"
import { useSession } from "next-auth/react"
import {
  FilterDataConfigType,
  filterDataConfig,
} from "../article_configs/filters_config"
import { MetadataType } from "../article_configs/process_articles"
import { RecommendationRawType } from "../recommendation_configs/RecommendationTypes"
import AuthButton from "./AuthButton"
import { isUserSignedIn } from "./AuthUtils"
import DarkModeSwitch from "./DarkMode"
import ExperienceCards from "./ExperienceCards"
import ExperienceCardsPlaceholder from "./ExperienceCardsPlaceholder"
import FilterBar from "./FilterBar"
import HiddenPreviewImage from "./HiddenPreviewImage"
import SocialMedia from "./SocialMedia"
import {
  SelectFilterTagContextType,
  useSelectedFilterTagContext,
} from "../contexts/selectFilterTag"
import { getSiteConfig } from "../config/siteConfig"

interface BlogLayoutProps {
  metadataProps: MetadataType[]
  recommendationsProp: RecommendationRawType[]
}

export default function BlogLayout({ metadataProps }: BlogLayoutProps) {
  const { data: session } = useSession()
  const router: NextRouter = useRouter()
  const theme: Theme = useTheme()
  const siteConfig = getSiteConfig()

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
      <HiddenPreviewImage />
      
      <Container maxWidth="lg" sx={{ mt: 4 }}>
        <Grid container spacing={4}>
          {/* Header Section */}
          <Grid xs={12}>
            <Box sx={{ 
              display: "flex", 
              justifyContent: "space-between", 
              alignItems: "flex-start",
              mb: 4
            }}>
              <Box>
                <Typography
                  variant="h1"
                  sx={{
                    fontSize: { xs: 32, sm: 48, md: 56 },
                    fontWeight: "bold",
                    mb: 1,
                  }}
                >
                  {siteConfig.title}
                </Typography>
                <Typography 
                  variant="h2" 
                  color="text.secondary"
                  sx={{ 
                    fontSize: { xs: 16, sm: 18, md: 20 },
                    fontWeight: "normal",
                    mb: 2
                  }}
                >
                  Technical insights on AI, software engineering, and technology
                </Typography>
                <SocialMedia />
              </Box>
              <DarkModeSwitch />
            </Box>
          </Grid>

          {/* Filter Section */}
          <Grid xs={12}>
            <Box sx={{ mb: 3 }}>
              <FilterBar disabled={!isUserSignedIn(session)} />
            </Box>
          </Grid>

          {/* Articles Section */}
          <Grid xs={12}>
            {isUserSignedIn(session) ? (
              <ExperienceCards 
                metadata={metadataProps} 
                useBackgroundImages={true}
              />
            ) : (
              <>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    mb: 4,
                  }}
                >
                  {process.env.NEXT_PUBLIC_AUTH_USERS === "true" && (
                    <AuthButton />
                  )}
                </Box>
                <ExperienceCardsPlaceholder useBackgroundImages={true} />
              </>
            )}
          </Grid>
        </Grid>
      </Container>
    </>
  )
}