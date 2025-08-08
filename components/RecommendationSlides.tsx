/**
 * Slider with cards of recommendations.
 *
 * Insert data from recommendations into feature.
 */

import { Box } from "@mui/material"
import { RecommendationExtractedDataType } from "../recommendation_configs/RecommendationTypes"
import RecommendationCard from "./RecommendationCard"
import Carousel from "./carousel/Carousel"

export default function RecommendationSlides(recommendationData) {
  // The `showInSlides` field is optional and so should include recommendation
  // if not set to False since field can be undefined.
  const filterEnabledToShow = recommendationData.recommendationData.filter(
    (recommendation: RecommendationExtractedDataType) => recommendation.showInSlides != false
  )

  return (
    <Box>
      <Carousel
        slidesData={filterEnabledToShow.map(
          (recommendation: RecommendationExtractedDataType, index: number) => (
            <RecommendationCard
              key={index}
              {...recommendation}
            />
          )
        )}
      />
    </Box>
  )
}
