/** General carousel. */

import useEmblaCarousel from "embla-carousel-react"
import Autoplay from "embla-carousel-autoplay"

import { WheelGesturesPlugin } from "embla-carousel-wheel-gestures"
import { Box } from "@mui/material"
import emblaCss from "../../css/emblaCarousel.module.css"
import { useCallback } from "react"
import { PrevButton, NextButton } from "./EmblaCarouselArrowsDotsButtons"
import FadeCustom from "../Fade"

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

  // const [prevBtnDisabled, setPrevBtnDisabled] = useState(true)
  // const [nextBtnDisabled, setNextBtnDisabled] = useState(true)

  // const [selectedIndex, setSelectedIndex] = useState(0)
  // const [scrollSnaps, setScrollSnaps] = useState<number[]>([])

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev()
  }, [emblaApi])

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext()
  }, [emblaApi])

  // const scrollTo = useCallback(
  //   (index: number) => emblaApi && emblaApi.scrollTo(index),
  //   [emblaApi]
  // )

  // const onInit = useCallback((emblaApi: EmblaCarouselType) => {
  //   setScrollSnaps(emblaApi.scrollSnapList())
  // }, [])

  // const onSelect = useCallback((emblaApi: EmblaCarouselType) => {
  //   // setSelectedIndex(emblaApi.selectedScrollSnap())
  //   setPrevBtnDisabled(!emblaApi.canScrollPrev())
  //   setNextBtnDisabled(!emblaApi.canScrollNext())
  // }, [])

  // useEffect(() => {
  //   if (!emblaApi) return

  //   // onInit(emblaApi)
  //   // onSelect(emblaApi)
  //   // emblaApi.on("reInit", onInit)
  //   // emblaApi.on("reInit", onSelect)
  //   // emblaApi.on("select", onSelect)
  // }, [
  //   emblaApi,
  //   // onInit,
  //   // onSelect,
  // ])

  return (
    <FadeCustom>
      <Box className={emblaCss.embla}>
        <Box className={emblaCss.embla__viewport} ref={emblaRef}>
          <Box className={emblaCss.embla__container}>
            {slidesData.map((slide) => (
              <Box className={emblaCss.embla__slide}>{slide}</Box>
            ))}
          </Box>

          {/* <div className={emblaCss.embla__dots}>
        {scrollSnaps.map((_, index) => (
          <DotButton
            key={index}
            onClick={() => scrollTo(index)}
            className={{emblaCss.embla__dot}.concat(
              index === selectedIndex ? { emblaCss.embla__dot--selected} : ""
            )}
          />
        ))}
      </div> */}

          <Box className={emblaCss.embla__buttons}>
            <PrevButton className={emblaCss.embla__prev} onClick={scrollPrev} />
            <NextButton className={emblaCss.embla__next} onClick={scrollNext} />
          </Box>

          {/* <button className={emblaCss.embla__prev} onClick={scrollPrev}>
          Prev
        </button>
        <button className={emblaCss.embla__prev} onClick={scrollNext}>
          Next
        </button> */}
        </Box>
      </Box>
    </FadeCustom>
  )
}
