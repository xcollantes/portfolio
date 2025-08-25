/**
 * Blog-focused layout component for blog-only site mode.
 */

import { Box, Container } from "@mui/material"
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
import BlogNavbar from "./BlogNavbar"
import ExperienceCards from "./ExperienceCards"
import BrickLayoutCards from "./BrickLayoutCards"
import ExperienceCardsPlaceholder from "./ExperienceCardsPlaceholder"
import FilterBar from "./FilterBar"
import HiddenPreviewImage from "./HiddenPreviewImage"
import {
  SelectFilterTagContextType,
  useSelectedFilterTagContext,
} from "../contexts/selectFilterTag"

const BRICK_LAYOUT = process.env.NEXT_PUBLIC_BRICK_LAYOUT === "true"

interface BlogLayoutProps {
  metadataProps: MetadataType[]
  recommendationsProp: RecommendationRawType[]
}

export default function BlogLayout({ metadataProps }: BlogLayoutProps) {
  const { data: session } = useSession()
  const router: NextRouter = useRouter()

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
      <BlogNavbar />

      <Container maxWidth="lg" sx={{ mt: { xs: 16, md: 18 } }}>
        <Grid container spacing={1}>

          {/* Filter Section */}
          <Grid xs={12}>
            <Box sx={{ mb: 2 }}>
              <FilterBar disabled={!isUserSignedIn(session)} />
            </Box>
          </Grid>

          {/* Articles Section */}
          <Grid xs={12}>
            {isUserSignedIn(session) ? (
              BRICK_LAYOUT
                ? <BrickLayoutCards
                  metadata={metadataProps}
                />
                : <ExperienceCards
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