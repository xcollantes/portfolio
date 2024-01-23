/** Predefined styling for buttons in Embla Carousel. */

import React from "react"
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos"
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew"
import emblaCss from "../../css/emblaCarousel.module.css"
import { Box } from "@mui/material"

export function PrevButton(props) {
  return (
    <Box
      sx={{ display: "inline-block" }}
      className={`${emblaCss.embla__prev} ${emblaCss.embla__button} ${emblaCss.embla__button}--prev`}
      {...props}
    >
      <ArrowBackIosNewIcon />
    </Box>
  )
}

export function NextButton(props) {
  return (
    <Box
      sx={{ display: "inline-block" }}
      className={`${emblaCss.embla__next} ${emblaCss.embla__button} ${emblaCss.embla__button}--prev`}
      {...props}
    >
      <ArrowForwardIosIcon />
    </Box>
  )
}
