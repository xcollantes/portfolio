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
  return (
    <Box>
      <Carousel
        slidesData={recommendationData.recommendationData.map(
          (recommendation: RecommendationType) => (
            <RecommendationCard
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
