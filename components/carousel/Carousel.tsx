/** General carousel. */

import useEmblaCarousel from "embla-carousel-react"
import Autoplay from "embla-carousel-autoplay"
import { WheelGesturesPlugin } from "embla-carousel-wheel-gestures"
import { Box, Stack } from "@mui/material"
import emblaCss from "../../css/emblaCarousel.module.css"
import { useCallback } from "react"
import FadeCustom from "../Fade"
import { PrevButton, NextButton } from "./EmblaCarouselButtons"

export interface CarouselType {
  // Array of elements to include for each slide.
  slidesData: any[]
  // Slides will transition to next slide if true without user interaction.
  autoplay?: boolean
  // Milliseconds until the next slide is moved to.
  delay?: number
  // Stop the slides autoplay if mouse is on the feature.
  stopOnMouseEnter?: boolean
  // Stop the slides completely if any interaction in the feature.
  stopOnInteraction?: boolean
}

export default function Carousel({
  slidesData,
  autoplay = true,
  delay = 4000,
  stopOnMouseEnter = true,
  stopOnInteraction = false,
}: CarouselType) {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: autoplay }, [
    Autoplay({
      delay: delay,
      stopOnMouseEnter: stopOnMouseEnter,
      stopOnInteraction: stopOnInteraction,
    }),
    WheelGesturesPlugin(),
  ])

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev()
  }, [emblaApi])

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext()
  }, [emblaApi])

  return (
    <FadeCustom>
      <Box className={emblaCss.embla}>
        <Box
          className={emblaCss.embla__viewport}
          ref={emblaRef}
          sx={{ position: "relative" }}
        >
          <Box className={emblaCss.embla__container}>
            {slidesData.map((slide, index) => (
              <Box key={index} className={emblaCss.embla__slide}>{slide}</Box>
            ))}
          </Box>

          {/* Left arrow - positioned on the left side of the cards */}
          <Box
            sx={{
              position: "absolute",
              left: "2px",
              top: "40%",
              transform: "translateY(-50%)",
              zIndex: 2,
              width: "48px",
              height: "48px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              transition: "all 0.3s ease",
              "&:hover": {
                transform: "translateY(-50%) scale(1.1)",
              }
            }}
          >
            <PrevButton onClick={scrollPrev} />
          </Box>

          {/* Right arrow - positioned on the right side of the cards */}
          <Box
            sx={{
              position: "absolute",
              right: "2px",
              top: "40%",
              transform: "translateY(-50%)",
              zIndex: 2,
              width: "48px",
              height: "48px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              transition: "all 0.3s ease",
              "&:hover": {
                transform: "translateY(-50%) scale(1.1)",
              }
            }}
          >
            <NextButton onClick={scrollNext} />
          </Box>
        </Box>
      </Box>
    </FadeCustom>
  )
}
