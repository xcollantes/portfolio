/**
 * Slider with cards of recommendations.
 *
 * Insert data from recommendations into feature.
 */

import { Box } from "@mui/material"
import { RecommendationType } from "../recommendations/RecommendationType"
import RecommendationCard from "./RecommendationCard"
import Carousel from "./carousel/Carousel"

export default function RecommendationSlides(recommendationData) {
  // The `showInSlides` field is optional and so should include recommendation
  // if not set to False since field can be undefined.
  const filterEnabledToShow = recommendationData.recommendationData.filter(
    (recommendation: RecommendationType) => recommendation.showInSlides != false
  )

  return (
    <Box>
      <Carousel
        slidesData={filterEnabledToShow.map(
          (recommendation: RecommendationType, index: number) => (
            <RecommendationCard
              key={index}
              name={recommendation.name}
              headline={recommendation.headline}
              relationship={recommendation.relationship}
              dateCreated={recommendation.dateCreated}
              profileImagePath={recommendation.profileImagePath}
              linkedInLink={recommendation.linkedInLink}
              previewText={recommendation.previewText}
              fullRec={recommendation.fullRec}
            />
          )
        )}
      />
    </Box>
  )
}
